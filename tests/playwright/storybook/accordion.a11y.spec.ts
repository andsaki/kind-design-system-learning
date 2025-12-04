import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Accordion コンポーネント', () => {
  test('DefaultストーリーでEnterキーで開閉できる', async ({ page }) => {
    await gotoStory(page, 'design-system-accordion--default');
    const details = page.locator('details').first();
    const summary = details.locator('summary', { hasText: 'アコーディオンのタイトル' });
    await expect(details).not.toHaveAttribute('open');
    await summary.press('Enter');
    await expect(details).toHaveAttribute('open', '');
  });

  test('Multipleストーリーで複数のsummaryが独立している', async ({ page }) => {
    await gotoStory(page, 'design-system-accordion--multiple');
    const questions = page.locator('details');
    const question1 = questions.nth(0);
    const question2 = questions.nth(1);
    await question1.locator('summary').press('Enter');
    await expect(question1).toHaveAttribute('open', '');
    await expect(question2).toHaveAttribute('open', '');
  });

  test('axe-coreでAccordionストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-accordion--rich-content');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
