import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Radio コンポーネント', () => {
  test('Defaultストーリーでラジオを選択できる', async ({ page }) => {
    await gotoStory(page, 'design-system-radio--default');
    const radio = page.getByLabel('青');
    await radio.check();
    await expect(radio).toBeChecked();
  });

  test('WithErrorストーリーでエラーメッセージが表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-radio--with-error');
    await expect(page.getByText('支払い方法の選択が必要です')).toBeVisible();
  });

  test('axe-coreでRadioストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-radio--with-help-text');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
