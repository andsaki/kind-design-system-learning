import type { RecipeConfig } from "@pandacss/dev";
import { CSS_VARS } from "./constants";

const focusVars = {
  A: {
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.blue.300}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.thin}",
    [CSS_VARS.FOCUS.OUTLINE_OFFSET]: "0",
  },
  AA: {
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.blue.700}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.base}",
    [CSS_VARS.FOCUS.OUTLINE_OFFSET]: "{spacing.0.5}",
  },
  AAA: {
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.gray.900}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.thick}",
    [CSS_VARS.FOCUS.OUTLINE_OFFSET]: "{spacing.0.5}",
  },
} as const;

export const colorpicker: RecipeConfig = {
  className: "colorpicker",
  description: "ColorPicker component styles",
  base: {
    appearance: "none",
    width: "100%",
    height: "48px",
    borderRadius: "md",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "border.default",
    backgroundColor: "bg.primary",
    padding: 0,
    cursor: "pointer",
    transition: "outline-color 0.2s ease",
    outline: "2px solid transparent",
    _focusVisible: {
      outlineColor: `var(${CSS_VARS.FOCUS.OUTLINE})`,
      outlineWidth: `var(${CSS_VARS.FOCUS.OUTLINE_WIDTH})`,
      outlineOffset: `var(${CSS_VARS.FOCUS.OUTLINE_OFFSET})`,
      outlineStyle: "solid",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
    },
    "&::-webkit-color-swatch-wrapper": {
      padding: 0,
      borderRadius: "md",
    },
    "&::-webkit-color-swatch": {
      border: "none",
      borderRadius: "md",
    },
    "&::-moz-color-swatch": {
      border: "none",
      borderRadius: "md",
    },
  },
  variants: {
    size: {
      sm: {
        height: "32px",
      },
      md: {
        height: "48px",
      },
      lg: {
        height: "64px",
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
    wcagLevel: "AA",
  },
};
