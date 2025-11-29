import React from 'react';
import { css } from '@/styled-system/css';

export interface SectionHeadingProps {
  /** 見出しの前に表示する絵文字 */
  emoji?: string;
  /** 見出しテキスト */
  children: React.ReactNode;
  /** 見出しレベル (h2, h3, h4) @default 'h3' */
  level?: 'h2' | 'h3' | 'h4';
  /** カスタムスタイル */
  style?: React.CSSProperties;
}

/**
 * 絵文字付き見出しコンポーネント
 *
 * App.tsxで頻繁に使用される「絵文字 + 見出し」パターンを統一
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  emoji,
  children,
  level = 'h3',
  style = {},
}) => {
  const headingClass = css({
    color: 'contents.primary',
    mb: 4,
  });
  const emojiClass = css({ mr: 2 });

  const content = (
    <>
      {emoji && <span className={emojiClass}>{emoji}</span>}
      {children}
    </>
  );

  // レベルに応じて適切な要素を返す
  switch (level) {
    case 'h2':
      return (
        <h2 className={headingClass} style={style}>
          {content}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={headingClass} style={style}>
          {content}
        </h3>
      );
    case 'h4':
      return (
        <h4 className={headingClass} style={style}>
          {content}
        </h4>
      );
    default:
      return (
        <h3 className={headingClass} style={style}>
          {content}
        </h3>
      );
  }
};
