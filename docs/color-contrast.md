# カラーコントラストとアクセシビリティ

## カラーコントラストとは

カラーコントラスト（色のコントラスト比）は、テキストと背景色の明度の差を数値化したものです。
視覚障害や色覚異常のあるユーザーにとって、十分なコントラストは可読性を確保するために不可欠です。

## WCAG（Web Content Accessibility Guidelines）基準

### コントラスト比の計算式

```
コントラスト比 = (明るい色の相対輝度 + 0.05) / (暗い色の相対輝度 + 0.05)
```

範囲: 1:1（同じ色）〜 21:1（白と黒）

### WCAG 2.1 の基準

| レベル | 通常テキスト | 大きいテキスト* | 用途 |
|--------|-------------|---------------|------|
| **AA（最低基準）** | 4.5:1 以上 | 3:1 以上 | 一般的なウェブサイトの推奨基準 |
| **AAA（強化基準）** | 7:1 以上 | 4.5:1 以上 | より高いアクセシビリティが必要な場合 |

\* 大きいテキスト = 18pt（24px）以上、または太字14pt（18.5px）以上

## 実際の例

### ✅ 良いコントラスト（AA準拠）

```tsx
// Primary Button: 白文字 #ffffff on 青背景 #2196f3
// コントラスト比: 約 4.6:1 ✅ AA準拠
<Button variant="primary">保存</Button>
```

**色の組み合わせ例:**
- 黒 `#212121` on 白 `#ffffff` → 16.1:1 ✅ AAA
- 白 `#ffffff` on 青 `#2196f3` → 4.6:1 ✅ AA
- ダークグレー `#616161` on 白 `#ffffff` → 5.7:1 ✅ AA

### ❌ 悪いコントラスト（不合格）

```tsx
// 薄いグレー #9e9e9e on 白背景 #ffffff
// コントラスト比: 約 2.8:1 ❌ 不合格
<Button style={{ color: '#9e9e9e', background: '#ffffff' }}>
  見づらいボタン
</Button>
```

**問題のある組み合わせ例:**
- ライトグレー `#9e9e9e` on 白 `#ffffff` → 2.8:1 ❌ 不合格
- 黄色 `#ffeb3b` on 白 `#ffffff` → 1.2:1 ❌ 不合格
- 青 `#2196f3` on 紫 `#9c27b0` → 2.1:1 ❌ 不合格

## デザインシステムでの実装

### 1. カラートークンの設計

```typescript
// src/design-system/tokens/colors.ts

export const colors = {
  // テキストカラー（WCAG AA準拠）
  text: {
    primary: '#212121',    // 白背景でコントラスト比 16.1:1
    secondary: '#616161',  // 白背景でコントラスト比 5.7:1
    disabled: '#9e9e9e',   // 無効化状態（情報伝達には使用しない）
    inverse: '#ffffff',    // 暗い背景用
  },

  // 背景カラー
  background: {
    default: '#ffffff',
    paper: '#f5f5f5',
    dark: '#212121',
  },

  // セマンティックカラー（白背景で使用を想定）
  success: '#4caf50',  // コントラスト比 4.1:1（AA大きいテキスト合格）
  warning: '#ff9800',  // コントラスト比 3.5:1（AA大きいテキスト合格）
  error: '#f44336',    // コントラスト比 4.8:1（AA合格）
};
```

### 2. ボタンのカラーコントラスト

```typescript
// Primary Button
{
  backgroundColor: colors.primary[500],  // #2196f3
  color: colors.contents.inverse,            // #ffffff
  // コントラスト比: 4.6:1 ✅ AA準拠
}

// Secondary Button
{
  backgroundColor: colors.neutral[200],  // #eeeeee
  color: colors.contents.primary,            // #212121
  // コントラスト比: 14.6:1 ✅ AAA準拠
}

// Outline Button
{
  backgroundColor: 'transparent',
  color: colors.primary[500],            // #2196f3
  border: `2px solid ${colors.primary[500]}`,
  // 背景が白の場合、コントラスト比: 4.6:1 ✅ AA準拠
}
```

## コントラスト比のチェック方法

### 1. ブラウザの開発者ツール

**Chrome DevTools:**
1. 要素を右クリック → 検証
2. Styles パネルでカラーピッカーを開く
3. コントラスト比が自動表示される
4. AA/AAA の合格状況がアイコンで表示される

### 2. オンラインツール

- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Contrast Ratio**: https://contrast-ratio.com/
- **Coolors Contrast Checker**: https://coolors.co/contrast-checker

### 3. ブラウザ拡張機能

- **WAVE (Web Accessibility Evaluation Tool)**
- **axe DevTools**
- **Lighthouse** (Chrome DevTools内蔵)

### 4. プログラムでチェック

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['jsx-a11y'],
  rules: {
    'jsx-a11y/color-contrast': 'warn', // コントラスト警告
  },
};
```

## 実践的なガイドライン

### 1. テキストの場合

```tsx
// ✅ 良い例
<p style={{ color: '#212121', background: '#ffffff' }}>
  読みやすい本文テキスト（16.1:1）
</p>

// ⚠️ 注意が必要
<p style={{ color: '#757575', background: '#ffffff' }}>
  やや読みにくいテキスト（4.6:1 - AAギリギリ）
</p>

// ❌ 悪い例
<p style={{ color: '#9e9e9e', background: '#ffffff' }}>
  読みにくいテキスト（2.8:1 - 不合格）
</p>
```

### 2. アイコンやグラフィックの場合

非テキストコンテンツ（アイコン、グラフなど）は **3:1以上** が推奨されます。

```tsx
// ✅ アイコンのコントラスト
<svg style={{ fill: '#616161' }}>  {/* 背景白で 5.7:1 */}
  <path d="..." />
</svg>

// ✅ フォーカスインジケーター
<button style={{
  outline: `3px solid #2196f3`,  // コントラスト比 3:1以上
}}>
  ボタン
</button>
```

### 3. 状態によるコントラスト

```tsx
// ✅ ホバー時もコントラストを維持
<button
  style={{ background: '#1976d2', color: '#ffffff' }}  // 6.3:1
  onMouseOver={(e) => {
    e.currentTarget.style.background = '#1565c0';  // 7.5:1 - より高いコントラスト
  }}
>
  ホバーしてください
</button>

// ✅ 無効化状態（情報はコントラスト以外でも伝える）
<button
  disabled
  style={{
    background: '#e0e0e0',
    color: '#9e9e9e',  // コントラスト低い（2.8:1）
    cursor: 'not-allowed',  // カーソルで状態を示す
    opacity: 0.6,  // 透明度で状態を示す
  }}
  aria-disabled="true"  // スクリーンリーダーに状態を伝える
>
  無効なボタン
</button>
```

## よくある間違い

### 1. グラデーションの使用

```tsx
// ❌ グラデーションの一部でコントラストが不足
<div style={{
  background: 'linear-gradient(to right, #2196f3, #e3f2fd)',
  color: '#ffffff'
}}>
  右側のテキストが読みにくい
</div>

// ✅ すべての範囲で十分なコントラストを確保
<div style={{
  background: 'linear-gradient(to right, #1976d2, #1565c0)',
  color: '#ffffff'
}}>
  どこでも読みやすい
</div>
```

### 2. 背景画像の上のテキスト

```tsx
// ❌ 画像のコントラストが不十分
<div style={{
  backgroundImage: 'url(light-image.jpg)',
  color: '#ffffff'
}}>
  読みにくいテキスト
</div>

// ✅ オーバーレイで可読性を確保
<div style={{
  backgroundImage: 'url(light-image.jpg)',
  position: 'relative'
}}>
  <div style={{
    background: 'rgba(0, 0, 0, 0.6)',  // 半透明の黒いオーバーレイ
    padding: '20px'
  }}>
    <p style={{ color: '#ffffff' }}>読みやすいテキスト</p>
  </div>
</div>
```

### 3. プレースホルダーのコントラスト

```tsx
// ❌ プレースホルダーが薄すぎる（ブラウザデフォルト）
<input
  type="text"
  placeholder="お名前を入力"
  style={{ '::placeholder': { color: '#a0a0a0' } }}  // 2.5:1 不合格
/>

// ✅ 十分なコントラストを確保
<input
  type="text"
  placeholder="お名前を入力"
  style={{ '::placeholder': { color: '#616161' } }}  // 5.7:1 合格
/>
```

## カラーコントラストチェックリスト

### 設計時

- [ ] すべてのテキストが4.5:1以上（または大きいテキストで3:1以上）
- [ ] アイコンやボタンのボーダーが3:1以上
- [ ] フォーカスインジケーターが3:1以上
- [ ] エラーメッセージなど重要な情報が色だけでなく形状やテキストでも伝わる

### 実装時

- [ ] デザイントークンで定義した色を使用
- [ ] カスタムカラーを使う場合はコントラストチェック済み
- [ ] ホバー・フォーカス・アクティブ状態でもコントラスト維持
- [ ] ダークモードでも適切なコントラスト

### テスト時

- [ ] Lighthouse でアクセシビリティスコアをチェック
- [ ] 実際のスクリーンリーダーでテスト
- [ ] グレースケール表示で確認（色覚異常のシミュレーション）

## まとめ

### 重要なポイント

1. **WCAG AA基準を最低限の目標に**（4.5:1以上）
2. **デザイントークンで安全な色を定義**
3. **ツールを活用してチェック**
4. **色だけに依存しない**（アイコン、テキストも併用）
5. **すべての状態でコントラストを維持**

### より深く学ぶための参考資料

- [WCAG 2.1 解説書（日本語）](https://waic.jp/docs/WCAG21/)
- [MDN - 色とコントラスト](https://developer.mozilla.org/ja/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast)
- [WebAIM - Contrast and Color](https://webaim.org/articles/contrast/)
- [カラーユニバーサルデザイン](https://www.cudo.jp/)
