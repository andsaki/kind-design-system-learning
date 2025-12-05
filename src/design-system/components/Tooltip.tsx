import {
  useState,
  useRef,
  cloneElement,
  isValidElement,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import type {
  ReactNode,
  ReactElement,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  FocusEvent as ReactFocusEvent,
} from "react";
import { tooltip as tooltipRecipe } from "@/styled-system/recipes";

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  mouseDelay?: number;
}

// 渡された子要素がもともとフォーカス可能かを推定し、spanなどにはtabIndex=0を与える
type FocusableProps = HTMLAttributes<HTMLElement> & {
  disabled?: boolean;
  href?: string;
  type?: string;
  contentEditable?: boolean | "true" | "false";
  tabIndex?: number;
};

const isNaturallyFocusable = (
  element: ReactElement<HTMLAttributes<HTMLElement>>
): boolean => {
  const props = element.props as FocusableProps;
  if (typeof props.tabIndex === "number" && props.tabIndex >= 0) {
    return true;
  }
  if (props.contentEditable === true || props.contentEditable === "true") {
    return true;
  }
  const tag =
    typeof element.type === "string" ? element.type.toLowerCase() : "";
  if (!tag) {
    return false;
  }
  if (props.disabled) {
    return false;
  }
  if (tag === "button" || tag === "select" || tag === "textarea") {
    return true;
  }
  if (tag === "input") {
    const type = props.type;
    return type !== "hidden";
  }
  if (tag === "a") {
    return Boolean(props.href);
  }
  return false;
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 300,
  mouseDelay = 1000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timersRef = useRef<{ default?: number; mouse?: number }>({});
  const tooltipId = useRef<string>(
    `tooltip-${Math.random().toString(36).substring(2, 11)}`
  );
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const tooltipContentRef = useRef<HTMLSpanElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const clearTimer = useCallback((type: "default" | "mouse") => {
    const timerId = timersRef.current[type];
    if (timerId !== undefined) {
      clearTimeout(timerId);
      timersRef.current[type] = undefined;
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    clearTimer("default");
    clearTimer("mouse");
  }, [clearTimer]);

  const changeVisibility = useCallback(
    (
      nextVisible: boolean,
      interaction: "default" | "mouse" = "default",
      options?: { immediate?: boolean }
    ) => {
      const shouldDelay = !options?.immediate;
      const delayMs = shouldDelay
        ? interaction === "mouse"
          ? mouseDelay
          : delay
        : 0;

      clearTimer(interaction);

      if (delayMs <= 0) {
        clearAllTimers();
        setIsVisible(nextVisible);
        return;
      }

      timersRef.current[interaction] = window.setTimeout(() => {
        setIsVisible(nextVisible);
        timersRef.current[interaction] = undefined;
      }, delayMs);
    },
    [clearTimer, clearAllTimers, delay, mouseDelay]
  );

  const updateTooltipPosition = useCallback(() => {
    const trigger = containerRef.current;
    const tooltipEl = tooltipContentRef.current;
    if (!trigger || !tooltipEl) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const offset = 8;
    let top = 0;
    let left = 0;

    switch (position) {
      case "bottom":
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + offset;
        break;
      case "top":
      default:
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
    }

    const padding = 4;
    const maxLeft = window.innerWidth - tooltipRect.width - padding;
    const maxTop = window.innerHeight - tooltipRect.height - padding;
    setTooltipPosition({
      top: Math.max(padding, Math.min(top, maxTop)),
      left: Math.max(padding, Math.min(left, maxLeft)),
    });
  }, [position]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        changeVisibility(false, "default", { immediate: true });
      }
    };
    if (isVisible) {
      // Escキーで即時にツールチップを閉じられるようグローバルに監視
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      // 表示が終わったらリスナーを必ず解除
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, changeVisibility]);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  useLayoutEffect(() => {
    if (!isVisible) return;
    updateTooltipPosition();

    const handleReposition = () => updateTooltipPosition();
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isVisible, updateTooltipPosition]);

  let existingHandlers: HTMLAttributes<HTMLElement> = {};
  if (isValidElement(children)) {
    existingHandlers = children.props as HTMLAttributes<HTMLElement>;
  }
  const {
    onMouseEnter: existingMouseEnter,
    onMouseLeave: existingMouseLeave,
    onFocus: existingFocus,
    onBlur: existingBlur,
    onKeyDown: existingKeyDown,
    tabIndex: existingTabIndex,
  } = existingHandlers;
  const shouldForceTabIndex =
    isValidElement(children) &&
    !isNaturallyFocusable(
      children as ReactElement<HTMLAttributes<HTMLElement>>
    ) &&
    existingTabIndex == null;

  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<HTMLAttributes<HTMLElement>>, {
        "aria-describedby": isVisible ? tooltipId.current : undefined,
        onMouseEnter: (event: ReactMouseEvent<HTMLElement>) => {
          existingMouseEnter?.(event);
          if (!event.defaultPrevented) {
            changeVisibility(true, "mouse");
          }
        },
        onMouseLeave: (event: ReactMouseEvent<HTMLElement>) => {
          existingMouseLeave?.(event);
          if (event.defaultPrevented) {
            return;
          }
          const nextTarget = event.relatedTarget as Node | null;
          if (nextTarget && tooltipContentRef.current?.contains(nextTarget)) {
            return;
          }
          changeVisibility(false, "mouse");
        },
        onFocus: (event: ReactFocusEvent<HTMLElement>) => {
          existingFocus?.(event);
          if (!event.defaultPrevented) {
            changeVisibility(true, "default", { immediate: true });
          }
        },
        onBlur: (event: ReactFocusEvent<HTMLElement>) => {
          existingBlur?.(event);
          if (!event.defaultPrevented) {
            changeVisibility(false, "default", { immediate: true });
          }
        },
        onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => {
          existingKeyDown?.(event);
          if (!event.defaultPrevented && event.key === "Escape") {
            changeVisibility(false, "default", { immediate: true });
          }
        },
        tabIndex: shouldForceTabIndex ? 0 : existingTabIndex,
      })
    : children;

  const styles = tooltipRecipe({ position });

  const portalTarget = typeof document !== "undefined" ? document.body : null;

  // ポータルでbody直下に描画し、親コンテナのoverflowやz-indexの影響を受けないようにする
  const tooltipNode =
    isVisible && portalTarget
      ? createPortal(
          <span
            role="tooltip"
            id={tooltipId.current}
            className={styles.content}
            ref={tooltipContentRef}
            // Pandaのレシピは静的トークン前提のため、計算した座標はstyleで直接適用
            style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            onMouseEnter={() => {
              changeVisibility(true, "mouse", { immediate: true });
            }}
            onMouseLeave={(event: ReactMouseEvent<HTMLSpanElement>) => {
              const nextTarget = event.relatedTarget as Node | null;
              if (nextTarget && containerRef.current?.contains(nextTarget)) {
                return;
              }
              changeVisibility(false, "mouse");
            }}
            onClick={(event) => event.stopPropagation()} // body直下のポータルに描画しても外側へクリックが伝播しないようにする
          >
            {content}
            <span className={styles.arrow} />
          </span>,
          portalTarget
        )
      : null;

  return (
    <span className={styles.root} ref={containerRef}>
      {child}
      {/* body直下のポータルで描画するので、Tooltip自体はここにDOMを持たない */}
      {tooltipNode}
    </span>
  );
};
