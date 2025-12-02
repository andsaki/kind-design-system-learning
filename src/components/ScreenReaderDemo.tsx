import { ReactNode } from "react";
import { css } from "@/styled-system/css";
import { Button } from "../design-system/components";
import { icons } from "../design-system/tokens/icons";
import { useSpeech } from "../hooks/useSpeech";

interface ScreenReaderDemoProps {
  children: ReactNode;
  /** スクリーンリーダーが読み上げるテキスト */
  srText: string;
  /** 説明文 */
  description?: string;
  /** 表示するコンポーネントのラベル */
  label?: string;
}

export const ScreenReaderDemo = ({
  children,
  srText,
  description,
  label,
}: ScreenReaderDemoProps) => {
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(srText);
    }
  };

  return (
    <div
      className={css({
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "base",
        borderStyle: "solid",
        borderColor: "border.default",
        marginY: 4,
      })}
    >
      {label && (
        <div
          className={css({
            marginBottom: 3,
            fontSize: "sm",
            fontWeight: "semibold",
            color: "contents.secondary",
            textTransform: "uppercase",
            letterSpacing: "wide",
          })}
        >
          {label}
        </div>
      )}

      <div
        className={css({
          display: "flex",
          flexDirection: { base: "column", md: "row" },
          gap: 4,
          alignItems: { base: "stretch", md: "flex-start" },
        })}
      >
        {/* コンポーネント表示エリア */}
        <div
          className={css({
            flex: 1,
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          {children}
        </div>

        {/* 読み上げコントロールと出力エリア */}
        <div
          className={css({
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          })}
        >
          {description && (
            <p
              className={css({
                margin: 0,
                fontSize: "sm",
                color: "contents.secondary",
                lineHeight: "relaxed",
              })}
            >
              {description}
            </p>
          )}

          {/* 読み上げボタン */}
          <Button
            onClick={handleSpeak}
            disabled={!isSupported}
            variant={isSpeaking ? "secondary" : "primary"}
            size="sm"
            aria-label={
              isSpeaking
                ? "読み上げを停止"
                : "スクリーンリーダーの読み上げを再生"
            }
          >
            {isSpeaking ? (
              <>
                <icons.component.button
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className={css({ ml: 2 })}>停止中...</span>
              </>
            ) : (
              <>
                <icons.concept.wcag
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className={css({ ml: 2 })}>
                  🔊 読み上げを聞く
                </span>
              </>
            )}
          </Button>

          {!isSupported && (
            <p
              className={css({
                margin: 0,
                fontSize: "xs",
                color: "contents.error",
                padding: 2,
                backgroundColor: "bg.primary",
                borderRadius: "sm",
              })}
            >
              ⚠️
              お使いのブラウザは音声合成に対応していません
            </p>
          )}

          {/* スクリーンリーダー出力 */}
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.primary",
              borderRadius: "md",
              borderWidth: "base",
              borderStyle: "solid",
              borderColor: isSpeaking ? "border.success" : "border.default",
              transition: "border-color 0.2s",
            })}
          >
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginBottom: 2,
              })}
            >
              <span
                className={css({
                  fontSize: "xs",
                  fontWeight: "semibold",
                  color: "contents.tertiary",
                  textTransform: "uppercase",
                  letterSpacing: "wide",
                })}
              >
                🎙️ スクリーンリーダー出力
              </span>
              {isSpeaking && (
                <span
                  className={css({
                    fontSize: "xs",
                    color: "contents.success",
                    fontWeight: "semibold",
                  })}
                >
                  ● 読み上げ中
                </span>
              )}
            </div>
            <p
              className={css({
                margin: 0,
                fontFamily: "fonts.mono",
                fontSize: "sm",
                color: "contents.primary",
                lineHeight: "relaxed",
                fontStyle: "italic",
                padding: 3,
                backgroundColor: "bg.tertiary",
                borderRadius: "sm",
              })}
            >
              "{srText}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
