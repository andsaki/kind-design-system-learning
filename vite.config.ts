/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/kind-design-system-learning/' : '/',
  plugins: [react()],
  resolve: {
    alias: [
      {
        // Regex ensures we only rewrite the "@/styled-system" prefix and keep the rest of the path
        find: /^@\/styled-system/,
        replacement: path.resolve(dirname, 'styled-system'),
      },
      {
        find: '@',
        replacement: path.resolve(dirname, 'src'),
      },
    ],
  }
});
