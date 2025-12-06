import type { RecipeConfig } from "@pandacss/dev";

const focusStyles = {
  AA: {
    _focusVisible: {
      outlineColor: "blue.700",
      outlineWidth: "base",
      outlineOffset: "0.5",
      outlineStyle: "solid",
    },
  },
  AAA: {
    _focusVisible: {
      outlineColor: "gray.900",
      outlineWidth: "thick",
      outlineOffset: "0.5",
      outlineStyle: "solid",
    },
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
      AA: focusStyles.AA,
      AAA: focusStyles.AAA,
    },
  },
  defaultVariants: {
    size: "md",
    wcagLevel: "AA",
  },
};
