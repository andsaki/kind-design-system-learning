/**
 * CSS Custom Properties (CSS Variables) used across recipes
 *
 * These constants ensure consistency and prevent typos when referencing
 * CSS variables in different parts of the design system.
 */

export const CSS_VARS = {
  FOCUS: {
    BG: "--focus-bg",
    TEXT: "--focus-text",
    OUTLINE: "--focus-outline",
    OUTLINE_WIDTH: "--focus-outline-width",
    OUTLINE_OFFSET: "--focus-outline-offset",
  },
} as const;
