# 🤝 コントリビューションガイド

> このプロジェクトは**学習目的**で作成されています

## 📚 このプロジェクトについて

これは個人の学習プロジェクトですが、フィードバックや提案は大歓迎です！

### 💬 フィードバック・提案を送る

以下のような内容をお待ちしています：

- 🐛 **バグ報告** - 動作がおかしい箇所を見つけた
- 💡 **改善提案** - こうしたらもっと良くなるのでは？
- 📖 **ドキュメント** - 説明がわかりにくい、誤字を見つけた
- 🎨 **デザイン** - UIやアクセシビリティの改善案
- ❓ **質問** - このコードはどういう意味？

👉 [GitHub Issues](https://github.com/andsaki/accessibility-learning/issues) から気軽にどうぞ！

### 🎓 学習の参考に

このプロジェクトのコードやドキュメントは自由に参考にしていただけます。
同じような学習プロジェクトを始める方の助けになれば嬉しいです。

---

## 🛠️ 開発環境のセットアップ

自分の環境で動かしてみたい方向けの手順です。

### 必要なもの
- Node.js 18以上
- npm

### セットアップ手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/andsaki/accessibility-learning.git
cd accessibility-learning

# 2. 依存関係をインストール
npm install

# 3. 開発サーバーを起動
npm run dev
# → http://localhost:5173 で確認

# 4. Storybookを起動（別ターミナルで）
npm run storybook
# → http://localhost:6006 で確認
```

### Git hooks (Lefthook)

コミット/プッシュ前に自動で lint ＆ axe 検証を走らせるために [Lefthook](https://github.com/evilmartians/lefthook) を導入しています。

```bash
# Git 2.31 以上が必要です
volta run npx lefthook install

# 手動実行（例）
volta run npx lefthook run pre-commit
```

- `pre-commit` で `npm run lint` (ESLint + Stylelint) が走ります
- `pre-push` で `npm run test:playwright:storybook` (Storybook + axe-core) が走ります

### その他のコマンド

```bash
# ビルド
npm run build

# Storybookをビルド
npm run build-storybook
```

---

## 📚 参考情報

このプロジェクトで使っているコーディングルールやパターンです。
学習の参考にどうぞ！

### デザイントークンの使い方

デザイントークンの詳細は [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) をご覧ください。

```typescript
// ❌ 直接値を書くのではなく
const styles = {
  padding: '12px 16px',
  backgroundColor: '#2196f3',
};

// ✅ トークンを使う
import { spacing, colors } from '@/design-system/tokens';

const styles = {
  padding: `${spacing.button.paddingY.md} ${spacing.button.paddingX.md}`,
  backgroundColor: colors.button.primary.bg,
};
```

### アクセシビリティのポイント

デザイン哲学の詳細は [DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md) をご覧ください。

```tsx
// キーボード操作対応
<button
  aria-label="保存する"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick?.(e);
    }
  }}
>
  保存
</button>

// エラー表示
{error && (
  <div role="alert" aria-live="polite">
    {error}
  </div>
)}
```

---

## 💡 質問やわからないことがあれば

- 💬 [GitHub Issues](https://github.com/andsaki/accessibility-learning/issues) で質問
- 📖 [README.md](./README.md) で全体像を確認
- 🎨 [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) でトークンの使い方を確認
- 🌸 [DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md) でデザイン思想を理解

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
