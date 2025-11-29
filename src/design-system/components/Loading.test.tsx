import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading, InlineLoading } from './Loading';

describe('Loading', () => {
  describe('基本的なレンダリング', () => {
    it('スピナーがレンダリングされる', () => {
      render(<Loading />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('デフォルトラベルが表示される', () => {
      render(<Loading />);
      expect(screen.getByText('読み込み中')).toBeInTheDocument();
    });

    it('カスタムラベルが表示される', () => {
      render(<Loading label="データを読み込んでいます" />);
      expect(screen.getByText('データを読み込んでいます')).toBeInTheDocument();
    });
  });

  describe('aria属性', () => {
    it('role="status"が設定される', () => {
      render(<Loading />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('aria-labelが設定される', () => {
      render(<Loading label="処理中" />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', '処理中');
    });

    it('aria-live="polite"が設定される', () => {
      render(<Loading />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('サイズバリエーション', () => {
    it('sm サイズでレンダリングされる', () => {
      render(<Loading size="sm" />);
      const status = screen.getByRole('status');
      const svg = status.querySelector('svg');
      expect(svg).toHaveClass('loading__spinner--size_sm');
    });

    it('md サイズでレンダリングされる', () => {
      render(<Loading size="md" />);
      const status = screen.getByRole('status');
      const svg = status.querySelector('svg');
      expect(svg).toHaveClass('loading__spinner--size_md');
    });

    it('lg サイズでレンダリングされる', () => {
      render(<Loading size="lg" />);
      const status = screen.getByRole('status');
      const svg = status.querySelector('svg');
      expect(svg).toHaveClass('loading__spinner--size_lg');
    });

    it('xl サイズでレンダリングされる', () => {
      render(<Loading size="xl" />);
      const status = screen.getByRole('status');
      const svg = status.querySelector('svg');
      expect(svg).toHaveClass('loading__spinner--size_xl');
    });
  });

  describe('カラーバリエーション', () => {
    it('primary カラーでレンダリングされる', () => {
      render(<Loading color="primary" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('secondary カラーでレンダリングされる', () => {
      render(<Loading color="secondary" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('white カラーでレンダリングされる', () => {
      render(<Loading color="white" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('フルスクリーンモード', () => {
    it('fullscreen=trueでフルスクリーン用クラスが付与される', () => {
      const { container } = render(<Loading fullscreen />);
      const overlay = container.firstChild as HTMLElement;
      expect(overlay).toHaveClass('loading__overlay');
      expect(overlay).toHaveAttribute('aria-modal', 'true');
    });

    it('fullscreen=falseで通常表示される', () => {
      const { container } = render(<Loading fullscreen={false} />);
      const status = screen.getByRole('status');
      expect(status).toBeInTheDocument();
      expect(container.firstChild).toBe(status);
    });
  });

  describe('ラベルの表示/非表示', () => {
    it('labelが空文字の場合はラベルが表示されない', () => {
      render(<Loading label="" />);
      expect(screen.queryByText('読み込み中')).not.toBeInTheDocument();
    });

    it('labelが指定されている場合は表示される', () => {
      render(<Loading label="カスタムラベル" />);
      expect(screen.getByText('カスタムラベル')).toBeInTheDocument();
    });
  });
});

describe('InlineLoading', () => {
  describe('基本的なレンダリング', () => {
    it('インラインスピナーがレンダリングされる', () => {
      render(<InlineLoading />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('aria-labelが設定される', () => {
      render(<InlineLoading />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', '読み込み中');
    });
  });

  describe('サイズバリエーション', () => {
    it('sm サイズでレンダリングされる', () => {
      render(<InlineLoading size="sm" />);
      const svg = screen.getByRole('status');
      expect(svg).toHaveClass('loading__spinner--size_inline-sm');
    });

    it('md サイズでレンダリングされる', () => {
      render(<InlineLoading size="md" />);
      const svg = screen.getByRole('status');
      expect(svg).toHaveClass('loading__spinner--size_inline-md');
    });
  });

  describe('カラーバリエーション', () => {
    it('primary カラーでレンダリングされる', () => {
      render(<InlineLoading color="primary" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('secondary カラーでレンダリングされる', () => {
      render(<InlineLoading color="secondary" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

});
