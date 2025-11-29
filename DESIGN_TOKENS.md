# 🎨 デザイントークンガイド

> 一貫性と保守性を実現する、デザインシステムの基礎

## 📖 デザイントークンとは？

デザイントークンは、**デザインの意思決定を表す最小単位**です。

色、サイズ、余白、フォントなどの値に**意味のある名前**を付けることで、
デザインシステム全体で一貫性を保ち、変更を容易にします。

### 従来の方法（トークンなし）

```tsx
// ❌ 問題点：値が散在し、変更が大変
const Button = () => (
  <button style={{
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: '#2196f3',
    color: '#ffffff',
  }}>
    クリック
  </button>
);

const Input = () => (
  <input style={{
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  }} />
);
```

**問題点：**
- 同じ値が複数箇所に散在
- 一括変更ができない
- デザインの意図が不明
- テーマ切り替えが困難

### トークンを使った方法

```tsx
// ✅ トークンで一元管理
import { spacing, radii, colors } from './tokens';

const Button = () => (
  <button style={{
    padding: `${spacing.button.paddingY.md} ${spacing.button.paddingX.md}`,
    borderRadius: radii.button.md,
    backgroundColor: colors.button.primary.bg,
    color: colors.button.primary.text,
  }}>
    クリック
  </button>
);

const Input = () => (
  <input style={{
    padding: `${spacing.input.paddingY.md} ${spacing.input.paddingX.md}`,
    borderRadius: radii.input.md,
    border: `1px solid ${colors.input.border}`,
  }} />
);
```

**メリット：**
- ✅ 1箇所の変更で全体に反映
- ✅ デザインの意図が明確
- ✅ テーマ切り替えが容易
- ✅ TypeScriptの型推論で安全

---

## 🏗️ 3層トークン構造

このプロジェクトでは、スケーラビリティを高めるために**3層構造**を採用しています。

### 構造図

```
┌─────────────────────────────────────┐
│   Primitive Tokens（基礎レイヤー）    │  生の値（色コード、px値など）
│   primitive.blue[500] = "#2196f3"   │  ↓ 意味を与える
├─────────────────────────────────────┤
│   Semantic Tokens（意味レイヤー）     │  用途に応じた名前
│   colors.contents.primary = gray[900]   │  ↓ コンポーネントに特化
├─────────────────────────────────────┤
│   Component Tokens（実装レイヤー）    │  コンポーネント専用の値
│   colors.button.primary.bg = blue   │
└─────────────────────────────────────┘
```

### 1️⃣ Primitive Tokens（プリミティブトークン）

**役割：** 生の値を定義。意味を持たない基本パーツ。

**場所：** `src/design-system/tokens/colors.ts` 等の`primitive`オブジェクト

```typescript
// colors.ts
export const primitive = {
  // グレースケール
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    // ...
    900: '#212121',
  },

  // ブルー
  blue: {
    50: '#e3f2fd',
    100: '#bbdefb',
    // ...
    900: '#0d47a1',
  },
}
```

**使い方：**
- ❌ 直接使用しない
- ✅ Semantic Tokensの定義に使用

---

### 2️⃣ Semantic Tokens（セマンティックトークン）

**役割：** Primitiveに意味のある名前を付ける。アプリ全体で再利用可能。

**場所：** `src/design-system/tokens/index.ts` のexport

```typescript
// colors.ts
export const text = {
  primary: primitive.gray[900],    // メインテキスト
  secondary: primitive.gray[700],  // 副次的なテキスト
  link: primitive.blue[700],       // リンク
}

export const background = {
  default: primitive.white,        // 背景
  paper: primitive.gray[50],       // カード背景
}
```

**使い方：**
- ✅ コンポーネント内で使用可能
- ✅ Component Tokensの定義に使用

---

### 3️⃣ Component Tokens（コンポーネントトークン）

**役割：** 特定のコンポーネント専用の値。Semantic Tokensを組み合わせて作る。

**場所：** `src/design-system/tokens/` の各ファイル

```typescript
// colors.ts
export const button = {
  primary: {
    bg: brand.primary,              // 背景色
    bgHover: primitive.blue[600],   // ホバー時
    text: primitive.white,          // テキスト
  },
  secondary: {
    bg: primitive.white,
    bgHover: primitive.gray[50],
    text: primitive.gray[700],
  },
}
```

**使い方：**
- ✅ コンポーネントの実装で使用

---

## 🎨 トークンカテゴリ

### 1. Colors（カラー）

**ファイル：** `src/design-system/tokens/colors.ts`

#### Primitive Colors

| カテゴリ | 範囲 | 用途 |
|---------|------|------|
| `gray` | 50-900 | グレースケール（背景、ボーダー、テキスト） |
| `blue` | 50-900 | プライマリカラー |
| `red` | 50-900 | エラー、危険 |
| `green` | 50-900 | 成功 |
| `orange` | 50-900 | 警告 |

#### Semantic Colors

```typescript
// テキスト色
colors.contents.primary      // 主要テキスト（黒に近い）
colors.contents.secondary    // 副次的テキスト
colors.contents.link         // リンク（青）
colors.contents.error        // エラーテキスト（赤）

// 背景色
colors.background.default  // デフォルト背景（白）
colors.background.paper    // カード背景（薄いグレー）
colors.background.hover    // ホバー時

// ボーダー色
colors.border.default      // デフォルトボーダー
colors.border.focus        // フォーカス時（青）
colors.border.error        // エラー時（赤）
```

#### Component Colors

```typescript
// ボタン
colors.button.primary.bg
colors.button.primary.bgHover
colors.button.primary.text

// インプット
colors.input.bg
colors.input.border
colors.input.borderFocus
colors.input.errorText
```

#### アクセシビリティ配慮

すべてのテキスト色は**WCAG 2.1 AA準拠**（コントラスト比4.5:1以上）

```typescript
// コントラスト比の確認
colors.contents.primary   // 16.10:1 (AAA) ✅
colors.contents.secondary // 7.00:1 (AAA) ✅
colors.contents.tertiary  // 4.55:1 (AA) ✅
```

---

### 2. Spacing（スペーシング）

**ファイル：** `src/design-system/tokens/spacing.ts`

#### 8pxグリッドシステム

**なぜ8px？**
- 倍数で計算しやすい（2, 4でも割り切れる）
- デザイナーとの共通言語（Figma、Sketchの標準）
- レティナディスプレイ対応
- 業界標準（Material Design等）

#### Scale（基本スケール）

```typescript
spacing.scale[0]  = '0'       // 0px
spacing.scale[1]  = '0.25rem' // 4px
spacing.scale[2]  = '0.5rem'  // 8px
spacing.scale[3]  = '0.75rem' // 12px
spacing.scale[4]  = '1rem'    // 16px
spacing.scale[6]  = '1.5rem'  // 24px
spacing.scale[8]  = '2rem'    // 32px
spacing.scale[12] = '3rem'    // 48px
spacing.scale[16] = '4rem'    // 64px
```

#### 使い分けガイド

| 用途 | サイズ | 例 |
|------|-------|-----|
| 関連要素の間 | 4-8px | アイコンとテキスト |
| セクション内 | 16-24px | ボタンとボタン |
| セクション間 | 32-48px | 見出しとコンテンツ |
| ページレイアウト | 64px以上 | ヒーローセクション |

#### Component Spacing

```typescript
// ボタン
spacing.button.paddingX.md = '16px'  // 横パディング
spacing.button.paddingY.md = '12px'  // 縦パディング

// インプット
spacing.input.paddingX.md = '16px'
spacing.input.paddingY.md = '12px'
spacing.input.gap = '8px'            // ラベルと入力欄の間
```

---

### 3. Typography（タイポグラフィ）

**ファイル：** `src/design-system/tokens/typography.ts`

#### Font Size

**rem単位を使う理由：**
- ユーザーのブラウザ設定を尊重（アクセシビリティ）
- 拡大縮小が容易
- レスポンシブデザインに最適

```typescript
typography.fontSize.xs   = '0.75rem'  // 12px
typography.fontSize.sm   = '0.875rem' // 14px
typography.fontSize.base = '1rem'     // 16px（基準）
typography.fontSize.lg   = '1.125rem' // 18px
typography.fontSize.xl   = '1.25rem'  // 20px
typography.fontSize['2xl'] = '1.5rem'   // 24px
typography.fontSize['3xl'] = '1.875rem' // 30px
typography.fontSize['4xl'] = '2.25rem'  // 36px
```

#### Line Height

**WCAG推奨：** 本文は1.5以上

```typescript
typography.lineHeight.tight   = 1.25   // 大見出し用
typography.lineHeight.normal  = 1.5    // 本文用（推奨）
typography.lineHeight.relaxed = 1.625  // 長文用
```

#### Font Weight

```typescript
typography.fontWeight.normal    = 400
typography.fontWeight.medium    = 500
typography.fontWeight.semibold  = 600
typography.fontWeight.bold      = 700
```

#### Heading Presets

見出しごとのプリセット：

```typescript
typography.heading.h1 = {
  fontSize: '3rem',        // 48px
  fontWeight: 700,
  lineHeight: 1.25,
  letterSpacing: '-0.025em',
}

typography.heading.h2 = {
  fontSize: '2.25rem',     // 36px
  fontWeight: 700,
  lineHeight: 1.25,
}
```

---

### 4. Radii（角丸）

**ファイル：** `src/design-system/tokens/radii.ts`

```typescript
radii.borderRadius.none  = '0'
radii.borderRadius.sm    = '0.125rem'  // 2px
radii.borderRadius.base  = '0.25rem'   // 4px
radii.borderRadius.md    = '0.375rem'  // 6px
radii.borderRadius.lg    = '0.5rem'    // 8px
radii.borderRadius.xl    = '0.75rem'   // 12px
radii.borderRadius['2xl'] = '1rem'      // 16px
radii.borderRadius.full  = '9999px'    // 完全な円形
```

#### Component Radii

```typescript
radii.button.md = '8px'   // ボタンの角丸
radii.input.md = '8px'    // インプットの角丸
radii.card.lg = '12px'    // カードの角丸
radii.modal = '16px'      // モーダルの角丸
```

---

### 5. Breakpoints（ブレークポイント）

**ファイル：** `src/design-system/tokens/breakpoints.ts`

**モバイルファースト設計**

```typescript
breakpoints.xs  = 0      // スマホ（デフォルト）
breakpoints.sm  = 640    // 大きめスマホ
breakpoints.md  = 768    // タブレット
breakpoints.lg  = 1024   // ノートPC
breakpoints.xl  = 1280   // デスクトップ
breakpoints['2xl'] = 1536   // 大型ディスプレイ
```

#### 使用例

```tsx
// メディアクエリの生成
const styles = {
  padding: spacing.scale[4],
  [`@media (min-width: ${breakpoints.md}px)`]: {
    padding: spacing.scale[8],
  },
}
```

---

### 6. Accessibility Levels（アクセシビリティレベル）

**ファイル：** `src/design-system/tokens/accessibility-levels.ts`

WCAGレベルに応じたフォーカススタイル：

```typescript
accessibilityLevels.focus.A = {
  outline: '#90caf9',
  outlineWidth: '2px',
  background: '#ffffff',
  text: '#000000',
}

accessibilityLevels.focus.AA = {
  outline: '#1976d2',
  outlineWidth: '3px',
  outlineOffset: '2px',
  background: '#e3f2fd',
  text: '#000000',
}

accessibilityLevels.focus.AAA = {
  outline: '#000000',
  outlineWidth: '4px',
  outlineOffset: '2px',
  background: '#ffff00',
  text: '#000000',
}
```

---

## 🛠️ トークンの使い方

### 基本的な使い方

```tsx
import { colors, spacing, radii, typography } from '@/design-system/tokens';

const MyComponent = () => {
  const styles: React.CSSProperties = {
    // カラー
    backgroundColor: colors.button.primary.bg,
    color: colors.button.primary.text,

    // スペーシング
    padding: `${spacing.button.paddingY.md} ${spacing.button.paddingX.md}`,
    marginBottom: spacing.scale[4],

    // ボーダー
    borderRadius: radii.button.md,

    // タイポグラフィ
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  };

  return <button style={styles}>クリック</button>;
};
```

### TypeScriptの型推論

```typescript
// トークンの値は型推論される
import { spacing } from '@/design-system/tokens';

// ✅ 自動補完が効く
spacing.scale[4]   // '1rem'
spacing.button.    // paddingX, paddingY, gap が候補に出る

// ❌ 存在しない値はエラー
spacing.scale[999] // Type error!
```

---

## 🎯 実践例

### 例1: カスタムボタン

```tsx
import { colors, spacing, radii, typography } from '@/design-system/tokens';

const CustomButton: React.FC<{ variant: 'primary' | 'secondary' }> = ({ variant, children }) => {
  const styles: React.CSSProperties = {
    // トークンを使用
    padding: `${spacing.button.paddingY.md} ${spacing.button.paddingX.md}`,
    borderRadius: radii.button.md,
    backgroundColor: colors.button[variant].bg,
    color: colors.button[variant].text,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  return <button style={styles}>{children}</button>;
};
```

### 例2: レスポンシブカード

```tsx
import { colors, spacing, radii, breakpoints } from '@/design-system/tokens';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Card = ({ children }) => {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  const styles: React.CSSProperties = {
    backgroundColor: colors.background.paper,
    borderRadius: radii.card.lg,
    padding: isMobile ? spacing.scale[4] : spacing.scale[6],
    marginBottom: spacing.scale[4],
  };

  return <div style={styles}>{children}</div>;
};
```

---

## 🔄 トークンの変更方法

### 1. Primitive Tokenの変更

**影響範囲：** すべてのトークン

```typescript
// colors.ts
export const primitive = {
  blue: {
    500: '#2196f3', // ← この値を変更すると...
  }
}

// ↓ 以下すべてに影響
brand.primary = primitive.blue[500]
colors.button.primary.bg = brand.primary
```

### 2. Semantic Tokenの変更

**影響範囲：** それを参照するComponent Token

```typescript
// colors.ts
export const brand = {
  primary: primitive.blue[500], // ← ここを変更
}

// ↓ 以下に影響
colors.button.primary.bg = brand.primary
colors.input.borderFocus = brand.primary
```

### 3. Component Tokenの変更

**影響範囲：** そのコンポーネントのみ

```typescript
// colors.ts
export const button = {
  primary: {
    bg: brand.primary, // ← ここを変更
  }
}

// ↓ Buttonコンポーネントのみ影響
```

---

## 📚 参考資料

- [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)
- [Theo (Salesforce Design Tokens)](https://github.com/salesforce-ux/theo)
- [Material Design Tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Tailwind CSS Design System](https://tailwindcss.com/docs/customizing-colors)

---

## 🎓 学習リソース

### 推奨記事
- [Design Tokens for Dummies](https://uxdesign.cc/design-tokens-for-dummies-8acebf010d71)
- [Building a Design System with Design Tokens](https://css-tricks.com/what-are-design-tokens/)
- [Naming Tokens in Design Systems](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676)

### 動画
- [Design Tokens - Introduction](https://www.youtube.com/watch?v=wtTstdiBuUk) (英語)

---

ご質問や改善提案は [GitHub Issues](https://github.com/andsaki/accessibility-learning/issues) へどうぞ！

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
