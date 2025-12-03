# 003. Axe-core React統合によるアクセシビリティ自動テスト

日付: 2025-12-03

## ステータス

承認済み

## コンテキスト

アクセシビリティ学習用デザインシステムを開発する上で、実装したコンポーネントが実際にアクセシビリティ基準を満たしているかを継続的に検証する仕組みが必要でした。

### 課題

- 手動でのアクセシビリティテストは時間がかかり、見落としが発生しやすい
- WCAG基準違反を開発中にリアルタイムで検出できない
- コントラスト比不足やARIA属性の誤用など、細かい問題を見逃しやすい
- チーム全体でアクセシビリティ品質を保つための客観的な基準が必要

### 検討した代替案

1. **手動テスト**
   - スクリーンリーダーやキーボードナビゲーションで手動確認
   - 完全な検証が可能だが、時間がかかり自動化できない

2. **eslint-plugin-jsx-a11y**
   - ESLintプラグインでコード静的解析
   - 開発時にコードレベルで検出できるが、実際のDOM状態は検証できない

3. **Lighthouse**
   - Chrome DevToolsに統合されたツール
   - CI/CDでの自動化が可能だが、開発中のリアルタイム検出には不向き

4. **Pa11y**
   - コマンドラインツール
   - CI/CDに適しているが、開発体験が劣る

5. **@axe-core/react**
   - 開発環境でリアルタイムに検出
   - ブラウザコンソールに詳細な違反情報を表示
   - 業界標準のテストエンジン

## 決定

`@axe-core/react`を開発環境に統合し、アクセシビリティ違反をリアルタイムで検出する。

### ESLintプラグインとの併用

既に`eslint-plugin-jsx-a11y`が導入されていますが、両者は異なる段階でアクセシビリティをチェックします:

```mermaid
sequenceDiagram
    participant Dev as 開発者
    participant Editor as エディタ
    participant ESLint as eslint-plugin-jsx-a11y
    participant Browser as ブラウザ
    participant Axe as @axe-core/react

    Dev->>Editor: コードを書く
    Editor->>ESLint: 静的解析
    ESLint-->>Editor: ❌ &lt;img&gt; に alt がない
    Dev->>Editor: alt 属性を追加

    Dev->>Browser: 開発サーバー起動
    Browser->>Axe: DOM をレンダリング
    Axe->>Axe: 実行時チェック (1000ms毎)
    Axe-->>Browser: ❌ コントラスト比 2.19:1 (必要: 4.5:1)
    Axe-->>Browser: ❌ 重複ランドマーク
    Browser->>Dev: コンソールに表示

    Note over ESLint: コードレベル<br/>書く段階で検出
    Note over Axe: DOMレベル<br/>実行時に検出
```

**検出できる問題の違い:**
- **eslint-plugin-jsx-a11y**: コード静的解析 (例: alt属性の欠落、無効なARIA属性)
- **@axe-core/react**: 実行時DOM検証 (例: コントラスト比、動的に生成される要素の問題)

### 実装方法

```typescript
// main.tsx
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

## 結果

### ポジティブな影響

- **即座のフィードバック**: 開発中にブラウザコンソールでアクセシビリティ違反を即座に確認

- **詳細な情報**: 違反の重要度（serious/moderate/minor）、影響を受ける要素、修正方法が表示される

- **学習効果**: 実際の違反例を見ることで、アクセシビリティのベストプラクティスを学べる

- **品質保証**: 自動検出により、人的ミスを防止

- **具体的な検出例**:
  - コントラスト比不足: 前景色 #9f9f9f、背景色 #e8eaea (2.19:1) → 必要: 4.5:1
  - ランドマークの重複: 同じaria-labelを持つregionが複数存在
  - ARIA属性の誤用: 無効なaria属性の組み合わせ

- **開発者体験の向上**: 問題を後から修正するのではなく、実装中に気付ける

### ネガティブな影響

- **コンソールログの増加**: 開発中のコンソールに多くのログが出力される

- **パフォーマンス**: 開発環境で1000msごとにテストが実行される（本番環境には影響なし）

- **学習コスト**: Axeの出力を理解し、適切に対応する必要がある

- **誤検知の可能性**: 一部のケースで誤った警告が出る可能性

### トレードオフ

- **開発中のパフォーマンスを犠牲にして、アクセシビリティ品質を獲得**
- **静かな開発環境を犠牲にして、継続的な品質フィードバックを獲得**

### 実際の検出例

このプロジェクトで検出された実際の問題:

1. **Serious違反**: Color contrast
   - 要素: 「🔊 読み上げを聞く」テキスト
   - 問題: コントラスト比 2.19 (必要: 4.5:1)
   - 修正: テキスト色をより濃い色に変更する必要

2. **Moderate違反**: Landmark unique
   - 要素: `<div role="region" aria-label="htmlブロック">`
   - 問題: 同じaria-labelを持つlandmarkが複数存在
   - 修正: 各landmarkに一意の識別子を付与

## 参考資料

- [axe-core GitHub](https://github.com/dequelabs/axe-core)
- [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
