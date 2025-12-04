import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Loading コンポーネント', () => {
  test('Defaultストーリーでラベル付きスピナーが表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-loading--default');
    await expect(page.getByText('読み込み中')).toBeVisible();
  });

  test('Fullscreenストーリーでボタン操作でローディングが出る', async ({ page }) => {
    await gotoStory(page, 'design-system-loading--fullscreen');
    await page.getByRole('button', { name: 'ローディングを表示（3秒間）' }).click();
    await expect(page.getByText('データを読み込んでいます...')).toBeVisible();
  });

  test('axe-coreでInlineストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-loading--inline');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
