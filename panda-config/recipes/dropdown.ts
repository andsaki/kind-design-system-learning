import type { SlotRecipeConfig } from "@pandacss/dev";

const triggerFocusStyles = {
  A: {
    backgroundColor: "transparent",
    outlineColor: "blue.300",
    outlineWidth: "0.125rem",
    outlineOffset: "0",
  },
  AA: {
    backgroundColor: "blue.50",
    outlineColor: "blue.700",
    outlineWidth: "0.1875rem",
    outlineOffset: "0.125rem",
  },
  AAA: {
    backgroundColor: "yellow",
    outlineColor: "black",
    outlineWidth: "0.25rem",
    outlineOffset: "0.125rem",
  },
} as const;

const optionFocusStyles = {
  A: {
    backgroundColor: "blue.50",
    outlineColor: "blue.300",
    outlineWidth: "0.125rem",
    outlineOffset: "0",
  },
  AA: {
    backgroundColor: "blue.100",
    outlineColor: "blue.700",
    outlineWidth: "0.1875rem",
    outlineOffset: "0.125rem",
  },
  AAA: {
    backgroundColor: "yellow",
    outlineColor: "black",
    outlineWidth: "0.25rem",
    outlineOffset: "0.125rem",
  },
} as const;

export const dropdown: SlotRecipeConfig = {
  className: "dropdown",
  description: "Custom select style dropdown",
  slots: [
    "root",
    "label",
    "requiredMark",
    "triggerWrapper",
    "trigger",
    "arrow",
    "menu",
    "option",
    "helper",
    "error",
    "checkmark",
  ],
  base: {
    root: {
      width: "100%",
      mb: 4,
    },
    label: {
      display: "block",
      mb: 2,
      fontSize: "sm",
      fontWeight: "medium",
      color: "contents.primary",
    },
    requiredMark: {
      color: "contents.error",
      ml: 1,
    },
    triggerWrapper: {
      position: "relative",
    },
    trigger: {
      width: "100%",
      textAlign: "left",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "border.default",
      borderRadius: "md",
      backgroundColor: "bg.secondary",
      color: "contents.primary",
      px: 4,
      py: 3,
      pr: 10,
      fontSize: "base",
      transition: "background-color 0.2s, border-color 0.2s, color 0.2s",
      cursor: "pointer",
      _hover: {
        backgroundColor: "bg.hover",
      },
      _disabled: {
        cursor: "not-allowed",
        backgroundColor: "bg.disabled",
        color: "contents.disabled",
      },
      _focusVisible: {
        outlineStyle: "solid",
        outlineWidth: "0.1875rem",
        outlineColor: "blue.500",
        outlineOffset: "0.125rem",
      },
    },
    arrow: {
      position: "absolute",
      right: "3",
      top: "50%",
      transform: "translateY(-50%)",
      transition: "transform 0.2s",
      pointerEvents: "none",
      color: "inherit",
    },
    menu: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      mt: 1,
      listStyle: "none",
      p: 1,
      bg: "bg.secondary",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "border.default",
      borderRadius: "md",
      boxShadow: "lg",
      maxH: "15rem",
      overflowY: "auto",
      zIndex: 9999,
    },
    option: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: 3,
      py: 2,
      fontSize: "base",
      color: "contents.primary",
      borderRadius: "sm",
      cursor: "pointer",
      transition: "background-color 0.15s, color 0.15s",
      _hover: {
        backgroundColor: "bg.hover",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "border.focus",
        outlineOffset: "2px",
      },
    },
    helper: {
      mt: 1,
      fontSize: "sm",
      color: "contents.secondary",
    },
    error: {
      mt: 1,
      fontSize: "sm",
      color: "contents.error",
    },
    checkmark: {
      ml: 2,
      color: "blue.600",
    },
  },
  variants: {
    state: {
      default: {},
      error: {
        trigger: { borderColor: "border.error" },
      },
    },
    placeholder: {
      empty: { trigger: { color: "contents.secondary" } },
      filled: {},
    },
    wcagLevel: {
      A: {
        trigger: {
          _focusVisible: {
            outlineStyle: "solid",
            ...triggerFocusStyles.A,
          },
        },
        option: {
          _focusVisible: {
            outlineStyle: "solid",
            ...optionFocusStyles.A,
          },
        },
      },
      AA: {
        trigger: {
          _focusVisible: {
            outlineStyle: "solid",
            ...triggerFocusStyles.AA,
          },
        },
        option: {
          _focusVisible: {
            outlineStyle: "solid",
            ...optionFocusStyles.AA,
          },
        },
      },
      AAA: {
        trigger: {
          _focusVisible: {
            outlineStyle: "solid",
            ...triggerFocusStyles.AAA,
          },
        },
        option: {
          _focusVisible: {
            outlineStyle: "solid",
            ...optionFocusStyles.AAA,
          },
        },
      },
    },
  },
  defaultVariants: {
    state: "default",
    placeholder: "empty",
    wcagLevel: "AA",
  },
};
