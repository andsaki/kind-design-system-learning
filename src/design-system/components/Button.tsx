import React from "react";
import { button } from "../../../styled-system/recipes";
import { cx } from "@/styled-system/css";
import type { WCAGLevel } from "../constants/accessibility";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタンのバリエーション */
  variant?: "primary" | "secondary" | "outline" | "danger";
  /** ボタンのサイズ */
  size?: "sm" | "md" | "lg";
  /** ローディング状態 */
  isLoading?: boolean;
  /** テキストの前に表示するアイコン */
  icon?: React.ReactNode;
  /** WCAGアクセシビリティレベル (A/AA/AAA) @default 'AA' */
  wcagLevel?: WCAGLevel;
}

/**
 * アクセシブルなボタンコンポーネント
 *
 * 機能:
 * - キーボード操作対応（Enter、Space）
 * - スクリーンリーダー対応
 * - フォーカス表示
 * - ARIA属性サポート
 * - aria-busyによるローディング状態
 * - Panda CSSレシピによる型安全なスタイリング
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  disabled,
  type = "button",
  wcagLevel = "AA",
  className,
  ...props
}) => {
  const recipeClassName = button({ variant, size, wcagLevel });

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      className={cx(recipeClassName, className)}
      {...props}
    >
      {/* ローディング状態の表示 */}
      {isLoading && (
        <span role="status" aria-label="読み込み中">
          ⏳
        </span>
      )}
      {/* アイコンの表示（装飾的なのでaria-hidden） */}
      {!isLoading && icon && (
        <span
          aria-hidden="true"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};
