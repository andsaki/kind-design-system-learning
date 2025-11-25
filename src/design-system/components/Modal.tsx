import React, { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { modal as modalRecipe } from '../../../styled-system/recipes';
import { css, cx } from '@/styled-system/css';
import { accessibilityLevels } from '../constants/accessibility';
import type { WCAGLevel } from '../constants/accessibility';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  wcagLevel?: WCAGLevel;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  wcagLevel = 'AA',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements?.[0]?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const elements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!elements || elements.length === 0) return;

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slots = modalRecipe({ size, wcagLevel });
  const focusStyles = {
    outline: `${accessibilityLevels.focus[wcagLevel].outlineWidth} solid ${accessibilityLevels.focus[wcagLevel].outline}`,
    outlineOffset: accessibilityLevels.focus[wcagLevel].outlineOffset,
  };

  return (
    <div
      role="presentation"
      className={slots.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={slots.dialog}
      >
        <div className={slots.header}>
          <h2 id="modal-title" className={slots.title}>
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={cx(
              slots.closeButton,
              css({
                fontSize: 'lg',
                lineHeight: '1',
              })
            )}
            style={focusStyles}
            aria-label="モーダルを閉じる"
          >
            ✕
          </button>
        </div>
        <div className={slots.body}>{children}</div>
        {footer && <div className={slots.footer}>{footer}</div>}
      </div>
    </div>
  );
};
