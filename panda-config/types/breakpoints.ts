/**
 * ブレークポイントトークン定義
 *
 * panda.config.ts と同じ値を使用してレスポンシブデザインのための
 * ブレークポイント、メディアクエリ、コンテナ幅を定義
 *
 * 嬉しいポイント:
 * - 一貫したブレークポイント定義
 * - メディアクエリのヘルパー関数
 * - デバイス参照情報
 */
export const breakpointValues = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const media = {
  xs: `@media (min-width: ${breakpointValues.xs}px)`,
  sm: `@media (min-width: ${breakpointValues.sm}px)`,
  md: `@media (min-width: ${breakpointValues.md}px)`,
  lg: `@media (min-width: ${breakpointValues.lg}px)`,
  xl: `@media (min-width: ${breakpointValues.xl}px)`,
  '2xl': `@media (min-width: ${breakpointValues['2xl']}px)`,
} as const;

export const mediaMax = {
  xs: `@media (max-width: ${breakpointValues.sm - 1}px)`,
  sm: `@media (max-width: ${breakpointValues.md - 1}px)`,
  md: `@media (max-width: ${breakpointValues.lg - 1}px)`,
  lg: `@media (max-width: ${breakpointValues.xl - 1}px)`,
  xl: `@media (max-width: ${breakpointValues['2xl'] - 1}px)`,
} as const;

export const mediaOnly = {
  xs: `@media (max-width: ${breakpointValues.sm - 1}px)`,
  sm: `@media (min-width: ${breakpointValues.sm}px) and (max-width: ${breakpointValues.md - 1}px)`,
  md: `@media (min-width: ${breakpointValues.md}px) and (max-width: ${breakpointValues.lg - 1}px)`,
  lg: `@media (min-width: ${breakpointValues.lg}px) and (max-width: ${breakpointValues.xl - 1}px)`,
  xl: `@media (min-width: ${breakpointValues.xl}px) and (max-width: ${breakpointValues['2xl'] - 1}px)`,
  '2xl': `@media (min-width: ${breakpointValues['2xl']}px)`,
} as const;

export const container = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

export const deviceReference = {
  mobile: {
    description: 'スマートフォン',
    range: '0px〜767px',
    breakpoints: ['xs', 'sm'],
    examples: ['iPhone 14', 'Pixel 7', 'Galaxy S23'],
  },
  tablet: {
    description: 'タブレット',
    range: '768px〜1023px',
    breakpoints: ['md'],
    examples: ['iPad', 'Galaxy Tab', 'Surface Go'],
  },
  desktop: {
    description: 'デスクトップPC・ノートPC',
    range: '1024px〜',
    breakpoints: ['lg', 'xl', '2xl'],
    examples: ['MacBook', 'iMac', 'Windows PC'],
  },
} as const;

export const breakpoints = {
  values: breakpointValues,
  media,
  mediaMax,
  mediaOnly,
  container,
  deviceReference,
} as const;

export type Breakpoints = typeof breakpoints;
