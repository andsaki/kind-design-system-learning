import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Modal コンポーネント', () => {
  test('Defaultストーリーでrole="dialog"とaria-modalが設定される', async ({ page }) => {
    await gotoStory(page, 'design-system-modal--default');
    const openButton = page.getByRole('button', { name: 'モーダルを開く' });
    await openButton.click();
    const dialog = page.getByRole('dialog', { name: '通知設定' });
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  test('WithFooterストーリーでEscキーがonCloseを発火する', async ({ page }) => {
    await gotoStory(page, 'design-system-modal--with-footer');
    await page.getByRole('button', { name: 'アカウント削除' }).click();
    const dialog = page.getByRole('dialog', { name: 'アカウントの削除' });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('axe-coreでModalストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-modal--with-form');
    await page.getByRole('button', { name: 'フォーム付きモーダル' }).click();
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .disableRules(['document-title'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
