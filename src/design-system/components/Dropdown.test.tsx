import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown, type DropdownOption } from './Dropdown';

const options: DropdownOption[] = [
  { value: 'apple', label: 'りんご' },
  { value: 'banana', label: 'バナナ' },
  { value: 'orange', label: 'オレンジ' },
];

describe('Dropdown', () => {
  it('ラベルとプレースホルダーを表示する', () => {
    render(
      <Dropdown
        label="好きな果物"
        options={options}
        placeholder="選択してください"
      />
    );

    expect(screen.getByText('好きな果物')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /選択してください/ })).toBeInTheDocument();
  });

  it('ボタンをクリックするとリストが表示される', async () => {
    const user = userEvent.setup();
    render(<Dropdown label="果物" options={options} placeholder="選択してください" />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(options.length);
  });

  it('選択した値を onChange へ渡す', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Dropdown
        label="果物"
        options={options}
        placeholder="選択してください"
        onChange={handleChange}
      />
    );

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'バナナ' }));

    expect(handleChange).toHaveBeenCalledWith('banana');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('エラーとヘルプテキストを表示し aria 属性で紐づける', () => {
    render(
      <Dropdown
        label="果物"
        options={options}
        placeholder="選択してください"
        helperText="1つ選択してください"
        error="選択が必須です"
      />
    );

    expect(screen.getByText('選択が必須です')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('選択が必須です');

    const button = screen.getByRole('button');
    const describedBy = button.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const describedElement = describedBy ? document.getElementById(describedBy) : null;
    expect(describedElement).toHaveTextContent('選択が必須です');
  });
});
