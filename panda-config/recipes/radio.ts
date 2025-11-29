import type { SlotRecipeConfig } from "@pandacss/dev";

const focusStyles = {
  A: {
    outlineColor: "colors.blue.300",
    outlineWidth: "0.125rem",
    outlineOffset: "0",
    bg: "transparent",
  },
  AA: {
    outlineColor: "colors.blue.700",
    outlineWidth: "0.1875rem",
    outlineOffset: "0.125rem",
    bg: "colors.blue.50",
  },
  AAA: {
    outlineColor: "colors.black",
    outlineWidth: "0.25rem",
    outlineOffset: "0.125rem",
    bg: "colors.yellow",
  },
} as const;

export const radio: SlotRecipeConfig = {
  className: "radio",
  description: "Radio input styles",
  slots: ["root", "control", "label", "helper", "error"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "2",
    },
    control: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "5",
      height: "5",
      borderRadius: "full",
      borderWidth: "thin",
      borderColor: "border.default",
      backgroundColor: "bg.primary",
      cursor: "pointer",
      _focusVisible: {
        outlineStyle: "solid",
      },
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
    label: {
      fontSize: "base",
      fontWeight: "medium",
      color: "contents.primary",
      cursor: "pointer",
      userSelect: "none",
      selectors: {
        '&[data-disabled="true"]': {
          color: "contents.disabled",
          cursor: "not-allowed",
        },
      },
    },
    helper: {
      fontSize: "sm",
      color: "contents.secondary",
      lineHeight: "normal",
      mt: "1",
    },
    error: {
      fontSize: "sm",
      color: "contents.error",
      lineHeight: "normal",
      mt: "1",
    },
  },
  variants: {
    wcagLevel: {
      A: {
        control: {
          _focusVisible: {
            outlineColor: focusStyles.A.outlineColor,
            outlineWidth: focusStyles.A.outlineWidth,
            outlineOffset: focusStyles.A.outlineOffset,
            backgroundColor: focusStyles.A.bg,
          },
        },
      },
      AA: {
        control: {
          _focusVisible: {
            outlineColor: focusStyles.AA.outlineColor,
            outlineWidth: focusStyles.AA.outlineWidth,
            outlineOffset: focusStyles.AA.outlineOffset,
            backgroundColor: focusStyles.AA.bg,
          },
        },
      },
      AAA: {
        control: {
          _focusVisible: {
            outlineColor: focusStyles.AAA.outlineColor,
            outlineWidth: focusStyles.AAA.outlineWidth,
            outlineOffset: focusStyles.AAA.outlineOffset,
            backgroundColor: focusStyles.AAA.bg,
          },
        },
      },
    },
    state: {
      default: {},
      error: {
        control: { borderColor: "border.error" },
      },
    },
  },
  defaultVariants: {
    wcagLevel: "AA",
    state: "default",
  },
};
