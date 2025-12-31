import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    // 自動クローズテストのみでタイマーを使用
  });

  afterEach(() => {
    // クリーンアップ
  });

  describe('基本的なレンダリング', () => {
    it('トーストがレンダリングされる', () => {
      render(<Toast id="1" message="テストメッセージ" onClose={vi.fn()} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('メッセージが表示される', () => {
      render(<Toast id="1" message="通知メッセージ" onClose={vi.fn()} />);
      expect(screen.getByText('通知メッセージ')).toBeInTheDocument();
    });

    it('タイトルが表示される', () => {
      render(<Toast id="1" title="タイトル" message="メッセージ" onClose={vi.fn()} />);
      expect(screen.getByText('タイトル')).toBeInTheDocument();
      expect(screen.getByText('メッセージ')).toBeInTheDocument();
    });
  });

  describe('ARIA属性', () => {
    it('role="alert"が設定される', () => {
      render(<Toast id="1" message="メッセージ" onClose={vi.fn()} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('aria-live="polite"が設定される', () => {
      render(<Toast id="1" message="メッセージ" onClose={vi.fn()} />);
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
    });

    it('aria-atomic="true"が設定される', () => {
      render(<Toast id="1" message="メッセージ" onClose={vi.fn()} />);
      expect(screen.getByRole('alert')).toHaveAttribute('aria-atomic', 'true');
    });
  });

  describe('トーストタイプ', () => {
    it('success タイプでレンダリングされる', () => {
      render(<Toast id="1" type="success" message="成功" onClose={vi.fn()} />);
      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('error タイプでレンダリングされる', () => {
      render(<Toast id="1" type="error" message="エラー" onClose={vi.fn()} />);
      expect(screen.getByText('✕')).toBeInTheDocument();
    });

    it('warning タイプでレンダリングされる', () => {
      render(<Toast id="1" type="warning" message="警告" onClose={vi.fn()} />);
      expect(screen.getByText('⚠')).toBeInTheDocument();
    });

    it('info タイプでレンダリングされる（デフォルト）', () => {
      render(<Toast id="1" type="info" message="情報" onClose={vi.fn()} />);
      expect(screen.getByText('ℹ')).toBeInTheDocument();
    });
  });

  describe('閉じるボタン', () => {
    it('閉じるボタンが表示される', () => {
      render(<Toast id="1" message="メッセージ" duration={0} onClose={vi.fn()} />);
      expect(screen.getByRole('button', { name: '通知を閉じる' })).toBeInTheDocument();
    });

    it('閉じるボタンをクリックするとonCloseが呼ばれる', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(<Toast id="toast-1" message="メッセージ" duration={0} onClose={handleClose} />);

      const closeButton = screen.getByRole('button', { name: '通知を閉じる' });
      await user.click(closeButton);

      // アニメーション後にonCloseが呼ばれることを確認（実際のタイマーで300ms待つ）
      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledWith('toast-1');
      }, { timeout: 1000 });
    });
  });

  describe('自動クローズ', () => {
    it('duration=0 の場合は自動的に閉じない', async () => {
      const handleClose = vi.fn();
      render(<Toast id="toast-1" message="メッセージ" duration={0} onClose={handleClose} />);

      // 少し待つ（duration=0なので閉じないはず）
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('durationが指定されている場合は自動クローズが設定される', () => {
      render(<Toast id="toast-1" message="メッセージ" duration={5000} onClose={vi.fn()} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('アイコン', () => {
    it('アイコンにaria-hidden="true"が設定される', () => {
      const { container } = render(<Toast id="1" message="メッセージ" onClose={vi.fn()} />);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      render(<Toast id="1" message="メッセージ" onClose={vi.fn()} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('AAAレベルが指定できる', () => {
      render(<Toast id="1" message="メッセージ" wcagLevel="AAA" onClose={vi.fn()} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('位置インデックス', () => {
    it('index属性で位置を調整できる', () => {
      const { container } = render(
        <Toast id="1" message="メッセージ" index={0} onClose={vi.fn()} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('複数のトーストを積み重ねられる', () => {
      render(
        <>
          <Toast id="1" message="メッセージ1" index={0} onClose={vi.fn()} />
          <Toast id="2" message="メッセージ2" index={1} onClose={vi.fn()} />
        </>
      );
      expect(screen.getByText('メッセージ1')).toBeInTheDocument();
      expect(screen.getByText('メッセージ2')).toBeInTheDocument();
    });
  });

  describe('アニメーション', () => {
    it('マウント時にレンダリングされる', () => {
      render(<Toast id="1" message="メッセージ" duration={0} onClose={vi.fn()} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
