import type { RecipeConfig } from "@pandacss/dev";

const focusVars = {
  A: {
    "--focus-bg": "transparent",
    "--focus-text": "#000000",
    "--focus-outline": "#64b5f6", // blue.300
    "--focus-outline-width": "0.125rem",
    "--focus-outline-offset": "0",
  },
  AA: {
    "--focus-bg": "#e3f2fd", // blue.50
    "--focus-text": "#212121", // gray.900
    "--focus-outline": "#1976d2", // blue.700
    "--focus-outline-width": "0.1875rem",
    "--focus-outline-offset": "0.125rem",
  },
  AAA: {
    "--focus-bg": "#ffff00", // yellow
    "--focus-text": "#000000",
    "--focus-outline": "#000000", // black
    "--focus-outline-width": "0.25rem",
    "--focus-outline-offset": "0.125rem",
  },
} as const;

export const textarea: RecipeConfig = {
  className: "textarea",
  description: "Textarea component field styles",
  base: {
    width: "100%",
    minH: "120px",
    px: "3",
    py: "3",
    fontSize: "base",
    lineHeight: "normal",
    color: "contents.primary",
    backgroundColor: "input.bg",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "input.border",
    borderRadius: "md",
    outline: "none",
    resize: "vertical",
    transition: "border-color 0.2s, box-shadow 0.2s",
    cursor: "text",
    fontFamily: "inherit",
    _placeholder: {
      color: "input.placeholder",
      opacity: 1,
    },
    _disabled: {
      color: "contents.disabled",
      backgroundColor: "input.bgDisabled",
      borderColor: "input.bgDisabled",
      cursor: "not-allowed",
    },
  },
  variants: {
    state: {
      default: {},
      error: {
        borderColor: "input.borderError",
      },
    },
    wcagLevel: {
      A: focusVars.A,
      AA: focusVars.AA,
      AAA: focusVars.AAA,
    },
  },
  defaultVariants: {
    state: "default",
    wcagLevel: "AA",
  },
};
