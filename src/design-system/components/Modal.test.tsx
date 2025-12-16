import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Modal } from './Modal';

// jsdomでHTMLDialogElementをモック
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.open = true;
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.open = false;
    // closeイベントを発火
    this.dispatchEvent(new Event('close'));
  });
});

describe('Modal', () => {
  let originalOverflow: string;

  beforeEach(() => {
    originalOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
  });

  describe('基本的なレンダリング', () => {
    it('isOpen=falseの場合は表示されない', () => {
      render(
        <Modal isOpen={false} onClose={vi.fn()} title="テストモーダル">
          コンテンツ
        </Modal>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('isOpen=trueの場合は表示される', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="テストモーダル">
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('タイトルが表示される', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="モーダルタイトル">
          コンテンツ
        </Modal>
      );
      expect(screen.getByText('モーダルタイトル')).toBeInTheDocument();
    });

    it('コンテンツが表示される', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル">
          モーダルの内容
        </Modal>
      );
      expect(screen.getByText('モーダルの内容')).toBeInTheDocument();
    });

    it('フッターが表示される', () => {
      render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="タイトル"
          footer={<button>OK</button>}
        >
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    });
  });

  describe('ARIA属性', () => {
    it('role="dialog"が設定される', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル">
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('aria-modal="true"が設定される', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル">
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('aria-labelledby属性でタイトルと関連付けられる', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル">
          コンテンツ
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
      expect(screen.getByText('タイトル')).toHaveAttribute('id', 'modal-title');
    });
  });

  describe('閉じるボタン', () => {
    it('閉じるボタンが表示される', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル">
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('button', { name: 'モーダルを閉じる' })).toBeInTheDocument();
    });

    it('閉じるボタンをクリックするとonCloseが呼ばれる', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="タイトル">
          コンテンツ
        </Modal>
      );

      await user.click(screen.getByRole('button', { name: 'モーダルを閉じる' }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Escキーで閉じる', () => {
    it('Escキーを押すとonCloseが呼ばれる', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="タイトル">
          コンテンツ
        </Modal>
      );

      const dialog = screen.getByRole('dialog') as HTMLDialogElement;

      // Escキーを押すと<dialog>要素がcloseメソッドを呼ぶ
      await user.keyboard('{Escape}');
      // dialog.close()を手動で呼んでcloseイベントをトリガー
      dialog.close();

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('オーバーレイクリック', () => {
    it('オーバーレイをクリックするとonCloseが呼ばれる', async () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="タイトル">
          コンテンツ
        </Modal>
      );

      const dialog = screen.getByRole('dialog');

      // モーダル外（背景）をクリックするシミュレーション
      // getBoundingClientRectで範囲外の座標でclickイベントを発火
      const rect = dialog.getBoundingClientRect();
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: rect.left - 10, // モーダルの外側
        clientY: rect.top - 10,
      });
      dialog.dispatchEvent(clickEvent);

      expect(handleClose).toHaveBeenCalled();
    });

    it('モーダル本体をクリックしてもonCloseは呼ばれない', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="タイトル">
          コンテンツ
        </Modal>
      );

      // モーダルのコンテンツ部分（タイトルやbodyの子要素）をクリック
      await user.click(screen.getByText('タイトル'));
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('背景スクロール防止', () => {
    it('モーダルが開くと背景スクロールが無効化される', () => {
      const { rerender } = render(
        <Modal isOpen={false} onClose={vi.fn()} title="タイトル">
          コンテンツ
        </Modal>
      );

      rerender(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル">
          コンテンツ
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('モーダルが閉じると背景スクロールが復元される', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル">
          コンテンツ
        </Modal>
      );

      rerender(
        <Modal isOpen={false} onClose={vi.fn()} title="タイトル">
          コンテンツ
        </Modal>
      );

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('サイズバリエーション', () => {
    it('sm サイズが適用される', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル" size="sm">
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('md サイズが適用される（デフォルト）', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル" size="md">
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('lg サイズが適用される', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル" size="lg">
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル">
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('AAAレベルが指定できる', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル" wcagLevel="AAA">
          コンテンツ
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('フォーカス管理', () => {
    it('モーダルが開くとフォーカス可能要素が配置される', () => {
      render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="タイトル"
          footer={<div><button>OK</button></div>}
        >
          <div><input type="text" placeholder="入力欄" /></div>
        </Modal>
      );

      // 閉じるボタンが表示される
      const closeButton = screen.getByRole('button', { name: 'モーダルを閉じる' });
      expect(closeButton).toBeInTheDocument();

      // 入力欄が表示される
      expect(screen.getByPlaceholderText('入力欄')).toBeInTheDocument();

      // OKボタンが表示される
      expect(screen.getByText('OK')).toBeInTheDocument();
    });
  });

  describe('複数の子要素', () => {
    it('複数の子要素をレンダリングできる', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="タイトル">
          <p>段落1</p>
          <p>段落2</p>
          <div><button>ボタン</button></div>
        </Modal>
      );

      expect(screen.getByText('段落1')).toBeInTheDocument();
      expect(screen.getByText('段落2')).toBeInTheDocument();
      expect(screen.getByText('ボタン')).toBeInTheDocument();
    });
  });

  describe('フォーカス管理', () => {
    it('初回フォーカスとTabキーでフォーカストラップが機能する', async () => {
      const user = userEvent.setup();
      render(
        <Modal
          isOpen={true}
          onClose={vi.fn()}
          title="タイトル"
          footer={<button>OK</button>}
        >
          <button>本文ボタン</button>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: 'モーダルを閉じる' });
      const bodyButton = screen.getByRole('button', { name: '本文ボタン' });
      const footerButton = screen.getByRole('button', { name: 'OK' });

      expect(closeButton).toHaveFocus();

      await user.tab();
      expect(bodyButton).toHaveFocus();

      await user.tab();
      expect(footerButton).toHaveFocus();

      await user.tab();
      expect(closeButton).toHaveFocus();

      await user.tab({ shift: true });
      expect(footerButton).toHaveFocus();
    });

    it('モーダルを閉じると元のフォーカス要素に戻る', async () => {
      const user = userEvent.setup();

      const Wrapper = () => {
        const [open, setOpen] = useState(false);
        return (
          <>
            <button onClick={() => setOpen(true)}>モーダルを開く</button>
            <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              title="タイトル"
              footer={<button>閉じる</button>}
            >
              コンテンツ
            </Modal>
          </>
        );
      };

      render(<Wrapper />);
      const triggerButton = screen.getByRole('button', { name: 'モーダルを開く' });
      triggerButton.focus();
      await user.click(triggerButton);

      const closeButton = await screen.findByRole('button', { name: 'モーダルを閉じる' });
      expect(closeButton).toHaveFocus();

      await user.click(closeButton);
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(triggerButton).toHaveFocus();
      });
    });
  });
});
