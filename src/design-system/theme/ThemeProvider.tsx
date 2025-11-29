import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

/**
 * テーマのタイプ
 */
export type ThemeMode = 'light' | 'dark';

/**
 * テーマコンテキストの型
 */
export interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

/**
 * テーマコンテキスト
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProviderのProps
 */
export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  /**
   * localStorageのキー
   * Storybookなど複数アプリでProviderを共有する場合に上書き競合を防ぐ
   * @default "theme"
   */
  storageKey?: string;
}

/**
 * ThemeProvider
 *
 * アプリケーション全体でテーマを管理するProvider
 *
 * 機能:
 * - ライトモード/ダークモードの切り替え
 * - localStorageに設定を保存
 * - システムの設定を自動検出
 *
 * @example
 * <ThemeProvider defaultTheme="light">
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  storageKey = 'theme',
}) => {
  // システムのテーマ設定を検出
  const getSystemTheme = (): ThemeMode => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // 初期テーマを決定（localStorage > defaultTheme > system）
  const getInitialTheme = (): ThemeMode => {
    if (typeof window === 'undefined') return defaultTheme;

    const savedTheme = localStorage.getItem(storageKey) as ThemeMode | null;
    if (savedTheme) return savedTheme;

    return defaultTheme === 'light' ? getSystemTheme() : defaultTheme;
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

  // テーマが変更されたらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem(storageKey, mode);

    // documentのdata属性を更新（CSS変数で使用可能）
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // システムのテーマ設定変更を監視
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // localStorageに保存されていない場合のみシステム設定に従う
      if (!localStorage.getItem(storageKey)) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    // Safari対応: addListenerとaddEventListenerの両方をサポート
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // 古いブラウザ向け
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [storageKey]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const value: ThemeContextType = {
    mode,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * useTheme
 *
 * テーマコンテキストを取得するカスタムフック
 *
 * Panda CSS の semanticTokens により、カラートークンは自動的に
 * data-theme 属性に基づいて切り替わります
 *
 * @throws ThemeProvider外で使用した場合にエラー
 *
 * @example
 * const { mode, toggleTheme } = useTheme();
 *
 * <button onClick={toggleTheme}>
 *   {mode === 'light' ? '🌙' : '☀️'}
 * </button>
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
