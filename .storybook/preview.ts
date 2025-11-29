import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/index.css';
import { ThemeProvider } from '../src/design-system/theme/ThemeProvider';

const ThemeProviderWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  React.createElement(
    ThemeProvider,
    { defaultTheme: 'light', storageKey: 'storybook-theme', children },
  );

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        ThemeProviderWrapper,
        { children: Story() },
      ),
  ],
};

export default preview;
