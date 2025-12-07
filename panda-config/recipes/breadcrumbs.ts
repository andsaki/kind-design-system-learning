import type { SlotRecipeConfig } from "@pandacss/dev";
import { getWcagFocusVisibleStyle } from "../shared/wcag";

export const breadcrumbs: SlotRecipeConfig = {
  className: "breadcrumbs",
  description: "Breadcrumb navigation styles",
  slots: ["root", "list", "item", "link", "separator", "icon"],
  base: {
    root: {
      display: "block",
      width: "fit-content",
    },
    list: {
      display: "inline",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    item: {
      display: "inline",
      fontSize: "base",
      lineHeight: "normal",
    },
    link: {
      textDecoration: "underline",
      textUnderlineOffset: "0.1875rem",
      transitionProperty: "color, text-decoration-thickness, background-color, outline-color",
      transitionDuration: "normal",
      outline: "none",
    },
    separator: {
      display: "inline-flex",
      alignItems: "center",
      mx: "1",
      color: "gray.400",
    },
    icon: {
      width: "3",
      height: "3",
      color: "currentColor",
    },
  },
  variants: {
    wcagLevel: {
      AA: {
        item: {
          color: "contents.secondary",
          "&[data-current='true']": {
            color: "contents.primary",
            fontWeight: "semibold",
          },
        },
        link: {
          color: "contents.link",
          _hover: {
            color: "blue.700",
            textDecorationThickness: "0.125rem",
          },
          _focusVisible: {
            ...getWcagFocusVisibleStyle("AA"),
            borderRadius: "0.25rem",
          },
        },
        separator: {
          color: "contents.tertiary",
        },
      },
      AAA: {
        item: {
          color: "contents.primary",
          "&[data-current='true']": {
            color: "contents.primary",
            fontWeight: "bold",
          },
        },
        link: {
          color: "blue.800",
          _hover: {
            color: "blue.900",
            textDecorationThickness: "0.125rem",
          },
          _focusVisible: {
            ...getWcagFocusVisibleStyle("AAA"),
            borderRadius: "0.25rem",
          },
        },
        separator: {
          color: "contents.secondary",
        },
      },
    },
  },
  defaultVariants: {
    wcagLevel: "AA",
  },
};
