import React from "react";
import { loading as loadingRecipe } from "../../../styled-system/recipes";
import { css, cx } from "@/styled-system/css";

export interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white";
  label?: string;
  fullscreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  color = "primary",
  label = "読み込み中",
  fullscreen = false,
}) => {
  const slots = loadingRecipe({ size, color });

  const spinner = (
    <div
      role="status"
      aria-label={label}
      aria-live="polite"
      className={slots.root}
    >
      <svg
        viewBox="0 0 24 24"
        className={slots.spinner}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="50 50"
          opacity="0.25"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
          strokeDashoffset="0"
        />
      </svg>
      {label && (
        <span
          className={cx(
            slots.label,
            color === "white" && css({ color: "white" })
          )}
        >
          {label}
        </span>
      )}
    </div>
  );

  const overlayClass = css({
    position: "fixed",
    inset: 0,
    bg: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  });

  if (fullscreen) {
    // 背景の操作を完全に塞ぐモーダルオーバーレイとして扱う
    return (
      <div className={cx(overlayClass, "loading__overlay")} aria-modal="true">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export const InlineLoading: React.FC<{
  size?: "sm" | "md";
  color?: "primary" | "secondary";
}> = ({ size = "sm", color = "primary" }) => {
  const slots = loadingRecipe({
    size: size === "sm" ? "inline-sm" : "inline-md",
    color,
  });

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={slots.spinner}
      role="status"
      aria-label="読み込み中"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="50 50"
        opacity="0.25"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
        strokeDashoffset="0"
      />
    </svg>
  );
};
