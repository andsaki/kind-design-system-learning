import type { Meta, StoryObj } from '@storybook/react';
import { MobileDrawer } from './MobileDrawer';
import { useId, useState } from 'react';
import { HamburgerButton } from './HamburgerButton';

const meta = {
  title: 'Components/MobileDrawer',
  component: MobileDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'モバイル用のドロワーメニュー。右からスライドして表示され、目次ナビゲーションを提供します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'ドロワーが開いているかどうか',
    },
    onClose: {
      action: 'closed',
      description: 'ドロワーを閉じる際のコールバック',
    },
    items: {
      description: '目次項目の配列',
    },
    activeId: {
      control: 'text',
      description: '現在アクティブなセクションのID',
    },
    drawerId: {
      control: 'text',
      description: '制御対象のID（ハンバーガーボタンのaria-controlsと連携）',
    },
  },
} satisfies Meta<typeof MobileDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  { id: 'section-1', title: 'はじめに' },
  { id: 'section-2', title: 'インストール' },
  { id: 'section-3', title: '使い方' },
  { id: 'section-4', title: 'API リファレンス' },
  { id: 'section-5', title: 'トラブルシューティング' },
];

// インタラクティブなストーリー
const DrawerWithButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState('section-1');
  const drawerId = useId();

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <HamburgerButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        controlsId={drawerId}
      />
      <MobileDrawer
        drawerId={drawerId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={mockItems}
        activeId={activeId}
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', marginTop: '80px' }}>
        <h1>デモページ</h1>
        <p>右上のハンバーガーボタンをクリックして、ドロワーメニューを開いてください。</p>

        <div style={{ marginTop: '40px' }}>
          <h2>アクティブセクションを変更:</h2>
          {mockItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              style={{
                margin: '5px',
                padding: '8px 16px',
                backgroundColor: activeId === item.id ? '#3b82f6' : '#e5e7eb',
                color: activeId === item.id ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    items: mockItems,
    activeId: 'section-1',
  },
  render: () => <DrawerWithButton />,
  parameters: {
    docs: {
      description: {
        story: 'ハンバーガーボタンをクリックしてドロワーを開閉できます。目次項目をクリックするとドロワーが閉じます。',
      },
    },
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    items: mockItems,
    activeId: 'section-2',
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '開いた状態のドロワー。セクション2がアクティブになっています。',
      },
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    items: mockItems,
    activeId: 'section-1',
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '閉じた状態のドロワー（何も表示されません）。',
      },
    },
  },
};

export const LongList: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    items: Array.from({ length: 20 }, (_, i) => ({
      id: `section-${i + 1}`,
      title: `セクション ${i + 1}`,
    })),
    activeId: 'section-10',
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const drawerId = useId();
    const longItems = Array.from({ length: 20 }, (_, i) => ({
      id: `section-${i + 1}`,
      title: `セクション ${i + 1}`,
    }));

    return (
      <div style={{ minHeight: '100vh' }}>
        <HamburgerButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          controlsId={drawerId}
        />
        <MobileDrawer
          drawerId={drawerId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={longItems}
          activeId="section-10"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '長いリストの場合、ドロワー内でスクロール可能です。',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    items: mockItems,
    activeId: 'section-1',
  },
  render: () => <DrawerWithButton />,
  parameters: {
    docs: {
      description: {
        story: `
### アクセシビリティ機能

- **role="dialog"**: ダイアログとして認識される
- **aria-modal="true"**: モーダルダイアログであることを示す
- **aria-label**: 「目次」というラベルを提供
- **Escキー**: ドロワーを閉じる
- **オーバーレイクリック**: 背景をクリックして閉じる
- **フォーカストラップ**: ドロワー内にフォーカスを閉じ込める（推奨）
- **スクロールロック**: ドロワーが開いている間、背景のスクロールを無効化
- **スムーズアニメーション**: 0.3秒のトランジション
- **キーボードナビゲーション**: Tabキーで目次項目を移動
`,
      },
    },
  },
};
