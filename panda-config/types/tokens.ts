import type { GetPandaConfigMap } from "./interfaces";

/**
 * プリミティブカラートークンの型安全な定義
 *
 * 嬉しいポイント:
 * 1. VSCodeで補完が効く
 *    - gray.50, blue.400 などが候補に出る
 *    - 存在しないトークン名を書くとエラーになる（typo防止）
 *
 * 2. デザインシステムの一貫性
 *    - 定義されたカラーパレットのみ使用可能
 *    - 勝手に色を追加できない（システム外の色の混入を防ぐ）
 *
 * 3. ドキュメント効果
 *    - どんなカラートークンが存在するか一目瞭然
 *    - Material Design風のカラースケールを採用
 */
export const pandaColors: GetPandaConfigMap<"colors"> = {
  // グレースケール - テキスト、背景、ボーダーなど基本的な要素に使用
  gray: {
    50: { value: '#fafafa' },
    100: { value: '#f5f5f5' },
    200: { value: '#eeeeee' },
    300: { value: '#e0e0e0' },
    400: { value: '#bdbdbd' },
    500: { value: '#9e9e9e' },
    600: { value: '#757575' },
    700: { value: '#616161' },
    800: { value: '#424242' },
    900: { value: '#212121' },
  },
  // ブルー - プライマリカラー、リンク、情報表示
  blue: {
    50: { value: '#e3f2fd' },
    100: { value: '#bbdefb' },
    200: { value: '#90caf9' },
    300: { value: '#64b5f6' },
    400: { value: '#42a5f5' },
    500: { value: '#2196f3' },
    600: { value: '#1e88e5' },
    700: { value: '#1976d2' },
    800: { value: '#1565c0' },
    900: { value: '#0d47a1' },
  },
  // レッド - エラー、危険、削除操作
  red: {
    50: { value: '#ffebee' },
    100: { value: '#ffcdd2' },
    200: { value: '#ef9a9a' },
    300: { value: '#e57373' },
    400: { value: '#ef5350' },
    500: { value: '#f44336' },
    600: { value: '#e53935' },
    700: { value: '#d32f2f' },
    800: { value: '#c62828' },
    900: { value: '#b71c1c' },
  },
  // グリーン - 成功、完了、承認操作
  green: {
    50: { value: '#e8f5e9' },
    100: { value: '#c8e6c9' },
    200: { value: '#a5d6a7' },
    300: { value: '#81c784' },
    400: { value: '#66bb6a' },
    500: { value: '#4caf50' },
    600: { value: '#43a047' },
    700: { value: '#388e3c' },
    800: { value: '#2e7d32' },
    900: { value: '#1b5e20' },
  },
  // オレンジ - 警告、注意喚起
  orange: {
    50: { value: '#fff3e0' },
    100: { value: '#ffe0b2' },
    200: { value: '#ffcc80' },
    300: { value: '#ffb74d' },
    400: { value: '#ffa726' },
    500: { value: '#ff9800' },
    600: { value: '#fb8c00' },
    700: { value: '#f57c00' },
    800: { value: '#ef6c00' },
    900: { value: '#e65100' },
  },
  // ピンク - アクセント、強調表示
  pink: {
    50: { value: '#fce4ec' },
    100: { value: '#f8bbd0' },
    200: { value: '#f48fb1' },
    300: { value: '#f06292' },
    400: { value: '#ec407a' },
    500: { value: '#e91e63' },
    600: { value: '#d81b60' },
    700: { value: '#c2185b' },
    800: { value: '#ad1457' },
    900: { value: '#880e4f' },
  },
  // 基本色
  white: { value: '#ffffff' },
  black: { value: '#000000' },
  yellow: { value: '#ffff00' },
};

/**
 * スペーシングトークンの型安全な定義
 *
 * 嬉しいポイント:
 * - 一貫したスペーシングスケール（4px単位）
 * - padding, margin, gapなどで使用
 */
export const pandaSpacing: GetPandaConfigMap<"spacing"> = {
  0: { value: '0' },
  0.5: { value: '0.125rem' },   // 2px
  0.75: { value: '0.1875rem' }, // 3px
  1: { value: '0.25rem' },      // 4px
  2: { value: '0.5rem' },       // 8px
  3: { value: '0.75rem' },      // 12px
  4: { value: '1rem' },         // 16px
  5: { value: '1.25rem' },      // 20px
  6: { value: '1.5rem' },       // 24px
  8: { value: '2rem' },         // 32px
  10: { value: '2.5rem' },      // 40px
  12: { value: '3rem' },        // 48px
  16: { value: '4rem' },        // 64px
  20: { value: '5rem' },        // 80px
  24: { value: '6rem' },        // 96px
  32: { value: '8rem' },        // 128px
  40: { value: '10rem' },       // 160px
  48: { value: '12rem' },       // 192px
  56: { value: '14rem' },       // 224px
  64: { value: '16rem' },       // 256px
};

/**
 * サイズトークン - スピナーなど特定コンポーネントで再利用する寸法
 */
export const pandaSizes: GetPandaConfigMap<"sizes"> = {
  spinnerSm: { value: '1rem' },         // 16px
  spinnerMd: { value: '1.5rem' },       // 24px
  spinnerLg: { value: '2rem' },         // 32px
  spinnerXl: { value: '3rem' },         // 48px
  spinnerInlineSm: { value: '1em' },    // フォントサイズに追従
  spinnerInlineMd: { value: '1.25em' }, // フォントサイズに追従
};

/**
 * フォントファミリートークン
 */
export const pandaFonts: GetPandaConfigMap<"fonts"> = {
  body: { value: "system-ui, Avenir, Helvetica, Arial, sans-serif" },
  heading: { value: "Inter, 'Segoe UI', Helvetica, Arial, sans-serif" },
  serif: {
    value: "Georgia, 'Times New Roman', Times, serif",
  },
  mono: {
    value:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
};

/**
 * フォントサイズトークンの型安全な定義
 */
export const pandaFontSizes: GetPandaConfigMap<"fontSizes"> = {
  xs: { value: '0.75rem' },    // 12px
  sm: { value: '0.875rem' },   // 14px
  base: { value: '1rem' },     // 16px
  lg: { value: '1.125rem' },   // 18px
  xl: { value: '1.25rem' },    // 20px
  '2xl': { value: '1.5rem' },  // 24px
  '3xl': { value: '1.875rem' },// 30px
  '4xl': { value: '2.25rem' }, // 36px
  '5xl': { value: '3rem' },    // 48px
  '6xl': { value: '3.75rem' }, // 60px
};

/**
 * フォントウェイトトークンの型安全な定義
 */
export const pandaFontWeights: GetPandaConfigMap<"fontWeights"> = {
  light: { value: 300 },
  normal: { value: 400 },
  medium: { value: 500 },
  semibold: { value: 600 },
  bold: { value: 700 },
  extrabold: { value: 800 },
};

/**
 * 行高トークンの型安全な定義
 */
export const pandaLineHeights: GetPandaConfigMap<"lineHeights"> = {
  none: { value: 1 },
  tight: { value: 1.25 },
  snug: { value: 1.375 },
  normal: { value: 1.5 },
  relaxed: { value: 1.625 },
  loose: { value: 2 },
};

/**
 * 字間トークンの型安全な定義
 */
export const pandaLetterSpacings: GetPandaConfigMap<"letterSpacings"> = {
  tighter: { value: '-0.05em' },
  tight: { value: '-0.025em' },
  normal: { value: '0em' },
  wide: { value: '0.025em' },
  wider: { value: '0.05em' },
  widest: { value: '0.1em' },
};

/**
 * 角丸トークンの型安全な定義
 */
export const pandaRadii: GetPandaConfigMap<"radii"> = {
  none: { value: '0' },
  sm: { value: '0.125rem' },   // 2px
  base: { value: '0.25rem' },  // 4px
  md: { value: '0.375rem' },   // 6px
  lg: { value: '0.5rem' },     // 8px
  xl: { value: '0.75rem' },    // 12px
  '2xl': { value: '1rem' },    // 16px
  '3xl': { value: '1.5rem' },  // 24px
  full: { value: '9999px' },
};

/**
 * シャドウトークンの型安全な定義
 */
export const pandaShadows: GetPandaConfigMap<"shadows"> = {
  none: { value: 'none' },
  sm: { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  base: { value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' },
  md: { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
  lg: { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
  xl: { value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
  '2xl': { value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
  inner: { value: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' },
  focusRing: { value: '0 0 0 3px rgba(66, 153, 225, 0.5)' },
  focusRingError: { value: '0 0 0 3px rgba(245, 101, 101, 0.5)' },
  focusRingSuccess: { value: '0 0 0 3px rgba(72, 187, 120, 0.5)' },
};

/**
 * アニメーション時間トークンの型安全な定義
 */
export const pandaDurations: GetPandaConfigMap<"durations"> = {
  fast: { value: '150ms' },
  base: { value: '200ms' },
  slow: { value: '300ms' },
  slower: { value: '500ms' },
};

/**
 * イージングトークンの型安全な定義
 */
export const pandaEasings: GetPandaConfigMap<"easings"> = {
  linear: { value: 'linear' },
  easeIn: { value: 'cubic-bezier(0.4, 0, 1, 1)' },
  easeOut: { value: 'cubic-bezier(0, 0, 0.2, 1)' },
  easeInOut: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  smooth: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  bounce: { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
};

/**
 * ボーダートークンの型安全な定義
 */
export const pandaBorders: GetPandaConfigMap<"borders"> = {
  none: { value: 'none' },
};

/**
 * ボーダー幅トークンの型安全な定義
 */
export const pandaBorderWidths: GetPandaConfigMap<"borderWidths"> = {
  none: { value: '0' },
  thin: { value: '1px' },
  base: { value: '2px' },
  thick: { value: '3px' },
  thicker: { value: '4px' },
};
