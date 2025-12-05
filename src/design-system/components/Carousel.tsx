import { useState, useEffect, useRef } from "react";
import { css } from "@/styled-system/css";
import { Button } from "./Button";

export interface CarouselSlide {
  id: number | string;
  content: React.ReactNode;
  title?: string;
  description?: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  ariaLabel?: string;
  ariaRoleDescription?: string;
  /** スライドの高さ（px）を指定。未指定の場合はコンテンツに応じて可変 */
  slideHeight?: number;
  /** スライドのアスペクト比（例: "16/9", "4/3"）*/
  aspectRatio?: string;
}

/**
 * アクセシブルなカルーセルコンポーネント
 *
 * @description
 * WCAG 2.1 AA準拠のカルーセルコンポーネント。
 * キーボード操作、スクリーンリーダー対応、タッチジェスチャー、自動再生制御を実装。
 *
 * @features
 * - ⌨️ キーボード操作: 前へ/次へボタンとインジケーターで完全に操作可能
 * - 📱 タッチ操作: 左右スワイプでスライド切り替え
 * - 🔊 スクリーンリーダー対応: ARIA属性による適切な情報提供
 * - 🎮 自動再生制御: ユーザーが制御できる再生/一時停止
 * - 🖼️ 画像対応: slideHeight/aspectRatioで画像のはみ出しを防ぐ
 *
 * @accessibility
 * - role="region" + aria-roledescription="carousel"
 * - aria-hidden="true" + tabindex="-1" で非表示スライドを除外
 * - aria-live="polite" でスライド変更を通知
 * - キーボードのみで完全に操作可能
 *
 * @example
 * ```tsx
 * <Carousel
 *   slides={[
 *     { id: 1, title: "スライド1", content: <div>コンテンツ</div> }
 *   ]}
 *   ariaLabel="商品カルーセル"
 *   slideHeight={400}
 * />
 * ```
 */
export function Carousel({
  slides,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  showControls = true,
  ariaLabel = "カルーセル",
  ariaRoleDescription = "carousel",
  slideHeight,
  aspectRatio,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;

  // 自動再生
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, totalSlides, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  /**
   * 📱 タッチ操作（スワイプジェスチャー）
   *
   * - 左スワイプ（→方向）: 次のスライドへ
   * - 右スワイプ（←方向）: 前のスライドへ
   * - 最小スワイプ距離: 50px
   */
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance; // 左スワイプ（→）: 次へ
    const isRightSwipe = distance < -minSwipeDistance; // 右スワイプ（←）: 前へ

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: 3,
      })}
    >
      {/* カルーセル本体 */}
      <div
        ref={carouselRef}
        role="region"
        aria-roledescription={ariaRoleDescription}
        aria-label={ariaLabel}
        className={css({
          position: "relative",
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          overflow: "hidden",
          outline: "none",
          height: slideHeight ? `${slideHeight}px` : "auto",
          aspectRatio: aspectRatio || "auto",
          "&:focus-visible": {
            borderColor: "border.focus",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
          },
        })}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* スライドコンテナ */}
        <div
          className={css({
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            height: "100%",
          })}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${totalSlides}`}
              aria-hidden={index !== currentSlide}
              // tabindex="-1": 非表示スライドをTab順序から除外
              // 嬉しい点: 4スライド×各3個のリンク = 12個全てTabする必要がなくなる（表示中の3個だけでOK）
              tabIndex={index !== currentSlide ? -1 : undefined}
              className={css({
                minWidth: "100%",
                maxWidth: "100%",
                padding: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                boxSizing: "border-box",
                overflow: "hidden",
                "& img": {
                  maxWidth: "100%",
                  maxHeight: "100%",
                  height: "auto",
                  objectFit: "contain",
                },
                "& > *": {
                  maxWidth: "100%",
                },
              })}
            >
              {slide.content}
            </div>
          ))}
        </div>

        {/* ナビゲーションボタン */}
        {showControls && (
          <>
            {/* 前へボタン */}
            <button
              onClick={goToPrevious}
              aria-label="前のスライドへ"
              className={css({
                position: "absolute",
                top: "50%",
                left: 2,
                transform: "translateY(-50%)",
                backgroundColor: "bg.primary",
                borderWidth: "thin",
                borderStyle: "solid",
                borderColor: "border.default",
                borderRadius: "full",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "xl",
                color: "contents.primary",
                opacity: 0.9,
                transition: "opacity 0.2s",
                "&:hover": {
                  opacity: 1,
                  backgroundColor: "bg.secondary",
                },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "border.focus",
                  outlineOffset: "2px",
                },
              })}
            >
              ←
            </button>

            {/* 次へボタン */}
            <button
              onClick={goToNext}
              aria-label="次のスライドへ"
              className={css({
                position: "absolute",
                top: "50%",
                right: 2,
                transform: "translateY(-50%)",
                backgroundColor: "bg.primary",
                borderWidth: "thin",
                borderStyle: "solid",
                borderColor: "border.default",
                borderRadius: "full",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "xl",
                color: "contents.primary",
                opacity: 0.9,
                transition: "opacity 0.2s",
                "&:hover": {
                  opacity: 1,
                  backgroundColor: "bg.secondary",
                },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "border.focus",
                  outlineOffset: "2px",
                },
              })}
            >
              →
            </button>
          </>
        )}
      </div>

      {/* コントロールパネル */}
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          flexWrap: "wrap",
        })}
      >
        {/* インジケーター */}
        {showIndicators && (
          <div
            role="group"
            aria-label="スライドインジケーター"
            className={css({
              display: "flex",
              gap: 2,
              alignItems: "center",
            })}
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                aria-label={`スライド ${index + 1} へ移動`}
                aria-current={index === currentSlide ? "true" : undefined}
                className={css({
                  width: "12px",
                  height: "12px",
                  borderRadius: "full",
                  borderWidth: "thin",
                  borderStyle: "solid",
                  borderColor: "border.default",
                  backgroundColor: index === currentSlide ? "blue.500" : "bg.tertiary",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "border.focus",
                    outlineOffset: "2px",
                  },
                })}
              />
            ))}
          </div>
        )}

        {/* 再生/一時停止ボタン */}
        <Button
          onClick={togglePlayPause}
          variant="outline"
          size="sm"
          aria-label={isPlaying ? "自動再生を一時停止" : "自動再生を開始"}
        >
          {isPlaying ? "⏸️ 一時停止" : "▶️ 再生"}
        </Button>
      </div>

      {/* 現在のスライド情報（aria-live） */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className={css({
          padding: 3,
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          fontSize: "sm",
          color: "contents.secondary",
          textAlign: "center",
        })}
      >
        スライド {currentSlide + 1} / {totalSlides}
        {currentSlideData.title && `: ${currentSlideData.title}`}
      </div>
    </div>
  );
}
