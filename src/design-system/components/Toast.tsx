import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { accessibilityLevels } from '../constants/accessibility';
import type { WCAGLevel } from '../constants/accessibility';
import { css, cx } from '@/styled-system/css';

export type { WCAGLevel } from '../constants/accessibility';
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  /** トーストのID */
  id: string;
  /** トーストのタイプ */
  type?: ToastType;
  /** タイトル */
  title?: string;
  /** メッセージ */
  message: string;
  /** 自動で閉じるまでの時間（ミリ秒）、0で無効化 */
  duration?: number;
  /** 閉じる時のコールバック */
  onClose: (id: string) => void;
  /** 表示位置のインデックス */
  index?: number;
  /** WCAGレベル（A, AA, AAA） */
  wcagLevel?: WCAGLevel;
}

/**
 * Toast コンポーネント
 *
 * 一時的な通知メッセージを表示
 *
 * 機能:
 * - 4種類のタイプ（success, error, warning, info）
 * - 自動消去（デフォルト5秒）
 * - スライドインアニメーション
 * - アクセシブル（role="alert"）
 */
// ベーススタイル
const toastBase = css({
  position: 'fixed',
  top: 4,
  right: 4,
  zIndex: 10000,
  display: 'flex',
  alignItems: 'flex-start',
  gap: 3,
  p: 4,
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderLeftWidth: 'base',
  rounded: 'lg',
  boxShadow: 'lg',
  minWidth: '320px',
  maxWidth: '480px',
  pointerEvents: 'auto',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
});

// タイプごとのスタイル
const toastVariants = {
  success: css({
    bg: 'green.50',
    borderColor: 'green.500',
    color: 'green.900',
  }),
  error: css({
    bg: 'red.50',
    borderColor: 'red.500',
    color: 'red.900',
  }),
  warning: css({
    bg: 'orange.50',
    borderColor: 'orange.500',
    color: 'orange.900',
  }),
  info: css({
    bg: 'blue.50',
    borderColor: 'blue.500',
    color: 'blue.900',
  }),
};

// アイコンコンテナ
const iconContainer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 6,
  height: 6,
  rounded: 'full',
  color: 'white',
  fontSize: 'sm',
  fontWeight: 'bold',
  flexShrink: 0,
});

const iconVariants = {
  success: css({ bg: 'green.600' }),
  error: css({ bg: 'red.600' }),
  warning: css({ bg: 'orange.600' }),
  info: css({ bg: 'blue.600' }),
};

// コンテンツエリア
const contentArea = css({
  flex: 1,
  minWidth: 0,
});

// タイトル
const titleStyle = css({
  fontSize: 'sm',
  fontWeight: 'semibold',
  mb: 1,
});

// メッセージ
const messageStyle = css({
  fontSize: 'sm',
  lineHeight: 'relaxed',
});

// 閉じるボタン
const closeButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 6,
  height: 6,
  p: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: 'lg',
  lineHeight: 1,
  rounded: 'sm',
  transition: 'background-color 0.2s ease',
  flexShrink: 0,
  _hover: {
    bg: 'rgba(0, 0, 0, 0.1)',
  },
});

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  index = 0,
  wcagLevel = 'AA',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  // キーボード利用者のフォーカス位置を覚えておき、トーストを閉じた後に戻す
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      previouslyFocusedElementRef.current = activeElement;
    }
  }, []);

  // マウント時にスライドイン
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && closeButtonRef.current) {
      closeButtonRef.current.focus({ preventScroll: true });
    }
  }, [isVisible]);

  const restoreFocus = useCallback(() => {
    if (typeof document === 'undefined') return;
    if (document.activeElement !== closeButtonRef.current) return;

    const previous = previouslyFocusedElementRef.current;
    if (!previous || typeof previous.focus !== 'function') return;
    if (!previous.isConnected) return;

    // トーストを閉じたら元の操作対象へフォーカスを戻す
    previous.focus({ preventScroll: true });
  }, []);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    restoreFocus();
    setTimeout(() => {
      onClose(id);
    }, 300); // アニメーション時間と合わせる
  }, [onClose, id, restoreFocus]);

  // 自動クローズ
  useEffect(() => {
    if (duration === 0) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  // タイプごとのアイコン
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  // WCAGレベルに応じたフォーカススタイル
  const focusStyles = {
    outline: `${accessibilityLevels.focus[wcagLevel].outlineWidth} solid ${accessibilityLevels.focus[wcagLevel].outline}`,
    outlineOffset: accessibilityLevels.focus[wcagLevel].outlineOffset,
  };

  // 動的なスタイル（位置とアニメーション）
  const dynamicStyle = {
    transform: `translateY(${index * 96}px) translateX(${isVisible && !isExiting ? '0' : '400px'})`,
    opacity: isVisible && !isExiting ? 1 : 0,
  };

  // タイプに応じたテキストカラークラス（親要素の色を継承）
  const textColorClass = css({ color: 'inherit' });

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={cx(toastBase, toastVariants[type])}
      style={dynamicStyle}
    >
      {/* アイコン */}
      <div
        aria-hidden="true"
        className={cx(iconContainer, iconVariants[type])}
      >
        {icons[type]}
      </div>

      {/* コンテンツ */}
      <div className={contentArea}>
        {title && (
          <div className={cx(titleStyle, textColorClass)}>
            {title}
          </div>
        )}
        <div className={cx(messageStyle, textColorClass)}>
          {message}
        </div>
      </div>

      {/* 閉じるボタン */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="通知を閉じる"
        tabIndex={0}
        className={cx(closeButton, textColorClass)}
        ref={closeButtonRef}
        onFocus={(e) => {
          e.currentTarget.style.outline = focusStyles.outline;
          e.currentTarget.style.outlineOffset = focusStyles.outlineOffset;
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = '';
          e.currentTarget.style.outlineOffset = '';
        }}
      >
        ×
      </button>
    </div>,
    portalTarget,
  );
};
