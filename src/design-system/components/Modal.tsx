import React, { useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { modal as modalRecipe } from "../../../styled-system/recipes";
import type { ComponentWCAGLevel } from "../constants/accessibility";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  wcagLevel?: ComponentWCAGLevel;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  wcagLevel = "AA",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  /**
   * モーダルを閉じた際に、開く前にフォーカスされていた要素へフォーカスを戻す。
   * focus() が存在しない要素や DOM から外れた要素は安全にスキップする。
   */
  const restoreFocus = useCallback(() => {
    if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
      previousActiveElement.current.focus();
    }
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      dialog.showModal();
      document.body.style.overflow = "hidden";

      const focusable = getFocusableElements(dialog);
      const firstFocusable = focusable[0];
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        const title = dialog.querySelector('[data-modal-title="true"]') as HTMLElement | null;
        title?.focus();
      }
    } else if (dialog.open) {
      // openがtrueの時だけclose()を呼ぶ
      dialog.close();
      document.body.style.overflow = "";

      // 元の要素にフォーカスを戻す
      restoreFocus();
    }
  }, [isOpen, restoreFocus]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    /** <dialog> の close イベントから onClose を伝播させる。 */
    const handleClose = () => {
      onClose();
    };

    /**
     * ダイアログ外クリックを検知し、 backdrop をクリックした場合のみ onClose を呼び出す。
     * dialog 内のクリックはフォーカス移動や入力操作と見なし、閉じない。
     */
    const handleBackdropClick = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        onClose();
      }
    };

    /**
     * Tab/Shift+Tab でフォーカスがモーダル外へ抜けないように制御する。
     * フォーカス可能要素が0件の場合はTabキーを無効化して意図しない操作を防ぐ。
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = getFocusableElements(dialog);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (activeElement === first || !dialog.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("click", handleBackdropClick);
    dialog.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("click", handleBackdropClick);
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const slots = modalRecipe({ size, wcagLevel });

  return (
    <dialog ref={dialogRef} aria-labelledby="modal-title" aria-modal="true" className={slots.dialog}>
      <div className={slots.header}>
        <h2 id="modal-title" className={slots.title} tabIndex={-1} data-modal-title="true">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className={slots.closeButton}
          aria-label="モーダルを閉じる"
        >
          ✕
        </button>
      </div>
      <div className={slots.body}>{children}</div>
      {footer && <div className={slots.footer}>{footer}</div>}
    </dialog>
  );
};
const focusableSelector = [
  '[data-modal-title="true"]',
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[role="button"]',
].join(", ");

/**
 * dialog 内の操作可能要素を列挙するユーティリティ。
 * タイトル要素まで含めると初期フォーカスの位置がテストとズレるため、あくまでフォールバックとして個別に扱う。
 */
const getFocusableElements = (root: HTMLElement): HTMLElement[] => {
  const dialog = root.closest("dialog") ?? root;
  return Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => element.getAttribute("aria-hidden") !== "true"
  );
};
