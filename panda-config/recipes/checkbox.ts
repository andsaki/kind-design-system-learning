import type { SlotRecipeConfig } from "@pandacss/dev";

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
          _focusVisible: {
            outlineColor: "#64b5f6",
            outlineWidth: "0.125rem",
            outlineOffset: "0",
          },
        },
      },
      AA: {
        input: {
          _focusVisible: {
            outlineColor: "#1976d2",
            outlineWidth: "0.1875rem",
            outlineOffset: "0.125rem",
          },
        },
      },
      AAA: {
        input: {
          _focusVisible: {
            outlineColor: "#000000",
            outlineWidth: "0.25rem",
            outlineOffset: "0.125rem",
          },
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
