import type { Meta, StoryObj } from "@storybook/react";
import { ScreenReaderDemo } from "./ScreenReaderDemo";
import { Input, Button, Checkbox } from "../design-system/components";

const meta = {
  title: "Components/ScreenReaderDemo",
  component: ScreenReaderDemo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
スクリーンリーダーの読み上げをシミュレートするデモコンポーネント。

## 機能

- コンポーネントの読み上げテキストを自動抽出
- Web Speech APIを使用した音声読み上げ
- 読み上げテキストのリアルタイム表示
- カスタムテキストの指定も可能

## アクセシビリティ

- 読み上げボタンに適切な \`aria-label\`
- 音声合成非対応ブラウザへの警告表示
- 読み上げ中のビジュアルフィードバック
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScreenReaderDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なテキスト入力のデモ
 */
export const BasicInput: Story = {
  args: {
    children: null,
    description: "ラベル付きテキスト入力がどのように読み上げられるかを確認できます。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <label htmlFor="demo-name">お名前</label>
      <input
        type="text"
        id="demo-name"
        name="name"
        placeholder="山田太郎"
        style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
      />
    </ScreenReaderDemo>
  ),
};

/**
 * 必須フィールドのデモ
 */
export const RequiredField: Story = {
  args: {
    children: null,
    description: "required属性とaria-requiredがどのように読み上げられるかを確認できます。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <label htmlFor="demo-email">
        メールアドレス <span aria-hidden="true">*</span>
      </label>
      <input
        type="email"
        id="demo-email"
        name="email"
        required
        aria-required="true"
        placeholder="example@domain.com"
        style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
      />
    </ScreenReaderDemo>
  ),
};

/**
 * ヘルプテキスト付きフィールド
 */
export const WithHelperText: Story = {
  args: {
    children: null,
    description: "aria-describedbyでヘルプテキストが関連付けられた例です。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <label htmlFor="demo-password">パスワード</label>
      <input
        type="password"
        id="demo-password"
        name="password"
        aria-describedby="password-help"
        style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
      />
      <span id="password-help" style={{ fontSize: "0.875rem", color: "#666", display: "block", marginTop: "0.25rem" }}>
        8文字以上で入力してください
      </span>
    </ScreenReaderDemo>
  ),
};

/**
 * デザインシステムのInputコンポーネント
 */
export const DesignSystemInput: Story = {
  args: {
    children: null,
    description: "プロジェクトのInputコンポーネントでの読み上げ例です。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <Input
        type="text"
        label="ユーザー名"
        placeholder="john_doe"
        helperText="半角英数字とアンダースコアが使用できます"
      />
    </ScreenReaderDemo>
  ),
};

/**
 * ボタンの読み上げ
 */
export const ButtonDemo: Story = {
  args: {
    children: null,
    description: "ボタンのテキストがどのように読み上げられるかを確認できます。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <button type="button" style={{ padding: "0.5rem 1rem" }}>
        送信する
      </button>
    </ScreenReaderDemo>
  ),
};

/**
 * アイコンボタンの読み上げ
 */
export const IconButton: Story = {
  args: {
    children: null,
    description: "aria-labelでアイコンボタンにラベルを付けた例です。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <button type="button" aria-label="メニューを開く" style={{ padding: "0.5rem" }}>
        ☰
      </button>
    </ScreenReaderDemo>
  ),
};

/**
 * チェックボックスの読み上げ
 */
export const CheckboxDemo: Story = {
  args: {
    children: null,
    description: "チェックボックスの状態がどのように読み上げられるかを確認できます。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <Checkbox label="利用規約に同意する" />
    </ScreenReaderDemo>
  ),
};

/**
 * フィールドセットの読み上げ
 */
export const FieldsetDemo: Story = {
  args: {
    children: null,
    description: "fieldsetとlegendを使用したグループ化の読み上げ例です。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <fieldset style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "4px" }}>
        <legend>連絡先情報</legend>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="demo-tel">電話番号</label>
          <input
            type="tel"
            id="demo-tel"
            name="phone"
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>
        <div>
          <label htmlFor="demo-email-fieldset">メールアドレス</label>
          <input
            type="email"
            id="demo-email-fieldset"
            name="email"
            style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>
      </fieldset>
    </ScreenReaderDemo>
  ),
};

/**
 * カスタム読み上げテキスト
 */
export const CustomSrText: Story = {
  args: {
    children: null,
    srText: "これはカスタムの読み上げテキストです。実際のDOMとは異なる内容を指定できます。",
    description: "srTextプロパティでカスタムテキストを指定した例です。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <div>
        <p>画面に表示されるテキスト</p>
      </div>
    </ScreenReaderDemo>
  ),
};

/**
 * ラベル付きデモ
 */
export const WithLabel: Story = {
  args: {
    children: null,
    label: "Example Component",
    description: "ラベルを付けてコンポーネントを識別しやすくできます。",
  },
  render: (args) => (
    <ScreenReaderDemo {...args}>
      <Button variant="primary">クリック</Button>
    </ScreenReaderDemo>
  ),
};
