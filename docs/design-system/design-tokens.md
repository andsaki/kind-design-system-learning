# デザイントークン

## 概要

デザイントークンは、デザインシステムの**最小単位の値**です。色、フォント、余白などの基本的な値を定義し、プロダクト全体で一貫性のあるデザインを実現します。

## なぜデザイントークンが重要なのか？

### 1. 一貫性の確保
すべてのコンポーネントが同じトークンを参照することで、デザインの一貫性が保たれます。

### 2. 保守性の向上
値を一箇所で管理することで、デザイン変更が容易になります。例えば、プライマリカラーを変更したい場合、トークンの定義を1行変更するだけで、そのトークンを使用しているすべてのコンポーネントに反映されます。

### 3. スケーラビリティ
新しいコンポーネントを追加する際も、既存のトークンを使用することで、自動的に統一感のあるデザインになります。

### 4. コラボレーション
デザイナーとエンジニアが同じ語彙（トークン名）を使うことで、コミュニケーションがスムーズになります。

## トークンの階層構造

このプロジェクトでは、**3層構造**でトークンを管理しています：

```
プリミティブトークン（基礎値）
    ↓
セマンティックトークン（意味付き値）
    ↓
コンポーネントトークン（用途特化値）
```

### 1. プリミティブトークン（Primitive Tokens）

**基礎となる生の値**。色の場合は #FFFFFF のような具体的な色コードです。

```typescript
primitive.blue[500] = '#2196f3'
primitive.gray[900] = '#212121'
```

**使用場面**: 通常、直接使用せず、セマンティックトークンの定義に使用します。

### 2. セマンティックトークン（Semantic Tokens）

**意味を持った名前**が付けられた値。「何の色か」を表現します。

```typescript
brand.primary = primitive.blue[500]
contents.primary = primitive.gray[900]
```

**使用場面**: コンポーネントトークンの定義や、汎用的なスタイリングに使用します。

### 3. コンポーネントトークン（Component Tokens）

**特定のコンポーネント専用**の値。そのコンポーネントでの役割を明確に示します。

```typescript
button.primary.bg = brand.primary
button.primary.text = primitive.white
```

**使用場面**: コンポーネントの実装で直接使用します。

## 各トークンの詳細

### カラートークン

#### プリミティブカラー
- **Gray**: ニュートラルな色。テキスト、ボーダー、背景に使用
- **Blue**: プライマリカラーのベース。アクション、リンクに使用
- **Red**: エラー、警告、削除などの注意が必要な操作
- **Green**: 成功、完了、承認などのポジティブな状態
- **Orange**: 警告、注意喚起

各色は50〜900までの10段階のスケールを持ち、数字が大きいほど濃い色になります。

#### WCAG準拠について
すべてのテキストカラーは、白背景に対して**WCAG AA基準（4.5:1以上）**のコントラスト比を確保しています。

### タイポグラフィトークン

#### フォントサイズ
16px（1rem）を基準とした相対サイズ（rem単位）を使用。ユーザーのブラウザ設定を尊重し、アクセシビリティを確保します。

**最小サイズは12px**: WCAGガイドラインに基づき、これ以上小さい文字は使用しません。

#### 行高（Line Height）
- **見出し**: 1.2〜1.375（tight/snug）- 大きな文字は詰めて読みやすく
- **本文**: 1.5以上（normal/relaxed）- WCAG推奨の最小値

#### フォントウェイト
日本語フォントでも適切に表示される値を選択：
- **Normal (400)**: 本文
- **Medium (500)**: 少し強調
- **Semibold (600)**: 見出し
- **Bold (700)**: 強い強調

### スペーシングトークン

#### 8pxグリッドシステム
すべてのスペーシングは**8pxの倍数**を基準としています。

**なぜ8px？**
1. 多くのデバイスで割り切れる数字
2. デザイナーとエンジニアで共通の基準
3. Material Design、Ant Designなどの主要デザインシステムが採用

#### 使い分け
- **scale**: 数値で直感的に指定（1=4px, 2=8px, 4=16px...）
- **semantic**: 用途で指定（xs, sm, md, lg...）
- **component**: コンポーネント固有の値

### シャドウトークン

#### エレベーション（高さ）
シャドウの強さで、要素の「高さ」を表現します：

- **sm**: ボタン、カードなど（少し浮いている）
- **md**: ドロップダウン、ポップオーバー（中程度）
- **lg**: モーダル、ダイアログ（前面に表示）
- **2xl**: 最も重要な要素（最前面）

#### フォーカスリング
キーボード操作時の可視性を確保するため、3pxの明確なリングを表示します。

### ボーダー半径トークン

#### 角丸の使い分け
- **none (0)**: シャープな印象、フォーマルなデザイン
- **sm/base (2px/4px)**: ボタン、インプット
- **md/lg (6px/8px)**: カード、パネル
- **xl/2xl (12px/16px)**: モーダル、大きなコンテナ
- **full (9999px)**: バッジ、アバター（完全な円形）

### トランジショントークン

#### デュレーション（持続時間）
- **fast (150ms)**: 即座のフィードバック（ホバー時の色変化など）
- **base (200ms)**: 標準的な速度（ほとんどの場合はこれ）
- **slow (300ms)**: 目立たせたいアニメーション
- **slower (500ms)**: 大きな変化、ページ遷移

#### イージング（加速曲線）
- **linear**: 一定速度（あまり使わない）
- **easeIn**: だんだん速く（終了時）
- **easeOut**: だんだん遅く（開始時）- 最も自然
- **easeInOut**: 両端が遅い（滑らか）

**Material Designの推奨**: easeOut（cubic-bezier(0, 0, 0.2, 1)）を基本とする

## 使用例

### React コンポーネントでの使用

```typescript
import { colors, typography, spacing } from '@/design-system/tokens';

const Button = styled.button`
  background-color: ${colors.button.primary.bg};
  color: ${colors.button.primary.text};
  font-size: ${typography.fontSize.base};
  padding: ${spacing.button.paddingY.md} ${spacing.button.paddingX.md};
  border-radius: ${radii.button.md};
  transition: ${transitions.component.button};
  
  &:hover {
    background-color: ${colors.button.primary.bgHover};
  }
`;
```

### Tailwind CSS での使用

```typescript
// tailwind.config.ts
import { colors, spacing } from './src/design-system/tokens';

export default {
  theme: {
    extend: {
      colors: {
        primary: colors.brand.primary,
        'text-primary': colors.contents.primary,
      },
      spacing: spacing.scale,
    },
  },
};
```

## ベストプラクティス

### ✅ DO（推奨）

1. **コンポーネントトークンを優先的に使用**
   ```typescript
   color: ${colors.button.primary.text}
   ```

2. **セマンティックトークンを次に使用**
   ```typescript
   color: ${colors.contents.primary}
   ```

3. **意味のある名前を使う**
   - プリミティブトークンを直接使わない

### ❌ DON'T（非推奨）

1. **ハードコードされた値を使わない**
   ```typescript
   color: #2196f3  // ❌ NG
   color: ${colors.brand.primary}  // ✅ OK
   ```

2. **プリミティブトークンを直接使わない**
   ```typescript
   color: ${colors.primitive.blue[500]}  // ❌ NG
   color: ${colors.brand.primary}  // ✅ OK
   ```

3. **コンポーネント間でトークンを共有しない**
   ```typescript
   // ❌ NG: Buttonのトークンを他で使わない
   color: ${colors.button.primary.bg}
   
   // ✅ OK: セマンティックトークンを使う
   color: ${colors.brand.primary}
   ```

## 今後の拡張

### ダークモード対応
セマンティックトークンのレイヤーで、テーマごとに異なる値を設定できます：

```typescript
const lightTheme = {
  background: {
    default: colors.primitive.white,
    paper: colors.primitive.gray[50],
  },
};

const darkTheme = {
  background: {
    default: colors.primitive.gray[900],
    paper: colors.primitive.gray[800],
  },
};
```

### レスポンシブトークン
画面サイズに応じて値を変更：

```typescript
const spacing = {
  container: {
    paddingX: {
      mobile: '16px',
      tablet: '24px',
      desktop: '32px',
    },
  },
};
```

## 参考資料

- [Material Design - Design Tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Lightning Design System - Design Tokens](https://www.lightningdesignsystem.com/design-tokens/)
- [Shopify Polaris - Tokens](https://polaris.shopify.com/tokens/colors)
- [WCAG 2.1 - Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
