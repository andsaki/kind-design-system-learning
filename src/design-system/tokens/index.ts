/**
 * デザイントークン統合エクスポート
 *
 * Panda CSSのトークンを既存のAPIでエクスポートします
 * 既存のコンポーネントとの互換性を保つためのラッパーです
 */

import { token } from '../../../styled-system/tokens';

// カラートークン
export const colors = {
  primitive: {
    gray: {
      50: token('colors.gray.50'),
      100: token('colors.gray.100'),
      200: token('colors.gray.200'),
      300: token('colors.gray.300'),
      400: token('colors.gray.400'),
      500: token('colors.gray.500'),
      600: token('colors.gray.600'),
      700: token('colors.gray.700'),
      800: token('colors.gray.800'),
      900: token('colors.gray.900'),
    },
    blue: {
      50: token('colors.blue.50'),
      100: token('colors.blue.100'),
      200: token('colors.blue.200'),
      300: token('colors.blue.300'),
      400: token('colors.blue.400'),
      500: token('colors.blue.500'),
      600: token('colors.blue.600'),
      700: token('colors.blue.700'),
      800: token('colors.blue.800'),
      900: token('colors.blue.900'),
    },
    red: {
      50: token('colors.red.50'),
      100: token('colors.red.100'),
      200: token('colors.red.200'),
      300: token('colors.red.300'),
      400: token('colors.red.400'),
      500: token('colors.red.500'),
      600: token('colors.red.600'),
      700: token('colors.red.700'),
      800: token('colors.red.800'),
      900: token('colors.red.900'),
    },
    green: {
      50: token('colors.green.50'),
      100: token('colors.green.100'),
      200: token('colors.green.200'),
      300: token('colors.green.300'),
      400: token('colors.green.400'),
      500: token('colors.green.500'),
      600: token('colors.green.600'),
      700: token('colors.green.700'),
      800: token('colors.green.800'),
      900: token('colors.green.900'),
    },
    orange: {
      50: token('colors.orange.50'),
      100: token('colors.orange.100'),
      200: token('colors.orange.200'),
      300: token('colors.orange.300'),
      400: token('colors.orange.400'),
      500: token('colors.orange.500'),
      600: token('colors.orange.600'),
      700: token('colors.orange.700'),
      800: token('colors.orange.800'),
      900: token('colors.orange.900'),
    },
    pink: {
      50: token('colors.pink.50'),
      100: token('colors.pink.100'),
      200: token('colors.pink.200'),
      300: token('colors.pink.300'),
      400: token('colors.pink.400'),
      500: token('colors.pink.500'),
      600: token('colors.pink.600'),
      700: token('colors.pink.700'),
      800: token('colors.pink.800'),
      900: token('colors.pink.900'),
    },
    white: token('colors.white'),
    black: token('colors.black'),
    yellow: token('colors.yellow'),
  },
  brand: {
    primary: token('colors.brand.primary'),
    primaryLight: token('colors.brand.primaryLight'),
    primaryDark: token('colors.brand.primaryDark'),
  },
  contents: {
    primary: token('colors.contents.primary'),
    secondary: token('colors.contents.secondary'),
    tertiary: token('colors.contents.tertiary'),
    disabled: token('colors.contents.disabled'),
    inverse: token('colors.contents.inverse'),
    link: token('colors.contents.link'),
    linkHover: token('colors.contents.linkHover'),
    error: token('colors.contents.error'),
    success: token('colors.contents.success'),
    warning: token('colors.contents.warning'),
  },
  background: {
    default: token('colors.bg.primary'),
    paper: token('colors.bg.secondary'),
    subtle: token('colors.bg.tertiary'),
    hover: token('colors.bg.hover'),
    active: token('colors.bg.active'),
    disabled: token('colors.bg.disabled'),
  },
  border: {
    default: token('colors.border.default'),
    subtle: token('colors.border.subtle'),
    strong: token('colors.border.strong'),
    hover: token('colors.border.hover'),
    focus: token('colors.border.focus'),
    error: token('colors.border.error'),
    success: token('colors.border.success'),
    warning: token('colors.border.warning'),
  },
  // コンポーネント固有のカラー
  button: {
    primary: {
      bg: token('colors.brand.primary'),
      bgHover: token('colors.blue.600'),
      bgActive: token('colors.blue.700'),
      bgDisabled: token('colors.gray.300'),
      text: token('colors.white'),
      textDisabled: token('colors.gray.500'),
      border: token('colors.brand.primary'),
      borderHover: token('colors.blue.600'),
    },
    secondary: {
      bg: token('colors.white'),
      bgHover: token('colors.gray.50'),
      bgActive: token('colors.gray.100'),
      bgDisabled: token('colors.gray.100'),
      text: token('colors.gray.700'),
      textDisabled: token('colors.gray.400'),
      border: token('colors.gray.300'),
      borderHover: token('colors.gray.400'),
    },
    outline: {
      bg: 'transparent',
      bgHover: token('colors.blue.50'),
      bgActive: token('colors.blue.100'),
      bgDisabled: 'transparent',
      text: token('colors.brand.primary'),
      textDisabled: token('colors.gray.400'),
      border: token('colors.brand.primary'),
      borderHover: token('colors.blue.600'),
      borderDisabled: token('colors.gray.300'),
    },
    danger: {
      bg: token('colors.red.600'),
      bgHover: token('colors.red.700'),
      bgActive: token('colors.red.800'),
      bgDisabled: token('colors.gray.300'),
      text: token('colors.white'),
      textDisabled: token('colors.gray.500'),
      border: token('colors.red.600'),
      borderHover: token('colors.red.700'),
    },
  },
  input: {
    bg: token('colors.white'),
    bgDisabled: token('colors.gray.100'),
    text: token('colors.gray.900'),
    textDisabled: token('colors.gray.500'),
    placeholder: token('colors.gray.500'),
    border: token('colors.gray.300'),
    borderHover: token('colors.gray.400'),
    borderFocus: token('colors.brand.primary'),
    borderError: token('colors.red.500'),
    borderSuccess: token('colors.green.500'),
    label: token('colors.gray.700'),
    helperText: token('colors.gray.600'),
    errorText: token('colors.red.700'),
  },
  accordion: {
    bg: token('colors.white'),
    bgHover: token('colors.gray.50'),
    bgActive: token('colors.gray.100'),
    bgOpen: token('colors.gray.50'),
    border: token('colors.gray.300'),
    text: token('colors.gray.900'),
    icon: token('colors.gray.600'),
  },
  breadcrumbs: {
    text: token('colors.gray.600'),
    textCurrent: token('colors.gray.900'),
    link: token('colors.blue.700'),
    linkHover: token('colors.blue.800'),
    separator: token('colors.gray.400'),
  },
  focus: {
    ring: token('colors.blue.500'),
    background: token('colors.yellow'),
    outline: token('colors.black'),
    text: token('colors.black'),
  },
  feedback: {
    error: {
      bg: token('colors.red.50'),
      border: token('colors.red.300'),
      text: token('colors.red.800'),
      icon: token('colors.red.600'),
    },
    success: {
      bg: token('colors.green.50'),
      border: token('colors.green.300'),
      text: token('colors.green.800'),
      icon: token('colors.green.600'),
    },
    warning: {
      bg: token('colors.orange.50'),
      border: token('colors.orange.300'),
      text: token('colors.orange.900'),
      icon: token('colors.orange.600'),
    },
    info: {
      bg: token('colors.blue.50'),
      border: token('colors.blue.300'),
      text: token('colors.blue.800'),
      icon: token('colors.blue.600'),
    },
  },
} as const;

// プリミティブカラーのエイリアス（後方互換性）
export const primitive = colors.primitive;

// スペーシングトークン
export const spacing = {
  scale: {
    0: token('spacing.0'),
    0.5: token('spacing.0.5'),
    0.75: token('spacing.0.75'),
    1: token('spacing.1'),
    2: token('spacing.2'),
    3: token('spacing.3'),
    4: token('spacing.4'),
    5: token('spacing.5'),
    6: token('spacing.6'),
    8: token('spacing.8'),
    10: token('spacing.10'),
    12: token('spacing.12'),
    16: token('spacing.16'),
    20: token('spacing.20'),
    24: token('spacing.24'),
    32: token('spacing.32'),
    40: token('spacing.40'),
    48: token('spacing.48'),
    56: token('spacing.56'),
    64: token('spacing.64'),
  },
  semantic: {
    none: token('spacing.0'),
    xs: token('spacing.1'),
    sm: token('spacing.2'),
    md: token('spacing.4'),
    lg: token('spacing.6'),
    xl: token('spacing.8'),
    '2xl': token('spacing.12'),
    '3xl': token('spacing.16'),
    '4xl': token('spacing.24'),
  },
  button: {
    paddingX: {
      sm: token('spacing.3'),
      md: token('spacing.4'),
      lg: token('spacing.6'),
    },
    paddingY: {
      sm: token('spacing.2'),
      md: token('spacing.3'),
      lg: token('spacing.4'),
    },
    gap: token('spacing.2'),
  },
  input: {
    paddingX: {
      sm: token('spacing.3'),
      md: token('spacing.4'),
      lg: token('spacing.5'),
    },
    paddingY: {
      sm: token('spacing.2'),
      md: token('spacing.3'),
      lg: token('spacing.4'),
    },
    gap: token('spacing.2'),
  },
  card: {
    padding: {
      sm: token('spacing.4'),
      md: token('spacing.6'),
      lg: token('spacing.8'),
    },
    gap: token('spacing.4'),
  },
  layout: {
    container: {
      paddingX: token('spacing.4'),
      maxWidth: '1200px',
    },
    section: {
      paddingY: {
        sm: token('spacing.8'),
        md: token('spacing.12'),
        lg: token('spacing.16'),
      },
    },
    stack: {
      gap: {
        sm: token('spacing.2'),
        md: token('spacing.4'),
        lg: token('spacing.6'),
      },
    },
  },
} as const;

// タイポグラフィトークン
export const typography = {
  fontFamily: {
    base: token('fonts.body'),
    mono: token('fonts.mono'),
    serif: token('fonts.serif'),
  },
  fontSize: {
    xs: token('fontSizes.xs'),
    sm: token('fontSizes.sm'),
    base: token('fontSizes.base'),
    lg: token('fontSizes.lg'),
    xl: token('fontSizes.xl'),
    '2xl': token('fontSizes.2xl'),
    '3xl': token('fontSizes.3xl'),
    '4xl': token('fontSizes.4xl'),
    '5xl': token('fontSizes.5xl'),
    '6xl': token('fontSizes.6xl'),
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  heading: {
    h1: {
      fontSize: token('fontSizes.5xl'),
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: token('fontSizes.4xl'),
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: token('fontSizes.3xl'),
      fontWeight: 600,
      lineHeight: 1.375,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: token('fontSizes.2xl'),
      fontWeight: 600,
      lineHeight: 1.375,
      letterSpacing: '0em',
    },
    h5: {
      fontSize: token('fontSizes.xl'),
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: token('fontSizes.lg'),
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
  },
  body: {
    large: {
      fontSize: token('fontSizes.lg'),
      fontWeight: 400,
      lineHeight: 1.625,
    },
    base: {
      fontSize: token('fontSizes.base'),
      fontWeight: 400,
      lineHeight: 1.5,
    },
    small: {
      fontSize: token('fontSizes.sm'),
      fontWeight: 400,
      lineHeight: 1.5,
    },
    xs: {
      fontSize: token('fontSizes.xs'),
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  textStyle: {
    caption: {
      fontSize: token('fontSizes.sm'),
      fontWeight: 400,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: token('fontSizes.xs'),
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },
    code: {
      fontFamily: token('fonts.mono'),
      fontSize: token('fontSizes.sm'),
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
} as const;

// シャドウトークン
export const shadows = {
  boxShadow: {
    none: token('shadows.none'),
    sm: token('shadows.sm'),
    base: token('shadows.base'),
    md: token('shadows.md'),
    lg: token('shadows.lg'),
    xl: token('shadows.xl'),
    '2xl': token('shadows.2xl'),
    inner: token('shadows.inner'),
  },
  focusRing: {
    default: token('shadows.focusRing'),
    error: token('shadows.focusRingError'),
    success: token('shadows.focusRingSuccess'),
  },
} as const;

// ボーダー半径トークン
export const radii = {
  borderRadius: {
    none: token('radii.none'),
    sm: token('radii.sm'),
    base: token('radii.base'),
    md: token('radii.md'),
    lg: token('radii.lg'),
    xl: token('radii.xl'),
    '2xl': token('radii.2xl'),
    '3xl': token('radii.3xl'),
    full: token('radii.full'),
  },
} as const;

// トランジショントークン
export const transitions = {
  duration: {
    fast: token('durations.fast'),
    base: token('durations.base'),
    slow: token('durations.slow'),
    slower: token('durations.slower'),
  },
  easing: {
    linear: token('easings.linear'),
    easeIn: token('easings.easeIn'),
    easeOut: token('easings.easeOut'),
    easeInOut: token('easings.easeInOut'),
    smooth: token('easings.smooth'),
    bounce: token('easings.bounce'),
  },
} as const;

// ボーダートークン
export const borders = {
  none: 'none',
  default: `${token('borderWidths.thin')} solid ${token('colors.border.default')}`,
  width: {
    none: token('borderWidths.none'),
    thin: token('borderWidths.thin'),
    base: token('borderWidths.base'),
    thick: token('borderWidths.thick'),
    thicker: token('borderWidths.thicker'),
  },
} as const;

// ブレークポイント（参考値）
export const breakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
} as const;

// 後方互換用に値オブジェクトを直接参照できるようにする
export const breakpointValues = breakpoints.values;

// フォーカストークン（トップレベル）
export const focus = {
  ring: token('colors.blue.500'),
  background: token('colors.yellow'),
  outline: token('colors.black'),
  text: token('colors.black'),
} as const;

// アクセシビリティレベル（WCAGレベル別のスタイル定義）
const focusStyles = {
  A: {
    background: 'transparent',
    outline: token('colors.blue.300'),
    outlineWidth: '0.125rem',
    outlineOffset: '0',
    text: token('colors.black'),
  },
  AA: {
    background: token('colors.blue.50'),
    outline: token('colors.blue.700'),
    outlineWidth: '0.1875rem',
    outlineOffset: '0.125rem',
    text: token('colors.gray.900'),
  },
  AAA: {
    background: token('colors.yellow'),
    outline: token('colors.black'),
    outlineWidth: '0.25rem',
    outlineOffset: '0.125rem',
    text: token('colors.black'),
  },
} as const;

const dangerFocusStyles = {
  A: {
    background: 'transparent',
    outline: token('colors.red.300'),
    outlineWidth: '0.125rem',
    outlineOffset: '0',
    text: token('colors.black'),
  },
  AA: {
    background: token('colors.red.50'),
    outline: token('colors.red.700'),
    outlineWidth: '0.1875rem',
    outlineOffset: '0.125rem',
    text: token('colors.gray.900'),
  },
  AAA: {
    background: token('colors.yellow'),
    outline: token('colors.black'),
    outlineWidth: '0.25rem',
    outlineOffset: '0.125rem',
    text: token('colors.black'),
  },
} as const;

const buttonColors = {
  A: {
    primary: {
      bg: token('colors.blue.400'),
      text: token('colors.white'),
      border: token('colors.blue.400'),
    },
    secondary: {
      bg: token('colors.gray.200'),
      text: token('colors.gray.700'),
      border: token('colors.gray.300'),
    },
    danger: {
      bg: token('colors.red.400'),
      text: token('colors.white'),
      border: token('colors.red.400'),
    },
  },
  AA: {
    primary: {
      bg: token('colors.blue.500'),
      text: token('colors.white'),
      border: token('colors.blue.500'),
    },
    secondary: {
      bg: token('colors.gray.100'),
      text: token('colors.gray.900'),
      border: token('colors.gray.400'),
    },
    danger: {
      bg: token('colors.red.600'),
      text: token('colors.white'),
      border: token('colors.red.600'),
    },
  },
  AAA: {
    primary: {
      bg: token('colors.blue.700'),
      text: token('colors.white'),
      border: token('colors.blue.800'),
    },
    secondary: {
      bg: token('colors.white'),
      text: token('colors.gray.900'),
      border: token('colors.gray.600'),
    },
    danger: {
      bg: token('colors.red.700'),
      text: token('colors.white'),
      border: token('colors.red.800'),
    },
  },
} as const;

const breadcrumbsColors = {
  A: {
    text: token('colors.gray.500'),
    textCurrent: token('colors.gray.700'),
    link: token('colors.blue.500'),
    linkHover: token('colors.blue.600'),
    separator: token('colors.gray.400'),
    focusOutline: token('colors.blue.300'),
    focusBackground: token('colors.blue.50'),
  },
  AA: {
    text: token('colors.gray.600'),
    textCurrent: token('colors.gray.900'),
    link: token('colors.blue.700'),
    linkHover: token('colors.blue.800'),
    separator: token('colors.gray.400'),
    focusOutline: token('colors.blue.500'),
    focusBackground: token('colors.blue.50'),
  },
  AAA: {
    text: token('colors.gray.700'),
    textCurrent: token('colors.gray.900'),
    link: token('colors.blue.800'),
    linkHover: token('colors.blue.900'),
    separator: token('colors.gray.500'),
    focusOutline: token('colors.black'),
    focusBackground: token('colors.yellow'),
  },
} as const;

const textColors = {
  A: {
    primary: token('colors.gray.600'),
    secondary: token('colors.gray.500'),
    link: token('colors.blue.400'),
  },
  AA: {
    primary: token('colors.gray.900'),
    secondary: token('colors.gray.700'),
    link: token('colors.blue.700'),
  },
  AAA: {
    primary: token('colors.black'),
    secondary: token('colors.gray.800'),
    link: token('colors.blue.800'),
  },
} as const;

const sizeRequirements = {
  A: {
    minFontSize: '1.5rem',
    minFontSizeBold: '1.15625rem',
    description: '大きいテキスト（18pt/1.5rem以上、または14pt/1.15625rem太字以上）のみ使用可能',
  },
  AA: {
    minFontSize: '1rem',
    minFontSizeBold: '0.875rem',
    description: '通常サイズのテキストから使用可能',
  },
  AAA: {
    minFontSize: '0.75rem',
    minFontSizeBold: '0.75rem',
    description: 'すべてのサイズで最高の可読性を提供',
  },
} as const;

const useCases = {
  A: {
    title: 'レベルA（最低限）',
    description: '法的義務の最低ライン',
    useCases: [
      '大きなテキストのみの簡易ページ',
      'プロトタイプやMVP',
      '一時的なランディングページ',
    ],
    warnings: [
      '⚠️ 視覚障害者には使いにくい可能性',
      '⚠️ 低コントラストの環境では見えにくい',
    ],
  },
  AA: {
    title: 'レベルAA（推奨）★',
    description: 'ほとんどのWebサイトで推奨される標準',
    useCases: [
      'コーポレートサイト',
      'ECサイト',
      'ブログ・メディア',
      '一般的なWebアプリケーション',
    ],
    benefits: [
      '✅ 法的要件を満たす',
      '✅ ほとんどのユーザーに使いやすい',
      '✅ バランスの取れたデザイン',
    ],
  },
  AAA: {
    title: 'レベルAAA（最高）',
    description: '最高レベルのアクセシビリティ',
    useCases: [
      '公共機関のWebサイト',
      '医療・福祉サービス',
      '金融機関',
      '教育機関',
      '高齢者向けサービス',
    ],
    benefits: [
      '✅ すべてのユーザーに優しい',
      '✅ 視覚障害者も快適に使用可能',
      '✅ ブランド信頼性の向上',
    ],
  },
} as const;

const contrastDemos = {
  ratio3to1: {
    text: token('colors.gray.500'),
    background: token('colors.white'),
    actualRatio: '3.26:1',
    label: '見にくい',
  },
  ratio4_5to1: {
    text: token('colors.gray.600'),
    background: token('colors.white'),
    actualRatio: '4.55:1',
    label: 'ギリギリ読める',
  },
  ratio7to1: {
    text: token('colors.gray.800'),
    background: token('colors.white'),
    actualRatio: '11.6:1',
    label: '非常に読みやすい',
  },
} as const;

export const accessibilityLevels = {
  focus: focusStyles,
  dangerFocus: dangerFocusStyles,
  button: buttonColors,
  breadcrumbs: breadcrumbsColors,
  text: textColors,
  size: sizeRequirements,
  useCases,
  contrastDemos,
} as const;

// アイコン
export { icons, philosophy, component, concept } from './icons';

// 統合エクスポート
export const tokens = {
  colors,
  typography,
  spacing,
  shadows,
  radii,
  transitions,
  borders,
  breakpoints,
  breakpointValues,
  focus,
  accessibilityLevels,
} as const;

// 型エクスポート（後方互換性）
export type ColorTokens = typeof colors;
export type TypographyTokens = typeof typography;
export type SpacingTokens = typeof spacing;
export type ShadowTokens = typeof shadows;
export type RadiiTokens = typeof radii;
export type TransitionTokens = typeof transitions;
export type BorderTokens = typeof borders;
export type Breakpoints = typeof breakpoints;
export type WCAGLevel = 'A' | 'AA' | 'AAA';
export type AccessibilityLevels = typeof accessibilityLevels;
export type { IconTokens } from './icons';
export type DesignTokens = typeof tokens;
