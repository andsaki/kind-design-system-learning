# Style Guide

このプロジェクトで UI を実装するときの約束事をまとめる。特に Panda CSS の `css()` ユーティリティの使い方はリポジトリ全体へ影響するため、ここに記した方針を優先する。

## 1. スタイルは JSX 内へ inline `css()` で記述する

- セクションやページ固有のレイアウトは `<div className={css({ ... })}>` のように **JSX のすぐ近く** で宣言する。
- `const heroRow = css(...)` といったトップレベルの定数は作らない。DOM 構造とスタイルを同じ場所で把握できることを優先するため。
- 例外は「デザインシステムとして再利用する抽象化（Button / Card / Recipeなど）」。それ以外は inline をデフォルトとする。
- ESLint に `custom/no-top-level-css-const` ルールを入れてあり、`const foo = css(...)` のようなトップレベル宣言は warning になる。
- Light/Dark 切り替えは Panda の semantic tokens で吸収している。`ThemeProvider` が `<html data-theme="light|dark">` を付与し、`panda.config.ts` の `conditions` で `light: '[data-theme=light] &'` / `dark: '[data-theme=dark] &'` を指定済み。`css({ color: 'contents.primary' })` のようにトークン名をそのまま使えば、data-theme に合わせて自動で値が切り替わる。

### `custom/no-top-level-css-const`

- `eslint.config.js` で有効化しているカスタムルール。
- 警告: `const foo = css({ ... })` のようなトップレベル宣言を検出した場合に「JSX 近傍で inline 化する / デザインシステムへ昇格する」ことを促す。
- 例外を設けたい場合は `eslint.config.js` の `files`/`ignores` で適用範囲を調整する。

```
Light/Dark Theme Sequence
-------------------------
ThemeProvider toggles `<html data-theme="light|dark">`
↳ Panda `conditions` map: `light: '[data-theme=light] &'`, `dark: '[data-theme=dark] &'`
↳ semantic tokens (e.g. `contents.primary`, `bg.primary`) declare both light/dark values
↳ components call `css({ color: 'contents.primary' })`
    - Panda generates CSS selectors scoped under `[data-theme=light]` or `[data-theme=dark]`
    - No runtime branching needed; switching `data-theme` is enough

To extend themes:
1. Add a new condition (e.g. `contrast: '[data-theme=contrast] &'`)
2. Provide token values for that condition
3. Toggle `data-theme="contrast"` from ThemeProvider or UI controls
```

```tsx
// ✅ 推奨
<section
  className={css({
    display: "grid",
    gap: 4,
    borderRadius: "xl",
  })}
>
  ...
</section>
```

```tsx
// ❌ 非推奨 (セクション固有スタイルの const 定義)
const heroRow = css({ display: "flex" });

<div className={heroRow}>...</div>
```

## 2. BEM 由来の文字列をそのまま `className` に書く場合のみ定数化

- 文字列クラス（例: `"heroBanner__title"`）をそのまま `className` へ入れたい場合は `className="..."` を優先する。
- `css()` との組み合わせが必要なら `cx("heroBanner__title", css({ ... }))` を利用する。`const heroBannerStyles` のような中間オブジェクトは原則作らない。

## 3. 再利用が必要な場合はコンポーネント化を検討する

- 「同じ塊をコピーしたい」＝「それはデザインシステム化すべきもの」とみなす。
- 繰り返し色・余白の組み合わせを使う場合は `design-system` 配下のコンポーネント or recipe を作り、そこではじめて `const foo = css(...)` を許容する。

## 4. レビュー時のチェック項目

- [ ] JSX のすぐ近くで `css({ ... })` が記述されているか？
- [ ] 再利用すべき塊はデザインシステムへ昇格できないか検討したか？
- [ ] クラス命名（文字列）は BEM などで構造が伝わるか？
- [ ] フォーカスリングは Panda recipe / `:focus-visible` で表現できているか？ 無闇に `useEffect` で Tab 検知していないか？

## 5. フォーカス管理の指針

- **基本は `:focus-visible`**  
  ブラウザがキーボード操作を自動判定してくれるので、`useEffect` で `keydown`/`mousedown` を監視して `data-focused` を付け替えるロジックは不要。Panda レシピで `_focusVisible` を使うか、`css({ _focusVisible: {...} })` で記述する。

  ```ts
  // panda-config/recipes/checkbox.ts の一例
  variants: {
    wcagLevel: {
      AA: {
        input: {
          _focusVisible: {
            outlineColor: "blue.600",
            outlineWidth: "0.1875rem",
            outlineOffset: "0.125rem",
          },
        },
      },
    },
  }
  ```

  ```tsx
  // コンポーネント側では onFocus/onBlur を書かず、className を合成するだけ
  <input
    className={slots.input}
    aria-invalid={error ? true : undefined}
    {...props}
  />
  ```

- **CSS 変数より recipe で完結させる**  
  フォーカスリングの色・太さを WCAG レベルごとに変えたい場合は、Button や Checkbox のように `wcagLevel` variant をレシピに追加して `_focusVisible` に値を流し込む。JS から `style` へ直接書き込むのは禁止。
- **どうしても `data-focused` が必要なケース**  
  Safari のバグ回避など、`:focus-visible` では表現できない事情があるときだけ `data-focused` を使う。その場合でも、ロジックをコンポーネント内部に閉じ込め、ドキュメント（ADR またはここ）へ理由を必ず記載する。
- **Past change log**  
  チェックボックスやボタンのように従来 `useEffect` で Tab 検知していた箇所は、Panda recipe へ移行済み（2025-02）。今後は同じ実装を繰り返さないこと。

## 6. 参考

- [ADR 002: Panda CSSユーティリティの積極活用](./adr/002-panda-css-utilities.md)
