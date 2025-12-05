import type { SlotRecipeConfig } from "@pandacss/dev";

export const carousel: SlotRecipeConfig = {
  className: "carousel",
  description: "アクセシブルなカルーセルコンポーネント",
  slots: [
    "root",
    "container",
    "slideTrack",
    "slide",
    "navButton",
    "controls",
    "indicators",
    "indicator",
    "liveRegion",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
    },
    container: {
      position: "relative",
      backgroundColor: "bg.primary",
      borderRadius: "md",
      borderWidth: "thin",
      borderStyle: "solid",
      borderColor: "border.default",
      overflow: "hidden",
      outline: "none",
      _focusVisible: {
        borderColor: "border.focus",
        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      },
    },
    slideTrack: {
      display: "flex",
      transition: "transform 0.5s ease-in-out",
      height: "100%",
    },
    slide: {
      minWidth: "100%",
      maxWidth: "100%",
      padding: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      boxSizing: "border-box",
      overflow: "hidden",
      "& img": {
        maxWidth: "100%",
        maxHeight: "100%",
        height: "auto",
        objectFit: "contain",
      },
      "& > *": {
        maxWidth: "100%",
      },
    },
    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "bg.primary",
      borderWidth: "thin",
      borderStyle: "solid",
      borderColor: "border.default",
      borderRadius: "full",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "xl",
      color: "contents.primary",
      opacity: 0.9,
      transition: "opacity 0.2s",
      _hover: {
        opacity: 1,
        backgroundColor: "bg.secondary",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "border.focus",
        outlineOffset: "2px",
      },
    },
    controls: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 3,
      flexWrap: "wrap",
    },
    indicators: {
      display: "flex",
      gap: 2,
      alignItems: "center",
    },
    indicator: {
      width: "12px",
      height: "12px",
      borderRadius: "full",
      borderWidth: "thin",
      borderStyle: "solid",
      borderColor: "border.default",
      cursor: "pointer",
      transition: "all 0.2s",
      _hover: {
        transform: "scale(1.2)",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "border.focus",
        outlineOffset: "2px",
      },
    },
    liveRegion: {
      padding: 3,
      backgroundColor: "bg.primary",
      borderRadius: "md",
      borderWidth: "thin",
      borderStyle: "solid",
      borderColor: "border.default",
      fontSize: "sm",
      color: "contents.secondary",
      textAlign: "center",
    },
  },
  variants: {
    size: {
      sm: {
        container: {
          minHeight: "200px",
        },
        slide: {
          padding: 4,
        },
      },
      md: {
        container: {
          minHeight: "300px",
        },
        slide: {
          padding: 6,
        },
      },
      lg: {
        container: {
          minHeight: "400px",
        },
        slide: {
          padding: 8,
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
};
