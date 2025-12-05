import type { Meta, StoryObj } from '@storybook/react';
import { HamburgerButton } from './HamburgerButton';
import { useState } from 'react';

const meta = {
  title: 'Components/HamburgerButton',
  component: HamburgerButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'モバイル用のハンバーガーメニューボタン。開閉でアニメーションし、アクセシビリティに配慮した実装。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'メニューが開いているかどうか',
    },
    onClick: {
      action: 'clicked',
      description: 'クリック時のコールバック関数',
    },
    controlsId: {
      control: 'text',
      description: 'aria-controlsで関連付ける要素のID',
    },
  },
} satisfies Meta<typeof HamburgerButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// インタラクティブなストーリー
const HamburgerWithState = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <p style={{ marginTop: 80, textAlign: 'center' }}>
        状態: {isOpen ? '開' : '閉'}
      </p>
    </div>
  );
};

export const Default: Story = {
  args: {
    isOpen: false,
    onClick: () => {},
  },
  render: () => <HamburgerWithState />,
  parameters: {
    docs: {
      description: {
        story: 'クリックして開閉をテストできます。アイコンがアニメーションで×印に変化します。',
      },
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '閉じた状態のハンバーガーアイコン（3本線）',
      },
    },
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '開いた状態のアイコン（×印）',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    isOpen: false,
    onClick: () => {},
  },
  render: () => <HamburgerWithState />,
  parameters: {
    docs: {
      description: {
        story: `
### アクセシビリティ機能

- **aria-label**: 現在の状態に応じたラベル（「目次を開く」/「目次を閉じる」）
- **aria-expanded**: メニューの開閉状態を示す
- **キーボード操作**: Tabキーでフォーカス、Enterキーで開閉
- **視覚的フィードバック**: ホバー時とフォーカス時のスタイル変化
`,
      },
    },
  },
};
