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

### 3階層のトークン構造

このプロジェクトでは、保守性とスケーラビリティを高めるために3階層のトークンシステムを採用しています。

#### 1. Primitive Tokens（プリミティブトークン）

生の値。意味を持たない基本パーツ。

```typescript
// 例: colors.ts
primitive.gray[900] = "#212121";
primitive.blue[500] = "#3b82f6";
```

#### 2. Global Tokens（グローバルトークン）⭐

Primitiveに意味のある名前を付けたもの。アプリ全体で再利用可能。

```typescript
// 例: tokens/index.ts
colors.contents.primary = primitive.gray[900]
spacing.scale[4] = 16px
radii.borderRadius.base = 4px
```

#### 3. Component Tokens（コンポーネントトークン）

特定のコンポーネント専用の値。Globalトークンを組み合わせて作る。

```typescript
// 例: Button.tsx
padding: spacing.scale[3];
borderRadius: radii.borderRadius.base;
backgroundColor: colors.button.primary.bg;
```

### 主なトークンカテゴリ

#### 🎨 Icons（icons.ts）

lucide-reactを使用したアイコンシステム。

```typescript
// デザイン哲学
icons.philosophy.kind; // 優しい体験（Flower2）
icons.philosophy.inclusive; // 誰一人として置き去りにしない（HandHeart）
icons.philosophy.pleasant; // 心地よさを感じる（Sparkles）
icons.philosophy.scalable; // 成長し続ける（Sprout）

// コンポーネント
icons.component.button; // MousePointer2
icons.component.input; // FileText
icons.component.form; // ClipboardList
icons.component.modal; // ClipboardList
icons.component.accordion; // FolderOpen
icons.component.toast; // Bell

// コンセプト
icons.concept.wcag; // Target
icons.concept.designTokens; // Palette
icons.concept.theme.light; // Sun
icons.concept.theme.dark; // Moon
```

**なぜlucide-react？**

- 見た目がかわいい（柔らかく丸みのあるデザイン）
- アクセシビリティ親和性が高い（aria-label対応）
- Tree-shakingで軽量（使用するアイコンのみバンドル）
- strokeWidthをカスタマイズ可能

詳しくは [ADR 001: SVGアイコンライブラリの選択](./docs/adr/001-icon-library-selection.md)

関連するADR:

- [ADR 002: Panda CSSユーティリティの積極活用](./docs/adr/002-panda-css-utilities.md)

スタイルの書き方は [docs/style-guide.md](./docs/style-guide.md) を参照してください。

#### 📏 Spacing（spacing.ts）

8pxグリッドシステムを採用。

```typescript
spacing.scale[1]  = 4px   // 小さい余白
spacing.scale[2]  = 8px
spacing.scale[4]  = 16px  // 中程度の余白
spacing.scale[8]  = 32px  // 大きい余白
spacing.scale[12] = 48px  // セクション間
```

**なぜ8pxグリッド？**

- 倍数で計算しやすい（2, 4でも割り切れる）
- デザイナーとの共通言語（Figma、Sketchの標準）
- レティナディスプレイ対応
- 業界標準（Material Design、Ant Design等）

#### 🎨 Colors（colors.ts）

プリミティブカラーとセマンティックカラーの2層構造。

```typescript
// Primitive
primitive.gray[50] 〜 primitive.gray[900]
primitive.blue[50] 〜 primitive.blue[900]
primitive.red[50] 〜 primitive.red[900]
primitive.green[50] 〜 primitive.green[900]
primitive.orange[50] 〜 primitive.orange[900]
primitive.pink[50] 〜 primitive.pink[900]  // 優しいテーマ用

// Semantic
colors.contents.primary      // メインテキスト
colors.background.default // 背景色
colors.border.focus      // フォーカス時の境界線
```

#### 🔤 Typography（tokens/index.ts）

rem単位を使用してアクセシビリティに配慮。

```typescript
typography.fontSize.xs   = 0.75rem  // 12px
typography.fontSize.base = 1rem     // 16px（基準）
typography.fontSize.xl   = 1.25rem  // 20px

typography.lineHeight.tight   = 1.25   // 大見出し用
typography.lineHeight.normal  = 1.5    // 本文用（WCAG推奨）
typography.lineHeight.relaxed = 1.625  // 長文用
```

**なぜrem？**

- ユーザーのブラウザ設定を尊重
- アクセシビリティ向上（視覚障害者への配慮）
- レスポンシブデザインに最適

#### 📐 Breakpoints（breakpoints.ts）

モバイルファースト設計のブレークポイント。

```typescript
breakpointValues.xs = 0; // スマホ（デフォルト）
breakpointValues.sm = 640; // 大きめスマホ
breakpointValues.md = 768; // タブレット
breakpointValues.lg = 1024; // ノートPC
breakpointValues.xl = 1280; // デスクトップ
breakpointValues["2xl"] = 1536; // 大型ディスプレイ
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

## 📝 今後の予定

### 優先度：高

- [ ] **カラーパレットの刷新** - パステルカラー・低彩度の優しい配色へ
- [ ] **マイクロインタラクション** - ホバー・クリック時の滑らかなアニメーション
- [ ] **角丸の調整** - より大きな角丸で親しみやすいデザインに

### 追加予定コンポーネント

- [ ] Checkbox / Radio（ラジオボタン）
- [ ] Tooltip（ツールチップ）
- [ ] Tabs（タブ）
- [ ] Select（ドロップダウン）
- [ ] Slider（スライダー）
- [ ] DatePicker（日付選択）

### 機能強化

- [ ] ダークモードの完全対応
- [ ] reduced-motion対応（アニメーション無効化）
- [ ] 多言語対応（i18n）
- [ ] テーマカスタマイザー
- [ ] Style Dictionaryとの統合検討（マルチプラットフォーム対応時）
  - 現在はPanda CSSのトークンシステムで十分
  - 将来的にiOS/Androidアプリ等を作る場合に検討

## 🤝 コントリビューション

このプロジェクトへの貢献を歓迎します！詳しくは [CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください。

バグ報告や機能提案は [GitHub Issues](https://github.com/andsaki/accessibility-learning/issues) からお願いします。

## 📄 ライセンス

MIT

## 👤 作成者

学習プロジェクトとして作成

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
