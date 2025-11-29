import type { SlotRecipeConfig } from "@pandacss/dev";

const focusStyles = {
  A: {
    "&[data-focused='true']": {
      backgroundColor: "transparent",
      color: "black",
      outline: "0.125rem solid #64b5f6",
      outlineOffset: "0",
    },
  },
  AA: {
    "&[data-focused='true']": {
      backgroundColor: "blue.50",
      color: "gray.900",
      outline: "0.1875rem solid blue.700",
      outlineOffset: "0.125rem",
    },
  },
  AAA: {
    "&[data-focused='true']": {
      backgroundColor: "yellow",
      color: "black",
      outline: "0.25rem solid black",
      outlineOffset: "0.125rem",
    },
  },
} as const;

export const accordion: SlotRecipeConfig = {
  className: "accordion",
  description: "Accordion component styles",
  slots: ["root", "summary", "content", "icon"],
  base: {
    root: {
      borderWidth: "thin",
      borderStyle: "solid",
      borderColor: "accordion.border",
      borderRadius: "md",
      backgroundColor: "accordion.bg",
      overflow: "hidden",
    },
    summary: {
      display: "flex",
      alignItems: "center",
      gap: "3",
      px: "4",
      py: "3",
      cursor: "pointer",
      listStyle: "none",
      backgroundColor: "accordion.bg",
      color: "accordion.text",
      fontFamily: "sans",
      fontSize: "base",
      fontWeight: "semibold",
      lineHeight: "normal",
      transition: "background-color 0.2s ease, color 0.2s ease",
      outline: "none",
      _hover: {
        backgroundColor: "accordion.bgHover",
      },
    },
    content: {
      px: "4",
      py: "4",
      backgroundColor: "accordion.bg",
      color: "accordion.text",
      fontSize: "base",
      lineHeight: "relaxed",
      borderTopWidth: "thin",
      borderTopStyle: "solid",
      borderTopColor: "accordion.border",
    },
    icon: {
      width: "6",
      height: "6",
      flexShrink: 0,
      color: "accordion.icon",
      transition: "transform 0.3s ease",
    },
  },
  variants: {
    wcagLevel: {
      A: {
        summary: focusStyles.A,
      },
      AA: {
        summary: focusStyles.AA,
      },
      AAA: {
        summary: focusStyles.AAA,
      },
    },
  },
  defaultVariants: {
    wcagLevel: "AA",
  },
};
