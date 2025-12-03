# 0002. ReactとTypeScriptの採用

日付: 2025-12-02

## ステータス

承認済み

## コンテキスト

アクセシビリティ学習用のデザインシステムを構築するにあたり、フロントエンドフレームワークと型システムを選定する必要がありました。

### 要件

- **コンポーネントベース**: 再利用可能なUIコンポーネントの構築
- **型安全性**: アクセシビリティ属性（ARIA属性）の正しい使用を保証
- **エコシステム**: 豊富なライブラリとツール
- **学習しやすさ**: 広く使われており、情報が豊富
- **パフォーマンス**: 高速なレンダリングとバンドルサイズの最適化

### 検討した代替案

1. **Vue.js + TypeScript**
   - シンプルな学習曲線
   - しかし、TypeScriptの統合がReactほど成熟していない

2. **Svelte + TypeScript**
   - コンパイル時最適化で高パフォーマンス
   - しかし、エコシステムが小さく、情報が少ない

3. **Angular**
   - TypeScriptがデフォルト
   - しかし、学習コストが高く、デザインシステムの構築には過剰

4. **React + TypeScript**
   - 最も広く使用されており、エコシステムが充実
   - TypeScriptとの統合が成熟
   - Panda CSSとの相性が良い

## 決定

ReactとTypeScriptを採用する。

## 結果

### ポジティブな影響

- **型安全なARIA属性**: TypeScriptにより、ARIA属性の型チェックが可能
  ```typescript
  interface ButtonProps {
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: 'true' | 'false';
  }
  ```

- **コンポーネントの再利用性**: カスタムフックとコンポーネントの合成パターンで再利用性が高い

- **豊富なエコシステム**: React Router、React Hook Form、アクセシビリティ関連ライブラリが充実

- **開発体験**: エディタサポート、型推論、リファクタリングツールが優れている

- **ドキュメントと情報**: 学習リソースが豊富で、問題解決が容易

### ネガティブな影響

- **学習コスト**: HooksやTypeScriptの概念を学ぶ必要がある

- **バンドルサイズ**: Svelteなどと比較すると、ランタイムのサイズが大きい

- **型定義の複雑さ**: 高度な型定義が必要な場合、複雑になることがある

### トレードオフ

- **バンドルサイズを犠牲にして、エコシステムと開発体験を獲得**
- **シンプルさを犠牲にして、型安全性とスケーラビリティを獲得**

## 参考資料

- [React 公式ドキュメント](https://react.dev/)
- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Accessibility](https://react.dev/learn/accessibility)
