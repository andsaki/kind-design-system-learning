import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook InfoBox コンポーネント', () => {
  test('Infoストーリーでタイトルとアイコンが表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-infobox--info');
    await expect(page.getByText('キーボード操作')).toBeVisible();
    await expect(page.getByText('💡')).toBeVisible();
  });

  test('Warningストーリーでアクセシブルなテキストがある', async ({ page }) => {
    await gotoStory(page, 'design-system-infobox--warning');
    await expect(page.getByText('スクリーンリーダーの注意点')).toBeVisible();
  });

  test('axe-coreでInfoBoxストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-infobox--left-border');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
