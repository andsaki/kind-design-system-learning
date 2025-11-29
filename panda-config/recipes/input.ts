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

export const input: RecipeConfig = {
  className: "input",
  description: "Input component field styles",
  base: {
    width: "100%",
    fontFamily: "inherit",
    borderRadius: "md",
    borderWidth: "base",
    borderStyle: "solid",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "input.bg",
    color: "input.text",
    borderColor: "input.border",
    cursor: "text",
    _placeholder: {
      color: "input.placeholder",
      opacity: 1,
    },
    _disabled: {
      backgroundColor: "input.bgDisabled",
      color: "input.textDisabled",
      cursor: "not-allowed",
    },
  },
  variants: {
    size: {
      sm: {
        px: "3",
        py: "2",
        fontSize: "sm",
      },
      md: {
        px: "4",
        py: "3",
        fontSize: "base",
      },
      lg: {
        px: "5",
        py: "4",
        fontSize: "lg",
      },
    },
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
    size: "md",
    state: "default",
    wcagLevel: "AA",
  },
};
