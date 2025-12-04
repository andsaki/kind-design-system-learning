import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./Navigation";

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
メインナビゲーションコンポーネント。サイト全体のナビゲーション構造を提供します。

## アクセシビリティ機能

- \`aria-label="メインナビゲーション"\` で目的を明示
- \`<nav>\` 要素を使用してランドマークを提供
- アクティブなリンクを視覚的・意味的に区別
- キーボードナビゲーション対応
- アイコンに \`aria-hidden="true"\` を設定（装飾目的）
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのナビゲーション表示
 */
export const Default: Story = {};

/**
 * ダークモードでのナビゲーション
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * ナビゲーション構造の説明
 *
 * - トップレベルアイテム: ホーム、コンポーネント
 * - グループ化されたアイテム: ARIA、アクセシビリティ、デザイン
 * - 子アイテムは左にインデントされて表示
 */
export const Structure: Story = {
  parameters: {
    docs: {
      description: {
        story: `
ナビゲーションは階層構造を持ち、以下のような構成になっています：

1. **直接リンク**: ホーム、コンポーネント
2. **グループ化されたリンク**:
   - ARIA（7つのサブページ）
   - アクセシビリティ（2つのサブページ）
   - デザイン（3つのサブページ）

アクティブなリンクは背景色と太字で強調表示されます。
        `,
      },
    },
  },
};
