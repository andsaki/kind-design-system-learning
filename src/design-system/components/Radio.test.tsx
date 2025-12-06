import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './Radio';

describe('Radio', () => {
  describe('基本的なレンダリング', () => {
    it('ラベルとradioがレンダリングされる', () => {
      render(<Radio label="オプション1" name="option" />);
      expect(screen.getByRole('radio', { name: 'オプション1' })).toBeInTheDocument();
    });

    it('ラベルテキストが表示される', () => {
      render(<Radio label="選択肢A" name="choice" />);
      expect(screen.getByText('選択肢A')).toBeInTheDocument();
    });
  });

  describe('ラベル関連付け', () => {
    it('labelとradioがfor/id属性で関連付けられる', () => {
      render(<Radio label="オプション" id="radio-option" name="test" />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('id', 'radio-option');
    });

    it('idが指定されない場合は自動生成される', () => {
      render(<Radio label="オプション" name="test" />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('id');
      expect(radio.id).toBeTruthy();
    });
  });

  describe('選択状態', () => {
    it('選択されていない状態でレンダリングされる', () => {
      render(<Radio label="選択" name="test" />);
      expect(screen.getByRole('radio')).not.toBeChecked();
    });

    it('checked属性で選択状態になる', () => {
      render(<Radio label="選択" name="test" checked readOnly />);
      expect(screen.getByRole('radio')).toBeChecked();
    });

    it('クリックで選択状態になる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio label="選択" name="test" onChange={handleChange} />);

      const radio = screen.getByRole('radio');
      await user.click(radio);
      expect(handleChange).toHaveBeenCalled();
    });

    it('Spaceキーで選択状態になる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio label="選択" name="test" onChange={handleChange} />);

      const radio = screen.getByRole('radio');
      radio.focus();
      await user.keyboard(' ');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('無効化状態', () => {
    it('disabled属性が設定される', () => {
      render(<Radio label="無効" name="test" disabled />);
      expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('無効化時はクリックできない', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio label="無効" name="test" disabled onChange={handleChange} />);

      await user.click(screen.getByRole('radio'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('エラー表示', () => {
    it('エラーメッセージが表示される', () => {
      render(<Radio label="選択" name="test" error="選択が必要です" />);
      expect(screen.getByText('選択が必要です')).toBeInTheDocument();
    });

    it('エラー時はaria-invalidがtrueになる', () => {
      render(<Radio label="選択" name="test" error="選択が必要です" />);
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
    });

    it('エラーメッセージとradioがaria-describedbyで関連付けられる', () => {
      render(<Radio label="選択" name="test" error="選択が必要です" />);
      const radio = screen.getByRole('radio');
      const errorId = radio.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent('選択が必要です');
    });

    it('エラーメッセージにrole="alert"が設定される', () => {
      render(<Radio label="選択" name="test" error="選択が必要です" />);
      expect(screen.getByRole('alert')).toHaveTextContent('選択が必要です');
    });
  });

  describe('ヘルプテキスト', () => {
    it('ヘルプテキストが表示される', () => {
      render(<Radio label="選択" name="test" helpText="いずれかを選択してください" />);
      expect(screen.getByText('いずれかを選択してください')).toBeInTheDocument();
    });

    it('ヘルプテキストとradioがaria-describedbyで関連付けられる', () => {
      render(<Radio label="選択" name="test" helpText="いずれかを選択してください" />);
      const radio = screen.getByRole('radio');
      const helperId = radio.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      expect(document.getElementById(helperId!)).toHaveTextContent('いずれかを選択してください');
    });

    it('エラーがある場合はヘルプテキストが表示されない', () => {
      render(<Radio label="選択" name="test" helpText="ヘルプ" error="エラー" />);
      expect(screen.queryByText('ヘルプ')).not.toBeInTheDocument();
      expect(screen.getByText('エラー')).toBeInTheDocument();
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      render(<Radio label="選択" name="test" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('AAAレベルが指定できる', () => {
      render(<Radio label="選択" name="test" wcagLevel="AAA" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    it('ラベルをクリックしても選択できる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Radio label="選択する" name="test" onChange={handleChange} />);

      await user.click(screen.getByText('選択する'));
      expect(handleChange).toHaveBeenCalled();
    });

    it('フォーカス可能', () => {
      render(<Radio label="選択" name="test" />);
      const radio = screen.getByRole('radio');
      radio.focus();
      expect(document.activeElement).toBe(radio);
    });
  });
});

describe('RadioGroup', () => {
  describe('基本的なレンダリング', () => {
    it('グループとラジオボタンがレンダリングされる', () => {
      render(
        <RadioGroup label="お支払い方法">
          <Radio label="クレジットカード" name="payment" value="credit" />
          <Radio label="銀行振込" name="payment" value="bank" />
        </RadioGroup>
      );
      expect(screen.getByRole('group', { name: 'お支払い方法' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'クレジットカード' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: '銀行振込' })).toBeInTheDocument();
    });

    it('legendが表示される', () => {
      render(
        <RadioGroup label="選択してください">
          <Radio label="オプション1" name="opt" />
        </RadioGroup>
      );
      expect(screen.getByText('選択してください')).toBeInTheDocument();
    });
  });

  describe('ヘルプテキスト', () => {
    it('ヘルプテキストが表示される', () => {
      render(
        <RadioGroup label="支払い方法" helpText="いずれかを選択してください">
          <Radio label="現金" name="payment" />
        </RadioGroup>
      );
      expect(screen.getByText('いずれかを選択してください')).toBeInTheDocument();
    });

    it('ヘルプテキストとfieldsetがaria-describedbyで関連付けられる', () => {
      render(
        <RadioGroup label="支払い方法" helpText="いずれかを選択してください">
          <Radio label="現金" name="payment" />
        </RadioGroup>
      );
      const group = screen.getByRole('group');
      const helperId = group.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      expect(document.getElementById(helperId!)).toHaveTextContent('いずれかを選択してください');
    });
  });

  describe('エラー表示', () => {
    it('エラーメッセージが表示される', () => {
      render(
        <RadioGroup label="支払い方法" error="支払い方法を選択してください">
          <Radio label="現金" name="payment" />
        </RadioGroup>
      );
      expect(screen.getByText('支払い方法を選択してください')).toBeInTheDocument();
    });

    it('エラーメッセージとfieldsetがaria-describedbyで関連付けられる', () => {
      render(
        <RadioGroup label="支払い方法" error="支払い方法を選択してください">
          <Radio label="現金" name="payment" />
        </RadioGroup>
      );
      const group = screen.getByRole('group');
      const errorId = group.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent('支払い方法を選択してください');
    });

    it('エラーメッセージにrole="alert"が設定される', () => {
      render(
        <RadioGroup label="支払い方法" error="支払い方法を選択してください">
          <Radio label="現金" name="payment" />
        </RadioGroup>
      );
      expect(screen.getByRole('alert')).toHaveTextContent('支払い方法を選択してください');
    });

    it('エラーがある場合はヘルプテキストが表示されない', () => {
      render(
        <RadioGroup label="支払い方法" helpText="ヘルプ" error="エラー">
          <Radio label="現金" name="payment" />
        </RadioGroup>
      );
      expect(screen.queryByText('ヘルプ')).not.toBeInTheDocument();
      expect(screen.getByText('エラー')).toBeInTheDocument();
    });
  });

  describe('複数のラジオボタン', () => {
    it('同じname属性で1つだけ選択できる', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup label="お支払い方法">
          <Radio label="クレジットカード" name="payment" value="credit" />
          <Radio label="銀行振込" name="payment" value="bank" />
          <Radio label="現金" name="payment" value="cash" />
        </RadioGroup>
      );

      const creditRadio = screen.getByRole('radio', { name: 'クレジットカード' });
      const bankRadio = screen.getByRole('radio', { name: '銀行振込' });

      await user.click(creditRadio);
      expect(creditRadio).toBeChecked();
      expect(bankRadio).not.toBeChecked();

      await user.click(bankRadio);
      expect(creditRadio).not.toBeChecked();
      expect(bankRadio).toBeChecked();
    });

    it('defaultValueで指定したラジオがデフォルト選択される', () => {
      render(
        <RadioGroup label="色を選択" defaultValue="red">
          <Radio label="赤" value="red" />
          <Radio label="青" value="blue" />
        </RadioGroup>
      );
      expect(screen.getByRole('radio', { name: '赤' })).toBeChecked();
      expect(screen.getByRole('radio', { name: '青' })).not.toBeChecked();
    });

    it('nameを指定しなくてもグループ内のラジオは同じname属性になる', () => {
      render(
        <RadioGroup label="サイズを選択">
          <Radio label="S" value="s" />
          <Radio label="M" value="m" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio');
      const uniqueNames = Array.from(new Set(radios.map((radio) => radio.getAttribute('name'))));
      expect(uniqueNames).toHaveLength(1);
      expect(uniqueNames[0]).toBeTruthy();
    });
  });
});
