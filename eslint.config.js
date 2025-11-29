// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import customRules from './eslint-rules/index.js'

export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      custom: customRules,
    },
    rules: {
      'custom/no-top-level-css-const': 'warn',
    },
  },
  {
    // Storybookファイルでは型定義との相性上、anyの使用を許可
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // コンポーネントと関連ユーティリティを同じファイルからexportするのが一般的なパターンのため無効化
    // - ToastProvider/ThemeProvider: コンポーネント + 関連フック (useToast, useTheme)
    // - Form: コンポーネント + バリデーションヘルパー (formSchemas)
    files: ['**/ToastProvider.tsx', '**/ThemeProvider.tsx', '**/Form.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
