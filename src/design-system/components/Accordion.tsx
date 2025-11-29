import React from 'react';
import { accordion } from '../../../styled-system/recipes';
import { css, cx } from '@/styled-system/css';
import type { WCAGLevel } from '../constants/accessibility';

const summaryTextClass = css({ flex: 1 });

export interface AccordionProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  children: React.ReactNode;
  className?: string;
  /** 初期状態で開いているか */
  defaultOpen?: boolean;
  /** WCAGアクセシビリティレベル (A/AA/AAA) @default 'AA' */
  wcagLevel?: WCAGLevel;
}

/**
 * アクセシブルなアコーディオンコンポーネント
 *
 * 機能:
 * - ネイティブの<details>/<summary>要素を使用
 * - キーボード操作完全対応（Enter、Space）
 * - スクリーンリーダー対応（自動的にaria属性が付与される）
 * - フォーカス表示
 * - スムーズなアニメーション
 */
export const Accordion: React.FC<AccordionProps> = ({
  children,
  className = '',
  defaultOpen = false,
  wcagLevel = 'AA',
  ...props
}) => {
  const slots = accordion({ wcagLevel });

  // wcagLevelを子コンポーネントに渡すためのContext（簡易版）
  return (
    <details
      className={cx(slots.root, className)}
      open={defaultOpen}
      data-wcag-level={wcagLevel}
      {...props}
    >
      {children}
    </details>
  );
};

export interface AccordionSummaryProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const AccordionSummary: React.FC<AccordionSummaryProps> = ({
  children,
  className = '',
  ...props
}) => {
  // キーボード操作によるフォーカスかどうかを追跡
  const [isKeyboardFocus, setIsKeyboardFocus] = React.useState(false);
  const summaryRef = React.useRef<HTMLElement>(null);

  // 親のdetails要素からwcagLevelを取得
  const [wcagLevel, setWcagLevel] = React.useState<WCAGLevel>('AA');

  React.useEffect(() => {
    if (summaryRef.current) {
      const detailsElement = summaryRef.current.closest('details');
      const level = detailsElement?.getAttribute('data-wcag-level') as WCAGLevel;
      if (level) {
        setWcagLevel(level);
      }
    }
  }, []);

  const slots = accordion({ wcagLevel });

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardFocus(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardFocus(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <summary
      ref={summaryRef}
      className={cx(slots.summary, className)}
      onFocus={(e) => {
        if (isKeyboardFocus) {
          e.currentTarget.setAttribute('data-focused', 'true');
        }
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.removeAttribute('data-focused');
        props.onBlur?.(e);
      }}
      {...props}
    >
      <AccordionIcon className={slots.icon} />
      <span className={summaryTextClass}>{children}</span>
    </summary>
  );
};

/** アコーディオンの開閉アイコン */
const AccordionIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cx('accordion-icon', className)}
    >
      <path
        d="M7 10L12 15L17 10H7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className = '',
  ...props
}) => {
  const slots = accordion({});

  return (
    <div
      className={cx(slots.content, className)}
      {...props}
    >
      {children}
    </div>
  );
};
