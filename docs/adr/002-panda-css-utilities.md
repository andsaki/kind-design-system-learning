# ADR 002: Panda CSSユーティリティ（css / cx）の積極活用

## ステータス

承認済み (Accepted) - 2025-02-15

## コンテキスト

- `AccessibilityFeatures` や `WCAGLevels` などのセクションでは、`useTheme()` や `spacing.scale[...]` の値を **inline style** で直接指定していた。
- inline style の即時性は魅力だが、以下の課題が顕在化している。
  1. **テーマ切り替えの非一貫性**: Panda CSS の semantic tokens を経由しない箇所が散在し、Light / Dark で色が揃わない。
  2. **再利用性の低下**: スタイルが分散し、クラス名から意図を追えずレビュー負荷が高い。
  3. **複合表現の難易度**: hover / focus など擬似クラスやレスポンシブ指定を inline style だけで持つのは困難。
- Panda CSS の `css()` / `cx()` ユーティリティなら、`@/styled-system` が提供するトークンを型安全に参照しつつクラスを柔軟に合成できる。

## 検討した選択肢

### 選択肢1: 現状維持（inline style）

**メリット**
- ✅ 追加セットアップ不要
- ✅ その場で値を埋め込める

**デメリット**
- ❌ テーマ差し替えや semantic tokens との整合が取れない
- ❌ レイアウト定義が散在し diff が追いづらい
- ❌ 擬似クラス・レスポンシブ指定が難しい

### 選択肢2: CSS Modules / SCSSへ移行

**メリット**
- ✅ クラス単位で責務を切り出せる
- ✅ 既存知見が豊富

**デメリット**
- ❌ Panda の tokens / recipes を直接参照しづらい
- ❌ Vite + Panda の設定と二重管理になり保守コストが高い

### 選択肢3: Panda CSS `css` / `cx`

**メリット**
- ✅ `token()` / semantic tokens を型安全に取得
- ✅ 擬似クラス・レスポンシブ指定もユーティリティ内で完結
- ✅ `cx` でセクション固有クラスや `data-*` ベースのクラスと合成できる

**デメリット**
- ⚠️ `@/styled-system` への alias 設定が必要（tsconfig / Vite で実施済み）

### （補足）Tailwind CSS + semantic tokens を className で管理

**懸念点**
- ❌ `tokens.ts` と `tailwind.config.ts` の両方で semantic token を同期する必要があり、定義の二重管理になる。
- ❌ クラス名は文字列のため型安全性がなく、`bg-surface-invers` のような typo をビルド時に検知できない。
- ❌ VSCode の補完もユーティリティクラス単位に留まり、`colors.background.surface.inverse` のような階層的な token 名を明示できない。
- ❌ 擬似クラスやブレークポイントを `hover:` や `md:` で足し合わせるため、状態ごとのスタイルが分散し可読性が落ちる。

## 決定

**Panda CSS の `css()` / `cx()` を React セクションおよび主要コンポーネントで積極的に採用する。**

- inline style を使っていた箇所を `css` ユーティリティに置き換える。
- セクション固有クラスや外部クラスと組み合わせる際は `cx` を用いる。
- runtime で値が変わるケース（例: フォーカスリングのカラーバリエーション）は CSS カスタムプロパティ＋`cx`/`css` で吸収する。

## 理由

### 1. テーマ一貫性とガバナンス
- semantic tokens 経由で `token()` を呼び出すことで、Light/Darkやブランドカラー再定義に自動追従する。
- `@/styled-system` の型によって無効なトークン名をコンパイル時に検知できる。

### 2. 保守性とレビュー容易性
- クラス定義を `css()` にまとめる事で差分が可視化され、レビュー時に目的が追いやすい。
- 同一セクション内の spacing / 色指定を共有でき、デザインシステム観点の逸脱を防げる。

### 3. 開発体験とスケーラビリティ
- TypeScript 補完でトークン候補や `@media` プリセットが提示され、記述ミスが減る。
- VSCode の Panda CSS インテリセンス拡張で `css()` のキーや値候補をリアルタイムに確認でき、スタイル記述の速度と安心感が向上する。
- `cx` により `className` / `data-state` / storybook 由来クラスとの合成もワンライナーで完結する。

### 4. アクセシビリティ要件への適合
- CSS Vars を介して WCAG のフォーカスリングやコントラストを統一できる。
- 擬似クラス（`:focus-visible`, `:where(...)` など）を inline style から脱却させ、共通のアクセシビリティポリシーに沿わせる。

```tsx
import { css, cx } from '@/styled-system/css';

const card = css({
  borderRadius: 'xl',
  bg: { base: 'surface', _dark: 'surface.inverse' },
  transition: 'colors',
  _hover: { borderColor: 'accent.default' },
});

export const AccessibilityCard = ({ className, ...props }) => (
  <section className={cx(card, className)} {...props} />
);
```

## 実装計画

1. **セットアップ**  
   `tsconfig.*` / `vite.config.ts` に `@/styled-system/*` の alias を定義し、Panda 生成物を import しやすくする。
2. **既存セクションの移行**  
   `AccessibilityFeatures`, `WCAGLevelInfo`, `WCAGLevels` の inline style を `css` クラスへ移し替え、`cx` で元のクラスと合成。
3. **コンポーネント共通化**  
   `design-system/Button` など runtime 値を扱う UI は CSS Vars を挟み、アクセシビリティ関連のスタイルを `css` で宣言。
4. **デザインシステム整備**  
   Storybook やドキュメントに `css` / `cx` の使用指針を追記し、ガイドラインとして共有。

## 影響範囲

- Panda ユーティリティを import するファイル（特にセクションコンポーネントとデザインシステムコンポーネント）。
- `tsconfig.*` / `vite.config.ts` のパス解決設定。
- CSS カスタムプロパティ経由でフォーカスリングやコントラスト値を配信するグローバルスタイル。

## 代替案を却下した理由

- **現状維持（inline style）**: テーマ／レスポンシブ対応が属人的になり、「優しい体験」に沿う一貫した見た目を保てない。
- **CSS Modules / SCSS**: Panda の tokens / recipes と二重管理になり、アクセシビリティ要件が散逸する。

## 本ADRでカバーした適用例

- `AccessibilityFeatures.tsx`  
  `useTheme` や `spacing.scale` による inline style を `css()` 化し、セクション固有クラスと `cx` で合成。

- `WCAGLevelInfo.tsx`  
  情報カード・リストを `css` で共通化し、`token()` でアクセントカラーを取得。

- `WCAGLevels.tsx`  
  カード／デモ／リストなどまとまったスタイルを `css` へ退避し、`cx` で条件付きクラスや既存クラスと組み合わせ。

- `design-system/Button.tsx`  
  WCAG レベルに応じたフォーカスリングを CSS Vars にまとめ、`cx` で recipe クラスと結合。recipe は任意値を直接受け取れないため CSS Vars で橋渡しする。

- **設定ファイル**  
  `baseUrl` + `paths` を整備し、Panda 生成物を `@/styled-system/*` で参照。

## フォローアップ

- inline style を見つけた際の `css` 化ガイドラインを docs / Storybook に記載。
- `css` / `cx` によるアクセシビリティパターン（フォーカスリング、タップターゲットなど）を設計ドキュメントに追加。
- VSCode などでの補完を活用できるよう、チーム向けにショートチュートリアルを配布。
- 既存のインタラクティブ要素は **Panda recipe + `:focus-visible`** を基本とする。Tab 判定用の `useEffect` や `data-focused` を新たに増やさない。どうしても JS 側で制御する必要が出た場合は、理由をこの ADR か Style Guide に追記すること。

## 参考資料

- [Panda CSS Overview](https://panda-css.com/docs/overview)
- [Panda Recipes ドキュメント](https://panda-css.com/docs/concepts/recipes)
- [Styled System Tokens](https://panda-css.com/docs/concepts/tokens)

## 更新履歴

- 2025-02-15: 初版作成（inline style から Panda への移行を提案）
- 2025-02-16: ADR 001 のフォーマットに合わせて内容を再構成し、理由・実装計画・参考資料を追記
