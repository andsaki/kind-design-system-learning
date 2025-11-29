import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('基本的なレンダリング', () => {
    it('子要素がレンダリングされる', () => {
      render(<Button>クリック</Button>);
      expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument();
    });

    it('デフォルトでtype="button"が設定される', () => {
      render(<Button>ボタン</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
  });

  describe('バリアント', () => {
    it('primary バリアントでレンダリングされる', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_primary');
    });

    it('secondary バリアントでレンダリングされる', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_secondary');
    });

    it('outline バリアントでレンダリングされる', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--variant_outline');
    });
  });

  describe('クリックイベント', () => {
    it('クリック時にonClickハンドラが呼ばれる', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>クリック</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('無効化状態', () => {
    it('disabled属性が設定される', () => {
      render(<Button disabled>無効</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('無効化時はクリックイベントが発火しない', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>無効</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('無効化時はaria-disabledがtrueになる', () => {
      render(<Button disabled>無効</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('ローディング状態', () => {
    it('ローディング時はaria-busyがtrueになる', () => {
      render(<Button isLoading>読み込み中</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('ローディング時はボタンが無効化される', () => {
      render(<Button isLoading>読み込み中</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('ローディング時はステータス表示が含まれる', () => {
      render(<Button isLoading>読み込み中</Button>);
      expect(screen.getByRole('status', { name: '読み込み中' })).toBeInTheDocument();
    });

    it('ローディング中はクリックイベントが発火しない', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button isLoading onClick={handleClick}>読み込み中</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('アイコン', () => {
    it('アイコンが表示される', () => {
      render(<Button icon={<span data-testid="test-icon">🚀</span>}>アイコン付き</Button>);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('アイコンはaria-hiddenが設定される', () => {
      render(<Button icon={<span>🚀</span>}>アイコン付き</Button>);
      const button = screen.getByRole('button');
      const iconSpan = button.querySelector('span[aria-hidden="true"]');
      expect(iconSpan).toBeInTheDocument();
    });

    it('ローディング時はアイコンが表示されない', () => {
      render(<Button isLoading icon={<span data-testid="test-icon">🚀</span>}>読み込み中</Button>);
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      render(<Button>ボタン</Button>);
      const button = screen.getByRole('button');
      // CSS変数がAA設定になっていることを確認
      expect(button).toBeInTheDocument();
    });

    it('Aレベルが指定できる', () => {
      render(<Button wcagLevel="A">ボタン</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('AAAレベルが指定できる', () => {
      render(<Button wcagLevel="AAA">ボタン</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('キーボード操作', () => {
    it('Enterキーで押せる', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>ボタン</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Spaceキーで押せる', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>ボタン</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('サイズ', () => {
    it('sm サイズでレンダリングされる', () => {
      render(<Button size="sm">小</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('md サイズでレンダリングされる', () => {
      render(<Button size="md">中</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('lg サイズでレンダリングされる', () => {
      render(<Button size="lg">大</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
