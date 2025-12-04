import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Select コンポーネント', () => {
  test('Defaultストーリーでラベルがマウントされ必須でない', async ({ page }) => {
    await gotoStory(page, 'design-system-select--default');
    const select = page.getByLabel('国を選択');
    await expect(select).toBeVisible();
    await expect(select).not.toHaveAttribute('aria-required', 'true');
  });

  test('WithErrorストーリーでaria-invalidとエラーメッセージが関連付く', async ({ page }) => {
    await gotoStory(page, 'design-system-select--with-error');
    const select = page.getByLabel('国を選択');
    await expect(select).toHaveAttribute('aria-invalid', 'true');
    const describedBy = await select.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`#${describedBy}`)).toContainText('国の選択は必須です');
  });

  test('axe-coreでSelectストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-select--with-helper-text');
    const results = await new AxeBuilder({ page }).include(STORY_ROOT).analyze();
    expect(results.violations).toEqual([]);
  });
});
