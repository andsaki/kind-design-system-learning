import type { SlotRecipeConfig } from "@pandacss/dev";
import { getWcagFocusVisibleStyle, type WcagLevel } from "../shared/wcag";

const createTriggerFocusStyle = (level: WcagLevel) => ({
  trigger: {
    _focusVisible: getWcagFocusVisibleStyle(level),
  },
});

const createOptionFocusStyle = (level: WcagLevel) => ({
  option: {
    _focusVisible: getWcagFocusVisibleStyle(level),
  },
});

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
        ...createTriggerFocusStyle("A"),
        ...createOptionFocusStyle("A"),
      },
      AA: {
        ...createTriggerFocusStyle("AA"),
        ...createOptionFocusStyle("AA"),
      },
      AAA: {
        ...createTriggerFocusStyle("AAA"),
        ...createOptionFocusStyle("AAA"),
      },
    },
  },
  defaultVariants: {
    state: "default",
    placeholder: "empty",
    wcagLevel: "AA",
  },
};
