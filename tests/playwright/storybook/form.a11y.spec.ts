import { test, expect } from '@playwright/test';
import { gotoStory, STORY_ROOT } from './utils';
import AxeBuilder from '@axe-core/playwright';

const submit = async (page: any) => {
  await page.getByRole('button', { name: /ログイン|会員登録|送信/ }).first().click();
};

test.describe('Storybook Form コンポーネント', () => {
  test('LoginFormストーリーでエラーが表示される', async ({ page }) => {
    await gotoStory(page, 'design-system-form--login-form');
    await submit(page);
    await expect(page.getByText('有効なメールアドレスを入力してください')).toBeVisible();
  });

  test('SignupFormストーリーでパスワード不一致のバリデーションが動作する', async ({ page }) => {
    await gotoStory(page, 'design-system-form--signup-form');
    await page.getByLabel('ユーザー名').fill('abc');
    await page.getByLabel('メールアドレス').fill('test@example.com');
    await page.getByLabel(/パスワード/, { exact: false }).first().fill('Password1');
    await page.getByLabel('パスワード（確認）', { exact: false }).fill('Different1');
    await submit(page);
    await expect(page.getByText('パスワードが一致しません')).toBeVisible();
  });

  test('axe-coreでContactFormストーリーに違反がない', async ({ page }) => {
    await gotoStory(page, 'design-system-form--contact-form');
    const results = await new AxeBuilder({ page })
      .include(STORY_ROOT)
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
