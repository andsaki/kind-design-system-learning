import type { SlotRecipeConfig } from "@pandacss/dev";
import { getWcagFocusVisibleStyle } from "../shared/wcag";

export const checkbox: SlotRecipeConfig = {
  className: "checkbox",
  description: "Checkbox component styles",
  slots: ["root", "control", "input", "label", "helper", "errorText"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "2",
    },
    control: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "5",
      height: "5",
    },
    input: {
      width: "5",
      height: "5",
      margin: 0,
      cursor: "pointer",
      accentColor: "blue.500",
      borderRadius: "sm",
      borderWidth: "thin",
      borderStyle: "solid",
      borderColor: "input.border",
      backgroundColor: "input.bg",
      transition: "outline-color 0.2s ease",
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
    errorText: {
      fontSize: "sm",
      color: "contents.error",
      lineHeight: "normal",
      mt: "1",
    },
  },
  variants: {
    wcagLevel: {
      A: {
        input: {
          _focusVisible: getWcagFocusVisibleStyle("A"),
        },
      },
      AA: {
        input: {
          _focusVisible: getWcagFocusVisibleStyle("AA"),
        },
      },
      AAA: {
        input: {
          _focusVisible: getWcagFocusVisibleStyle("AAA"),
        },
      },
    },
    state: {
      default: {},
      error: {
        input: { borderColor: "input.borderError" },
      },
    },
  },
  defaultVariants: {
    wcagLevel: "AA",
    state: "default",
  },
};
