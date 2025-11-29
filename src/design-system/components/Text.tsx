import React from "react";
import { text as textRecipe } from "../../../styled-system/recipes";
import { cx } from "@/styled-system/css";
import type { WCAGLevel } from "../constants/accessibility";

export interface TextProps {
  /** テキストのバリエーション */
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body-large"
    | "body"
    | "body-small"
    | "caption"
    | "overline";
  /** HTML要素のタグ */
  as?: keyof React.JSX.IntrinsicElements;
  /** テキストの色 */
  color?: string;
  /** テキストの配置 */
  align?: "left" | "center" | "right" | "justify";
  /** WCAGレベル */
  wcagLevel?: WCAGLevel;
  /** 太字にする */
  bold?: boolean;
  /** イタリック体にする */
  italic?: boolean;
  /** 下線を引く */
  underline?: boolean;
  /** 打ち消し線を引く */
  strikethrough?: boolean;
  /** テキストの内容 */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
  /** 追加のスタイル */
  style?: React.CSSProperties;
}

/**
 * アクセシブルなテキストコンポーネント
 *
 * 機能:
 * - セマンティックなHTML要素の選択
 * - タイポグラフィトークンの適用
 * - 柔軟なスタイリング
 * - アクセシブルな色のコントラスト
 */
export const Text: React.FC<TextProps> = ({
  variant = "body",
  as,
  color,
  align = "left",
  bold = false,
  italic = false,
  underline = false,
  strikethrough = false,
  children,
  className,
  style: externalStyle,
  wcagLevel = "AA",
}) => {
  // variantに応じたデフォルトのHTML要素を決定
  const defaultElement =
    variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : variant === "h4"
      ? "h4"
      : variant === "h5"
      ? "h5"
      : variant === "h6"
      ? "h6"
      : variant === "caption" || variant === "overline"
      ? "span"
      : "p";

  // 実際に使用するHTML要素
  const Component = (as || defaultElement) as React.ElementType;

  const recipeClassName = textRecipe({ variant, align, wcagLevel });

  // スタイルの構築
  const textDecorations = [
    underline ? "underline" : null,
    strikethrough ? "line-through" : null,
  ].filter(Boolean);

  const styles: React.CSSProperties = {
    margin: 0,
    color: color ?? "inherit",
    textAlign: align,
    fontWeight: bold ? "bold" : undefined,
    fontStyle: italic ? "italic" : undefined,
    textDecoration: textDecorations.length ? textDecorations.join(" ") : undefined,
    ...externalStyle,
  };

  return React.createElement(
    Component,
    {
      className: cx(recipeClassName, className),
      style: styles,
    },
    children
  );
};
