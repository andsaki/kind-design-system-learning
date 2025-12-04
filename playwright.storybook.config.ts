import { defineConfig } from '@playwright/test';

const HOST = '127.0.0.1';
const PORT = 6006;
const NODE_BINARY = process.env.PW_NODE_BINARY ?? 'node';

export default defineConfig({
  testDir: './tests/playwright/storybook',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: `http://${HOST}:${PORT}`,
    trace: 'on-first-retry',
    viewport: { width: 1200, height: 800 },
  },
  webServer: {
    command: `${NODE_BINARY} node_modules/.bin/storybook dev -p ${PORT} --host ${HOST}`,
    url: `http://${HOST}:${PORT}`,
    timeout: 180 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
