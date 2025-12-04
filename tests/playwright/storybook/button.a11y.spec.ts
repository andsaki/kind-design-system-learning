import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Button コンポーネント', () => {
  test('Primaryストーリーでaria-pressedが無くシンプルなボタンである', async ({ page }) => {
    await gotoStory(page, 'design-system-button--primary');
    const button = page.getByRole('button', { name: '保存' });
    await expect(button).toBeVisible();
    await expect(button).not.toHaveAttribute('aria-pressed');
  });

  test('Loadingストーリーはaria-busyとローディングテキストを示す', async ({ page }) => {
    await gotoStory(page, 'design-system-button--loading');
    const button = page.getByRole('button', { name: '送信中...' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
  });

  test('axe-coreでButtonストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-button--with-icon');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
