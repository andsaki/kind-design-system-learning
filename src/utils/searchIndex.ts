// このファイルは自動生成されます。直接編集しないでください。
// 生成コマンド: npm run build:search-index

export interface SearchableContent {
  title: string;
  path: string;
  headings: string[];
  content: string;
}

export const searchIndex: SearchableContent[] = [
  {
    "title": "画像比較・フォーム検証・モーション",
    "path": "/design/image-comparison",
    "headings": [
      "ボタン内の画像比較: img vs svg",
      "画像の5つの分類とalt属性の書き方",
      "情報を提供する画像",
      "装飾画像",
      "機能を持つ画像",
      "文字画像",
      "複雑な画像（グラフや図表）",
      "alt属性を書くときの考え方",
      "装飾画像には alt=\"\"",
      "aria-hiddenとは",
      "フォームの検証: pattern属性",
      "モーションアニメーション: 必要性の検討と回避方法"
    ],
    "content": "ボタン内の画像比較: img vs svg 画像の5つの分類とalt属性の書き方 情報を提供する画像 装飾画像 機能を持つ画像 文字画像 複雑な画像（グラフや図表） alt属性を書くときの考え方 装飾画像には alt=\"\" aria-hiddenとは フォームの検証: pattern属性 モーションアニメーション: 必要性の検討と回避方法 画像 img svg alt属性 aria-label aria-hidden visually-hidden ボタン 装飾画像 情報を提供する画像 機能を持つ画像 文字画像 複雑な画像 グラフ 図表 aria-describedby 適切なラベル ラベルを提供 フォーム検証 pattern属性 正規表現 バリデーション title aria-invalid 郵便番号 電話番号 ユーザー名 カタカナ inputmode モーションアニメーション prefers-reduced-motion 前庭障害 てんかん ADHD 視差効果 自動再生 一時停止 ユーザーコントロール アニメーションの必要性 回避方法"
  },
  {
    "title": "role=",
    "path": "/aria/role-presentation",
    "headings": [
      "概要",
      "主な用途",
      "使用例",
      "注意点",
      "ベストプラクティス"
    ],
    "content": "概要 主な用途 使用例 注意点 ベストプラクティス role presentation none プレゼンテーション 装飾 セマンティクス 意味を取り除く 支援技術 スクリーンリーダー 装飾的な画像 レイアウト用のテーブル 視覚的なリスト ARIA アクセシビリティ 要素が支援技術に対して 意味を持たない装飾的な要素"
  }
];
