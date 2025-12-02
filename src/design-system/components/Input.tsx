import React, { useId } from "react";
import { input as inputRecipe } from "../../../styled-system/recipes";
import type { WCAGLevel } from "../constants/accessibility";
import { cx, css } from "@/styled-system/css";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** ラベルテキスト */
  label: string;
  /** エラーメッセージ */
  error?: string;
  /** ヘルプテキスト */
  helperText?: string;
  /** 入力欄のサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** 必須項目かどうか */
  required?: boolean;
  /** WCAGアクセシビリティレベル (A/AA/AAA) @default 'AA' */
  wcagLevel?: WCAGLevel;
  /** クリアボタンを表示するかどうか */
  clearable?: boolean;
  /** クリアボタンがクリックされた時のコールバック */
  onClear?: () => void;
}

/**
 * アクセシブルな入力コンポーネント
 *
 * 機能:
 * - ラベルとinputの関連付け（for/id）
 * - エラー状態の適切な伝達（aria-invalid, aria-describedby）
 * - 必須項目の明示（aria-required）
 * - フォーカス表示
 * - WCAG AA準拠のカラーコントラスト
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  size = 'md',
  required = false,
  disabled = false,
  wcagLevel = 'AA',
  clearable = false,
  onClear,
  value,
  id,
  className,
  style,
  ...props
}) => {
  // ユニークなIDを自動生成（idが指定されていない場合）
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  // aria-describedbyの値を構築
  const getAriaDescribedBy = () => {
    const ids: string[] = [];
    if (error) ids.push(errorId);
    if (helperText && !error) ids.push(helperId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  const recipeClassName = inputRecipe({
    size,
    state: error ? 'error' : 'default',
    wcagLevel,
  });

  return (
    <div
      className={css({
        mb: 4,
      })}
    >
      {/* ラベル: for属性でinputと関連付け */}
      <label
        htmlFor={inputId}
        className={css({
          display: 'block',
          mb: 2,
          fontSize: 'sm',
          fontWeight: 'medium',
          color: 'contents.primary',
        })}
      >
        {label}
        {/* 必須項目の表示 */}
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

      {/* 入力フィールドのラッパー（クリアボタン用） */}
      <div className={css({ position: 'relative' })}>
        <input
          id={inputId}
          value={value}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={getAriaDescribedBy()}
          className={cx(
            recipeClassName,
            className,
            clearable && value ? css({ paddingRight: '40px' }) : undefined
          )}
          style={style}
          {...props}
        />

        {/* クリアボタン */}
        {clearable && value && onClear && (
          <button
            type="button"
            onClick={onClear}
            disabled={disabled}
            aria-label="入力をクリア"
            className={css({
              position: 'absolute',
              right: 2,
              top: '50%',
              transform: 'translateY(-50%)',
              padding: 2,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'contents.secondary',
              fontSize: 'lg',
              lineHeight: 1,
              borderRadius: 'sm',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              _hover: {
                backgroundColor: 'bg.tertiary',
                color: 'contents.primary',
              },
              _focus: {
                outline: '2px solid',
                outlineColor: 'border.focus',
              },
              _disabled: {
                cursor: 'not-allowed',
                opacity: 0.5,
              },
            })}
          >
            ✕
          </button>
        )}
      </div>

      {/* エラーメッセージ: role="alert"で即座に読み上げ */}
      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className={css({
            mt: 2,
            fontSize: 'sm',
            color: 'colors.red.700',
            lineHeight: 'normal',
          })}
        >
          {error}
        </div>
      )}

      {/* ヘルプテキスト: エラーがない場合のみ表示 */}
      {helperText && !error && (
        <div
          id={helperId}
          className={css({
            mt: 2,
            fontSize: 'sm',
            color: 'contents.secondary',
            lineHeight: 'normal',
          })}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};
