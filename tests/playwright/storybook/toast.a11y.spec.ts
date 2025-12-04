import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

async function triggerToast(page, label: string) {
  await page.getByRole('button', { name: label }).click();
  return page.getByRole('alert');
}

test.describe('Storybook Toast コンポーネント', () => {
  test('DefaultストーリーでToastが表示され閉じられる', async ({ page }) => {
    await gotoStory(page, 'design-system-toast--default');
    const toast = await triggerToast(page, 'Success Toast');
    await expect(toast).toContainText('操作が成功しました');
  });

  test('WCAGLevelsストーリーで異なるタイプのトーストが出せる', async ({ page }) => {
    await gotoStory(page, 'design-system-toast--wcag-levels');
    await triggerToast(page, 'Success Toast');
    await triggerToast(page, 'Error Toast');
    await triggerToast(page, 'Warning Toast');
    await expect(page.getByRole('alert').last()).toContainText('警告');
  });

  test('axe-coreでToastストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-toast--default');
    await triggerToast(page, 'Success Toast');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
