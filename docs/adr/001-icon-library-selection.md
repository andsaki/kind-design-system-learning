# ADR 001: SVGアイコンライブラリの選択

## ステータス

承認済み (Accepted) - 2025-11-02

## コンテキスト

現在、プロジェクトでは絵文字（🌸、💫、🤝など）をアイコンとして使用しているが、以下の課題がある：

1. **デザインの一貫性**: 絵文字はOS/ブラウザによって見た目が異なる
2. **プロフェッショナルさ**: 絵文字はカジュアルすぎる印象
3. **カスタマイズ性**: サイズや色の調整が困難
4. **アクセシビリティ**: スクリーンリーダーでの読み上げが不適切な場合がある

「優しい体験」をテーマとするデザインシステムに相応しい、一貫性のあるSVGアイコンライブラリを導入したい。

## 検討した選択肢

### 選択肢1: lucide-react

**リンク**: https://lucide.dev/

**メリット**:
- ✅ **軽量**: Tree-shakingで使用するアイコンのみバンドル
- ✅ **React専用**: Reactに最適化された設計
- ✅ **一貫したデザイン**: すべてのアイコンが統一されたスタイル
- ✅ **モダン**: 2023年以降も活発に開発中
- ✅ **カスタマイズ性**: サイズ、色、strokeWidthを簡単に変更可能
- ✅ **アクセシビリティ**: aria-hidden、role属性を簡単に設定可能
- ✅ **TypeScript完全対応**: 型定義が最初から含まれている

**デメリット**:
- ⚠️ アイコン数は中程度（約1,400個）
- ⚠️ 比較的新しいライブラリ

**バンドルサイズ**: 各アイコン約1-2KB（tree-shaking後）

**使用例**:
```tsx
import { Heart, Mail, Settings } from 'lucide-react';

<Heart size={24} color="red" strokeWidth={2} />
```

---

### 選択肢2: react-icons

**リンク**: https://react-icons.github.io/react-icons/

**メリット**:
- ✅ **アイコン数が豊富**: 40,000個以上（複数のセットを統合）
- ✅ **多様性**: Font Awesome、Material Icons、Featherなど複数のスタイル
- ✅ **実績**: 長年使われている定番ライブラリ
- ✅ **シンプルなAPI**: 使い方が簡単

**デメリット**:
- ❌ **バンドルサイズが大きい**: すべてのアイコンセットが含まれる
- ❌ **デザインの一貫性**: 複数セットを使うと統一感が失われる
- ⚠️ カスタマイズ性が低い（strokeWidth変更不可）

**バンドルサイズ**: 初期ロード約300KB〜（使用するセットによる）

**使用例**:
```tsx
import { FaHeart } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

<FaHeart size={24} color="red" />
```

---

### 選択肢3: @heroicons/react

**リンク**: https://heroicons.com/

**メリット**:
- ✅ **美しいデザイン**: Tailwind CSS公式、洗練されたスタイル
- ✅ **2つのバリアント**: Outline（線）とSolid（塗り）
- ✅ **軽量**: 必要なアイコンのみインポート
- ✅ **React公式対応**: 最適化されたコンポーネント

**デメリット**:
- ❌ **アイコン数が少ない**: 約300個程度
- ❌ **カスタマイズ性が低い**: strokeWidthなど細かい調整ができない
- ⚠️ Tailwind CSSとの併用が前提の設計

**バンドルサイズ**: 各アイコン約1-2KB

**使用例**:
```tsx
import { HeartIcon } from '@heroicons/react/24/outline';

<HeartIcon className="h-6 w-6 text-red-500" />
```

---

## 決定

**lucide-react** を採用する

## 理由

### 1. 見た目がかわいい 🎨
- **柔らかく丸みを帯びたデザイン**: プロジェクトの「優しい体験」テーマと完璧にマッチ
- **strokeWidthを調整可能**: より柔らかい印象にカスタマイズできる
- **統一感のあるスタイル**: すべてのアイコンが同じデザイン言語で描かれている
- **絵文字より洗練された印象**: プロフェッショナルでありながら親しみやすい

### 2. アクセシビリティとの親和性 ♿
- **aria-label属性を簡単に設定**: スクリーンリーダーで適切に読み上げられる
  ```tsx
  <Heart aria-label="お気に入りに追加" />
  ```
- **aria-hidden属性の制御**: 装飾的なアイコンを支援技術から隠せる
  ```tsx
  <Heart aria-hidden="true" />
  ```
- **role属性のサポート**: セマンティックな意味を明確に
- **十分なコントラスト**: 色のカスタマイズで WCAG 基準を満たしやすい
- **フォーカス管理**: キーボード操作時のフォーカススタイル適用が容易
- **サイズ調整**: 最低44×44pxのタップ領域を確保しやすい

### 3. パフォーマンス（Tree-shaking） 🌳
- **自動的に最適化**: Named Importするだけで使用するアイコンのみバンドル
- **軽量**: 各アイコン約1-2KB（1400個以上あっても使った分だけ）
- **仕組み**:
  ```tsx
  // ✅ これだけで自動的にTree-shakingされる
  import { Heart, Mail } from 'lucide-react';

  // HeartとMailのコードだけバンドルに含まれる（約2-4KB）
  // 残り1398個のアイコンは削除される
  ```
- **ビルド時に最適化**: ViteのRollupが自動的に未使用コードを削除
- **開発時の負担ゼロ**: 何も考えずにimportするだけでOK

**Tree-shakingとは？**
使われていないコードを自動的に削除する仕組み。木を揺すって枯れ葉を落とすイメージ。

**他のライブラリとの比較**:
- `react-icons`: すべてのアイコンセットがバンドルされる（約300KB〜）
- `lucide-react`: 使ったアイコンだけ（約2-4KB）
- **差分: 約100倍の差！**

### 4. 開発者体験
- TypeScript完全対応
- React専用で使いやすいAPI
- 一貫したデザインで迷わない

## 実装計画

### フェーズ1: インストールと基本設定
```bash
npm install lucide-react
```

### フェーズ2: 絵文字を段階的に置き換え
1. App.tsx のヘッダーセクション（🌸、💫、🤝など）
2. コンポーネントセクションの見出し（📝、🔘、📋など）
3. その他の絵文字

### フェーズ3: アイコンコンポーネントのラッパー作成
```tsx
// src/design-system/components/Icon.tsx
import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  'aria-label'?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 24,
  color,
  'aria-label': ariaLabel,
  ...props
}) => (
  <IconComponent
    size={size}
    color={color}
    aria-label={ariaLabel}
    aria-hidden={!ariaLabel}
    {...props}
  />
);
```

## 影響範囲

### 変更が必要なファイル
- `src/App.tsx` - ヘッダー、各セクションの見出し
- `src/design-system/components/Button.tsx` - アイコン付きボタン（将来的に）
- Storybookのストーリー（必要に応じて）

### バンドルサイズへの影響
- 推定増加量: 約10-20KB（使用するアイコン10個と仮定）
- Tree-shakingにより最小限に抑えられる

### 破壊的変更
なし（既存の絵文字は段階的に置き換え）

## 代替案を却下した理由

### react-icons
- バンドルサイズが大きく、パフォーマンスに影響
- 複数のアイコンセットによる一貫性の欠如

### @heroicons/react
- アイコン数が少なく、将来的に不足する可能性
- カスタマイズ性が低い

## 参考資料

- [lucide-react 公式ドキュメント](https://lucide.dev/guide/packages/lucide-react)
- [lucide-react GitHub](https://github.com/lucide-icons/lucide)
- [Bundle Phobia - lucide-react](https://bundlephobia.com/package/lucide-react)

## 更新履歴

- 2025-11-02: 初版作成（提案中）
- 2025-11-02: 承認（見た目のかわいさとアクセシビリティ親和性を重視）
- 2025-11-02: Tree-shakingの詳細説明を追加

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
