import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { Form, formSchemas } from './Form';

describe('Form', () => {
  const mockSchema = z.object({
    name: z.string().min(1, '名前は必須です'),
    email: z.string().email('有効なメールアドレスを入力してください'),
  });

  const mockFields = [
    { name: 'name' as const, label: '名前', required: true },
    { name: 'email' as const, label: 'メールアドレス', type: 'email' as const, required: true },
  ];

  describe('基本的なレンダリング', () => {
    it('フォームがレンダリングされる', () => {
      render(<Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} />);
      expect(screen.getByText('名前')).toBeInTheDocument();
      expect(screen.getByText('メールアドレス')).toBeInTheDocument();
    });

    it('送信ボタンが表示される', () => {
      render(<Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} />);
      expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
    });

    it('カスタム送信ボタンテキストが表示される', () => {
      render(
        <Form
          schema={mockSchema}
          fields={mockFields}
          onSubmit={vi.fn()}
          submitText="登録する"
        />
      );
      expect(screen.getByRole('button', { name: '登録する' })).toBeInTheDocument();
    });
  });

  describe('フィールド設定', () => {
    it('プレースホルダーが表示される', () => {
      const fieldsWithPlaceholder = [
        { name: 'name' as const, label: '名前', placeholder: '山田太郎' },
      ];
      render(
        <Form
          schema={z.object({ name: z.string() })}
          fields={fieldsWithPlaceholder}
          onSubmit={vi.fn()}
        />
      );
      expect(screen.getByPlaceholderText('山田太郎')).toBeInTheDocument();
    });

    it('ヘルプテキストが表示される', () => {
      const fieldsWithHelper = [
        {
          name: 'password' as const,
          label: 'パスワード',
          type: 'password' as const,
          helperText: '8文字以上で入力してください',
        },
      ];
      render(
        <Form
          schema={z.object({ password: z.string() })}
          fields={fieldsWithHelper}
          onSubmit={vi.fn()}
        />
      );
      expect(screen.getByText('8文字以上で入力してください')).toBeInTheDocument();
    });

    it('必須マークが表示される', () => {
      render(<Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} />);
      expect(screen.getAllByText('*', { exact: false }).length).toBeGreaterThan(0);
    });
  });

  describe('バリデーション', () => {
    it('必須フィールドが空の場合エラーが表示される', async () => {
      const user = userEvent.setup();
      render(<Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} />);

      await user.click(screen.getByRole('button', { name: '送信' }));

      await waitFor(() => {
        expect(screen.getByText('名前は必須です')).toBeInTheDocument();
      });
    });

    it('無効なメールアドレスでエラーが表示される', async () => {
      const user = userEvent.setup();
      render(<Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} />);

      const inputs = screen.getAllByRole('textbox');
      await user.type(inputs[0], '山田太郎');
      await user.type(inputs[1], 'invalid-email');
      await user.click(screen.getByRole('button', { name: '送信' }));

      await waitFor(() => {
        expect(screen.getByText('有効なメールアドレスを入力してください')).toBeInTheDocument();
      });
    });

    it('正しい入力でonSubmitが呼ばれる', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<Form schema={mockSchema} fields={mockFields} onSubmit={handleSubmit} />);

      const inputs = screen.getAllByRole('textbox');
      await user.type(inputs[0], '山田太郎');
      await user.type(inputs[1], 'test@example.com');
      await user.click(screen.getByRole('button', { name: '送信' }));

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
          { name: '山田太郎', email: 'test@example.com' },
          expect.anything()
        );
      });
    });
  });

  describe('デフォルト値', () => {
    it('defaultValuesで初期値が設定される', () => {
      render(
        <Form
          schema={mockSchema}
          fields={mockFields}
          onSubmit={vi.fn()}
          defaultValues={{ name: '初期名前', email: 'initial@example.com' }}
        />
      );

      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveValue('初期名前');
      expect(inputs[1]).toHaveValue('initial@example.com');
    });
  });

  describe('送信ボタンのカスタマイズ', () => {
    it('submitVariantが適用される', () => {
      render(
        <Form
          schema={mockSchema}
          fields={mockFields}
          onSubmit={vi.fn()}
          submitVariant="secondary"
        />
      );
      expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
    });

    it('submitSizeが適用される', () => {
      render(
        <Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} submitSize="lg" />
      );
      expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
    });

    it('isSubmitting=trueでローディング状態になる', () => {
      render(
        <Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} isSubmitting={true} />
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      render(<Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} />);
      expect(screen.getAllByRole('textbox').length).toBe(2);
    });

    it('Aレベルが適用される', () => {
      render(
        <Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} wcagLevel="A" />
      );
      expect(screen.getAllByRole('textbox').length).toBe(2);
    });

    it('AAAレベルが適用される', () => {
      render(
        <Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} wcagLevel="AAA" />
      );
      expect(screen.getAllByRole('textbox').length).toBe(2);
    });
  });

  describe('アクセシビリティの関連付け', () => {
    it('ヘルプテキストがaria-describedbyで紐づく', () => {
      const schema = z.object({ email: z.string().email('有効なメールアドレスを入力してください') });
      render(
        <Form
          schema={schema}
          fields={[
            {
              name: 'email',
              label: 'メールアドレス',
              type: 'email',
              helperText: 'example@domain.com の形式で入力してください',
            },
          ]}
          onSubmit={vi.fn()}
        />
      );

      const emailInput = screen.getByLabelText('メールアドレス');
      const describedBy = emailInput.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent(
        'example@domain.com の形式で入力してください'
      );
    });

    it('バリデーションエラー時はエラーメッセージがaria-describedbyに切り替わる', async () => {
      const user = userEvent.setup();
      render(<Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} />);

      await user.click(screen.getByRole('button', { name: '送信' }));
      const nameErrorNode = await screen.findByText('名前は必須です');
      expect(nameErrorNode).toHaveAttribute('role', 'alert');

      const nameInput = screen.getByLabelText(/名前/);
      const describedBy = nameInput.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent('名前は必須です');
    });
  });

  describe('フィールドサイズ', () => {
    it('フィールドサイズが適用される', () => {
      const fieldsWithSize = [
        { name: 'name' as const, label: '名前', size: 'sm' as const },
      ];
      render(
        <Form
          schema={z.object({ name: z.string() })}
          fields={fieldsWithSize}
          onSubmit={vi.fn()}
        />
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('カスタムスタイル', () => {
    it('styleプロパティでカスタムスタイルが適用される', () => {
      const { container } = render(
        <Form
          schema={mockSchema}
          fields={mockFields}
          onSubmit={vi.fn()}
          style={{ marginTop: '20px' }}
        />
      );
      const form = container.querySelector('form');
      expect(form).toHaveStyle({ marginTop: '20px' });
    });
  });

  describe('noValidate属性', () => {
    it('フォームにnoValidate属性が設定される', () => {
      const { container } = render(
        <Form schema={mockSchema} fields={mockFields} onSubmit={vi.fn()} />
      );
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('noValidate');
    });
  });
});

describe('formSchemas', () => {
  describe('email', () => {
    it('有効なメールアドレスを受け入れる', () => {
      const result = formSchemas.email.safeParse('test@example.com');
      expect(result.success).toBe(true);
    });

    it('無効なメールアドレスでエラーになる', () => {
      const result = formSchemas.email.safeParse('invalid-email');
      expect(result.success).toBe(false);
    });
  });

  describe('required', () => {
    it('値があれば受け入れる', () => {
      const schema = formSchemas.required('名前');
      const result = schema.safeParse('テスト');
      expect(result.success).toBe(true);
    });

    it('空文字列でエラーになる', () => {
      const schema = formSchemas.required('名前');
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
    });
  });

  describe('minLength', () => {
    it('最小文字数を満たす場合は受け入れる', () => {
      const schema = formSchemas.minLength(3, 'ユーザー名');
      const result = schema.safeParse('abc');
      expect(result.success).toBe(true);
    });

    it('最小文字数未満でエラーになる', () => {
      const schema = formSchemas.minLength(3, 'ユーザー名');
      const result = schema.safeParse('ab');
      expect(result.success).toBe(false);
    });
  });

  describe('maxLength', () => {
    it('最大文字数以内の場合は受け入れる', () => {
      const schema = formSchemas.maxLength(10, 'ユーザー名');
      const result = schema.safeParse('test');
      expect(result.success).toBe(true);
    });

    it('最大文字数を超えるとエラーになる', () => {
      const schema = formSchemas.maxLength(5, 'ユーザー名');
      const result = schema.safeParse('toolong');
      expect(result.success).toBe(false);
    });
  });

  describe('password', () => {
    it('条件を満たすパスワードを受け入れる', () => {
      const result = formSchemas.password.safeParse('Password123');
      expect(result.success).toBe(true);
    });

    it('短すぎるパスワードでエラーになる', () => {
      const result = formSchemas.password.safeParse('Pass1');
      expect(result.success).toBe(false);
    });

    it('大文字が含まれないとエラーになる', () => {
      const result = formSchemas.password.safeParse('password123');
      expect(result.success).toBe(false);
    });

    it('小文字が含まれないとエラーになる', () => {
      const result = formSchemas.password.safeParse('PASSWORD123');
      expect(result.success).toBe(false);
    });

    it('数字が含まれないとエラーになる', () => {
      const result = formSchemas.password.safeParse('Password');
      expect(result.success).toBe(false);
    });
  });

  describe('urlString', () => {
    it('有効なURLを受け入れる', () => {
      const result = formSchemas.urlString.safeParse('https://example.com');
      expect(result.success).toBe(true);
    });

    it('無効なURLでエラーになる', () => {
      const result = formSchemas.urlString.safeParse('not-a-url');
      expect(result.success).toBe(false);
    });
  });

  describe('phone', () => {
    it('有効な電話番号を受け入れる', () => {
      const result = formSchemas.phone.safeParse('03-1234-5678');
      expect(result.success).toBe(true);
    });

    it('数字のみも受け入れる', () => {
      const result = formSchemas.phone.safeParse('09012345678');
      expect(result.success).toBe(true);
    });

    it('無効な文字を含むとエラーになる', () => {
      const result = formSchemas.phone.safeParse('03-1234-abcd');
      expect(result.success).toBe(false);
    });
  });
});
