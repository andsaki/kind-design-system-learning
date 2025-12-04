import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook Table コンポーネント', () => {
  test('Basicストーリーでcaptionとヘッダが存在する', async ({ page }) => {
    await gotoStory(page, 'design-system-table--basic');
    await expect(page.getByText('主要なARIA属性の概要')).toBeVisible();
    await expect(page.getByRole('columnheader', { name: '属性' })).toBeVisible();
  });

  test('StripedAndDividersストーリーで列が存在する', async ({ page }) => {
    await gotoStory(page, 'design-system-table--striped-and-dividers');
    await expect(page.getByRole('columnheader', { name: '基準' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'AA' })).toBeVisible();
  });

  test('axe-coreでTableストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-table--sticky-header');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
