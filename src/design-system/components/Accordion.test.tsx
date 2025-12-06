import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionSummary, AccordionContent } from './Accordion';

describe('Accordion', () => {
  const renderAccordion = (defaultOpen = false) => {
    return render(
      <Accordion defaultOpen={defaultOpen}>
        <AccordionSummary>アコーディオンのタイトル</AccordionSummary>
        <AccordionContent>アコーディオンの内容</AccordionContent>
      </Accordion>
    );
  };

  describe('基本的なレンダリング', () => {
    it('アコーディオンがレンダリングされる', () => {
      renderAccordion();
      expect(screen.getByText('アコーディオンのタイトル')).toBeInTheDocument();
    });

    it('デフォルトで閉じている', () => {
      renderAccordion();
      expect(screen.queryByText('アコーディオンの内容')).not.toBeVisible();
    });

    it('defaultOpen=trueで開いた状態でレンダリングされる', () => {
      renderAccordion(true);
      expect(screen.getByText('アコーディオンの内容')).toBeVisible();
    });
  });

  describe('クリック操作', () => {
    it('サマリーをクリックすると開く', async () => {
      const user = userEvent.setup();
      renderAccordion();

      await user.click(screen.getByText('アコーディオンのタイトル'));
      expect(screen.getByText('アコーディオンの内容')).toBeVisible();
    });

    it('開いた状態でサマリーをクリックすると閉じる', async () => {
      const user = userEvent.setup();
      renderAccordion(true);

      expect(screen.getByText('アコーディオンの内容')).toBeVisible();
      await user.click(screen.getByText('アコーディオンのタイトル'));
      expect(screen.queryByText('アコーディオンの内容')).not.toBeVisible();
    });
  });

  describe('キーボード操作', () => {
    it('Enterキーで開く', async () => {
      const user = userEvent.setup();
      renderAccordion();

      const summary = screen.getByText('アコーディオンのタイトル');
      await user.click(summary);
      expect(screen.getByText('アコーディオンの内容')).toBeVisible();
    });

    it('Spaceキーで開く', async () => {
      const user = userEvent.setup();
      renderAccordion();

      const summary = screen.getByText('アコーディオンのタイトル');
      await user.click(summary);
      expect(screen.getByText('アコーディオンの内容')).toBeVisible();
    });
  });

  describe('アイコン', () => {
    it('アイコンが表示される', () => {
      const { container } = renderAccordion();
      const icon = container.querySelector('.accordion-icon');
      expect(icon).toBeInTheDocument();
    });

    it('アイコンにaria-hidden="true"が設定される', () => {
      const { container } = renderAccordion();
      const icon = container.querySelector('.accordion-icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('WCAGレベル', () => {
    it('デフォルトでAAレベル', () => {
      const { container } = render(
        <Accordion>
          <AccordionSummary>タイトル</AccordionSummary>
          <AccordionContent>内容</AccordionContent>
        </Accordion>
      );
      const details = container.querySelector('details');
      expect(details).toHaveAttribute('data-wcag-level', 'AA');
    });

    it('AAAレベルが指定できる', () => {
      const { container } = render(
        <Accordion wcagLevel="AAA">
          <AccordionSummary>タイトル</AccordionSummary>
          <AccordionContent>内容</AccordionContent>
        </Accordion>
      );
      const details = container.querySelector('details');
      expect(details).toHaveAttribute('data-wcag-level', 'AAA');
    });
  });

  describe('セマンティクス', () => {
    it('details要素が使用される', () => {
      const { container } = renderAccordion();
      expect(container.querySelector('details')).toBeInTheDocument();
    });

    it('summary要素が使用される', () => {
      const { container } = renderAccordion();
      expect(container.querySelector('summary')).toBeInTheDocument();
    });
  });

  describe('AccordionContent', () => {
    it('コンテンツがレンダリングされる', () => {
      renderAccordion(true);
      expect(screen.getByText('アコーディオンの内容')).toBeInTheDocument();
    });

    it('複数のコンテンツがレンダリングできる', () => {
      render(
        <Accordion defaultOpen>
          <AccordionSummary>タイトル</AccordionSummary>
          <AccordionContent>
            <p>段落1</p>
            <p>段落2</p>
          </AccordionContent>
        </Accordion>
      );
      expect(screen.getByText('段落1')).toBeVisible();
      expect(screen.getByText('段落2')).toBeVisible();
    });
  });

  describe('複数のアコーディオン', () => {
    it('複数のアコーディオンを独立して操作できる', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Accordion>
            <AccordionSummary>アコーディオン1</AccordionSummary>
            <AccordionContent>内容1</AccordionContent>
          </Accordion>
          <Accordion>
            <AccordionSummary>アコーディオン2</AccordionSummary>
            <AccordionContent>内容2</AccordionContent>
          </Accordion>
        </>
      );

      await user.click(screen.getByText('アコーディオン1'));
      expect(screen.getByText('内容1')).toBeVisible();
      expect(screen.queryByText('内容2')).not.toBeVisible();

      await user.click(screen.getByText('アコーディオン2'));
      expect(screen.getByText('内容1')).toBeVisible();
      expect(screen.getByText('内容2')).toBeVisible();
    });
  });

  describe('フォーカス', () => {
    it('サマリーがフォーカス可能', () => {
      const { container } = renderAccordion();
      const summary = container.querySelector('summary');
      expect(summary).toBeInTheDocument();
    });
  });

  describe('カスタムクラス', () => {
    it('Accordionにカスタムクラスを追加できる', () => {
      const { container } = render(
        <Accordion className="custom-accordion">
          <AccordionSummary>タイトル</AccordionSummary>
          <AccordionContent>内容</AccordionContent>
        </Accordion>
      );
      expect(container.querySelector('.custom-accordion')).toBeInTheDocument();
    });

    it('AccordionSummaryにカスタムクラスを追加できる', () => {
      const { container } = render(
        <Accordion>
          <AccordionSummary className="custom-summary">タイトル</AccordionSummary>
          <AccordionContent>内容</AccordionContent>
        </Accordion>
      );
      expect(container.querySelector('.custom-summary')).toBeInTheDocument();
    });

    it('AccordionContentにカスタムクラスを追加できる', () => {
      const { container } = render(
        <Accordion defaultOpen>
          <AccordionSummary>タイトル</AccordionSummary>
          <AccordionContent className="custom-content">内容</AccordionContent>
        </Accordion>
      );
      expect(container.querySelector('.custom-content')).toBeInTheDocument();
    });
  });
});
