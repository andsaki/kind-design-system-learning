import type { SlotRecipeConfig } from "@pandacss/dev";

const colorMap = {
  primary: "blue.500",
  secondary: "gray.600",
  white: "white",
} as const;

export const loading: SlotRecipeConfig = {
  className: "loading",
  description: "Loading spinner styles",
  slots: ["root", "label", "spinner"],
  base: {
    root: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2",
    },
    label: {
      fontWeight: "medium",
      fontSize: "sm",
      color: "contents.primary",
    },
    spinner: {
      animation: "spin 1s linear infinite",
    },
  },
  variants: {
    size: {
      sm: { spinner: { width: "sizes.spinnerSm", height: "sizes.spinnerSm" } },
      md: { spinner: { width: "sizes.spinnerMd", height: "sizes.spinnerMd" } },
      lg: { spinner: { width: "sizes.spinnerLg", height: "sizes.spinnerLg" } },
      xl: { spinner: { width: "sizes.spinnerXl", height: "sizes.spinnerXl" } },
      "inline-sm": {
        spinner: {
          width: "1em",
          height: "1em",
          display: "inline-block",
          verticalAlign: "middle",
        },
      },
      "inline-md": {
        spinner: {
          width: "1.25em",
          height: "1.25em",
          display: "inline-block",
          verticalAlign: "middle",
        },
      },
    },
    color: {
      primary: { spinner: { color: colorMap.primary } },
      secondary: { spinner: { color: colorMap.secondary } },
      white: { spinner: { color: colorMap.white } },
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
};
