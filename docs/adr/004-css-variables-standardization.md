# ADR 004: CSS変数の統一とデザイントークン化

## ステータス

承認済み (Accepted) - 2025-12-04

## コンテキスト

Panda CSSレシピファイルにおいて、フォーカススタイルの実装方法が統一されておらず、保守性とスケーラビリティに課題があった：

1. **実装方法の不統一**:
   - `button.ts`: 直接スタイル値を記述（`outlineColor: "blue.300"`）
   - `input.ts`, `textarea.ts`: CSS変数を使用（`"--focus-outline": "#64b5f6"`）
   - `colorpicker.ts`: 新規追加時にどちらの方式を採用すべきか不明確

2. **マジックストリング問題**:
   - CSS変数名がハードコード（`"--focus-outline"`）でタイポのリスク
   - 同じCSS変数を複数のファイルで参照する際に一貫性を保証できない

3. **デザイントークンの未活用**:
   - ハードコードされた色値（`#64b5f6`, `#000000`など）
   - Pandaのデザイントークンシステムを活用できていない

4. **globalCssとの連携**:
   - `panda.config.ts`のglobalCssでCSS変数を参照しているが、レシピとの統一性がない

## 検討した選択肢

### 選択肢1: 直接スタイル方式（buttonの元実装）

**実装例**:
```typescript
const focusStyles = {
  A: {
    backgroundColor: "transparent",
    outlineColor: "blue.300",
    outlineWidth: "0.125rem",
    outlineOffset: "0",
  },
};

// 使用時
_focusVisible: {
  backgroundColor: focusStyles.A.backgroundColor,
  outlineColor: focusStyles.A.outlineColor,
  outlineWidth: focusStyles.A.outlineWidth,
  outlineOffset: focusStyles.A.outlineOffset,
}
```

**メリット**:
- ✅ シンプルで理解しやすい
- ✅ TypeScriptの型チェックが効く
- ✅ 静的解析が容易

**デメリット**:
- ❌ globalCssとの統一性がない
- ❌ 実行時の動的変更ができない
- ❌ CSS変数の利点を活かせない
- ❌ 冗長な記述（各プロパティを個別に指定）

---

### 選択肢2: CSS変数方式（input/textareaの元実装）

**実装例**:
```typescript
const focusVars = {
  A: {
    "--focus-outline": "#64b5f6", // ハードコード
    "--focus-outline-width": "0.125rem",
    "--focus-outline-offset": "0",
  },
};

// 使用時（globalCss）
_focusVisible: {
  outlineColor: "var(--focus-outline)",
  outlineWidth: "var(--focus-outline-width)",
}
```

**メリット**:
- ✅ globalCssとの統一性
- ✅ 実行時の動的変更が可能
- ✅ スプレッド構文で簡潔に記述可能

**デメリット**:
- ❌ CSS変数名がマジックストリング
- ❌ デザイントークンを使っていない
- ❌ ハードコードされた色値

---

### 選択肢3: CSS変数 + 定数化 + デザイントークン（推奨）

**実装例**:
```typescript
// constants.ts
export const CSS_VARS = {
  FOCUS: {
    BG: "--focus-bg",
    TEXT: "--focus-text",
    OUTLINE: "--focus-outline",
    OUTLINE_WIDTH: "--focus-outline-width",
    OUTLINE_OFFSET: "--focus-outline-offset",
  },
} as const;

// レシピファイル
import { CSS_VARS } from "./constants";

const focusVars = {
  A: {
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.blue.300}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.thin}",
    [CSS_VARS.FOCUS.OUTLINE_OFFSET]: "0",
  },
  AA: {
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.blue.700}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.base}",
    [CSS_VARS.FOCUS.OUTLINE_OFFSET]: "{spacing.0.5}",
  },
  AAA: {
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.gray.900}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.thick}",
    [CSS_VARS.FOCUS.OUTLINE_OFFSET]: "{spacing.0.5}",
  },
};

// 使用時
_focusVisible: {
  outlineColor: `var(${CSS_VARS.FOCUS.OUTLINE})`,
  outlineWidth: `var(${CSS_VARS.FOCUS.OUTLINE_WIDTH})`,
  outlineOffset: `var(${CSS_VARS.FOCUS.OUTLINE_OFFSET})`,
  outlineStyle: "solid",
}
```

**メリット**:
- ✅ **型安全**: `CSS_VARS.FOCUS.OUTLINE`でタイポ防止
- ✅ **一貫性**: 全レシピで同じCSS変数名を使用
- ✅ **保守性**: 変数名の変更が1箇所で済む
- ✅ **デザイントークン**: Pandaトークン（`{colors.blue.300}`）を活用
- ✅ **globalCssとの統一**: `panda.config.ts`でも同じ定数を使用
- ✅ **実行時変更**: CSS変数の利点を保持
- ✅ **スプレッド構文**: 簡潔な記述が可能

**デメリット**:
- ⚠️ 初期セットアップがやや複雑
- ⚠️ Computed property nameの理解が必要

---

## 決定

**選択肢3: CSS変数 + 定数化 + デザイントークン** を採用する

## 理由

### 1. 型安全性とタイポ防止 🛡️

```typescript
// ❌ タイポしてもエラーにならない
"--focus-outlien": "#64b5f6"  // typo!

// ✅ タイポするとTypeScriptエラー
[CSS_VARS.FOCUS.OUTLIEN]: "{colors.blue.300}"  // Property 'OUTLIEN' does not exist
```

### 2. 一貫性とメンテナンス性 🔧

**変更前（不統一）**:
- button.ts: 直接スタイル
- input.ts: `"--focus-outline"`
- textarea.ts: `"--focus-outline"`
- colorpicker.ts: どちらを採用すべき？

**変更後（統一）**:
- 全レシピで `CSS_VARS.FOCUS.OUTLINE` を使用
- CSS変数名を変更する場合、`constants.ts`の1箇所を修正するだけ

### 3. デザイントークンの活用 🎨

**変更前**:
```typescript
"--focus-outline": "#64b5f6"  // ハードコード
"--focus-outline-width": "0.125rem"  // ハードコード
```

**変更後**:
```typescript
[CSS_VARS.FOCUS.OUTLINE]: "{colors.blue.300}"  // トークン参照
[CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.thin}"  // トークン参照
```

**メリット**:
- トークンを変更すれば全体に反映される
- デザインシステムの一貫性が保たれる
- `blue.300`の色を変更する際、1箇所の修正で済む

### 4. globalCssとの連携 🔗

**panda.config.ts**:
```typescript
import { CSS_VARS } from "./panda-config/recipes/constants";

globalCss: {
  "button[data-focused]": {
    backgroundColor: `var(${CSS_VARS.FOCUS.BG}) !important`,
    outline: `var(${CSS_VARS.FOCUS.OUTLINE_WIDTH}) solid var(${CSS_VARS.FOCUS.OUTLINE}) !important`,
    outlineOffset: `var(${CSS_VARS.FOCUS.OUTLINE_OFFSET}) !important`,
  },
}
```

同じ定数を使うことで、レシピとglobalCssが確実に同期される。

### 5. WCAGレベル別の統一管理 ♿

```typescript
const focusVars = {
  A: {
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.blue.300}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.thin}",  // 0.125rem
  },
  AA: {
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.blue.700}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.base}",  // 0.1875rem
  },
  AAA: {
    [CSS_VARS.FOCUS.OUTLINE]: "{colors.gray.900}",
    [CSS_VARS.FOCUS.OUTLINE_WIDTH]: "{borderWidths.thick}",  // 0.25rem
  },
};
```

- A/AA/AAAレベルで一貫したフォーカススタイルを提供
- アウトラインの太さがレベルに応じて段階的に増加

## 実装計画

### フェーズ1: 定数ファイルの作成 ✅

```bash
panda-config/recipes/constants.ts
```

### フェーズ2: 既存レシピの更新 ✅

1. `input.ts`: CSS変数名を定数化 + デザイントークン化
2. `textarea.ts`: CSS変数名を定数化 + デザイントークン化
3. `button.ts`: 直接スタイルからCSS変数方式へ移行
4. `colorpicker.ts`: 新規追加（最初から統一方式を採用）

### フェーズ3: globalCssの更新 ✅

`panda.config.ts`でCSS変数参照を定数化

### フェーズ4: 型生成とテスト ✅

```bash
npm run prepare
```

## 影響範囲

### 変更したファイル
- ✅ `panda-config/recipes/constants.ts` - 新規作成
- ✅ `panda-config/recipes/colorpicker.ts` - 新規作成
- ✅ `panda-config/recipes/input.ts` - 更新
- ✅ `panda-config/recipes/textarea.ts` - 更新
- ✅ `panda-config/recipes/button.ts` - CSS変数方式に移行
- ✅ `panda.config.ts` - globalCssの定数化
- ✅ `src/design-system/components/ColorPicker.tsx` - レシピ使用に更新

### バンドルサイズへの影響
- 定数ファイルの追加: 約0.5KB
- 全体的な影響: ほぼなし（CSS変数は実行時のみ）

### 破壊的変更
なし（内部実装の変更のみ、APIは変更なし）

## 代替案を却下した理由

### 選択肢1: 直接スタイル方式
- globalCssとの統一性が取れない
- 実行時の柔軟性に欠ける
- WCAGレベル別のフォーカス管理と相性が悪い

### 選択肢2: CSS変数方式（定数化なし）
- マジックストリングのリスクが残る
- デザイントークンを活用できない
- 保守性が低い

## 使用しているCSS変数

| 変数名 | 用途 | A | AA | AAA |
|--------|------|---|----|----|
| `--focus-bg` | フォーカス時の背景色 | transparent | blue.50 | yellow.400 |
| `--focus-text` | フォーカス時のテキスト色 | gray.900 | gray.900 | gray.900 |
| `--focus-outline` | アウトラインの色 | blue.300 | blue.700 | gray.900 |
| `--focus-outline-width` | アウトラインの太さ | thin (0.125rem) | base (0.1875rem) | thick (0.25rem) |
| `--focus-outline-offset` | アウトラインのオフセット | 0 | 0.5 (0.125rem) | 0.5 (0.125rem) |

## 参考資料

- [Panda CSS - Recipes](https://panda-css.com/docs/concepts/recipes)
- [Panda CSS - Design Tokens](https://panda-css.com/docs/concepts/tokens)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG 2.1 - Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)

## 更新履歴

- 2025-12-04: 初版作成・承認（CSS変数の統一とデザイントークン化）

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
