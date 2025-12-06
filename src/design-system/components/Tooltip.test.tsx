import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

const focusElement = async (element: HTMLElement) => {
  await act(async () => {
    element.focus();
  });
};

const blurElement = async (element: HTMLElement) => {
  await act(async () => {
    element.blur();
  });
};

describe('Tooltip', () => {
  describe('基本的なレンダリング', () => {
    it('子要素がレンダリングされる', () => {
      render(
        <Tooltip content="ツールチップの内容">
          <button>ホバー</button>
        </Tooltip>
      );
      expect(screen.getByRole('button', { name: 'ホバー' })).toBeInTheDocument();
    });

    it('初期状態ではツールチップは表示されない', () => {
      render(
        <Tooltip content="ツールチップの内容">
          <button>ホバー</button>
        </Tooltip>
      );
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('ホバー操作', () => {
    it('マウスホバー時にツールチップが表示される', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="ヘルプテキスト" mouseDelay={50}>
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('マウスアウト時にツールチップが非表示になる', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="ヘルプテキスト" mouseDelay={50}>
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.unhover(button);

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  describe('フォーカス操作', () => {
    it('フォーカス時にツールチップが即座に表示される', async () => {
      render(
        <Tooltip content="ヘルプテキスト">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('ブラー時にツールチップが即座に非表示になる', async () => {
      render(
        <Tooltip content="ヘルプテキスト">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await blurElement(button);

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  describe('キーボード操作', () => {
    it('Escapeキーでツールチップが閉じる', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="ヘルプテキスト">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  describe('アクセシビリティ属性', () => {
    it('ツールチップ表示時にaria-describedbyが設定される', async () => {
      render(
        <Tooltip content="ヘルプテキスト">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('aria-describedby');

      await focusElement(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-describedby');
      });
    });

    it('ツールチップにrole="tooltip"が設定される', async () => {
      render(
        <Tooltip content="ヘルプテキスト">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('role', 'tooltip');
      });
    });

    it('ツールチップの内容が正しく表示される', async () => {
      render(
        <Tooltip content="これはヘルプテキストです">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toHaveTextContent('これはヘルプテキストです');
      });
    });

    it('非フォーカス可能な要素にtabIndex=0が追加される', () => {
      render(
        <Tooltip content="ヘルプテキスト">
          <span>スパン要素</span>
        </Tooltip>
      );

      const span = screen.getByText('スパン要素');
      expect(span).toHaveAttribute('tabIndex', '0');
    });

    it('フォーカス可能な要素にはtabIndexが追加されない', () => {
      render(
        <Tooltip content="ヘルプテキスト">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('tabIndex', '0');
    });
  });

  describe('ポジション', () => {
    it('position="top"でレンダリングされる', async () => {
      render(
        <Tooltip content="上部のツールチップ" position="top">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('position="bottom"でレンダリングされる', async () => {
      render(
        <Tooltip content="下部のツールチップ" position="bottom">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('position="left"でレンダリングされる', async () => {
      render(
        <Tooltip content="左のツールチップ" position="left">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('position="right"でレンダリングされる', async () => {
      render(
        <Tooltip content="右のツールチップ" position="right">
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe('遅延制御', () => {
    it('指定したdelayの後にツールチップが表示される（フォーカスは即時）', async () => {
      render(
        <Tooltip content="ヘルプテキスト" delay={500}>
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      // フォーカス時は即時表示（delay無視）
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('指定したmouseDelayの後にツールチップが表示される', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="ヘルプテキスト" mouseDelay={150}>
          <button>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      // まだ表示されていない
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      // 表示される
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('既存のイベントハンドラとの互換性', () => {
    it('既存のonMouseEnterハンドラが呼ばれる', async () => {
      const user = userEvent.setup({ delay: null });
      const handleMouseEnter = vi.fn();

      render(
        <Tooltip content="ヘルプテキスト">
          <button onMouseEnter={handleMouseEnter}>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await user.hover(button);

      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('既存のonFocusハンドラが呼ばれる', async () => {
      const handleFocus = vi.fn();

      render(
        <Tooltip content="ヘルプテキスト">
          <button onFocus={handleFocus}>ボタン</button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      await focusElement(button);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });
});
