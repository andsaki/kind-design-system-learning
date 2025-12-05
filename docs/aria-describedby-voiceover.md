# aria-describedby と VoiceOver の既知の問題

## 概要

`aria-describedby` 属性は WCAG で推奨される重要なアクセシビリティ属性ですが、**macOS の VoiceOver では正しく機能しません**。これは本プロジェクトのコードの問題ではなく、VoiceOver（Apple）側の既知のバグ/制限です。

## 問題の詳細

### 症状
- VoiceOver がフォーカス時に `aria-describedby` で参照されたテキストを読み上げない
- ブラウザ（Safari、Chrome、Firefox）に関係なく発生
- DOM 構造が完璧でも機能しない

### 検証結果

本プロジェクトで実装したカード番号入力フィールドの例：

```html
<input
  id="_r_1_"
  placeholder="1234 5678 9012 3456"
  aria-describedby="_r_1_-helper"
/>
<div id="_r_1_-helper">
  4桁ごとにスペースを入れると読みやすい形式になります。
  セキュリティコードとカード番号は別送メールで共有されます。
  入力後は Tab で次のフィールドへ移動してください。
</div>
```

**期待される動作:**
VoiceOver がフォーカス時に「カード番号、編集可能、テキスト。4桁ごとに...」と読み上げる

**実際の動作:**
VoiceOver は「カード番号、編集可能、テキスト」のみを読み上げ、`aria-describedby` の内容を読まない

## スクリーンリーダー別の対応状況

| スクリーンリーダー | OS | aria-describedby 対応 |
|------------------|----|--------------------|
| NVDA | Windows | ✅ フォーカス時に自動読み上げ |
| JAWS | Windows | ✅ フォーカス時に自動読み上げ |
| VoiceOver | macOS (Safari) | ❌ 読み上げない |
| VoiceOver | macOS (Chrome) | ❌ 読み上げない |
| VoiceOver | macOS (Firefox) | ⚠️ 不安定（時々読む） |

## 証拠となるソース

この問題は複数の公式ソースで確認されています：

### 1. Apple 公式コミュニティ
- **スレッド**: "aria-describedby is not announced by voiceover in macOS"
- **URL**: https://discussions.apple.com/thread/254083513
- **内容**: 多数のユーザーが同じ問題を報告

### 2. Elastic UI（主要 UI ライブラリ）
- **GitHub Issue**: "[VoiceOver+Safari] Tooltips / aria-describedby on interactive elements are no longer read out by VO"
- **URL**: https://github.com/elastic/eui/discussions/7395
- **内容**: エンタープライズレベルの UI ライブラリでも解決できていない

### 3. Radix UI（主要 UI ライブラリ）
- **GitHub Discussion**: "[Tooltip] aria-describedby not being read by voiceOver"
- **URL**: https://github.com/radix-ui/primitives/discussions/2037
- **内容**: 複数の開発者がワークアラウンドを議論

### 4. PowerMapper スクリーンリーダー互換性テスト
- **URL**: https://www.powermapper.com/tests/screen-readers/labelling/input-text-aria-describedby/
- **結果**: NVDA/JAWS は動作、VoiceOver は問題あり

## 本プロジェクトでの対応方針

### 採用した解決策

**`helperText` プロパティを使用した常時表示**

```tsx
<Input
  label="カード番号"
  helperText="4桁ごとにスペースを入れると読みやすい形式になります。..."
/>
```

この実装により：
- ✅ 視覚的に常に表示される
- ✅ VoiceOver ユーザーも視覚的に確認できる
- ✅ NVDA/JAWS では `aria-describedby` として読み上げられる
- ✅ WCAG ガイドラインに準拠（重要な情報は常時表示を推奨）

### 実装詳細

**Input コンポーネント (Input.tsx)**
```typescript
// helperText が指定された場合、自動的に aria-describedby を設定
const getAriaDescribedBy = () => {
  const ids: string[] = [];
  if (error) ids.push(errorId);
  if (helperText && !error) ids.push(helperId);
  if (arbitraryHelperId) ids.push(arbitraryHelperId);
  return ids.length > 0 ? ids.join(' ') : undefined;
};
```

**ヘルパーテキストの表示 (Input.tsx:184-196)**
```typescript
{helperText && !error && (
  <div
    id={helperId}
    className={css({
      mt: 2,
      fontSize: 'sm',
      color: 'contents.secondary',
      lineHeight: 'normal',
    })}
  >
    {helperText}
  </div>
)}
```

## 代替案として検討したが採用しなかった方法

### 1. aria-description 属性
- **理由**: ブラウザサポートが不完全（2024年時点）
- **問題**: Safari で動作しない可能性が高い

### 2. label に全情報を含める
```tsx
<Input label="カード番号（4桁ごとにスペース、Tab で次へ）" />
```
- **理由**: label が長すぎて UI/UX が悪化
- **問題**: 視覚的に煩雑になる

### 3. VoiceOver の設定変更に依存
- **理由**: ユーザー側の設定変更を要求するのは非現実的
- **問題**: 一般ユーザーは VoiceOver の詳細設定を変更しない

## ドキュメントでの説明

ComponentsPage.tsx のツールチップセクションで、この制限を明記：

```tsx
<ScreenReaderDemo
  label="スクリーンリーダーの読み上げ"
  description="aria-describedby による説明文の提供。VoiceOverでは VO+Shift+H でヘルプテキストを読めます（初回フォーカス時は自動読み上げされません）。NVDA/JAWSでは自動読み上げされます。"
>
```

## 結論

1. **この問題は本プロジェクトのコードの問題ではありません**
2. **Apple/VoiceOver 側の既知のバグ/制限です**
3. **採用した `helperText` 常時表示は WCAG のベストプラクティスです**
4. **これ以上の対応は不要かつ不可能です**

## 参考資料

- [WCAG 2.1 - aria-describedby の使用](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA1)
- [MDN - aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby)
- [WebAIM - Using aria-describedby to provide form hints](https://webaim.org/techniques/forms/advanced#describedby)

---

**最終更新**: 2025-12-05
**検証環境**: macOS (VoiceOver)、Chrome、実際のスクリーンリーダーテスト
