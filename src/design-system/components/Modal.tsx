import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { modal as modalRecipe } from "../../../styled-system/recipes";
import type { WCAGLevel } from "../constants/accessibility";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  wcagLevel?: WCAGLevel;
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      dialog.showModal();
      document.body.style.overflow = "hidden";

      // タイトルにフォーカス
      const title = dialog.querySelector('[id="modal-title"]') as HTMLElement;
      if (title) {
        title.focus();
      }
    } else if (dialog.open) {
      // openがtrueの時だけclose()を呼ぶ
      dialog.close();
      document.body.style.overflow = "";

      // 元の要素にフォーカスを戻す
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

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

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("click", handleBackdropClick);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, [onClose]);

  const slots = modalRecipe({ size, wcagLevel });

  return (
    <dialog ref={dialogRef} aria-labelledby="modal-title" aria-modal="true" className={slots.dialog}>
      <div className={slots.header}>
        <h2 id="modal-title" className={slots.title} tabIndex={-1}>
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
