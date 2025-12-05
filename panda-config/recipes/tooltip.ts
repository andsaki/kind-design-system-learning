import type { SlotRecipeConfig } from "@pandacss/dev";

export const tooltip: SlotRecipeConfig = {
  className: "tooltip",
  description: "Tooltip component",
  slots: ["root", "content", "arrow"],
  base: {
    root: {
      position: "relative",
      display: "inline-block",
    },
    content: {
      position: "fixed",
      backgroundColor: "gray.900",
      color: "white",
      paddingY: 2,
      paddingX: 3,
      borderRadius: "sm",
      fontSize: "sm",
      whiteSpace: "nowrap",
      zIndex: 1000,
      pointerEvents: "auto",
      boxShadow: "md",
    },
    arrow: {
      position: "absolute",
      width: 0,
      height: 0,
    },
  },
  variants: {
    position: {
      top: {
        arrow: {
          bottom: "-6px",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "6px solid",
          borderTopColor: "gray.900",
        },
      },
      bottom: {
        arrow: {
          top: "-6px",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderBottom: "6px solid",
          borderBottomColor: "gray.900",
        },
      },
      left: {
        arrow: {
          right: "-6px",
          top: "50%",
          transform: "translateY(-50%)",
          borderTop: "6px solid transparent",
          borderBottom: "6px solid transparent",
          borderLeft: "6px solid",
          borderLeftColor: "gray.900",
        },
      },
      right: {
        arrow: {
          left: "-6px",
          top: "50%",
          transform: "translateY(-50%)",
          borderTop: "6px solid transparent",
          borderBottom: "6px solid transparent",
          borderRight: "6px solid",
          borderRightColor: "gray.900",
        },
      },
    },
  },
  defaultVariants: {
    position: "top",
  },
};
