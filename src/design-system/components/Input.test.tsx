import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  describe('基本的なレンダリング', () => {
    it('ラベルとinputがレンダリングされる', () => {
      render(<Input label="お名前" />);
      expect(screen.getByLabelText('お名前')).toBeInTheDocument();
    });

    it('プレースホルダーが表示される', () => {
      render(<Input label="お名前" placeholder="山田太郎" />);
      expect(screen.getByPlaceholderText('山田太郎')).toBeInTheDocument();
    });

    it('デフォルトでtype="text"が設定される', () => {
      render(<Input label="テキスト" type="text" />);
      expect(screen.getByLabelText('テキスト')).toHaveAttribute('type', 'text');
    });
  });

  describe('ラベル関連付け', () => {
    it('labelとinputがfor/id属性で関連付けられる', () => {
      render(<Input label="メール" id="email-input" />);
      const input = screen.getByLabelText('メール');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('idが指定されない場合は自動生成される', () => {
      render(<Input label="テスト" />);
      const input = screen.getByLabelText('テスト');
      expect(input).toHaveAttribute('id');
      expect(input.id).toBeTruthy();
    });
  });

  describe('必須項目', () => {
    it('required属性が設定される', () => {
      render(<Input label="名前" required />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });

    it('必須マークが表示される', () => {
      render(<Input label="名前" required />);
      expect(screen.getByText('*', { exact: false })).toBeInTheDocument();
    });

    it('aria-required属性が設定される', () => {
      render(<Input label="名前" required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('エラー表示', () => {
    it('エラーメッセージが表示される', () => {
      render(<Input label="メール" error="無効なメールアドレスです" />);
      expect(screen.getByText('無効なメールアドレスです')).toBeInTheDocument();
    });

    it('エラー時はaria-invalidがtrueになる', () => {
      render(<Input label="メール" error="無効なメールアドレスです" />);
      expect(screen.getByLabelText('メール')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーメッセージとinputがaria-describedbyで関連付けられる', () => {
      render(<Input label="メール" error="無効なメールアドレスです" />);
      const input = screen.getByLabelText('メール');
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent('無効なメールアドレスです');
    });

    it('エラーメッセージにrole="alert"が設定される', () => {
      render(<Input label="メール" error="無効なメールアドレスです" />);
      expect(screen.getByRole('alert')).toHaveTextContent('無効なメールアドレスです');
    });
  });

  describe('ヘルプテキスト', () => {
    it('ヘルプテキストが表示される', () => {
      render(<Input label="パスワード" helperText="8文字以上で入力してください" />);
      expect(screen.getByText('8文字以上で入力してください')).toBeInTheDocument();
    });

    it('ヘルプテキストとinputがaria-describedbyで関連付けられる', () => {
      render(<Input label="パスワード" helperText="8文字以上で入力してください" />);
      const input = screen.getByLabelText('パスワード');
      const helperId = input.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      expect(document.getElementById(helperId!)).toHaveTextContent('8文字以上で入力してください');
    });
  });

  describe('無効化状態', () => {
    it('disabled属性が設定される', () => {
      render(<Input label="無効" disabled />);
      expect(screen.getByLabelText('無効')).toBeDisabled();
    });

    it('無効化時は入力できない', async () => {
      const user = userEvent.setup();
      render(<Input label="無効" disabled value="" />);
      const input = screen.getByLabelText('無効');

      await user.type(input, 'test');
      expect(input).toHaveValue('');
    });
  });

  describe('入力イベント', () => {
    it('onChange イベントが発火する', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input label="名前" onChange={handleChange} />);

      await user.type(screen.getByLabelText('名前'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('入力値が更新される', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input label="名前" onChange={handleChange} />);

      const input = screen.getByLabelText('名前');
      await user.type(input, 'テスト');
      expect(input).toHaveValue('テスト');
    });
  });

  describe('入力タイプ', () => {
    it('email タイプが設定できる', () => {
      render(<Input label="メール" type="email" />);
      expect(screen.getByLabelText('メール')).toHaveAttribute('type', 'email');
    });

    it('password タイプが設定できる', () => {
      render(<Input label="パスワード" type="password" />);
      expect(screen.getByLabelText('パスワード')).toHaveAttribute('type', 'password');
    });

    it('number タイプが設定できる', () => {
      render(<Input label="年齢" type="number" />);
      expect(screen.getByLabelText('年齢')).toHaveAttribute('type', 'number');
    });
  });

  describe('数値入力', () => {
    it('min属性が設定される', () => {
      render(<Input label="数量" type="number" min={0} />);
      expect(screen.getByLabelText('数量')).toHaveAttribute('min', '0');
    });

    it('max属性が設定される', () => {
      render(<Input label="数量" type="number" max={100} />);
      expect(screen.getByLabelText('数量')).toHaveAttribute('max', '100');
    });

    it('step属性が設定される', () => {
      render(<Input label="数量" type="number" step={5} />);
      expect(screen.getByLabelText('数量')).toHaveAttribute('step', '5');
    });
  });

  describe('サイズ', () => {
    it('sm サイズでレンダリングされる', () => {
      render(<Input label="小" size="sm" />);
      expect(screen.getByLabelText('小')).toBeInTheDocument();
    });

    it('md サイズでレンダリングされる', () => {
      render(<Input label="中" size="md" />);
      expect(screen.getByLabelText('中')).toBeInTheDocument();
    });

    it('lg サイズでレンダリングされる', () => {
      render(<Input label="大" size="lg" />);
      expect(screen.getByLabelText('大')).toBeInTheDocument();
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      render(<Input label="入力" />);
      expect(screen.getByLabelText('入力')).toBeInTheDocument();
    });

    it('AAAレベルが指定できる', () => {
      render(<Input label="入力" wcagLevel="AAA" />);
      expect(screen.getByLabelText('入力')).toBeInTheDocument();
    });
  });
});
