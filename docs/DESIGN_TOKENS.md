# Panda CSS デザイントークンの仕組み

このプロジェクトでは、Panda CSSを使用してデザイントークンを一元管理しています。

## 🔄 トークンの流れ

```
1. トークン定義 (TypeScript)
   ↓
2. Panda CSS設定ファイルに登録
   ↓
3. Panda CLIがビルド時にCSS変数を自動生成
   ↓
4. コンポーネントやCSSで使用
```

---

## 📁 ファイル構成

### 1. **プリミティブトークン定義**

**`panda-config/types/tokens.ts`**

基本的な色、スペーシング、フォントなどを定義します。

```ts
export const pandaColors = {
  blue: {
    50: { value: '#e3f2fd' },
    500: { value: '#1976d2' },  // ← ここで色を定義
    700: { value: '#0d47a1' },
  },
  // ...
};
```

### 2. **セマンティックトークン定義**

**`panda-config/types/semanticTokens.ts`**

用途に基づいた意味のあるトークン名を定義します。

```ts
export const pandaSemanticColors = {
  brand: {
    primary: { value: "#1976d2" },  // ← プライマリカラー
  },
  contents: {
    link: {
      value: {
        base: "{colors.blue.700}",      // ライトモード
        _dark: "#63b3ff"                // ダークモード
      }
    },
  },
};
```

### 3. **Panda設定ファイルに登録**

**`panda.config.ts`**

```ts
export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: pandaColors,  // ← プリミティブトークンを登録
      },
      semanticTokens: {
        colors: pandaSemanticColors,  // ← セマンティックトークンを登録
      },
    },
  },
  globalCss: {
    // グローバルスタイルでもトークンを使用可能
    'input[type="checkbox"]': {
      accentColor: "brand.primary",
    },
  },
});
```

### 4. **Pandaが自動生成**

**`styled-system/tokens/index.css`** (自動生成)

```css
:root {
  --colors-blue-500: #1976d2;
  --colors-blue-700: #0d47a1;
  --colors-brand-primary: #1976d2;
  --colors-contents-link: var(--colors-blue-700);
}

[data-theme=dark] {
  --colors-contents-link: #63b3ff;
}
```

---

## 🎨 使い方

### A. CSS変数として使用 (`index.css`など)

```css
a {
  color: var(--colors-contents-link);
}

input[type="checkbox"] {
  accent-color: var(--colors-brand-primary);
}
```

### B. Panda CSSのcss()関数で使用 (React/TSX)

```tsx
import { css } from '@/styled-system/css';

const linkClass = css({
  color: 'contents.link',  // ← トークン名を文字列で指定
  _hover: {
    color: 'contents.linkHover',
  }
});
```

### C. token()関数で直接取得

```tsx
import { token } from '@/styled-system/tokens';

const primaryColor = token('colors.brand.primary');  // → "#1976d2"
```

---

## 🌗 ダークモード対応

セマンティックトークンは、ライトモードとダークモードで異なる値を持てます：

```ts
{
  value: {
    base: "{colors.blue.700}",    // ライトモード
    _dark: "#63b3ff"              // ダークモード
  }
}
```

`[data-theme="dark"]`属性が付与されると、自動的にダークモードの値が適用されます。

---

## ✅ なぜこの仕組みが優れているのか？

### 1. **単一の真実の情報源 (Single Source of Truth)**
色を変更する時は`semanticTokens.ts`だけを編集すればOK

### 2. **型安全**
存在しないトークン名を使うとTypeScriptがエラーを出す

```tsx
css({ color: 'contents.typo' })  // ❌ エラー
css({ color: 'contents.link' })  // ✅ OK
```

### 3. **自動的にダークモード対応**
テーマ切り替えロジックを書く必要がない

### 4. **デザインシステムの一貫性**
勝手に色を追加できず、定義済みのトークンのみ使用可能

### 5. **VSCodeで補完が効く**
`contents.`と入力すると候補が表示される

---

## 📊 現在のトークン構造

```
tokens/
├── colors/
│   ├── プリミティブ (blue, red, green, orange, gray, pink)
│   └── セマンティック
│       ├── brand (primary, primaryLight, primaryDark)
│       ├── contents (primary, secondary, link, error, success, warning)
│       ├── bg (primary, secondary, tertiary, hover, active, disabled)
│       ├── border (default, subtle, strong, focus, error, success)
│       ├── accent (primary, success, error, warn)
│       ├── input (bg, text, placeholder, border...)
│       └── accordion (bg, text, icon, border...)
├── spacing (0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12...)
├── fontSizes (xs, sm, base, lg, xl, 2xl, 3xl...)
├── fontWeights (light, normal, medium, semibold, bold)
├── radii (none, sm, base, md, lg, xl, 2xl, 3xl, full)
├── shadows (none, sm, base, md, lg, xl, 2xl)
└── durations (fast, base, slow, slower)
```

---

## 🔧 トークンを追加・変更する方法

### 新しい色を追加

1. **`panda-config/types/tokens.ts`** にプリミティブカラーを追加
```ts
export const pandaColors = {
  purple: {
    500: { value: '#9c27b0' },
  },
};
```

2. **`panda-config/types/semanticTokens.ts`** にセマンティックな用途を定義
```ts
export const pandaSemanticColors = {
  accent: {
    info: { value: "{colors.purple.500}" },
  },
};
```

3. **Pandaをビルド**
```bash
npm run prepare:panda
```

4. **使用**
```tsx
css({ color: 'accent.info' })
// または
var(--colors-accent-info)
```

---

## 🎯 ベストプラクティス

### ✅ 良い例
```tsx
// セマンティックトークンを使う
css({ color: 'contents.primary' })
css({ bg: 'bg.primary' })
css({ borderColor: 'border.default' })
```

### ❌ 悪い例
```tsx
// 直接色コードを書かない
css({ color: '#1976d2' })

// プリミティブトークンは避ける（セマンティックを使う）
css({ color: 'blue.500' })
```

---

## 📚 参考リンク

- [Panda CSS公式ドキュメント](https://panda-css.com/)
- [Semantic Tokens](https://panda-css.com/docs/customization/theme#semantic-tokens)
- [CSS Variables](https://panda-css.com/docs/concepts/css-variables)
