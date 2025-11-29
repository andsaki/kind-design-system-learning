import type { SlotRecipeConfig } from "@pandacss/dev";

export const modal: SlotRecipeConfig = {
  className: "modal",
  description: "Accessible modal dialog",
  slots: ["overlay", "dialog", "header", "title", "body", "footer", "closeButton"],
  base: {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      px: 4,
      py: 8,
    },
    dialog: {
      width: "100%",
      maxHeight: "90vh",
      backgroundColor: "bg.primary",
      borderRadius: "lg",
      boxShadow:
        "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      px: 6,
      py: 6,
      borderBottomWidth: "thin",
      borderBottomColor: "border.default",
      display: "flex",
      alignItems: "center",
      gap: 4,
    },
    title: {
      m: 0,
      fontSize: "xl",
      fontWeight: "semibold",
      color: "contents.primary",
    },
    body: {
      px: 6,
      py: 4,
      color: "contents.primary",
      overflowY: "auto",
      lineHeight: "relaxed",
    },
    footer: {
      px: 6,
      py: 4,
      borderTopWidth: "thin",
      borderTopColor: "border.default",
      display: "flex",
      gap: 3,
      justifyContent: "flex-end",
    },
    closeButton: {
      marginLeft: "auto",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "lg",
      lineHeight: 1,
      color: "contents.primary",
    },
  },
  variants: {
    size: {
      sm: {
        dialog: {
          maxWidth: "400px",
          minHeight: "200px",
        },
      },
      md: {
        dialog: {
          maxWidth: "600px",
          minHeight: "300px",
        },
      },
      lg: {
        dialog: {
          maxWidth: "800px",
          minHeight: "400px",
        },
      },
    },
    wcagLevel: {
      A: {
        dialog: {
          borderWidth: "thin",
          borderColor: "border.subtle",
        },
        header: {
          color: "contents.primary",
        },
        body: {
          color: "contents.primary",
        },
      },
      AA: {
        dialog: {
          borderWidth: "base",
          borderColor: "border.default",
        },
        header: {
          color: "contents.primary",
        },
        body: {
          color: "contents.primary",
        },
      },
      AAA: {
        dialog: {
          borderWidth: "thick",
          borderColor: "border.strong",
          bg: "bg.primary",
        },
        header: {
          color: "contents.primary",
        },
        body: {
          color: "contents.primary",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    wcagLevel: "AA",
  },
};
