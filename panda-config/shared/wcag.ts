export const wcagFocusStyles = {
  AA: {
    backgroundColor: "blue.50",
    outlineColor: "blue.700",
    outlineWidth: "0.1875rem",
    outlineOffset: "0.125rem",
  },
  AAA: {
    backgroundColor: "yellow.100",
    outlineColor: "black",
    outlineWidth: "0.25rem",
    outlineOffset: "0.125rem",
  },
} as const;

export type WcagLevel = keyof typeof wcagFocusStyles;

type WcagFocusOptions = {
  includeBackground?: boolean;
};

export const getWcagFocusVisibleStyle = (
  level: WcagLevel,
  options: WcagFocusOptions = {},
) => {
  const baseStyles = {
    outlineStyle: "solid",
    outlineColor: wcagFocusStyles[level].outlineColor,
    outlineWidth: wcagFocusStyles[level].outlineWidth,
    outlineOffset: wcagFocusStyles[level].outlineOffset,
  } as const;

  if (options.includeBackground === false) {
    return baseStyles;
  }

  return {
    ...baseStyles,
    backgroundColor: wcagFocusStyles[level].backgroundColor,
  } as const;
};

export const wcagRingStyles = {
  AA: {
    outlineColor: "blue.700",
    outlineWidth: "0.1875rem",
    outlineOffset: "0.125rem",
  },
  AAA: {
    outlineColor: "black",
    outlineWidth: "0.25rem",
    outlineOffset: "0.125rem",
  },
} as const;

export const wcagSurfaceBorders = {
  AA: {
    borderColor: "blue.300",
    backgroundColor: "blue.50",
  },
  AAA: {
    borderColor: "yellow.400",
    backgroundColor: "yellow.100",
  },
} as const;
