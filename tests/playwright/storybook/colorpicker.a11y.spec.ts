import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook ColorPicker コンポーネント', () => {
  test('Defaultストーリーでラベルとヘルプテキストが表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-colorpicker--default');
    await expect(page.getByLabel('ブランドカラー')).toBeVisible();
    await expect(page.getByText('HEX形式 (#RRGGBB)')).toBeVisible();
  });

  test('WithErrorストーリーでエラー状態が表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-colorpicker--with-error');
    await expect(page.getByText('許可されていない色です')).toBeVisible();
  });

  test('axe-coreでColorPickerストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-colorpicker--disabled');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
