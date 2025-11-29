import React, { useState, useEffect } from "react";
import { textarea as textareaRecipe } from "../../../styled-system/recipes";
import type { WCAGLevel } from "../constants/accessibility";
import { cx, css } from "@/styled-system/css";

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, ""> {
  /** ラベルテキスト */
  label: string;
  /** エラーメッセージ */
  error?: string;
  /** ヘルプテキスト */
  helpText?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** 文字数カウント表示 */
  showCount?: boolean;
  /** 最大文字数 */
  maxLength?: number;
  /** WCAGアクセシビリティレベル (A/AA/AAA) @default 'AA' */
  wcagLevel?: WCAGLevel;
}

/**
 * アクセシブルなテキストエリアコンポーネント
 *
 * 機能:
 * - キーボード操作対応
 * - スクリーンリーダー対応
 * - エラー表示とaria-invalid
 * - 文字数カウント表示
 * - フォーカス表示（キーボード操作時のみ）
 * - リサイズ可能
 */
export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helpText,
  required = false,
  showCount = false,
  maxLength,
  id,
  disabled = false,
  wcagLevel = "AA",
  value,
  defaultValue,
  onChange,
  className,
  style,
  ...props
}) => {
  const generatedId = React.useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;
  const helpId = `${textareaId}-help`;
  const countId = `${textareaId}-count`;

  // キーボードフォーカスの検出
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);

  // 文字数カウント用の内部状態
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsKeyboardFocus(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardFocus(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // 初期文字数の設定
  useEffect(() => {
    const initialValue = (value || defaultValue || "") as string;
    setCharCount(initialValue.length);
  }, [value, defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };

  const recipeClassName = textareaRecipe({
    state: error ? "error" : "default",
    wcagLevel,
  });

  return (
    <div
      className={css({
        width: "100%",
      })}
    >
      <label
        htmlFor={textareaId}
        className={css({
          display: "block",
          mb: 2,
          fontSize: "sm",
          fontWeight: "medium",
          color: disabled ? "contents.disabled" : "contents.primary",
        })}
      >
        {label}
        {required && (
          <span
            className={css({ color: "colors.red.600", ml: 1 })}
            aria-label="必須"
          >
            *
          </span>
        )}
      </label>

      <div className={css({ position: "relative" })}>
        <textarea
          id={textareaId}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
          aria-required={required ? true : undefined}
          aria-describedby={
            [
              error ? errorId : null,
              helpText ? helpId : null,
              showCount ? countId : null,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          {...props}
          className={cx(recipeClassName, className)}
          style={{
            resize: "vertical",
            ...style,
          }}
          onFocus={(e) => {
            if (isKeyboardFocus && !disabled) {
              e.currentTarget.setAttribute("data-focused", "true");
            }
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.removeAttribute("data-focused");
            props.onBlur?.(e);
          }}
          onMouseDown={() => {
            setIsKeyboardFocus(false);
          }}
        />
      </div>

      {showCount && maxLength && (
        <div
          id={countId}
          className={css({
            mt: 1,
            fontSize: "xs",
            color:
              showCount && maxLength && charCount > maxLength
                ? "colors.red.600"
                : "contents.secondary",
            textAlign: "right",
          })}
          aria-live="polite"
        >
          {charCount} / {maxLength}
        </div>
      )}

      {helpText && !error && (
        <p
          id={helpId}
          className={css({
            mt: 1,
            fontSize: "sm",
            color: "contents.secondary",
            lineHeight: "normal",
          })}
        >
          {helpText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className={css({
            mt: 1,
            fontSize: "sm",
            color: "colors.red.600",
            lineHeight: "normal",
          })}
        >
          {error}
        </p>
      )}
    </div>
  );
};
