import { useState } from 'react';
import type { ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';
import { css } from '@/styled-system/css';

const tokenColorClassMap = {
  text: css({ color: 'gray.200' }),
  tag: css({ color: 'blue.200' }),
  selector: css({ color: 'blue.200' }),
  property: css({ color: 'blue.200' }),
  string: css({ color: 'green.200' }),
  comment: css({ color: 'gray.500' }),
  keyword: css({ color: 'pink.200' }),
  value: css({ color: 'orange.200' }),
};

interface CodeBlockProps {
  /**
   * 表示するコード
   */
  code: string;
  /**
   * プログラミング言語（表示用ラベル）
   */
  language?: string;
  /**
   * コードブロックの説明やコメント
   */
  description?: ReactNode;
  /**
   * コピーボタンを表示するか
   * @default true
   */
  showCopyButton?: boolean;
  /**
   * 行番号を表示するか
   * @default false
   */
  showLineNumbers?: boolean;
  /**
   * aria-label (スクリーンリーダー用のラベル)
   */
  ariaLabel?: string;
}

/**
 * CodeBlock コンポーネント
 *
 * シンタックスハイライト付きのコードブロックを表示します。
 * アクセシビリティに配慮し、コピー機能や説明文の表示に対応しています。
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   code={`<button aria-label="閉じる">
 *   <XIcon />
 * </button>`}
 *   language="html"
 *   description="スクリーンリーダーが読み上げる内容: ボタン → 閉じる → クリック可能"
 * />
 * ```
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  description,
  showCopyButton = true,
  showLineNumbers = false,
  ariaLabel,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = code.split('\n');

  // シンタックスハイライト用の簡易パーサー
  const highlightCode = (text: string) => {
    const tokens: { type: string; value: string }[] = [];

    // HTML/JSXタグ
    const tagRegex = /<\/?[\w-]+|\/?>|=/g;
    // 文字列リテラル
    const stringRegex = /"[^"]*"|'[^']*'/g;
    // コメント
    const commentRegex = /\/\/[^\n]*|\/\*[\s\S]*?\*\//g;
    // キーワード
    const keywordRegex = /\b(const|let|var|function|return|if|else|import|export|interface|type|aria-\w+)\b/g;
    // CSSセレクタ・プロパティ
    const cssSelectorRegex = /^[\s]*\.[\w-]+|^[\s]*#[\w-]+|^[\s]*[\w-]+(?=\s*\{)/gm;
    const cssPropertyRegex = /[\w-]+(?=\s*:)/g;
    // CSS値（色、数値など）
    const cssValueRegex = /#[0-9a-fA-F]{3,6}|\b\d+px\b|\b\d+rem\b|\b\d+%\b/g;

    let lastIndex = 0;
    const matches: { index: number; length: number; type: string }[] = [];

    // すべてのマッチを収集
    let match;
    while ((match = tagRegex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, type: 'tag' });
    }
    while ((match = stringRegex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, type: 'string' });
    }
    while ((match = commentRegex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, type: 'comment' });
    }
    while ((match = keywordRegex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, type: 'keyword' });
    }
    while ((match = cssSelectorRegex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, type: 'selector' });
    }
    while ((match = cssPropertyRegex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, type: 'property' });
    }
    while ((match = cssValueRegex.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, type: 'value' });
    }

    // インデックスでソート
    matches.sort((a, b) => a.index - b.index);

    // 重複を除去（優先順位: comment > string > tag > keyword）
    const filteredMatches: typeof matches = [];
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i];
      const hasOverlap = filteredMatches.some(
        (m) => current.index >= m.index && current.index < m.index + m.length
      );
      if (!hasOverlap) {
        filteredMatches.push(current);
      }
    }

    // トークン化
    filteredMatches.forEach((match) => {
      if (match.index > lastIndex) {
        tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) });
      }
      tokens.push({ type: match.type, value: text.slice(match.index, match.index + match.length) });
      lastIndex = match.index + match.length;
    });

    if (lastIndex < text.length) {
      tokens.push({ type: 'text', value: text.slice(lastIndex) });
    }

    return tokens;
  };

  const renderHighlightedLine = (line: string) => {
    const tokens = highlightCode(line);
    return tokens.map((token, i) => (
      <span
        key={i}
        className={
          tokenColorClassMap[token.type as keyof typeof tokenColorClassMap] ?? tokenColorClassMap.text
        }
      >
        {token.value}
      </span>
    ));
  };

  return (
    <div
      role="region"
      aria-label={ariaLabel || `${language || 'コード'}ブロック`}
      className={css({
        borderRadius: 'md',
        overflow: 'hidden',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'border.subtle',
        bg: 'gray.900',
      })}
    >
      {/* ヘッダー */}
      {(language || showCopyButton) && (
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
            px: 3,
            backgroundColor: 'gray.800',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'gray.700',
          })}
        >
          {language && (
            <span
              className={css({
                fontSize: 'xs',
                fontWeight: 600,
                color: 'gray.200',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              })}
            >
              {language}
            </span>
          )}
          {showCopyButton && (
            <button
              onClick={handleCopy}
              aria-label={copied ? 'コピーしました' : 'コードをコピー'}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 1,
                px: 2,
                backgroundColor: copied ? 'green.700' : 'gray.700',
                color: 'white',
                border: 'none',
                borderRadius: 'sm',
                fontSize: 'xs',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                ...(copied
                  ? {}
                  : {
                      _hover: {
                        backgroundColor: 'gray.600',
                      },
                    }),
              })}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>コピーしました</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>コピー</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* コードブロック */}
      <div
        className={css({
          backgroundColor: 'gray.900',
          padding: 4,
          overflowX: 'auto',
        })}
      >
        <pre
          className={css({
            margin: 0,
            fontFamily: 'fonts.mono',
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'gray.200',
          })}
        >
          <code
            className={css({
              display: 'block',
              backgroundColor: 'transparent !important',
              padding: 0,
            })}
          >
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div
                  key={index}
                  className={css({
                    display: 'flex',
                    gap: 3,
                  })}
                >
                  <span
                    aria-hidden="true"
                    className={css({
                      color: 'gray.500',
                      userSelect: 'none',
                      minWidth: '2em',
                      textAlign: 'right',
                    })}
                  >
                    {index + 1}
                  </span>
                  <span>{renderHighlightedLine(line)}</span>
                </div>
              ))
            ) : (
              lines.map((line, index) => (
                <div key={index}>{renderHighlightedLine(line)}</div>
              ))
            )}
          </code>
        </pre>
      </div>

      {/* 説明文 */}
      {description && (
        <div
          className={css({
            padding: 3,
            backgroundColor: 'gray.900',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'gray.800',
            color: 'gray.300',
            fontSize: 'sm',
            lineHeight: '1.6',
          })}
        >
          {description}
        </div>
      )}
    </div>
  );
};
