import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from './Breadcrumbs';

describe('Breadcrumbs', () => {
  const renderBreadcrumbs = () => {
    return render(
      <Breadcrumbs>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">商品一覧</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrent>商品詳細</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumbs>
    );
  };

  describe('基本的なレンダリング', () => {
    it('パンくずリストがレンダリングされる', () => {
      renderBreadcrumbs();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('リンクが表示される', () => {
      renderBreadcrumbs();
      expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '商品一覧' })).toBeInTheDocument();
    });

    it('現在ページのテキストが表示される', () => {
      renderBreadcrumbs();
      expect(screen.getByText('商品詳細')).toBeInTheDocument();
    });
  });

  describe('ARIA属性', () => {
    it('aria-label属性が設定される', () => {
      renderBreadcrumbs();
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'パンくずリスト');
    });

    it('カスタムaria-labelが設定できる', () => {
      render(
        <Breadcrumbs label="カスタムラベル">
          <BreadcrumbList>
            <BreadcrumbItem>テスト</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>
      );
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'カスタムラベル');
    });

    it('現在ページにaria-current="page"が設定される', () => {
      renderBreadcrumbs();
      const currentItem = screen.getByText('商品詳細');
      expect(currentItem).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('セパレーター', () => {
    it('セパレーターアイコンが表示される', () => {
      const { container } = renderBreadcrumbs();
      const separators = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(separators.length).toBeGreaterThan(0);
    });

    it('セパレーターにaria-hidden="true"が設定される', () => {
      const { container } = renderBreadcrumbs();
      const separator = container.querySelector('svg');
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('リンク', () => {
    it('リンクのhref属性が設定される', () => {
      renderBreadcrumbs();
      expect(screen.getByRole('link', { name: 'ホーム' })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: '商品一覧' })).toHaveAttribute('href', '/products');
    });

    it('リンクにアンダーライン用のクラスが付与される', () => {
      renderBreadcrumbs();
      const link = screen.getByRole('link', { name: 'ホーム' });
      expect(link).toHaveClass('breadcrumbs__link');
    });

  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      const { container } = render(
        <Breadcrumbs>
          <BreadcrumbList>
            <BreadcrumbItem>テスト</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('data-wcag-level', 'AA');
    });

    it('Aレベルが指定できる', () => {
      const { container } = render(
        <Breadcrumbs wcagLevel="A">
          <BreadcrumbList>
            <BreadcrumbItem>テスト</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('data-wcag-level', 'A');
    });

    it('AAAレベルが指定できる', () => {
      const { container } = render(
        <Breadcrumbs wcagLevel="AAA">
          <BreadcrumbList>
            <BreadcrumbItem>テスト</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('data-wcag-level', 'AAA');
    });
  });

  describe('BreadcrumbList', () => {
    it('ol要素が使用される', () => {
      const { container } = renderBreadcrumbs();
      expect(container.querySelector('ol')).toBeInTheDocument();
    });

    it('カスタムクラスが適用される', () => {
      const { container } = render(
        <Breadcrumbs>
          <BreadcrumbList className="custom-list">
            <BreadcrumbItem>テスト</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>
      );
      const list = container.querySelector('ol');
      expect(list).toHaveClass('custom-list');
    });
  });

  describe('BreadcrumbItem', () => {
    it('li要素が使用される', () => {
      const { container } = renderBreadcrumbs();
      expect(container.querySelectorAll('li').length).toBeGreaterThan(0);
    });

    it('isCurrent=falseの場合はaria-currentが設定されない', () => {
      render(
        <Breadcrumbs>
          <BreadcrumbList>
            <BreadcrumbItem isCurrent={false}>テスト</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>
      );
      expect(screen.getByText('テスト')).not.toHaveAttribute('aria-current');
    });

    it('カスタムクラスが適用される', () => {
      const { container } = render(
        <Breadcrumbs>
          <BreadcrumbList>
            <BreadcrumbItem className="custom-item">テスト</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>
      );
      expect(container.querySelector('.custom-item')).toBeInTheDocument();
    });
  });

  describe('BreadcrumbLink', () => {
    it('a要素が使用される', () => {
      renderBreadcrumbs();
      expect(screen.getByRole('link', { name: 'ホーム' }).tagName).toBe('A');
    });

    it('カスタムクラスが適用される', () => {
      render(
        <Breadcrumbs>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="custom-link">
                ホーム
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>
      );
      expect(screen.getByRole('link', { name: 'ホーム' })).toHaveClass('custom-link');
    });
  });

  describe('複雑な構造', () => {
    it('深い階層のパンくずリストをレンダリングできる', () => {
      render(
        <Breadcrumbs>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/category">カテゴリ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/category/sub">サブカテゴリ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/category/sub/item">商品</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>商品詳細</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>
      );

      expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'カテゴリ' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'サブカテゴリ' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '商品' })).toBeInTheDocument();
      expect(screen.getByText('商品詳細')).toHaveAttribute('aria-current', 'page');
    });
  });
});
