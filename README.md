# accessibility-learning

> 優しい体験のためのデザインシステム - すべてのユーザーに寄り添う、アクセシブルで心地よいUIコンポーネント集

**アクセシビリティ**と**デザインシステム**を学ぶための実践的なプロジェクトです。
**「優しい体験」** をテーマに、WCAG準拠のアクセシブルなコンポーネントを構築しながら、技術的な正確さと人間らしい温かみを両立させる方法を学びます。

## 🌈 デザイン哲学

### 優しさの3原則

1. **🤝 誰一人として置き去りにしない**
   視覚・聴覚・運動機能に関わらず、すべての人が等しく情報にアクセスできる設計

2. **💫 心地よさを感じる体験**
   柔らかな色彩、滑らかな動き、適切な余白で、ストレスのない使い心地を実現

3. **🌱 成長し続ける仕組み**
   スケーラブルなトークンシステムで、プロジェクトとともに進化するデザイン

詳しくは [DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md) をご覧ください。

## 🎯 このプロジェクトで学べること

- 🎨 **デザイントークン設計** - 3層構造で保守性の高いデザインシステムを構築
- ♿ **WCAG 2.1 AA/AAA準拠** - 実践的なアクセシビリティ実装パターン
- 🎭 **ユーザー体験の設計** - 技術と感性を融合させたUI/UX

## ✨ デモ・体験

- 🎨 **[Storybook（コンポーネントカタログ）](https://andsaki.github.io/accessibility-learning/storybook/)** - すべてのコンポーネントを対話的に試せます
- 🌐 **[ライブデモ](https://andsaki.github.io/accessibility-learning/)** - 実際のアプリケーション

## 🚀 技術スタック

| カテゴリ             | 技術                    | 選定理由                                 |
| -------------------- | ----------------------- | ---------------------------------------- |
| **フレームワーク**   | React 18 + TypeScript   | 型安全性とコンポーネント指向             |
| **ビルド**           | Vite                    | 高速な開発体験                           |
| **デザイントークン** | カスタム実装            | 学習とカスタマイズ性の両立               |
| **スタイリング**     | CSS-in-JS（インライン） | コンポーネント単位の管理                 |
| **アイコン**         | lucide-react            | Tree-shaking対応・アクセシビリティ親和性 |
| **ドキュメント**     | Storybook               | インタラクティブなカタログ               |

## 📁 プロジェクト構成

```
src/
├── components/                  # UIコンポーネント
│   ├── TableOfContents.tsx     # 目次ナビゲーション
│   ├── HamburgerButton.tsx     # モバイルメニューボタン
│   ├── MobileDrawer.tsx        # モバイル用ドロワー
│   ├── SectionHeading.tsx      # セクション見出し
│   ├── CodeBlock.tsx           # コードブロック（シンタックスハイライト付き）
│   ├── Tooltip.tsx             # ツールチップ
│   └── index.tsx               # コンポーネント統合エクスポート
├── sections/                    # セクションコンポーネント
│   ├── ARIAGuide.tsx           # ARIAガイド
│   └── WCAGLevelInfo.tsx       # WCAGレベル説明
├── hooks/                      # カスタムフック
│   └── useActiveSection.ts     # アクティブセクション検出
├── design-system/              # デザインシステム
│   ├── components/             # 再利用可能なコンポーネント
│   │   ├── Button.tsx         # アクセシブルなボタン
│   │   ├── Input.tsx          # アクセシブルな入力フィールド
│   │   ├── Table.tsx          # データテーブル
│   │   ├── Form.tsx           # react-hook-form統合フォーム
│   │   ├── Modal.tsx          # モーダルダイアログ
│   │   ├── Toast.tsx          # トースト通知
│   │   ├── Accordion.tsx      # アコーディオン
│   │   ├── Breadcrumbs.tsx    # パンくずリスト
│   │   └── index.ts           # コンポーネント統合エクスポート
│   ├── theme/                 # テーマシステム
│   │   ├── ThemeProvider.tsx  # テーマプロバイダー
│   │   └── index.ts           # テーマAPI
│   └── tokens/                # デザイントークン

│       ├── accessibility-levels.ts  # WCAGレベル定義


├── App.tsx                     # メインアプリケーション
└── main.tsx                    # エントリーポイント
```

## 🎨 デザイントークンシステム

Panda CSS を核に「定義 → コード生成 → 利用」のサイクルを回しています。トークンはすべて `panda-config/types/*.ts` で宣言し、`panda.config.ts` に読み込ませることで `styled-system` 配下の型安全な API に落とし込まれます。導入背景や運用ルールの詳細は [ADR 002: Panda CSSユーティリティの積極活用](./docs/adr/002-panda-css-utilities.md) でまとめています。

### 3層モデル

1. **Primitive** – `panda-config/types/tokens.ts`  
   色・余白・フォントサイズなどの数値を直接定義します。例: `colors.blue.500`, `spacing.scale[4]`, `fontSizes.base`。

2. **Semantic** – `panda-config/types/semanticTokens.ts`  
   `colors.bg.primary` や `colors.border.focus` など、意味を持つ名前にマッピング。ライト/ダークで自動的に値が切り替わります。

3. **Component** – `src/design-system/tokens/index.ts`  
   既存の API との互換性を保つためのラッパー層。`token('colors.bg.primary')` など Panda 生成済みの値をまとめて再エクスポートしています。

```ts
import { token } from '@/styled-system/tokens';

export const colors = {
  contents: {
    primary: token('colors.contents.primary'),
    linkHover: token('colors.contents.linkHover'),
  },
  border: {
    focus: token('colors.border.focus'),
  },
};
```

### カテゴリ別のポイント

- **Spacing**  
  `spacing.scale[n]` は 4px グリッド。`css({ gap: 4 })` のように数値で指定すると一貫した余白が得られます。

- **Colors**  
  プリミティブとセマンティックの2段構成。フォーカスリングや警告色は `colors.border.*`/`colors.contents.*` に集約し、WCAG コントラストを担保。

- **Typography**  
  rem ベースの `fontSizes`, `lineHeights`, `fontWeights` を用意。`src/design-system/constants/accessibility.ts` では WCAG の「大きいテキスト」条件を満たす最小サイズを参照できます。

- **Icons** (`src/design-system/tokens/icons.ts`)  
  lucide-react のアイコンを意味別（哲学/コンポーネント/コンセプト）に整理し、`icons.component.button` のように補完しやすくしています。

### 運用メモ

- トークン値の変更は `panda-config` を更新後、`npm run prepare`（= `panda codegen`）で `styled-system` を再生成。
- スタイルはすべて `css()` / レシピ経由でトークンを参照し、ハードコード値はプロジェクトルールで禁止。
- `src/design-system/tokens/index.ts` のラッパーが ABI を維持するため、既存コンポーネントの import 先を張り替える必要はありません。

#### 📐 Breakpoints（panda-config/types/breakpoints.ts）

モバイルファーストの 6 段階。Panda の `breakpoints` にそのまま渡しているため、`css({ fontSize: { base: 'sm', md: 'lg' } })` のようにオブジェクト記法で利用できます。

```ts
export const breakpointValues = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
```

## ♿ アクセシビリティ機能

### WCAG 2.1 準拠

このプロジェクトのコンポーネントは、WCAG 2.1 レベルAA/AAAに準拠しています。

#### コントラスト比の基準

| レベル    | 通常テキスト | 大きいテキスト | 用途             |
| --------- | ------------ | -------------- | ---------------- |
| **A**     | なし         | 3:1以上        | 最低限（非推奨） |
| **AA** ⭐ | 4.5:1以上    | 3:1以上        | 推奨（標準）     |
| **AAA**   | 7:1以上      | 4.5:1以上      | 最高（公共機関） |

#### 実装されているアクセシビリティ機能

✅ **キーボード操作対応**

- Tab、Enter、Spaceキーでの操作
- フォーカス管理

✅ **視覚的フィードバック**

- フォーカスインジケーター表示
- マウスクリック時は非表示（`:focus-visible`パターン）

✅ **スクリーンリーダー対応**

- 適切なARIA属性
- セマンティックHTML
- ラベルとフィールドの関連付け

✅ **エラーハンドリング**

- `role="alert"`による即座の通知
- 明確なエラーメッセージ

✅ **色のコントラスト**

- WCAG AA以上のコントラスト比
- カラーブラインドネスへの配慮

### カラーコントラストの実践メモ

- コントラスト比は **(Lmax + 0.05) / (Lmin + 0.05)** で算出し、通常テキストは 4.5:1 以上（AA）、7:1 以上（AAA）が目標。大きなテキストは 3:1 / 4.5:1。
- `colors.contents.*` と `colors.bg.*` は白背景基準で AA を満たす組み合わせを前提に設計しているので、基本はセマンティックトークンをそのまま使う。
- 検証は Chrome DevTools のカラーピッカー、WebAIM Contrast Checker、axe/Lighthouse などで素早く確認できる。CI では `eslint-plugin-jsx-a11y` の `color-contrast` ルールで警告。

### フォーカススタイルポリシー

- すべてのインタラクティブ要素は **黄色 (#ffff00) 背景 + 黒 (#000000) アウトライン** のフォーカスリングをデフォルトにし、コントラスト比 19.56:1 で WCAG AAA を大幅に上回る視認性を確保。
- Panda のフォーカストークン (`colors.focus.*`) を経由し、Button/Input などでは `_focusVisible` スタイルと CSS 変数で統一管理。詳細は [ADR 002](./docs/adr/002-panda-css-utilities.md) と `src/design-system/constants/accessibility.ts` を参照。

## 🧩 コンポーネント

### Button

アクセシブルなボタンコンポーネント。

**Props:**

```typescript
variant?: 'primary' | 'secondary' | 'tertiary'
size?: 'sm' | 'md' | 'lg'
disabled?: boolean
isLoading?: boolean
icon?: string
onClick?: () => void
wcagLevel?: 'AA' | 'AAA'  // WCAGレベルの選択
```

**特徴:**

- WCAGレベルを指定可能
- キーボードフォーカス対応（マウスクリック時は非表示）
- ローディング状態
- アイコンサポート

**使用例:**

```tsx
import { Button } from "./design-system/components";

<Button variant="primary" wcagLevel="AAA" onClick={handleClick}>
  クリック
</Button>;
```

### Input

ラベル、エラー表示、ヘルプテキストを備えた入力フィールド。

**Props:**

```typescript
label: string
type?: string
value?: string
placeholder?: string
error?: string
helperText?: string
required?: boolean
disabled?: boolean
size?: 'sm' | 'md' | 'lg'
wcagLevel?: 'AA' | 'AAA'
```

**特徴:**

- 自動的なラベル-フィールド関連付け（`useId`）
- エラーメッセージの即座表示（`role="alert"`）
- 必須項目の明示（`aria-required`）
- アクセシブルな状態管理

**使用例:**

```tsx
import { Input } from "./design-system/components";

<Input
  label="メールアドレス"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={error}
  helperText="ログイン時に使用します"
  required
  wcagLevel="AAA"
/>;
```

### Table

WCAG 2.1 AA/AAAのコントラストを満たすデータテーブル。

**特徴:**

- caption / 視覚的に非表示にするSR-onlyサポート
- スクロール可能なコンテナーとsticky header
- 罫線・縞模様・ホバーの切り替え
- 数値列の右寄せ / ヘッダーの補足説明

**使用例:**

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./design-system/components";

<Table
  caption="WCAGレベル別 コントラスト要件"
  variant="striped"
  stickyHeader
  showColumnDividers
  wcagLevel="AAA"
>
  <TableHeader>
    <TableRow>
      <TableHeaderCell>レベル</TableHeaderCell>
      <TableHeaderCell align="center" helpText="通常テキスト">
        小サイズ
      </TableHeaderCell>
      <TableHeaderCell align="center">大きいテキスト</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>AA</TableCell>
      <TableCell align="center">4.5:1 以上</TableCell>
      <TableCell align="center">3:1 以上</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>AAA</TableCell>
      <TableCell align="center">7:1 以上</TableCell>
      <TableCell align="center">4.5:1 以上</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

### TableOfContents

スクロール連動型の目次ナビゲーション。

**特徴:**

- Intersection Observerによる自動ハイライト
- スムーズスクロール
- レスポンシブ対応（モバイルでは非表示）
- sticky positioning

**使用例:**

```tsx
import { TableOfContents } from "./components/TableOfContents";

const tocItems = [
  { id: "section-1", title: "セクション1" },
  { id: "section-2", title: "セクション2" },
];

<TableOfContents items={tocItems} />;
```

### ScreenReaderDemo

スクリーンリーダーの読み上げをシミュレートする開発ツールコンポーネント。

**特徴:**

- **DOM自動解析**: コンポーネントからアクセシビリティ情報を自動抽出
- **音声読み上げ**: Web Speech APIで実際の読み上げを再生
- **視覚的フィードバック**: 読み上げテキストをリアルタイム表示
- **完全自動**: `srText`プロップ不要、DOMから自動抽出

**対応している情報:**

- `aria-label` / `aria-labelledby` / `aria-describedby`
- `<label>` 要素との関連付け
- `<fieldset>` と `<legend>` のグループ情報
- role属性（button, textbox, radio, checkboxなど）
- 状態情報（checked, disabled, expandedなど）

**使用例:**

```tsx
import { ScreenReaderDemo } from "./components/ScreenReaderDemo";

<ScreenReaderDemo
  label="スクリーンリーダー実演"
  description="aria-labelledbyを使った複数要素の参照例です"
>
  <div>
    <span id="label-1">ユーザー</span>
    <span id="label-2">名前</span>
    <input
      aria-labelledby="label-1 label-2"
      type="text"
      placeholder="山田太郎"
    />
  </div>
</ScreenReaderDemo>
```

**読み上げ結果例:**

```
"ユーザー 名前、編集可能、テキスト"
```

**仕組み:**

1. `contentRef`でラップされた子要素のDOMを取得
2. `getAccessibleText()`でaria属性やrole情報を解析
3. スクリーンリーダーが実際に読み上げるテキストを構築
4. Web Speech APIで音声合成・再生

**注意点:**

- 入力値（ユーザーが入力したテキスト）は読み上げ対象外（実際のスクリーンリーダーと同じ動作）
- フォーカス時の読み上げをシミュレート（文字入力時の読み上げは非対応）
- `fieldset`内の複数要素は順番に連結して読み上げ

## 🌓 テーマシステム

ライト/ダークモード対応のテーマシステム。

```typescript
// ThemeContext.tsx
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// App全体をラップ
<ThemeProvider>
  <App />
</ThemeProvider>

// コンポーネント内で使用
const { mode, theme, toggleTheme } = useTheme();

// 使用例
<div style={{ backgroundColor: theme.background.default }}>
  <button onClick={toggleTheme}>
    {mode === 'light' ? 'ダーク' : 'ライト'}モードに切り替え
  </button>
</div>
```

**特徴:**

- LocalStorageによる設定保存
- システム設定（`prefers-color-scheme`）の自動検出
- コンテキストAPI経由での状態管理
- `data-theme`属性によるCSS連動

## 🎯 学習ポイント

### 1. デザイントークンの利点

- **一貫性**: アプリ全体で統一された値
- **保守性**: 1箇所の変更で全体に反映
- **スケーラビリティ**: 新しいコンポーネントが既存トークンを再利用
- **テーマ対応**: 簡単な切り替え

### 2. アクセシビリティのベストプラクティス

- セマンティックHTML
- ARIA属性の適切な使用
- キーボードナビゲーション
- 十分なコントラスト比
- フォーカス管理
- `:focus-visible`による適切なフォーカススタイル

### 3. TypeScriptによる型安全性

- コンポーネントのPropsに型定義
- デザイントークンの型推論
- コンパイル時のエラー検出

### 4. レスポンシブデザイン

- モバイルファースト設計
- ブレークポイントトークンの使用
- 動的なレイアウト切り替え

## 🛠️ セットアップ

### 必要なもの

- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/andsaki/accessibility-learning.git
cd accessibility-learning

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:5173 を開いてください。

### その他のコマンド

```bash
# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybookビルド
npm run build-storybook
```

## 📚 参考資料

### アクセシビリティ

- [WCAG 2.1 ガイドライン](https://www.w3.org/WAI/WCAG21/quickref/)
- [WCAG 2.1 日本語訳](https://waic.jp/docs/WCAG21/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN: ARIA](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA)

### デザインシステム

- [Material Design](https://m3.material.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)
- [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)

### 技術記事

- [A Complete Guide to Design Tokens](https://www.designtokens.org/)
- [Inclusive Components](https://inclusive-components.design/)
- [The A11Y Project](https://www.a11yproject.com/)
- [React におけるアクセシビリティ向上のためのパターン](https://zenn.dev/kei9o/articles/65aa88add286fb)

## 🎁 実装済みコンポーネント

| コンポーネント  | WCAG対応  | 特徴                                                           |
| --------------- | --------- | -------------------------------------------------------------- |
| **Button**      | ✅ AA/AAA | キーボードフォーカス、ローディング状態、WCAGレベル選択可能     |
| **Input**       | ✅ AA/AAA | 自動ラベル関連付け、エラー即座表示、リアルタイムバリデーション |
| **Modal**       | ✅ AA/AAA | フォーカストラップ、ESCキーで閉じる、背景スクロールロック      |
| **Toast**       | ✅ AA/AAA | 自動消去、スタック表示、スクリーンリーダー対応                 |
| **Accordion**   | ✅ AA     | ARIA属性、キーボード操作、スムーズアニメーション               |
| **Breadcrumbs** | ✅ AA     | セマンティックHTML、aria-current、構造化データ対応             |
| **Form**        | ✅ AA/AAA | 統合バリデーション、エラー管理、送信状態管理                   |
| **CodeBlock**   | ✅ AA     | シンタックスハイライト、コピー機能、行番号表示、説明文表示     |

## 📄 ライセンス

MIT

## 👤 作成者

学習プロジェクトとして作成

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
