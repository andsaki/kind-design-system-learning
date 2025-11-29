import type { SlotRecipeConfig } from "@pandacss/dev";

export const select: SlotRecipeConfig = {
  className: "select",
  description: "Accessible select styles",
  slots: ["root", "label", "trigger", "helper", "error"],
  base: {
    root: {
      width: "100%",
    },
    label: {
      display: "block",
      mb: 2,
      fontSize: "sm",
      fontWeight: "medium",
      color: "contents.primary",
    },
    trigger: {
      width: "100%",
      fontFamily: "inherit",
      borderRadius: "md",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "border.default",
      backgroundColor: "bg.primary",
      color: "contents.primary",
      transition: "border-color 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      appearance: "none",
      bgImage:
        "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23212529' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
      bgRepeat: "no-repeat",
      bgPosition: "right 0.75rem center",
      bgSize: "1.25rem",
      pr: 8,
      _focusVisible: {
        outline: "3px solid",
        outlineColor: "border.focus",
        outlineOffset: 2,
        backgroundColor: "bg.secondary",
      },
      _disabled: {
        cursor: "not-allowed",
        backgroundColor: "bg.disabled",
        color: "contents.disabled",
      },
    },
    helper: {
      fontSize: "sm",
      color: "contents.secondary",
      mt: 1,
    },
    error: {
      fontSize: "sm",
      color: "contents.error",
      mt: 1,
    },
  },
  variants: {
    size: {
      sm: {
        trigger: {
          px: 3,
          py: 2,
          fontSize: "sm",
        },
      },
      md: {
        trigger: {
          px: 4,
          py: 3,
          fontSize: "base",
        },
      },
      lg: {
        trigger: {
          px: 4,
          py: 4,
          fontSize: "lg",
        },
      },
    },
    state: {
      default: {},
      error: {
        trigger: { borderColor: "border.error" },
      },
    },
    wcagLevel: {
      A: {
        trigger: {
          _focusVisible: {
            outlineWidth: "0.125rem",
            outlineColor: "colors.blue.300",
            outlineOffset: "0",
          },
        },
      },
      AA: {
        trigger: {
          _focusVisible: {
            outlineWidth: "0.1875rem",
            outlineColor: "colors.blue.700",
            outlineOffset: "0.125rem",
            backgroundColor: "colors.blue.50",
          },
        },
      },
      AAA: {
        trigger: {
          _focusVisible: {
            outlineWidth: "0.25rem",
            outlineColor: "colors.black",
            outlineOffset: "0.125rem",
            backgroundColor: "colors.yellow",
          },
        },
      },
    },
    disabled: {
      true: {
        trigger: {
          cursor: "not-allowed",
          color: "contents.disabled",
          bg: "bg.disabled",
          borderColor: "border.subtle",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
    wcagLevel: "AA",
  },
};
