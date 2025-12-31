import type { RecipeConfig } from "@pandacss/dev";
import { getWcagFocusVisibleStyle, type WcagLevel } from "../shared/wcag";

const createFocusStyle = (level: WcagLevel) => ({
  _focusVisible: {
    ...getWcagFocusVisibleStyle(level),
    color: "gray.900",
  },
});

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
      A: createFocusStyle("A"),
      AA: createFocusStyle("AA"),
      AAA: createFocusStyle("AAA"),
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
    wcagLevel: "AA",
  },
};
