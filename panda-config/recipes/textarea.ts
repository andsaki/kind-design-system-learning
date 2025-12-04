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
      A: focusStyles.A,
      AA: focusStyles.AA,
      AAA: focusStyles.AAA,
    },
  },
  defaultVariants: {
    state: "default",
    wcagLevel: "AA",
  },
};
