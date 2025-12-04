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
    "title": "画像比較とalt属性",
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
      "aria-hiddenとは"
    ],
    "content": "ボタン内の画像比較: img vs svg 画像の5つの分類とalt属性の書き方 情報を提供する画像 装飾画像 機能を持つ画像 文字画像 複雑な画像（グラフや図表） alt属性を書くときの考え方 装飾画像には alt=\"\" aria-hiddenとは 画像 img svg alt属性 aria-label aria-hidden visually-hidden ボタン 装飾画像 情報を提供する画像 機能を持つ画像 文字画像 複雑な画像 グラフ 図表 aria-describedby 適切なラベル ラベルを提供 画像比較"
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
