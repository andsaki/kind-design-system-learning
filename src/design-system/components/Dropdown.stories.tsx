import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { ThemeProvider } from '../theme';
import { useState } from 'react';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
  { value: 'apple', label: 'りんご' },
  { value: 'banana', label: 'バナナ' },
  { value: 'orange', label: 'オレンジ' },
  { value: 'grape', label: 'ぶどう' },
  { value: 'melon', label: 'メロン' },
  { value: 'strawberry', label: 'いちご' },
];

export const Default: Story = {
  args: {
    label: '好きな果物',
    options: mockOptions,
    placeholder: '選択してください',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: '好きな果物',
    options: mockOptions,
    value: 'banana',
  },
};

export const WithError: Story = {
  args: {
    label: '好きな果物',
    options: mockOptions,
    error: '果物を選択してください',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: '好きな果物',
    options: mockOptions,
    helperText: '一番好きな果物を選んでください',
  },
};

export const Disabled: Story = {
  args: {
    label: '好きな果物',
    options: mockOptions,
    value: 'apple',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: '好きな果物',
    options: [
      { value: 'apple', label: 'りんご' },
      { value: 'banana', label: 'バナナ（売り切れ）', disabled: true },
      { value: 'orange', label: 'オレンジ' },
      { value: 'grape', label: 'ぶどう（売り切れ）', disabled: true },
      { value: 'melon', label: 'メロン' },
    ],
  },
};

export const WCAGLevels = {
  render: () => {
    const [valueAA, setValueAA] = useState('');
    const [valueAAA, setValueAAA] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Dropdown
          label="レベルAA（デフォルト）"
          options={mockOptions}
          value={valueAA}
          onChange={setValueAA}
          wcagLevel="AA"
        />
        <Dropdown
          label="レベルAAA"
          options={mockOptions}
          value={valueAAA}
          onChange={setValueAAA}
          wcagLevel="AAA"
        />
      </div>
    );
  },
};

export const Interactive = {
  render: () => {
    const [selectedFruit, setSelectedFruit] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const cities = [
      { value: 'tokyo', label: '東京' },
      { value: 'osaka', label: '大阪' },
      { value: 'nagoya', label: '名古屋' },
      { value: 'fukuoka', label: '福岡' },
      { value: 'sapporo', label: '札幌' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Dropdown
          label="好きな果物"
          options={mockOptions}
          value={selectedFruit}
          onChange={setSelectedFruit}
          placeholder="果物を選択"
          required
        />

        <Dropdown
          label="住んでいる都市"
          options={cities}
          value={selectedCity}
          onChange={setSelectedCity}
          placeholder="都市を選択"
          helperText="現在住んでいる都市を選んでください"
        />

        <div style={{
          padding: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.5rem',
          fontSize: '14px',
        }}>
          <p><strong>選択された値:</strong></p>
          <p>果物: {selectedFruit || 'なし'}</p>
          <p>都市: {selectedCity || 'なし'}</p>
        </div>
      </div>
    );
  },
};
