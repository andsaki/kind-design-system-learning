import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Breadcrumbs コンポーネント', () => {
  test('Defaultストーリーでブラウザ上に正しいナビゲーションが表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-breadcrumbs--default');
    await expect(page.getByRole('navigation')).toHaveAttribute('aria-label');
    await expect(page.getByText('現在のページ')).toHaveAttribute('aria-current', 'page');
  });

  test('DeepHierarchyストーリーで複数リンクが順序通りに存在する', async ({ page }) => {
    await gotoStory(page, 'design-system-breadcrumbs--deep-hierarchy');
    await expect(page.getByRole('link', { name: '電化製品' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'コンピューター' })).toBeVisible();
  });

  test('axe-coreでBreadcrumbsストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-breadcrumbs--custom-label');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
