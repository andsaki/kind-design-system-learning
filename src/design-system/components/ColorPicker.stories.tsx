import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { ComponentProps } from "react";
import { ColorPicker } from "./ColorPicker";

const meta = {
  title: "Design System/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
    },
    helperText: {
      control: "text",
    },
    error: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledColorPicker = (props: ComponentProps<typeof ColorPicker>) => {
  const [color, setColor] = useState(props.value?.toString() ?? "#1d4ed8");
  return (
    <ColorPicker
      {...props}
      value={color}
      onChange={(event) => setColor(event.target.value)}
    />
  );
};

export const Default: Story = {
  args: {
    label: "ブランドカラー",
    defaultValue: "#101828",
    helperText: "HEX形式 (#RRGGBB)",
  },
};

export const Controlled: Story = {
  args: {
    label: "アクセントカラー",
  },
  render: (args) => (
    <ControlledColorPicker
      {...args}
      helperText="値は state にバインドされています"
    />
  ),
};

export const WithError: Story = {
  args: {
    label: "背景色",
    value: "#ffffff",
    error: "許可されていない色です",
  },
};

export const Disabled: Story = {
  args: {
    label: "変更不可の色",
    value: "#4f46e5",
    disabled: true,
    helperText: "この色はシステムで予約されています",
  },
};
