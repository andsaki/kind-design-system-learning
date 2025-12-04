import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Dropdown コンポーネント', () => {
  test('Defaultストーリーで選択肢を開閉できる', async ({ page }) => {
    await gotoStory(page, 'components-dropdown--default');
    const combobox = page.getByRole('button', { name: /好きな果物/ });
    await combobox.click();
    await expect(page.getByRole('option', { name: 'りんご' })).toBeVisible();
  });

  test('WithErrorストーリーでエラーメッセージが表示される', async ({ page }) => {
    await gotoStory(page, 'components-dropdown--with-error');
    const trigger = page.getByRole('button', { name: /好きな果物/ });
    await expect(trigger).toBeVisible();
    await expect(page.getByText('果物を選択してください')).toBeVisible();
  });

  test('axe-coreでDropdownストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'components-dropdown--with-helper-text');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
