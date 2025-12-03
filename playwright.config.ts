import { defineConfig } from '@playwright/test';

const PORT = 4173;
const HOST = '127.0.0.1';
const NODE_BINARY = process.env.PW_NODE_BINARY ?? 'node';

export default defineConfig({
  testDir: './tests/playwright',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: `http://${HOST}:${PORT}`,
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: `${NODE_BINARY} node_modules/vite/bin/vite.js --host ${HOST} --port ${PORT}`,
    url: `http://${HOST}:${PORT}`,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
