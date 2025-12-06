import type { SlotRecipeConfig } from "@pandacss/dev";

const wcagTableColors = {
  AA: {
    headerBg: "table.aa.headerBg",
    headerText: "table.aa.headerText",
    bodyText: "table.aa.bodyText",
    borderColor: "table.aa.borderColor",
    hoverBg: "table.aa.hoverBg",
    stripeOdd: "table.aa.stripeOdd",
    stripeEven: "table.aa.stripeEven",
    caption: "table.aa.caption",
  },
  AAA: {
    headerBg: "table.aaa.headerBg",
    headerText: "table.aaa.headerText",
    bodyText: "table.aaa.bodyText",
    borderColor: "table.aaa.borderColor",
    hoverBg: "table.aaa.hoverBg",
    stripeOdd: "table.aaa.stripeOdd",
    stripeEven: "table.aaa.stripeEven",
    caption: "table.aaa.caption",
  },
} as const;

export const table: SlotRecipeConfig = {
  className: "table",
  description: "WCAG準拠のテーブルコンポーネント",
  slots: [
    "container",
    "root",
    "caption",
    "header",
    "body",
    "footer",
    "row",
    "headerCell",
    "cell",
  ],
  base: {
    container: {
      width: "100%",
      borderRadius: "xl",
      borderWidth: "thin",
      borderStyle: "solid",
      borderColor: "border.default",
      backgroundColor: "bg.primary",
      boxShadow: "xl",
      maxWidth: "100%",
    },
    root: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
      minWidth: "480px",
      backgroundColor: "bg.primary",
      color: "contents.primary",
      "& tbody tr:last-of-type td": {
        borderBottom: "none",
      },
    },
    caption: {
      paddingX: 4,
      paddingY: 3,
      fontSize: "xs",
      textAlign: "left",
    },
    row: {
      transitionProperty: "background-color, color",
      transitionDuration: "normal",
    },
    headerCell: {
      fontWeight: "semibold",
      textTransform: "none",
      borderBottomWidth: "base",
      borderBottomStyle: "solid",
      "&:last-of-type": {
        borderRight: "none",
      },
    },
    cell: {
      lineHeight: "normal",
      borderBottomWidth: "thin",
      borderBottomStyle: "solid",
      "&:last-of-type": {
        borderRight: "none",
      },
    },
  },
  variants: {
    size: {
      sm: {
        headerCell: {
          paddingX: 3,
          paddingY: 2,
          fontSize: "sm",
        },
        cell: {
          paddingX: 3,
          paddingY: 2,
          fontSize: "xs",
        },
      },
      md: {
        headerCell: {
          paddingX: 4,
          paddingY: 3,
          fontSize: "sm",
        },
        cell: {
          paddingX: 4,
          paddingY: 3,
          fontSize: "sm",
        },
      },
      lg: {
        headerCell: {
          paddingX: 5,
          paddingY: 4,
          fontSize: "md",
        },
        cell: {
          paddingX: 5,
          paddingY: 4,
          fontSize: "md",
        },
      },
    },
    variant: {
      simple: {},
      striped: {
        root: {
          "& tbody tr:nth-of-type(odd)": {
            backgroundColor: "{colors.stripeOdd}",
          },
          "& tbody tr:nth-of-type(even)": {
            backgroundColor: "{colors.stripeEven}",
          },
        },
      },
    },
    wcagLevel: {
      AA: {
        headerCell: {
          color: wcagTableColors.AA.headerText,
          backgroundColor: wcagTableColors.AA.headerBg,
          borderBottomColor: wcagTableColors.AA.borderColor,
        },
        cell: {
          color: wcagTableColors.AA.bodyText,
          borderBottomColor: wcagTableColors.AA.borderColor,
        },
        caption: {
          color: wcagTableColors.AA.caption,
        },
      },
      AAA: {
        headerCell: {
          color: wcagTableColors.AAA.headerText,
          backgroundColor: wcagTableColors.AAA.headerBg,
          borderBottomColor: wcagTableColors.AAA.borderColor,
        },
        cell: {
          color: wcagTableColors.AAA.bodyText,
          borderBottomColor: wcagTableColors.AAA.borderColor,
        },
        caption: {
          color: wcagTableColors.AAA.caption,
        },
      },
    },
    responsive: {
      true: {
        container: {
          overflowX: "auto",
        },
      },
      false: {
        container: {
          overflowX: "visible",
        },
      },
    },
    stickyHeader: {
      true: {
        headerCell: {
          position: "sticky",
          top: 0,
          zIndex: 1,
          boxShadow: "sm",
        },
      },
    },
    highlightOnHover: {
      true: {},
    },
    showColumnDividers: {
      true: {
        headerCell: {
          borderRightWidth: "thin",
          borderRightStyle: "solid",
        },
        cell: {
          borderRightWidth: "thin",
          borderRightStyle: "solid",
        },
      },
    },
  },
  compoundVariants: [
    {
      highlightOnHover: true,
      wcagLevel: "AA",
      css: {
        root: {
          "& tbody tr:hover": {
            backgroundColor: wcagTableColors.AA.hoverBg,
          },
        },
      },
    },
    {
      highlightOnHover: true,
      wcagLevel: "AAA",
      css: {
        root: {
          "& tbody tr:hover": {
            backgroundColor: wcagTableColors.AAA.hoverBg,
          },
        },
      },
    },
    {
      showColumnDividers: true,
      wcagLevel: "AA",
      css: {
        headerCell: {
          borderRightColor: wcagTableColors.AA.borderColor,
        },
        cell: {
          borderRightColor: wcagTableColors.AA.borderColor,
        },
      },
    },
    {
      showColumnDividers: true,
      wcagLevel: "AAA",
      css: {
        headerCell: {
          borderRightColor: wcagTableColors.AAA.borderColor,
        },
        cell: {
          borderRightColor: wcagTableColors.AAA.borderColor,
        },
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "simple",
    wcagLevel: "AA",
    responsive: true,
    stickyHeader: false,
    highlightOnHover: true,
    showColumnDividers: false,
  },
};
