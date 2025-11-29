# フォーカススタイルのデザイン

黄色背景フォーカスインジケーターについて説明します。

## なぜ黄色背景なのか

### 1. 視認性の高さ

黄色（#ffff00）と黒（#000000）の組み合わせは、最も高いコントラスト比の一つです。

```
黄色 #ffff00 と 黒 #000000 のコントラスト比: 19.56:1
```

これは WCAG AAA 基準（7:1以上）を大きく上回ります。

### 2. 色覚異常への配慮

- 黄色は多くの色覚タイプで識別しやすい
- 赤緑色覚異常の方でも判別可能
- 明度差が大きいため、白黒でも認識可能

### 3. 注目を引く

- 人間の目は黄色に敏感
- 警告標識にも使われる色
- フォーカス位置を即座に把握できる

## 実装例

以下のようなフォーカススタイルの実装が推奨されます：

```css
:focus {
  background-color: #ffff00; /* 黄色背景 */
  color: #000000;            /* 黒いテキスト */
  outline: 3px solid #000000; /* 黒いアウトライン */
  outline-offset: 2px;        /* アウトラインの余白 */
}
```

## このプロジェクトでの実装

### デザイントークン

```typescript
// src/design-system/tokens/colors.ts
export const colors = {
  focus: {
    background: '#ffff00',  // 黄色背景
    outline: '#000000',     // 黒いアウトライン
    text: '#000000',        // 黒いテキスト
  },
};
```

### Buttonコンポーネント

```tsx
// フォーカス時
onFocus={(e) => {
  e.currentTarget.style.backgroundColor = colors.focus.background;
  e.currentTarget.style.color = colors.focus.text;
  e.currentTarget.style.outline = `3px solid ${colors.focus.outline}`;
  e.currentTarget.style.outlineOffset = '2px';
}}

// フォーカスが外れた時
onBlur={(e) => {
  // 元のスタイルに戻す
  e.currentTarget.style.backgroundColor = variantStyles[variant].backgroundColor || '';
  e.currentTarget.style.color = variantStyles[variant].color || '';
  e.currentTarget.style.outline = 'none';
}}
```

### Inputコンポーネント

```tsx
// フォーカス時
onFocus={(e) => {
  if (!disabled) {
    e.currentTarget.style.backgroundColor = colors.focus.background;
    e.currentTarget.style.color = colors.focus.text;
    e.currentTarget.style.borderColor = colors.focus.outline;
    e.currentTarget.style.outline = `3px solid ${colors.focus.outline}`;
    e.currentTarget.style.outlineOffset = '2px';
  }
}}

// フォーカスが外れた時
onBlur={(e) => {
  e.currentTarget.style.backgroundColor = colors.background.default;
  e.currentTarget.style.color = colors.contents.primary;
  e.currentTarget.style.borderColor = error ? colors.error : colors.neutral[200];
  e.currentTarget.style.outline = 'none';
}}
```

## 実際の動作

### キーボード操作

1. **Tabキー**を押す
2. フォーカスが移動する
3. **黄色い背景**が表示される
4. 次の要素に移動すると、元のスタイルに戻る

### 見た目の変化

**通常時（ボタン）:**
```
┌─────────────┐
│   保存      │  ← 青い背景、白いテキスト
└─────────────┘
```

**フォーカス時（ボタン）:**
```
╔═══════════════╗
║┌─────────────┐║
║│   保存      │║  ← 黄色背景、黒いテキスト、黒い枠線
║└─────────────┘║
╚═══════════════╝
```

**通常時（入力欄）:**
```
┌────────────────┐
│                │  ← 白い背景、グレーの枠線
└────────────────┘
```

**フォーカス時（入力欄）:**
```
╔══════════════════╗
║┌────────────────┐║
║│                │║  ← 黄色背景、黒いテキスト、黒い枠線
║└────────────────┘║
╚══════════════════╝
```

## WCAG 準拠

### 2.4.7 フォーカスの可視化（レベル AA）

**要件:**
> キーボード操作が可能なユーザインタフェースには、フォーカスインジケーターが見える操作モードがある。

**対応:**
- ✅ 黄色背景で明確にフォーカス位置を示す
- ✅ コントラスト比 19.56:1（AAA基準を大幅に超える）
- ✅ すべての要素に適用

### 2.4.11 フォーカスの外観（レベル AAA）

**要件（WCAG 2.2）:**
> フォーカスインジケーターは以下を満たす：
> - コントラスト比が3:1以上
> - 最小サイズが十分

**対応:**
- ✅ コントラスト比 19.56:1
- ✅ 3pxのアウトライン + 2pxのオフセット
- ✅ 背景色の変更で全面的に識別可能

## 他のフォーカススタイルとの比較

### 1. ボックスシャドウ方式（以前の実装）

```css
:focus {
  box-shadow: 0 0 0 3px #bbdefb;
}
```

**メリット:**
- 控えめなデザイン
- 既存のデザインを崩さない

**デメリット:**
- コントラスト比が低い
- 背景色によっては見えにくい
- 色覚異常の方には判別しにくい場合がある

### 2. 黄色背景方式（現在の実装）

```css
:focus {
  background-color: #ffff00;
  color: #000000;
  outline: 3px solid #000000;
  outline-offset: 2px;
}
```

**メリット:**
- 非常に高い視認性
- どんな背景色でも認識可能
- 色覚異常の方にも配慮
- フォーカス位置を即座に把握

**デメリット:**
- デザインへの影響が大きい
- 派手すぎると感じる場合がある

### 3. アウトラインのみ

```css
:focus {
  outline: 3px solid #2196f3;
  outline-offset: 2px;
}
```

**メリット:**
- シンプル
- 既存のデザインを維持

**デメリット:**
- 細かい要素では見えにくい
- 背景色によっては判別困難

## ベストプラクティス

### 1. 一貫性を保つ

すべてのインタラクティブ要素に同じフォーカススタイルを適用します。

```tsx
// ボタン、入力欄、リンクすべてで同じスタイル
const focusStyle = {
  backgroundColor: colors.focus.background,
  color: colors.focus.text,
  outline: `3px solid ${colors.focus.outline}`,
  outlineOffset: '2px',
};
```

### 2. :focus-visibleの使用（CSS）

マウスクリックでは表示せず、キーボード操作時のみ表示したい場合：

```css
/* マウスクリックでは表示されない */
button:focus {
  outline: none;
}

/* キーボード操作時のみ表示 */
button:focus-visible {
  background-color: #ffff00;
  color: #000000;
  outline: 3px solid #000000;
  outline-offset: 2px;
}
```

### 3. アニメーションを控えめに

フォーカススタイルの変化は即座に表示します。

```css
/* ❌ アニメーションは推奨しない */
:focus {
  transition: all 0.3s ease;
}

/* ✅ 即座に表示 */
:focus {
  transition: none;
}
```

### 4. outline: none を避ける

デフォルトのアウトラインを削除する場合は、必ず代替のフォーカススタイルを提供します。

```css
/* ❌ 絶対にやってはいけない */
:focus {
  outline: none;
}

/* ✅ 代替スタイルを提供 */
:focus {
  outline: none;
  background-color: #ffff00;
  box-shadow: 0 0 0 3px #000000;
}
```

## テストチェックリスト

### キーボード操作

- [ ] Tabキーでフォーカスが移動する
- [ ] Shift + Tabで逆方向に移動する
- [ ] すべてのインタラクティブ要素がフォーカス可能
- [ ] フォーカス順序が論理的

### フォーカススタイル

- [ ] フォーカス時に黄色背景が表示される
- [ ] テキストが黒色に変わる
- [ ] 黒いアウトラインが表示される
- [ ] フォーカスが外れると元に戻る

### アクセシビリティ

- [ ] コントラスト比が十分（3:1以上）
- [ ] すべての状態でフォーカスが見える
- [ ] スクリーンリーダーで確認
- [ ] 色覚シミュレーターで確認

## 実装例

### リンクにも適用

```tsx
// Link.tsx
export const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <a
      {...props}
      style={{
        color: colors.primary[500],
        textDecoration: 'underline',
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = colors.focus.background;
        e.currentTarget.style.color = colors.focus.text;
        e.currentTarget.style.outline = `3px solid ${colors.focus.outline}`;
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = colors.primary[500];
        e.currentTarget.style.outline = 'none';
      }}
    >
      {children}
    </a>
  );
};
```

### グローバルCSS（オプション）

すべての要素に適用したい場合：

```css
/* App.css */
*:focus {
  background-color: #ffff00 !important;
  color: #000000 !important;
  outline: 3px solid #000000 !important;
  outline-offset: 2px !important;
}
```

## 参考リンク

- [WCAG 2.1 - 2.4.7 フォーカスの可視化](https://waic.jp/docs/WCAG21/#focus-visible)
- [WCAG 2.2 - 2.4.11 フォーカスの外観](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance)
- [GOV.UK Design System - Focus state](https://design-system.service.gov.uk/get-started/focus-states/)

## まとめ

黄色背景フォーカスインジケーターは：

- ✅ 視認性が非常に高い（コントラスト比 19.56:1）
- ✅ 色覚異常の方にも配慮
- ✅ WCAG AAA基準を満たす
- ✅ フォーカス位置を即座に把握できる
- ✅ すべてのユーザーに優しいデザイン

アクセシビリティを最優先するプロジェクトに最適なフォーカススタイルです。
