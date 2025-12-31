import type { RecipeConfig } from "@pandacss/dev";

const wcagTextColors = {
  A: {
    color: "gray.600",
  },
  AA: {
    color: "contents.primary",
  },
  AAA: {
    color: "primitive.black",
  },
} as const;

export const text: RecipeConfig = {
  className: "text",
  description: "Text component typography styles",
  base: {
    margin: "0",
    color: "contents.primary",
    textDecoration: "none",
  },
  variants: {
    variant: {
      h1: {
        fontSize: "5xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
        marginBottom: "6",
        marginTop: "8",
      },
      h2: {
        fontSize: "4xl",
        fontWeight: "bold",
        lineHeight: "tight",
        letterSpacing: "tight",
        marginBottom: "5",
        marginTop: "8",
      },
      h3: {
        fontSize: "3xl",
        fontWeight: "bold",
        lineHeight: "snug",
        letterSpacing: "normal",
        marginBottom: "4",
        marginTop: "6",
      },
      h4: {
        fontSize: "2xl",
        fontWeight: "bold",
        lineHeight: "snug",
        letterSpacing: "normal",
        marginBottom: "3",
        marginTop: "6",
      },
      h5: {
        fontSize: "xl",
        fontWeight: "bold",
        lineHeight: "normal",
        letterSpacing: "normal",
        marginBottom: "3",
        marginTop: "5",
      },
      h6: {
        fontSize: "lg",
        fontWeight: "bold",
        lineHeight: "normal",
        letterSpacing: "normal",
        marginBottom: "2",
        marginTop: "4",
      },
      "body-large": {
        fontSize: "lg",
        fontWeight: "normal",
        lineHeight: "relaxed",
        marginBottom: "4",
      },
      body: {
        fontSize: "base",
        fontWeight: "normal",
        lineHeight: "relaxed",
        marginBottom: "4",
      },
      "body-small": {
        fontSize: "sm",
        fontWeight: "normal",
        lineHeight: "relaxed",
        marginBottom: "3",
      },
      caption: {
        fontSize: "sm",
        fontWeight: "normal",
        lineHeight: "normal",
      },
      overline: {
        fontSize: "xs",
        fontWeight: "semibold",
        lineHeight: "normal",
        letterSpacing: "wider",
        textTransform: "uppercase",
      },
    },
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
      justify: { textAlign: "justify" },
    },
    wcagLevel: {
      A: wcagTextColors.A,
      AA: wcagTextColors.AA,
      AAA: wcagTextColors.AAA,
    },
  },
  defaultVariants: {
    variant: "body",
    align: "left",
    wcagLevel: "AA",
  },
};
