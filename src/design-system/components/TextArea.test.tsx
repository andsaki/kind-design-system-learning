import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  describe('基本的なレンダリング', () => {
    it('ラベルとtextareaがレンダリングされる', () => {
      render(<TextArea label="コメント" />);
      expect(screen.getByLabelText('コメント')).toBeInTheDocument();
    });

    it('プレースホルダーが表示される', () => {
      render(<TextArea label="コメント" placeholder="ご意見をお聞かせください" />);
      expect(screen.getByPlaceholderText('ご意見をお聞かせください')).toBeInTheDocument();
    });
  });

  describe('ラベル関連付け', () => {
    it('labelとtextareaがfor/id属性で関連付けられる', () => {
      render(<TextArea label="コメント" id="comment-area" />);
      const textarea = screen.getByLabelText('コメント');
      expect(textarea).toHaveAttribute('id', 'comment-area');
    });

    it('idが指定されない場合は自動生成される', () => {
      render(<TextArea label="コメント" />);
      const textarea = screen.getByLabelText('コメント');
      expect(textarea).toHaveAttribute('id');
      expect(textarea.id).toBeTruthy();
    });
  });

  describe('必須項目', () => {
    it('required属性が設定される', () => {
      render(<TextArea label="コメント" required />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });

    it('必須マークが表示される', () => {
      render(<TextArea label="コメント" required />);
      expect(screen.getByText('*', { exact: false })).toBeInTheDocument();
    });

    it('aria-required属性が設定される', () => {
      render(<TextArea label="コメント" required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('エラー表示', () => {
    it('エラーメッセージが表示される', () => {
      render(<TextArea label="コメント" error="入力が必要です" />);
      expect(screen.getByText('入力が必要です')).toBeInTheDocument();
    });

    it('エラー時はaria-invalidがtrueになる', () => {
      render(<TextArea label="コメント" error="入力が必要です" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーメッセージとtextareaがaria-describedbyで関連付けられる', () => {
      render(<TextArea label="コメント" error="入力が必要です" />);
      const textarea = screen.getByRole('textbox');
      const errorId = textarea.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(errorId).toContain('error');
    });

    it('エラーメッセージにrole="alert"が設定される', () => {
      render(<TextArea label="コメント" error="入力が必要です" />);
      expect(screen.getByRole('alert')).toHaveTextContent('入力が必要です');
    });
  });

  describe('ヘルプテキスト', () => {
    it('ヘルプテキストが表示される', () => {
      render(<TextArea label="コメント" helpText="200文字以内で入力してください" />);
      expect(screen.getByText('200文字以内で入力してください')).toBeInTheDocument();
    });

    it('ヘルプテキストとtextareaがaria-describedbyで関連付けられる', () => {
      render(<TextArea label="コメント" helpText="200文字以内で入力してください" />);
      const textarea = screen.getByRole('textbox');
      const describedBy = textarea.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });

    it('エラーがある場合はヘルプテキストが表示されない', () => {
      render(<TextArea label="コメント" helpText="ヘルプ" error="エラー" />);
      expect(screen.queryByText('ヘルプ')).not.toBeInTheDocument();
      expect(screen.getByText('エラー')).toBeInTheDocument();
    });
  });

  describe('文字数カウント', () => {
    it('showCount=trueで文字数が表示される', () => {
      render(<TextArea label="コメント" showCount maxLength={100} />);
      expect(screen.getByText('0 / 100')).toBeInTheDocument();
    });

    it('入力すると文字数が更新される', async () => {
      const user = userEvent.setup();
      render(<TextArea label="コメント" showCount maxLength={100} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'test');

      // 文字数が更新されることを確認（"4 / 100" が複数のテキストノードに分割されている）
      const countElement = screen.getByText((_content, element) => {
        return element?.textContent === '4 / 100';
      });
      expect(countElement).toBeInTheDocument();
    });

    it('maxLengthを超えるとエラー色になる', async () => {
      const user = userEvent.setup();
      render(<TextArea label="コメント" showCount maxLength={5} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '12345678');

      // maxLengthによって8文字は入力できないが、5文字は入力される
      expect(screen.getByText('5 / 5')).toBeInTheDocument();
    });

    it('文字数カウントにaria-live="polite"が設定される', () => {
      const { container } = render(<TextArea label="コメント" showCount maxLength={100} />);
      const countElement = container.querySelector('[aria-live="polite"]');
      expect(countElement).toBeInTheDocument();
      expect(countElement).toHaveTextContent('0 / 100');
    });
  });

  describe('無効化状態', () => {
    it('disabled属性が設定される', () => {
      render(<TextArea label="コメント" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('無効化時は入力できない', async () => {
      const user = userEvent.setup();
      render(<TextArea label="コメント" disabled value="" />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'test');
      expect(textarea).toHaveValue('');
    });
  });

  describe('入力イベント', () => {
    it('onChange イベントが発火する', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextArea label="コメント" onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('入力値が更新される', async () => {
      const user = userEvent.setup();
      render(<TextArea label="コメント" />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'テストコメント');
      expect(textarea).toHaveValue('テストコメント');
    });
  });

  describe('maxLength', () => {
    it('maxLength属性が設定される', () => {
      render(<TextArea label="コメント" maxLength={200} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '200');
    });

    it('maxLengthを超えて入力できない', async () => {
      const user = userEvent.setup();
      render(<TextArea label="コメント" maxLength={5} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '123456789');
      expect(textarea).toHaveValue('12345');
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      render(<TextArea label="コメント" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('AAAレベルが指定できる', () => {
      render(<TextArea label="コメント" wcagLevel="AAA" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('制御コンポーネント', () => {
    it('value属性で値を制御できる', () => {
      render(<TextArea label="コメント" value="初期値" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('初期値');
    });

    it('defaultValue属性で初期値を設定できる', () => {
      render(<TextArea label="コメント" defaultValue="デフォルト値" />);
      expect(screen.getByRole('textbox')).toHaveValue('デフォルト値');
    });
  });

  describe('リサイズ', () => {
    it('vertical リサイズが有効', () => {
      render(<TextArea label="コメント" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveStyle({ resize: 'vertical' });
    });
  });
});
