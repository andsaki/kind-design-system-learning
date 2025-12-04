import type { RecipeConfig } from "@pandacss/dev";

const focusStyles = {
  A: {
    backgroundColor: "transparent",
    color: "gray.900",
    outlineColor: "blue.300",
    outlineWidth: "thin",
    outlineOffset: "0",
  },
  AA: {
    backgroundColor: "blue.50",
    color: "gray.900",
    outlineColor: "blue.700",
    outlineWidth: "base",
    outlineOffset: "0.5",
  },
  AAA: {
    backgroundColor: "yellow.400",
    color: "gray.900",
    outlineColor: "gray.900",
    outlineWidth: "thick",
    outlineOffset: "0.5",
  },
} as const;

const dangerFocusStyles = {
  A: {
    backgroundColor: "transparent",
    color: "gray.900",
    outlineColor: "red.300",
    outlineWidth: "thin",
    outlineOffset: "0",
  },
  AA: {
    backgroundColor: "red.50",
    color: "gray.900",
    outlineColor: "red.700",
    outlineWidth: "base",
    outlineOffset: "0.5",
  },
  AAA: {
    backgroundColor: "yellow.400",
    color: "gray.900",
    outlineColor: "gray.900",
    outlineWidth: "thick",
    outlineOffset: "0.5",
  },
} as const;

export const button: RecipeConfig = {
  className: "button",
  description: "Button component styles",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans",
    fontWeight: "semibold",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    borderRadius: "md",
    outline: "none",
    outlineStyle: "solid",
    position: "relative",
    gap: "0.5rem",
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
  variants: {
    size: {
      sm: {
        padding: "0.5rem 0.75rem",
        fontSize: "sm",
      },
      md: {
        padding: "0.75rem 1rem",
        fontSize: "base",
      },
      lg: {
        padding: "1rem 1.5rem",
        fontSize: "lg",
      },
    },
    variant: {
      primary: {
        borderWidth: "1px",
        borderStyle: "solid",
      },
      secondary: {
        borderWidth: "1px",
        borderStyle: "solid",
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: "2px",
        borderStyle: "solid",
      },
      danger: {
        borderWidth: "1px",
        borderStyle: "solid",
      },
    },
    wcagLevel: {
      A: {
        _focusVisible: focusStyles.A,
      },
      AA: {
        _focusVisible: focusStyles.AA,
      },
      AAA: {
        _focusVisible: focusStyles.AAA,
      },
    },
  },
  compoundVariants: [
    // Primary - Level A
    {
      variant: "primary",
      wcagLevel: "A",
      css: {
        backgroundColor: "blue.400",
        color: "white",
        borderColor: "blue.400",
        _hover: {
          _disabled: {
            backgroundColor: "gray.300",
          },
          backgroundColor: "blue.600",
          borderColor: "blue.600",
        },
        _disabled: {
          backgroundColor: "gray.300",
          borderColor: "gray.300",
          color: "gray.700",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Primary - Level AA
    {
      variant: "primary",
      wcagLevel: "AA",
      css: {
        backgroundColor: "blue.500",
        color: "white",
        borderColor: "blue.500",
        _hover: {
          _disabled: {
            backgroundColor: "gray.300",
          },
          backgroundColor: "blue.600",
          borderColor: "blue.600",
        },
        _disabled: {
          backgroundColor: "gray.300",
          borderColor: "gray.300",
          color: "gray.700",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Primary - Level AAA
    {
      variant: "primary",
      wcagLevel: "AAA",
      css: {
        backgroundColor: "blue.700",
        color: "white",
        borderColor: "blue.800",
        _hover: {
          _disabled: {
            backgroundColor: "gray.300",
          },
          backgroundColor: "blue.600",
          borderColor: "blue.600",
        },
        _disabled: {
          backgroundColor: "gray.300",
          borderColor: "gray.300",
          color: "gray.700",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Secondary - Level A
    {
      variant: "secondary",
      wcagLevel: "A",
      css: {
        backgroundColor: "gray.200",
        color: "gray.700",
        borderColor: "gray.300",
        _hover: {
          _disabled: {
            backgroundColor: "gray.100",
          },
          backgroundColor: "gray.50",
          borderColor: "gray.400",
        },
        _disabled: {
          backgroundColor: "gray.200",
          borderColor: "gray.200",
          color: "gray.700",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Secondary - Level AA
    {
      variant: "secondary",
      wcagLevel: "AA",
      css: {
        backgroundColor: "gray.100",
        color: "gray.900",
        borderColor: "gray.400",
        _hover: {
          _disabled: {
            backgroundColor: "gray.100",
          },
          backgroundColor: "gray.50",
          borderColor: "gray.400",
        },
        _disabled: {
          backgroundColor: "gray.200",
          borderColor: "gray.200",
          color: "gray.700",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Secondary - Level AAA
    {
      variant: "secondary",
      wcagLevel: "AAA",
      css: {
        backgroundColor: "white",
        color: "gray.900",
        borderColor: "gray.600",
        _hover: {
          _disabled: {
            backgroundColor: "gray.100",
          },
          backgroundColor: "gray.50",
          borderColor: "gray.400",
        },
        _disabled: {
          backgroundColor: "gray.200",
          borderColor: "gray.200",
          color: "gray.700",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Outline - Level A
    {
      variant: "outline",
      wcagLevel: "A",
      css: {
        backgroundColor: "transparent",
        color: "blue.400",
        borderColor: "blue.400",
        _hover: {
          _disabled: {
            backgroundColor: "transparent",
          },
          backgroundColor: "blue.50",
          borderColor: "blue.600",
        },
        _disabled: {
          backgroundColor: "transparent",
          borderColor: "gray.300",
          color: "gray.600",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Outline - Level AA
    {
      variant: "outline",
      wcagLevel: "AA",
      css: {
        backgroundColor: "transparent",
        color: "blue.500",
        borderColor: "blue.500",
        _hover: {
          _disabled: {
            backgroundColor: "transparent",
          },
          backgroundColor: "blue.50",
          borderColor: "blue.600",
        },
        _disabled: {
          backgroundColor: "transparent",
          borderColor: "gray.300",
          color: "gray.600",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Outline - Level AAA
    {
      variant: "outline",
      wcagLevel: "AAA",
      css: {
        backgroundColor: "transparent",
        color: "blue.700",
        borderColor: "blue.700",
        _hover: {
          _disabled: {
            backgroundColor: "transparent",
          },
          backgroundColor: "blue.50",
          borderColor: "blue.600",
        },
        _disabled: {
          backgroundColor: "transparent",
          borderColor: "gray.300",
          color: "gray.600",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Danger - Level A
    {
      variant: "danger",
      wcagLevel: "A",
      css: {
        backgroundColor: "red.400",
        color: "white",
        borderColor: "red.400",
        _focusVisible: dangerFocusStyles.A,
        _hover: {
          _disabled: {
            backgroundColor: "gray.300",
          },
          backgroundColor: "red.700",
          borderColor: "red.700",
        },
        _disabled: {
          backgroundColor: "gray.300",
          borderColor: "gray.300",
          color: "gray.700",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Danger - Level AA
    {
      variant: "danger",
      wcagLevel: "AA",
      css: {
        backgroundColor: "red.700",  // コントラスト比改善: 4.5:1以上
        color: "white",
        borderColor: "red.700",
        _focusVisible: dangerFocusStyles.AA,
        _hover: {
          _disabled: {
            backgroundColor: "gray.300",
          },
          backgroundColor: "red.700",
          borderColor: "red.700",
        },
        _disabled: {
          backgroundColor: "gray.300",
          borderColor: "gray.300",
          color: "gray.700",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
    // Danger - Level AAA
    {
      variant: "danger",
      wcagLevel: "AAA",
      css: {
        backgroundColor: "red.700",
        color: "white",
        borderColor: "red.800",
        _focusVisible: dangerFocusStyles.AAA,
        _hover: {
          _disabled: {
            backgroundColor: "gray.300",
          },
          backgroundColor: "red.700",
          borderColor: "red.700",
        },
        _disabled: {
          backgroundColor: "gray.300",
          borderColor: "gray.300",
          color: "gray.700",  // コントラスト比改善: 4.5:1以上
        },
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
    wcagLevel: "AA",
  },
};
