import type { SlotRecipeConfig } from "@pandacss/dev";
import { getWcagFocusVisibleStyle, type WcagLevel } from "../shared/wcag";

const createSummaryFocus = (level: WcagLevel) => ({
  "&[data-focused='true']": {
    ...getWcagFocusVisibleStyle(level),
    color: level === "AAA" ? "black" : "gray.900",
  },
});

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
      AA: {
        summary: createSummaryFocus("AA"),
      },
      AAA: {
        summary: createSummaryFocus("AAA"),
      },
    },
  },
  defaultVariants: {
    wcagLevel: "AA",
  },
};
