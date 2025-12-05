import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Design System/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "" } as any,
  render: () => (
    <Tooltip content="これはツールチップです">
      <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>ホバーしてください</span>
    </Tooltip>
  ),
};

export const Top: Story = {
  args: { label: "" } as any,
  render: () => (
    <Tooltip content="上に表示されます" position="top">
      <button style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px' }}>上</button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { label: "" } as any,
  render: () => (
    <Tooltip content="下に表示されます" position="bottom">
      <button style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px' }}>下</button>
    </Tooltip>
  ),
};

export const Left: Story = {
  args: { label: "" } as any,
  render: () => (
    <Tooltip content="左に表示されます" position="left">
      <button style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px' }}>左</button>
    </Tooltip>
  ),
};

export const Right: Story = {
  args: { label: "" } as any,
  render: () => (
    <Tooltip content="右に表示されます" position="right">
      <button style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px' }}>右</button>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  args: { label: "" } as any,
  render: () => (
    <Tooltip content="500ms後に表示されます" delay={500} mouseDelay={500}>
      <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>遅延表示</span>
    </Tooltip>
  ),
};

export const NoDelay: Story = {
  args: { label: "" } as any,
  render: () => (
    <Tooltip content="すぐに表示されます" delay={0} mouseDelay={0}>
      <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>即座に表示</span>
    </Tooltip>
  ),
};

export const LongText: Story = {
  args: { label: "" } as any,
  render: () => (
    <Tooltip content="これは長いツールチップのテキストです。複数の情報を含めることができます。">
      <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>長いテキスト</span>
    </Tooltip>
  ),
};

export const AllPositions: Story = {
  args: { label: "" } as any,
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '100px', flexWrap: 'wrap' }}>
      <Tooltip content="上に表示" position="top">
        <button style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>上</button>
      </Tooltip>
      <Tooltip content="下に表示" position="bottom">
        <button style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>下</button>
      </Tooltip>
      <Tooltip content="左に表示" position="left">
        <button style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>左</button>
      </Tooltip>
      <Tooltip content="右に表示" position="right">
        <button style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>右</button>
      </Tooltip>
    </div>
  ),
};
