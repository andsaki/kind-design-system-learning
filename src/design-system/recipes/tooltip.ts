import { sva } from "@/styled-system/css";

export const tooltipRecipe = sva({
  className: "tooltip",
  slots: ["root", "content", "arrow"],
  base: {
    root: {
      position: "relative",
      display: "inline-block",
    },
    content: {
      position: "absolute",
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
        content: {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: 2,
        },
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
        content: {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: 2,
        },
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
        content: {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: 2,
        },
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
        content: {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: 2,
        },
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
});
