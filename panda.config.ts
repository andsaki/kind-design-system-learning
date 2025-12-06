import { defineConfig } from "@pandacss/dev";
import { button } from "./panda-config/recipes/button";
import { input } from "./panda-config/recipes/input";
import { select } from "./panda-config/recipes/select";
import { text } from "./panda-config/recipes/text";
import { textarea } from "./panda-config/recipes/textarea";
import { accordion } from "./panda-config/recipes/accordion";
import { breadcrumbs } from "./panda-config/recipes/breadcrumbs";
import { checkbox } from "./panda-config/recipes/checkbox";
import { dropdown } from "./panda-config/recipes/dropdown";
import { loading } from "./panda-config/recipes/loading";
import { infoBox } from "./panda-config/recipes/infobox";
import { modal } from "./panda-config/recipes/modal";
import { radio } from "./panda-config/recipes/radio";
import { table } from "./panda-config/recipes/table";
import { colorpicker } from "./panda-config/recipes/colorpicker";
import { tooltip } from "./panda-config/recipes/tooltip";
import { carousel } from "./panda-config/recipes/carousel";
import { CSS_VARS } from "./panda-config/recipes/constants";
import { pandaSemanticColors } from "./panda-config/types/semanticTokens";
import {
  pandaColors,
  pandaSpacing,
  pandaSizes,
  pandaFonts,
  pandaFontSizes,
  pandaFontWeights,
  pandaLineHeights,
  pandaLetterSpacings,
  pandaRadii,
  pandaShadows,
  pandaDurations,
  pandaEasings,
  pandaBorders,
  pandaBorderWidths,
} from "./panda-config/types/tokens";
// Force rebuild

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Theme conditions
  conditions: {
    // ThemeProviderが付与するdata-theme属性に従って手動切替やlocalStorage保存を反映する。
    // OS依存の@media (prefers-color-scheme: …)だけだとボタン操作で強制切替できないため採用しない。
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        // 型安全なトークン定義
        // panda-config/types/tokens.ts で定義されています
        //
        // 嬉しいポイント:
        // - VSCodeで gray.50, blue.400 などの補完が効く
        // - typoを防げる（存在しないトークン名はエラー）
        // - デザインシステムの一貫性を保てる
        colors: pandaColors,
        spacing: pandaSpacing,
        sizes: pandaSizes,
        fonts: pandaFonts,
        fontSizes: pandaFontSizes,
        fontWeights: pandaFontWeights,
        lineHeights: pandaLineHeights,
        letterSpacings: pandaLetterSpacings,
        radii: pandaRadii,
        shadows: pandaShadows,
        durations: pandaDurations,
        easings: pandaEasings,
        borders: pandaBorders,
        borderWidths: pandaBorderWidths,
      },
      semanticTokens: {
        // 型安全なセマンティックトークン定義
        // panda-config/types/semanticTokens.ts で定義されています
        //
        // 嬉しいポイント:
        // - VSCodeで bg.primary, contents.primary などの補完が効く
        // - typoを防げる（存在しないトークン名はエラー）
        // - ダークモード対応の定義漏れを防げる
        colors: pandaSemanticColors,
      },
      breakpoints: {
        xs: "0px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      recipes: {
        button,
        input,
        select,
        text,
        textarea,
        accordion,
        breadcrumbs,
        checkbox,
        dropdown,
        loading,
        infoBox,
        modal,
        radio,
        colorpicker,
      },
      slotRecipes: {
        table,
        carousel,
        tooltip,
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  // Static CSS generation for all button variants
  staticCss: {
    recipes: {
      button: [
        // All size variants
        { size: ["sm", "md", "lg"] },
        // All variant + wcagLevel combinations
        { variant: ["outline"], wcagLevel: ["AA"] },
        { variant: ["outline"], wcagLevel: ["AAA"] },
        { variant: ["primary"], wcagLevel: ["AA"] },
        { variant: ["primary"], wcagLevel: ["AAA"] },
        { variant: ["secondary"], wcagLevel: ["AA"] },
        { variant: ["secondary"], wcagLevel: ["AAA"] },
        { variant: ["danger"], wcagLevel: ["AA"] },
        { variant: ["danger"], wcagLevel: ["AAA"] },
      ],
      input: [
        {
          size: ["sm", "md", "lg"],
          state: ["default", "error"],
          wcagLevel: ["AA", "AAA"],
        },
      ],
      select: [
        {
          size: ["sm", "md", "lg"],
          state: ["default", "error"],
          wcagLevel: ["AA", "AAA"],
          disabled: ["true"],
        },
      ],
      text: [
        {
          variant: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "body-large",
            "body",
            "body-small",
            "caption",
            "overline",
          ],
          align: ["left", "center", "right", "justify"],
        },
      ],
      textarea: [
        { state: ["default", "error"], wcagLevel: ["AA", "AAA"] },
      ],
      accordion: [{ wcagLevel: ["AA", "AAA"] }],
      breadcrumbs: [{ wcagLevel: ["AA", "AAA"] }],
      checkbox: [
        { wcagLevel: ["AA", "AAA"], state: ["default", "error"] },
      ],
      dropdown: [
        { state: ["default", "error"], placeholder: ["empty", "filled"] },
      ],
      loading: [
        {
          size: ["sm", "md", "lg", "xl", "inline-sm", "inline-md"],
          color: ["primary", "secondary", "white"],
        },
      ],
      infoBox: [
        {
          variant: ["info", "warning", "success", "tip"],
          wcagLevel: ["AA", "AAA"],
          leftBorder: ["true"],
        },
      ],
      modal: [{ size: ["sm", "md", "lg"], wcagLevel: ["AA", "AAA"] }],
      radio: [{ wcagLevel: ["AA", "AAA"], state: ["default", "error"] }],
      colorpicker: [
        { size: ["sm", "md", "lg"], wcagLevel: ["AA", "AAA"] },
      ],
    },
  },

  // Global CSS
  globalCss: {
    html: {
      fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      lineHeight: "1.5",
      fontWeight: "400",
      fontSynthesis: "none",
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    body: {
      margin: "0",
      display: "flex",
      placeItems: "center",
      minWidth: "320px",
      minHeight: "100vh",
      color: "contents.primary",
      backgroundColor: "bg.primary",
    },
    "#root": {
      width: "100%",
      margin: "0 auto",
      textAlign: "left",
    },
    // Typography base styles
    "h1, h2, h3, h4, h5, h6": {
      marginTop: "6",
      marginBottom: "4",
      fontWeight: "bold",
      lineHeight: "tight",
      color: "contents.primary",
      wordBreak: "auto-phrase",
      overflowWrap: "break-word",
    },
    h1: { fontSize: "5xl", marginTop: "8", marginBottom: "6" },
    h2: { fontSize: "4xl", marginTop: "8", marginBottom: "5" },
    h3: { fontSize: "3xl", marginTop: "6", marginBottom: "4" },
    h4: { fontSize: "2xl", marginTop: "6", marginBottom: "3" },
    h5: { fontSize: "xl", marginTop: "5", marginBottom: "3" },
    h6: { fontSize: "lg", marginTop: "4", marginBottom: "2" },
    p: {
      marginBottom: "4",
      lineHeight: "relaxed",
      color: "contents.primary",
    },
    "ul, ol": {
      marginBottom: "4",
      paddingLeft: "6",
      lineHeight: "relaxed",
    },
    li: {
      marginBottom: "2",
      color: "contents.primary",
    },
    code: {
      fontSize: "sm",
      fontFamily: "mono",
      backgroundColor: "gray.200",
      color: "gray.800",
      padding: "1",
      borderRadius: "sm",
      _dark: {
        backgroundColor: "gray.700",
        color: "gray.100",
      },
    },
    'input[type="checkbox"], input[type="radio"]': {
      accentColor: "brand.primary",  // セマンティックトークンを使用
    },
    // Accordion styles
    "details[open] .accordion-icon": {
      transform: "rotate(180deg)",
    },
    "summary::-webkit-details-marker": {
      display: "none",
    },
    "summary::marker": {
      display: "none",
    },
    // Button focus state management (keyboard focus only)
    "button[data-focused]": {
      backgroundColor: `var(${CSS_VARS.FOCUS.BG}) !important`,
      outline: `var(${CSS_VARS.FOCUS.OUTLINE_WIDTH}) solid var(${CSS_VARS.FOCUS.OUTLINE}) !important`,
      outlineOffset: `var(${CSS_VARS.FOCUS.OUTLINE_OFFSET}) !important`,
    },
    "button[data-focused]:not([data-focus-text-inherit])": {
      color: `var(${CSS_VARS.FOCUS.TEXT}) !important`,
    },
    "button[data-focused]:hover": {
      backgroundColor: `var(${CSS_VARS.FOCUS.BG}) !important`,
    },
    "button[data-focused]:hover:not([data-focus-text-inherit])": {
      color: `var(${CSS_VARS.FOCUS.TEXT}) !important`,
    },
    "input[data-focused], textarea[data-focused]": {
      backgroundColor: `var(${CSS_VARS.FOCUS.BG}) !important`,
      color: `var(${CSS_VARS.FOCUS.TEXT}) !important`,
      borderColor: `var(${CSS_VARS.FOCUS.OUTLINE}) !important`,
      outline: `var(${CSS_VARS.FOCUS.OUTLINE_WIDTH}) solid var(${CSS_VARS.FOCUS.OUTLINE}) !important`,
      outlineOffset: `var(${CSS_VARS.FOCUS.OUTLINE_OFFSET}) !important`,
    },
    "input[data-focused]:not([data-focus-text-inherit]), textarea[data-focused]:not([data-focus-text-inherit])":
      {
        color: `var(${CSS_VARS.FOCUS.TEXT}) !important`,
      },
    "input[data-focused]:hover, textarea[data-focused]:hover": {
      backgroundColor: `var(${CSS_VARS.FOCUS.BG}) !important`,
    },
    "input[data-focused]:hover:not([data-focus-text-inherit]), textarea[data-focused]:hover:not([data-focus-text-inherit])":
      {
        color: `var(${CSS_VARS.FOCUS.TEXT}) !important`,
      },
  },
});
