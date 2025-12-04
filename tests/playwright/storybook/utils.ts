import type { Page } from '@playwright/test';

export const STORY_ROOT = '#storybook-root';

export async function gotoStory(page: Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
  await page.waitForSelector(STORY_ROOT, { state: 'visible' });
}
