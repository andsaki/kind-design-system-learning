import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Checkbox コンポーネント', () => {
  test('Defaultストーリーでチェックボックスがキーボード操作可能', async ({ page }) => {
    await gotoStory(page, 'design-system-checkbox--default');
    const checkbox = page.getByLabel('利用規約に同意する');
    await expect(checkbox).toBeVisible();
    await checkbox.press('Space');
    await expect(checkbox).toBeChecked();
  });

  test('WithErrorストーリーでaria-invalidとエラーメッセージが連動', async ({ page }) => {
    await gotoStory(page, 'design-system-checkbox--with-error');
    const checkbox = page.getByLabel('利用規約に同意する');
    await expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    const describedBy = await checkbox.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`#${describedBy}`)).toContainText('利用規約への同意が必要です');
  });

  test('axe-coreでCheckboxストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-checkbox--with-help-text');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
