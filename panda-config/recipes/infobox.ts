import type { SlotRecipeConfig } from "@pandacss/dev";
import { wcagSurfaceBorders } from "../shared/wcag";

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
          color: "contents.link",
        },
      },
      warning: {
        root: {
          color: "contents.warning",
        },
      },
      success: {
        root: {
          color: "contents.success",
        },
      },
      tip: {
        root: {
          color: "contents.primary",
        },
      },
    },
    wcagLevel: {
      A: {
        root: {
          backgroundColor: wcagSurfaceBorders.A.backgroundColor,
          borderColor: wcagSurfaceBorders.A.borderColor,
        },
      },
      AA: {
        root: {
          backgroundColor: wcagSurfaceBorders.AA.backgroundColor,
          borderColor: wcagSurfaceBorders.AA.borderColor,
        },
      },
      AAA: {
        root: {
          backgroundColor: wcagSurfaceBorders.AAA.backgroundColor,
          borderColor: wcagSurfaceBorders.AAA.borderColor,
        },
      },
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
