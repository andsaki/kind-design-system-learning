import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const mockOptions = [
  { value: 'option1', label: 'オプション1' },
  { value: 'option2', label: 'オプション2' },
  { value: 'option3', label: 'オプション3' },
];

describe('Select', () => {
  describe('基本的なレンダリング', () => {
    it('ラベルとselectがレンダリングされる', () => {
      render(<Select label="選択してください" options={mockOptions} />);
      expect(screen.getByLabelText('選択してください')).toBeInTheDocument();
    });

    it('選択肢が表示される', () => {
      render(<Select label="選択" options={mockOptions} />);
      expect(screen.getByRole('option', { name: 'オプション1' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'オプション2' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'オプション3' })).toBeInTheDocument();
    });

    it('プレースホルダーが表示される', () => {
      render(<Select label="選択" options={mockOptions} placeholder="選択してください" />);
      expect(screen.getByRole('option', { name: '選択してください' })).toBeInTheDocument();
    });
  });

  describe('ラベル関連付け', () => {
    it('labelとselectがfor/id属性で関連付けられる', () => {
      render(<Select label="選択" options={mockOptions} id="select-box" />);
      const select = screen.getByLabelText('選択');
      expect(select).toHaveAttribute('id', 'select-box');
    });

    it('idが指定されない場合は自動生成される', () => {
      render(<Select label="選択" options={mockOptions} />);
      const select = screen.getByLabelText('選択');
      expect(select).toHaveAttribute('id');
      expect(select.id).toBeTruthy();
    });
  });

  describe('必須項目', () => {
    it('required属性が設定される', () => {
      render(<Select label="選択" options={mockOptions} required />);
      expect(screen.getByRole('combobox')).toBeRequired();
    });

    it('必須マークが表示される', () => {
      render(<Select label="選択" options={mockOptions} required />);
      expect(screen.getByText('*', { exact: false })).toBeInTheDocument();
    });

    it('aria-required属性が設定される', () => {
      render(<Select label="選択" options={mockOptions} required />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('エラー表示', () => {
    it('エラーメッセージが表示される', () => {
      render(<Select label="選択" options={mockOptions} error="選択が必要です" />);
      expect(screen.getByText('選択が必要です')).toBeInTheDocument();
    });

    it('エラー時はaria-invalidがtrueになる', () => {
      render(<Select label="選択" options={mockOptions} error="選択が必要です" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーメッセージとselectがaria-describedbyで関連付けられる', () => {
      render(<Select label="選択" options={mockOptions} error="選択が必要です" />);
      const select = screen.getByRole('combobox');
      const describedBy = select.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(describedBy).toContain('error');
    });

    it('エラーメッセージにrole="alert"が設定される', () => {
      render(<Select label="選択" options={mockOptions} error="選択が必要です" />);
      expect(screen.getByRole('alert')).toHaveTextContent('選択が必要です');
    });
  });

  describe('ヘルプテキスト', () => {
    it('ヘルプテキストが表示される', () => {
      render(<Select label="選択" options={mockOptions} helperText="いずれかを選択してください" />);
      expect(screen.getByText('いずれかを選択してください')).toBeInTheDocument();
    });

    it('ヘルプテキストとselectがaria-describedbyで関連付けられる', () => {
      render(<Select label="選択" options={mockOptions} helperText="いずれかを選択してください" />);
      const select = screen.getByRole('combobox');
      const describedBy = select.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });

    it('エラーがある場合はヘルプテキストが表示されない', () => {
      render(<Select label="選択" options={mockOptions} helperText="ヘルプ" error="エラー" />);
      expect(screen.queryByText('ヘルプ')).not.toBeInTheDocument();
      expect(screen.getByText('エラー')).toBeInTheDocument();
    });
  });

  describe('無効化状態', () => {
    it('disabled属性が設定される', () => {
      render(<Select label="選択" options={mockOptions} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('無効化時は選択できない', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Select label="選択" options={mockOptions} disabled onChange={handleChange} />);

      const select = screen.getByRole('combobox');
      await user.selectOptions(select, 'option1');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('選択イベント', () => {
    it('onChange イベントが発火する', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Select label="選択" options={mockOptions} onChange={handleChange} />);

      const select = screen.getByRole('combobox');
      await user.selectOptions(select, 'option2');
      expect(handleChange).toHaveBeenCalled();
    });

    it('選択された値が更新される', async () => {
      const user = userEvent.setup();
      render(<Select label="選択" options={mockOptions} />);

      const select = screen.getByRole('combobox') as HTMLSelectElement;
      await user.selectOptions(select, 'option2');
      expect(select.value).toBe('option2');
    });
  });

  describe('選択肢の無効化', () => {
    it('disabled指定された選択肢は無効化される', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'オプション1' },
        { value: 'option2', label: 'オプション2', disabled: true },
        { value: 'option3', label: 'オプション3' },
      ];
      render(<Select label="選択" options={optionsWithDisabled} />);

      const option2 = screen.getByRole('option', { name: 'オプション2' }) as HTMLOptionElement;
      expect(option2.disabled).toBe(true);
    });

    it('プレースホルダーは無効化される', () => {
      render(<Select label="選択" options={mockOptions} placeholder="選択してください" />);
      const placeholder = screen.getByRole('option', { name: '選択してください' }) as HTMLOptionElement;
      expect(placeholder.disabled).toBe(true);
      expect(placeholder.value).toBe('');
    });
  });

  describe('サイズバリエーション', () => {
    it('sm サイズでレンダリングされる', () => {
      render(<Select label="選択" options={mockOptions} size="sm" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('md サイズでレンダリングされる', () => {
      render(<Select label="選択" options={mockOptions} size="md" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('lg サイズでレンダリングされる', () => {
      render(<Select label="選択" options={mockOptions} size="lg" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      render(<Select label="選択" options={mockOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('AAAレベルが指定できる', () => {
      render(<Select label="選択" options={mockOptions} wcagLevel="AAA" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('制御コンポーネント', () => {
    it('value属性で値を制御できる', () => {
      render(<Select label="選択" options={mockOptions} value="option2" onChange={() => {}} />);
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('option2');
    });

    it('defaultValue属性で初期値を設定できる', () => {
      render(<Select label="選択" options={mockOptions} defaultValue="option3" />);
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('option3');
    });
  });

  describe('aria属性', () => {
    it('aria-invalidがfalseの場合は文字列で設定される', () => {
      render(<Select label="選択" options={mockOptions} />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false');
    });
  });
});
