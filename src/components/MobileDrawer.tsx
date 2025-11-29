import { useEffect, useRef, useId } from "react";
import { css } from "@/styled-system/css";

interface TocItem {
  id: string;
  title: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: TocItem[];
  activeId: string;
}

const overlayClass = css({
  position: "fixed",
  inset: 0,
  bg: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
  opacity: 1,
  pointerEvents: "auto",
  transition: "opacity 0.3s ease",
  "&[data-open='false']": {
    opacity: 0,
    pointerEvents: "none",
  },
});

const drawerClass = css({
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "280px",
  maxWidth: "80vw",
  bg: "bg.primary",
  zIndex: 1000,
  p: 6,
  overflowY: "auto",
  boxShadow: "lg",
  transform: "translateX(0)",
  opacity: 1,
  pointerEvents: "auto",
  transition:
    "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, box-shadow 0.3s ease",
  "&[data-open='false']": {
    transform: "translateX(100%)",
    opacity: 0,
    pointerEvents: "none",
    boxShadow: "none",
  },
});

const headingClass = css({
  m: 0,
  mb: 4,
  fontSize: "lg",
  fontWeight: "semibold",
  color: "contents.primary",
});

const drawerList = css({
  listStyle: "none",
  m: 0,
  p: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const drawerLink = css({
  display: "block",
  px: 3,
  py: 2,
  fontSize: "sm",
  textDecoration: "none",
  borderRadius: "base",
  borderLeftWidth: "3px",
  borderLeftStyle: "solid",
  borderLeftColor: "transparent",
  transition: "all 0.2s ease",
  cursor: "pointer",
  color: "contents.primary",
  _hover: { bg: "bg.hover" },
  "&[data-active='true']": {
    color: "contents.link",
    bg: "bg.active",
    borderLeftColor: "accent.primary",
    fontWeight: "semibold",
  },
});

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  items,
  activeId,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // ドロワーが開いているときはスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escキーで閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // モーダルを開いたときにフォーカスを移動し、閉じたら元に戻す
  useEffect(() => {
    if (isOpen) {
      if (document.activeElement instanceof HTMLElement) {
        previouslyFocusedElement.current = document.activeElement;
      }
      // レイアウトが更新された後でフォーカスを移動する
      const id = requestAnimationFrame(() => {
        drawerRef.current?.focus();
      });
      return () => cancelAnimationFrame(id);
    }

    if (previouslyFocusedElement.current) {
      previouslyFocusedElement.current.focus();
      previouslyFocusedElement.current = null;
    }
  }, [isOpen]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // URLハッシュを更新
      window.history.pushState(null, "", `#${id}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      onClose();
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={overlayClass}
        data-open={isOpen}
      />

      <nav
        role="dialog"
        aria-labelledby={headingId}
        aria-modal="true"
        className={drawerClass}
        data-open={isOpen}
      >
        <div className={css({ mt: 12 })}>
          <h2 className={headingClass}>目次</h2>
          <ul className={drawerList}>
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.id);
                    }}
                    className={drawerLink}
                    data-active={isActive}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
