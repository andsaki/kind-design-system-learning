import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import '../../styled-system/styles.css';

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
});
