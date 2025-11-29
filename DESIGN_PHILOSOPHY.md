# 🌸 デザイン哲学：優しい体験の実現

> 技術的な正確さと人間らしい温かみの融合

## 💫 なぜ「優しい体験」なのか

デザインシステムは、単なるコンポーネントの集まりではありません。それは**使う人の気持ちに寄り添う**ための仕組みです。

このプロジェクトでは、以下の信念に基づいて設計されています：

### 1. 🤝 誰一人として置き去りにしない

**すべての人が等しく情報にアクセスできる権利を持っています。**

- 👁️ 視覚障害のある方も
- 👂 聴覚障害のある方も
- 🖱️ マウスが使えない方も
- 🌍 様々な環境・デバイスを使う方も

技術は人を助けるためにあります。アクセシビリティは「後から追加する機能」ではなく、**設計の中核**です。

#### 実装例

- **WCAG 2.1 AA/AAA 準拠** - 国際標準に基づいた確実なアクセシビリティ
- **キーボード操作の完全サポート** - すべての機能をキーボードだけで操作可能
- **スクリーンリーダー対応** - 適切な ARIA 属性とセマンティック HTML
- **十分なコントラスト比** - 色覚特性に関わらず読みやすい配色

---

### 2. 💖 心地よさを感じる体験

**美しさと使いやすさは対立しません。**

心地よいデザインは、ユーザーの認知的負荷を減らし、ストレスのない体験を生み出します。

#### デザインの要素

##### 🎨 柔らかな色彩

- **低彩度のパステルカラー** - 目に優しく、長時間見ても疲れにくい
- **自然なグラデーション** - 滑らかな色の遷移で視覚的な心地よさ
- **十分なコントラスト** - 優しさと可読性の両立

##### 🌊 滑らかな動き

- **自然なイージング** - 機械的でない、人間らしい動き（ease-out, spring）
- **適切なトランジション** - 状態変化を理解しやすくする視覚的ヒント
- **reduced-motion 対応** - 動きに敏感な方への配慮

##### 🌿 呼吸するような余白

- **8px グリッドシステム** - 一貫性のある美しいリズム
- **適切な行間** - 読みやすさを最優先（WCAG 推奨の 1.5 以上）
- **十分なタップ領域** - モバイルでも確実に操作できる最低 44×44px

##### ✨ 丸みを帯びた形状

- **大きめの角丸** - 親しみやすく、柔らかな印象
- **柔らかいシャドウ** - 自然な奥行き感、圧迫感のない浮遊感

---

### 3. 🌱 成長し続ける仕組み

**良いデザインシステムは、時間とともに進化します。**

プロジェクトの成長に合わせて拡張・変更できる柔軟な設計が必要です。

#### スケーラビリティの実現

##### 📐 3 層トークン構造

```
Primitive Tokens（プリミティブ）
    ↓ 意味付け
Semantic Tokens（セマンティック）
    ↓ 用途特化
Component Tokens（コンポーネント）
```

**なぜ 3 層？**

- **変更の影響範囲を制御** - 1 箇所の変更で全体に波及させるか、一部だけ変えるか選べる
- **明確な責任分離** - 色の「値」と「意味」と「用途」を分けて管理
- **テーマの切り替えが容易** - Semantic 層を差し替えるだけでダークモード対応

##### 🔧 保守性の高い設計

```typescript
// ❌ 直接値を書くと変更が大変
const buttonStyle = {
  padding: "12px 16px",
  borderRadius: "8px",
  backgroundColor: "#2196f3",
};

// ✅ トークン経由なら一括変更可能
const buttonStyle = {
  padding: `${spacing.button.paddingY.md} ${spacing.button.paddingX.md}`,
  borderRadius: radii.button.md,
  backgroundColor: colors.button.primary.bg,
};
```

---

## 🎯 実践例：Button コンポーネント

私たちの哲学がどのように実装されているか、具体例で見てみましょう。

### ✅ 誰一人として置き去りにしない

```tsx
<Button
  onClick={handleClick}
  aria-label="ユーザー情報を保存"
  disabled={!isValid}
>
  保存
</Button>
```

- キーボードで Enter/Space で操作可能
- スクリーンリーダーが「ユーザー情報を保存」と読み上げ
- disabled 時は`aria-disabled`でその旨を通知
- WCAG レベル AA/AAA のコントラスト比を選択可能

### ✅ 心地よさを感じる体験

```tsx
<Button variant="primary" size="lg" wcagLevel="AAA" isLoading={isSaving}>
  保存中...
</Button>
```

- **柔らかな角丸** - `borderRadius.button.lg` (12px)
- **滑らかなホバー** - 0.2s ease-out トランジション
- **視覚的フィードバック** - ローディング状態の明確な表示
- **適切なサイズ** - タップしやすい 44px 以上の高さ

### ✅ 成長し続ける仕組み

```typescript
// トークンを変更するだけで全ボタンに反映
export const button = {
  primary: {
    bg: brand.primary, // テーマカラーに連動
    bgHover: brand.primaryDark,
    text: colors.contents.inverse,
  },
};
```

- テーマカラー変更時、すべてのボタンが自動的に更新
- 新しいバリアント追加も簡単
- TypeScript の型推論で安全に利用

---

## 🌟 デザイン原則の実践

### 1. 一貫性（Consistency）

同じ機能は同じ見た目・動きをする

```typescript
// すべてのフォーカススタイルが統一
const focusStyle = accessibilityLevels.focus[wcagLevel];
```

### 2. フィードバック（Feedback）

操作に対して明確な応答を返す

```tsx
// ホバー時の背景色変化
onMouseEnter={() => setIsHovered(true)}

// ローディング状態の表示
{isLoading && <Spinner />}
```

### 3. 予測可能性（Predictability）

ユーザーの期待を裏切らない

```tsx
// Enterキーでボタン発火（Web標準に従う）
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    onClick?.(e)
  }
}}
```

### 4. 許容性（Forgiveness）

ミスを防ぎ、修正を容易にする

```tsx
// 確認モーダルで誤操作を防ぐ
<Modal
  title="本当に削除しますか？"
  actions={[
    { label: "キャンセル", variant: "secondary" },
    { label: "削除する", variant: "danger" },
  ]}
/>
```

---

## 📚 参考にした思想・デザインシステム

### アクセシビリティ

- **[WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)** - Web 標準のアクセシビリティガイドライン
- **[Inclusive Design Principles](https://inclusivedesignprinciples.org/)** - 包摂的デザインの原則
- **[The A11Y Project](https://www.a11yproject.com/)** - 実践的なアクセシビリティリソース

### デザインシステム

- **[Material Design](https://m3.material.io/)** - Google のデザイン哲学
- **[Polaris (Shopify)](https://polaris.shopify.com/)** - 実用性重視のシステム
- **[Carbon (IBM)](https://carbondesignsystem.com/)** - エンタープライズ向けシステム
- **[Fluent (Microsoft)](https://fluent2.microsoft.design/)** - アクセシビリティ重視

### デザイントークン

- **[Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)** - 標準化への取り組み
- **[Theo (Salesforce)](https://github.com/salesforce-ux/theo)** - トークン管理ツール

---

## 💭 最後に

デザインは**思いやり**です。

画面の向こう側にいる人を想像し、その人の状況・能力・環境に寄り添うことが、
本当に優しい体験を生み出します。

このプロジェクトが、誰かの役に立つことを願って。

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
