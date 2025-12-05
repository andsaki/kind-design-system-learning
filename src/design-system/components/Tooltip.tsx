import { useState, useRef, cloneElement, isValidElement, useEffect, useCallback } from 'react';
import type {
  ReactNode,
  ReactElement,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  FocusEvent as ReactFocusEvent,
} from 'react';
import { tooltipRecipe } from '../recipes/tooltip';

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  mouseDelay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  mouseDelay = 1000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timersRef = useRef<{ default?: number; mouse?: number }>({});
  const tooltipId = useRef<string>(`tooltip-${Math.random().toString(36).substring(2, 11)}`);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const tooltipContentRef = useRef<HTMLSpanElement | null>(null);

  const clearTimer = useCallback((type: 'default' | 'mouse') => {
    const timerId = timersRef.current[type];
    if (timerId !== undefined) {
      clearTimeout(timerId);
      timersRef.current[type] = undefined;
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    clearTimer('default');
    clearTimer('mouse');
  }, [clearTimer]);

  const changeVisibility = useCallback((
    nextVisible: boolean,
    interaction: 'default' | 'mouse' = 'default',
    options?: { immediate?: boolean },
  ) => {
    const shouldDelay = !options?.immediate;
    const delayMs = shouldDelay ? (interaction === 'mouse' ? mouseDelay : delay) : 0;

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
  }, [clearTimer, clearAllTimers, delay, mouseDelay]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        changeVisibility(false, 'default', { immediate: true });
      }
    };
    if (isVisible) {
      // Escキーで即時にツールチップを閉じられるようグローバルに監視
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      // 表示が終わったらリスナーを必ず解除
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, changeVisibility]);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

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
  } = existingHandlers;

  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<HTMLAttributes<HTMLElement>>, {
        'aria-describedby': isVisible ? tooltipId.current : undefined,
        onMouseEnter: (event: ReactMouseEvent<HTMLElement>) => {
          existingMouseEnter?.(event);
          if (!event.defaultPrevented) {
            changeVisibility(true, 'mouse');
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
          changeVisibility(false, 'mouse');
        },
        onFocus: (event: ReactFocusEvent<HTMLElement>) => {
          existingFocus?.(event);
          if (!event.defaultPrevented) {
            changeVisibility(true, 'default', { immediate: true });
          }
        },
        onBlur: (event: ReactFocusEvent<HTMLElement>) => {
          existingBlur?.(event);
          if (!event.defaultPrevented) {
            changeVisibility(false, 'default', { immediate: true });
          }
        },
        onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => {
          existingKeyDown?.(event);
          if (!event.defaultPrevented && event.key === 'Escape') {
            changeVisibility(false, 'default', { immediate: true });
          }
        },
      })
    : children;

  const styles = tooltipRecipe({ position });

  return (
    <span className={styles.root} ref={containerRef}>
      {child}
      {isVisible && (
        <span
          role="tooltip"
          id={tooltipId.current}
          className={styles.content}
          ref={tooltipContentRef}
          onMouseEnter={() => {
            changeVisibility(true, 'mouse', { immediate: true });
          }}
          onMouseLeave={(event: ReactMouseEvent<HTMLSpanElement>) => {
            const nextTarget = event.relatedTarget as Node | null;
            if (nextTarget && containerRef.current?.contains(nextTarget)) {
              return;
            }
            changeVisibility(false, 'mouse');
          }}
        >
          {content}
          <span className={styles.arrow} />
        </span>
      )}
    </span>
  );
};
