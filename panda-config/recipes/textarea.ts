import type { RecipeConfig } from "@pandacss/dev";
import { CSS_VARS } from "./constants";

const focusVars = {
  A: {
    [CSS_VARS.FOCUS.BG]: "transparent",
    [CSS_VARS.FOCUS.TEXT]: "{colors.gray.900}",
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.blue.300}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.thin}",
    [CSS_VARS.FOCUS.OUTLINE_OFFSET]: "0",
  },
  AA: {
    [CSS_VARS.FOCUS.BG]: "{colors.blue.50}",
    [CSS_VARS.FOCUS.TEXT]: "{colors.gray.900}",
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.blue.700}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.base}",
    [CSS_VARS.FOCUS.OUTLINE_OFFSET]: "{spacing.0.5}",
  },
  AAA: {
    [CSS_VARS.FOCUS.BG]: "{colors.yellow.400}",
    [CSS_VARS.FOCUS.TEXT]: "{colors.gray.900}",
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.gray.900}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.thick}",
    [CSS_VARS.FOCUS.OUTLINE_OFFSET]: "{spacing.0.5}",
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
