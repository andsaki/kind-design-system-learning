import { useEffect, useId, useRef } from 'react';
import { spacing, typography, colors, radii } from '../design-system/tokens';
import { primitive } from '../design-system/tokens/colors';

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escキーで閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
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
      window.history.pushState(null, '', `#${id}`);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onClose();
    }
  };

  return (
    <>
      {/* オーバーレイ */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden="true"
      />

      {/* ドロワー */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-labelledby={headingId}
        aria-modal="true"
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '280px',
          maxWidth: '80vw',
          backgroundColor: colors.background.default,
          zIndex: 1000,
          padding: spacing.scale[6],
          overflowY: 'auto',
          boxShadow: isOpen ? '-4px 0 16px rgba(0, 0, 0, 0.1)' : 'none',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, box-shadow 0.3s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div style={{ marginTop: spacing.scale[12] }}>
          <h2
            id={headingId}
            style={{
              margin: 0,
              marginBottom: spacing.scale[4],
              fontSize: typography.fontSize.lg,
              fontWeight: 600,
              color: primitive.gray[900],
            }}
          >
            目次
          </h2>
          <nav aria-label="目次">
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.scale[2],
              }}
            >
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
                      style={{
                        display: 'block',
                        padding: `${spacing.scale[2]} ${spacing.scale[3]}`,
                        fontSize: typography.fontSize.sm,
                        color: isActive ? primitive.blue[700] : primitive.gray[700],
                        textDecoration: 'none',
                        borderRadius: radii.borderRadius.base,
                        backgroundColor: isActive ? primitive.blue[50] : 'transparent',
                        borderLeft: isActive
                          ? `3px solid ${primitive.blue[500]}`
                          : `3px solid transparent`,
                        fontWeight: isActive ? 600 : 400,
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = primitive.gray[100];
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
