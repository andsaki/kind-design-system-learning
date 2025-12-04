import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Text コンポーネント', () => {
  test('Defaultストーリーで本文テキストが表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-text--default');
    await expect(page.getByText('これは本文テキストです。')).toBeVisible();
  });

  test('AllHeadingsストーリーで見出しが表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-text--all-headings');
    await expect(page.getByText('見出し1 - ページタイトル')).toBeVisible();
  });

  test('axe-coreでTextストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-text--text-alignment');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
