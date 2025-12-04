import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory, STORY_ROOT } from './utils';

test.describe('Storybook TextArea コンポーネント', () => {
  test('Defaultストーリーで入力とヘルプテキストが機能する', async ({ page }) => {
    await gotoStory(page, 'design-system-textarea--default');
    const textarea = page.getByLabel('コメント');
    await textarea.fill('テスト入力');
    await expect(textarea).toHaveValue('テスト入力');
  });

  test('WithErrorストーリーでエラーメッセージが表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-textarea--with-error');
    await expect(page.getByText('レビューの入力が必要です')).toBeVisible();
  });

  test('axe-coreでTextAreaストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-textarea--with-character-count');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
