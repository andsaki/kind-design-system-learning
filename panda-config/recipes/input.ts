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
