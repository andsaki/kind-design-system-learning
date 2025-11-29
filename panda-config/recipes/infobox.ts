import type { SlotRecipeConfig } from "@pandacss/dev";

export const infoBox: SlotRecipeConfig = {
  className: "info-box",
  description: "Informational alert box",
  slots: ["root", "title", "icon", "content"],
  base: {
    root: {
      p: 4,
      rounded: "base",
      borderWidth: "thin",
      borderStyle: "solid",
    },
    title: {
      fontWeight: "semibold",
      mb: 2,
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    icon: {
      display: "inline-flex",
    },
    content: {
      lineHeight: "1.6",
      color: "inherit",
    },
  },
  variants: {
    variant: {
      info: {
        root: {
          bg: "bg.secondary",
          borderColor: "border.default",
          color: "contents.link",
        },
      },
      warning: {
        root: {
          bg: "bg.secondary",
          borderColor: "border.warning",
          color: "contents.warning",
        },
      },
      success: {
        root: {
          bg: "bg.secondary",
          borderColor: "border.success",
          color: "contents.success",
        },
      },
      tip: {
        root: {
          bg: "bg.secondary",
          borderColor: "border.default",
          color: "contents.primary",
        },
      },
    },
    wcagLevel: {
      A: { root: {} },
      AA: { root: {} },
      AAA: { root: {} },
    },
    leftBorder: {
      true: {
        root: {
          borderLeftWidth: "base",
        },
      },
    },
  },
  defaultVariants: {
    variant: "info",
    wcagLevel: "AA",
  },
};
