import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('基本的なレンダリング', () => {
    it('ラベルとcheckboxがレンダリングされる', () => {
      render(<Checkbox label="利用規約に同意する" />);
      expect(screen.getByRole('checkbox', { name: '利用規約に同意する' })).toBeInTheDocument();
    });

    it('ラベルテキストが表示される', () => {
      render(<Checkbox label="メールを受信する" />);
      expect(screen.getByText('メールを受信する')).toBeInTheDocument();
    });
  });

  describe('ラベル関連付け', () => {
    it('labelとcheckboxがfor/id属性で関連付けられる', () => {
      render(<Checkbox label="同意する" id="agree-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'agree-checkbox');
    });

    it('idが指定されない場合は自動生成される', () => {
      render(<Checkbox label="同意する" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id');
      expect(checkbox.id).toBeTruthy();
    });
  });

  describe('チェック状態', () => {
    it('チェックされていない状態でレンダリングされる', () => {
      render(<Checkbox label="チェック" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('checked属性でチェック状態になる', () => {
      render(<Checkbox label="チェック" checked readOnly />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('クリックでチェック状態が切り替わる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox label="チェック" onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalled();
    });

    it('Spaceキーでチェック状態が切り替わる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox label="チェック" onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('不確定状態', () => {
    it('indeterminate状態が設定される', () => {
      render(<Checkbox label="一部選択" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('indeterminate状態が切り替わる', () => {
      const { rerender } = render(<Checkbox label="選択" indeterminate={false} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox label="選択" indeterminate={true} />);
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  describe('無効化状態', () => {
    it('disabled属性が設定される', () => {
      render(<Checkbox label="無効" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('無効化時はクリックできない', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox label="無効" disabled onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('エラー表示', () => {
    it('エラーメッセージが表示される', () => {
      render(<Checkbox label="同意" error="同意が必要です" />);
      expect(screen.getByText('同意が必要です')).toBeInTheDocument();
    });

    it('エラー時はaria-invalidがtrueになる', () => {
      render(<Checkbox label="同意" error="同意が必要です" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーメッセージとcheckboxがaria-describedbyで関連付けられる', () => {
      render(<Checkbox label="同意" error="同意が必要です" />);
      const checkbox = screen.getByRole('checkbox');
      const errorId = checkbox.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent('同意が必要です');
    });

    it('エラーメッセージにrole="alert"が設定される', () => {
      render(<Checkbox label="同意" error="同意が必要です" />);
      expect(screen.getByRole('alert')).toHaveTextContent('同意が必要です');
    });
  });

  describe('ヘルプテキスト', () => {
    it('ヘルプテキストが表示される', () => {
      render(<Checkbox label="同意" helpText="利用規約を確認してください" />);
      expect(screen.getByText('利用規約を確認してください')).toBeInTheDocument();
    });

    it('ヘルプテキストとcheckboxがaria-describedbyで関連付けられる', () => {
      render(<Checkbox label="同意" helpText="利用規約を確認してください" />);
      const checkbox = screen.getByRole('checkbox');
      const helperId = checkbox.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      expect(document.getElementById(helperId!)).toHaveTextContent('利用規約を確認してください');
    });

    it('エラーがある場合はヘルプテキストが表示されない', () => {
      render(<Checkbox label="同意" helpText="ヘルプ" error="エラー" />);
      expect(screen.queryByText('ヘルプ')).not.toBeInTheDocument();
      expect(screen.getByText('エラー')).toBeInTheDocument();
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      render(<Checkbox label="チェック" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('AAAレベルが指定できる', () => {
      render(<Checkbox label="チェック" wcagLevel="AAA" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    it('ラベルをクリックしてもチェックできる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox label="同意する" onChange={handleChange} />);

      await user.click(screen.getByText('同意する'));
      expect(handleChange).toHaveBeenCalled();
    });

    it('フォーカス可能', () => {
      render(<Checkbox label="チェック" />);
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      expect(document.activeElement).toBe(checkbox);
    });
  });
});
