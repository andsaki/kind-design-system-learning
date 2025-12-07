import type { RecipeConfig } from "@pandacss/dev";
import { getWcagFocusVisibleStyle, type WcagLevel } from "../shared/wcag";

const createFocusStyle = (level: WcagLevel) => ({
  _focusVisible: {
    ...getWcagFocusVisibleStyle(level),
    color: "gray.900",
  },
});

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
      AA: createFocusStyle("AA"),
      AAA: createFocusStyle("AAA"),
    },
  },
  defaultVariants: {
    state: "default",
    wcagLevel: "AA",
  },
};
