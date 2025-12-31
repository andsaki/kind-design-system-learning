import type { SlotRecipeConfig } from "@pandacss/dev";
import { getWcagFocusVisibleStyle } from "../shared/wcag";

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
          _focusVisible: getWcagFocusVisibleStyle("A"),
        },
      },
      AA: {
        control: {
          _focusVisible: getWcagFocusVisibleStyle("AA"),
        },
      },
      AAA: {
        control: {
          _focusVisible: getWcagFocusVisibleStyle("AAA"),
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
