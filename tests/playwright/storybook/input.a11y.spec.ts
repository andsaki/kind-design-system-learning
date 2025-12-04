import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Input コンポーネント', () => {
  test('Requiredストーリーでaria-requiredが設定される', async ({ page }) => {
    await gotoStory(page, 'design-system-input--required');

    const input = page.getByLabel('メールアドレス');
    await expect(input).toHaveAttribute('type', 'email');
    await expect(input).toHaveAttribute('aria-required', 'true');
    await expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  test('WithErrorストーリーはエラーメッセージとaria-describedbyを提供する', async ({ page }) => {
    await gotoStory(page, 'design-system-input--with-error');

    const input = page.getByLabel('メールアドレス');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    const describedBy = await input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`#${describedBy}`)).toContainText('正しいメールアドレスを入力してください');
  });

  test('axe-coreでInputストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-input--with-helper-text');

    const axe = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(axe.violations).toEqual([]);
  });
});
