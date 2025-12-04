import type { RecipeConfig } from "@pandacss/dev";

const focusStyles = {
  A: {
    _focusVisible: {
      backgroundColor: "transparent",
      color: "gray.900",
      outlineColor: "blue.300",
      outlineWidth: "thin",
      outlineOffset: "0",
    },
  },
  AA: {
    _focusVisible: {
      backgroundColor: "blue.50",
      color: "gray.900",
      outlineColor: "blue.700",
      outlineWidth: "base",
      outlineOffset: "0.5",
    },
  },
  AAA: {
    _focusVisible: {
      backgroundColor: "yellow.400",
      color: "gray.900",
      outlineColor: "gray.900",
      outlineWidth: "thick",
      outlineOffset: "0.5",
    },
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
      A: focusStyles.A,
      AA: focusStyles.AA,
      AAA: focusStyles.AAA,
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
    wcagLevel: "AA",
  },
};
