import React, { useId } from 'react';
import { select as selectRecipe } from '../../../styled-system/recipes';
import { css, cx } from '@/styled-system/css';
import type { WCAGLevel } from '../constants/accessibility';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** ラベルテキスト */
  label: string;
  /** エラーメッセージ */
  error?: string;
  /** ヘルプテキスト */
  helperText?: string;
  /** セレクトボックスのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** 必須項目かどうか */
  required?: boolean;
  /** 選択肢 */
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  /** プレースホルダー（空の選択肢） */
  placeholder?: string;
  /** WCAGアクセシビリティレベル (A/AA/AAA) @default 'AA' */
  wcagLevel?: WCAGLevel;
}

/**
 * アクセシブルなセレクトボックスコンポーネント
 *
 * 機能:
 * - ラベルとselectの関連付け（for/id）
 * - エラー状態の適切な伝達（aria-invalid, aria-describedby）
 * - 必須項目の明示（aria-required）
 * - フォーカス表示
 * - WCAG準拠のカラーコントラスト
 */
export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  size = 'md',
  required = false,
  disabled = false,
  options,
  placeholder,
  wcagLevel = 'AA',
  id,
  className,
  ...props
}) => {
  // ユニークなIDを自動生成（idが指定されていない場合）
  const autoId = useId();
  const selectId = id || autoId;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  // WCAGレベルに応じたフォーカススタイルを取得
  const describedBy = [error ? errorId : null, helperText ? helperId : null]
    .filter(Boolean)
    .join(' ') || undefined;

  const selectSlots = selectRecipe({
    size,
    state: error ? 'error' : 'default',
    wcagLevel,
    disabled,
  });

  return (
    <div className={cx(selectSlots.root, css({ mb: 4 }))}>
      {/* ラベル */}
      <label
        htmlFor={selectId}
        className={selectSlots.label}
      >
        {label}
        {required && (
          <span
            className={css({
              color: 'colors.red.600',
              ml: 1,
            })}
            aria-label="必須"
          >
            *
          </span>
        )}
      </label>

      {/* セレクトボックス */}
      <select
        id={selectId}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        aria-required={required}
        className={cx(selectSlots.trigger, className)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* エラーメッセージ */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className={selectSlots.error}
        >
          {error}
        </p>
      )}

      {/* ヘルプテキスト */}
      {helperText && !error && (
        <p
          id={helperId}
          className={selectSlots.helper}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
