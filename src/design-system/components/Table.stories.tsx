import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from './Table';
import type { TableProps } from './Table';

const sampleRows = [
  {
    attribute: 'aria-label',
    purpose: '名前のない要素にラベルを与える',
    example: 'aria-label="閉じる"',
  },
  {
    attribute: 'aria-describedby',
    purpose: '補足説明を提供する要素を関連付ける',
    example: 'aria-describedby="hint-text"',
  },
  {
    attribute: 'aria-current',
    purpose: '現在のページやステップを知らせる',
    example: 'aria-current="page"',
  },
  {
    attribute: 'aria-live',
    purpose: '動的更新を支援技術に通知する',
    example: 'aria-live="polite"',
  },
];

const contrastRows = [
  { level: 'AA', minBody: '4.5 : 1', minLarge: '3 : 1', description: '標準レベル（推奨）' },
  { level: 'AAA', minBody: '7 : 1', minLarge: '4.5 : 1', description: '厳格な基準（公共機関など）' },
];

const meta = {
  title: 'Design System/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'striped'],
      description: '行のスタイルバリエーション',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'セルの密度',
    },
    wcagLevel: {
      control: 'select',
      options: ['A', 'AA', 'AAA'],
      description: 'カラーコントラストレベル',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'スクロール時にヘッダーを固定',
    },
    highlightOnHover: {
      control: 'boolean',
      description: 'ホバー時に行をハイライト',
    },
    showColumnDividers: {
      control: 'boolean',
      description: '列の区切り線表示',
    },
    responsive: {
      control: 'boolean',
      description: '横スクロールコンテナーを有効化',
    },
    srOnlyCaption: {
      control: 'boolean',
      description: 'captionを視覚的に隠しつつ支援技術に残す',
    },
  },
} satisfies Meta<TableProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    caption: '主要なARIA属性の概要',
    variant: 'simple',
    size: 'md',
    wcagLevel: 'AA',
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell helpText="スクリーンリーダーで読まれる名称">
            属性
          </TableHeaderCell>
          <TableHeaderCell>役割</TableHeaderCell>
          <TableHeaderCell>使用例</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.attribute}>
            <TableCell>{row.attribute}</TableCell>
            <TableCell>{row.purpose}</TableCell>
            <TableCell>{row.example}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const StripedAndDividers: Story = {
  args: {
    caption: 'コントラスト比の要件（WCAG 2.1）',
    variant: 'striped',
    showColumnDividers: true,
    wcagLevel: 'AAA',
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell align="left">基準</TableHeaderCell>
          <TableHeaderCell align="center">通常テキスト</TableHeaderCell>
          <TableHeaderCell align="center">大きいテキスト</TableHeaderCell>
          <TableHeaderCell>備考</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contrastRows.map((row) => (
          <TableRow key={row.level}>
            <TableCell>{row.level}</TableCell>
            <TableCell align="center">{row.minBody}</TableCell>
            <TableCell align="center">{row.minLarge}</TableCell>
            <TableCell>{row.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const StickyHeader: Story = {
  args: {
    caption: 'WCAGレベル別 典型的なユースケース',
    stickyHeader: true,
    variant: 'striped',
    size: 'sm',
    wcagLevel: 'AA',
  },
  render: (args) => (
    <div style={{ maxHeight: '260px' }}>
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>レベル</TableHeaderCell>
            <TableHeaderCell>対象</TableHeaderCell>
            <TableHeaderCell>説明</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 12 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>{index % 2 === 0 ? 'AA' : 'AAA'}</TableCell>
              <TableCell>
                {index % 2 === 0 ? '公共サイト / 一般サービス' : '行政・金融・医療など'}
              </TableCell>
              <TableCell>
                {index % 2 === 0
                  ? 'ほとんどのサービスで求められる推奨レベルです。'
                  : 'より高い配慮が必要な領域で採用されます。'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const NumericData: Story = {
  args: {
    caption: '月間アクティブユーザー遷移（単位: 万人）',
    variant: 'simple',
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>月</TableHeaderCell>
          <TableHeaderCell align="right">MAU</TableHeaderCell>
          <TableHeaderCell align="right">増減率</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {['4月', '5月', '6月', '7月'].map((month, index) => (
          <TableRow key={month}>
            <TableCell>{month}</TableCell>
            <TableCell isNumeric>{(120 + index * 15).toLocaleString()}</TableCell>
            <TableCell isNumeric>{index === 0 ? '+4%' : `${5 + index}%`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WCAGLevelA: Story = {
  args: {
    caption: 'WCAGレベルA - 最低限のコントラスト',
    variant: 'simple',
    size: 'md',
    wcagLevel: 'A',
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>属性</TableHeaderCell>
          <TableHeaderCell>役割</TableHeaderCell>
          <TableHeaderCell>使用例</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.attribute}>
            <TableCell>{row.attribute}</TableCell>
            <TableCell>{row.purpose}</TableCell>
            <TableCell>{row.example}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WCAGLevelAA: Story = {
  args: {
    caption: 'WCAGレベルAA - 推奨コントラスト',
    variant: 'striped',
    size: 'md',
    wcagLevel: 'AA',
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>属性</TableHeaderCell>
          <TableHeaderCell>役割</TableHeaderCell>
          <TableHeaderCell>使用例</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.attribute}>
            <TableCell>{row.attribute}</TableCell>
            <TableCell>{row.purpose}</TableCell>
            <TableCell>{row.example}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WCAGLevelAAA: Story = {
  args: {
    caption: 'WCAGレベルAAA - 最高コントラスト',
    variant: 'striped',
    size: 'md',
    wcagLevel: 'AAA',
    highlightOnHover: true,
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>属性</TableHeaderCell>
          <TableHeaderCell>役割</TableHeaderCell>
          <TableHeaderCell>使用例</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.attribute}>
            <TableCell>{row.attribute}</TableCell>
            <TableCell>{row.purpose}</TableCell>
            <TableCell>{row.example}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
