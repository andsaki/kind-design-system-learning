import { useState, type ChangeEvent } from "react";
import { css, cx } from "@/styled-system/css";

const sectionClass = css({
  mb: 12,
  p: 6,
  bg: "bg.secondary",
  borderWidth: "base",
  borderStyle: "solid",
  borderColor: "border.default",
  rounded: "lg",
  maxW: "full",
  overflowX: "hidden",
  boxSizing: "border-box",
});

const headingClass = css({ color: "contents.primary", mt: 0 });

const listClass = css({
  lineHeight: "relaxed",
  color: "contents.primary",
});

const zoomDemoContainer = css({
  mt: 8,
  p: 4,
  bg: "bg.primary",
  borderRadius: "lg",
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "border.default",
});

const sliderLabelClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 3,
  flexWrap: "wrap",
  fontWeight: "semibold",
  color: "contents.primary",
  mt: 4,
});

const sliderInputClass = css({
  width: "100%",
  marginTop: 2,
});

const sliderHintClass = css({
  mt: 2,
  fontSize: "sm",
  color: "contents.secondary",
});

const zoomPreviewWrapperClass = css({
  mt: 5,
  display: "grid",
  gap: 4,
  gridTemplateColumns: { base: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
});

const zoomPreviewCardClass = css({
  p: 4,
  borderRadius: "md",
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "border.default",
  backgroundColor: "bg.secondary",
  color: "contents.primary",
  lineHeight: "relaxed",
  transition: "all 0.2s",
  boxShadow: "sm",
});

const zoomPreviewHeadingClass = css({
  mt: 0,
  mb: 3,
  fontSize: "lg",
  fontWeight: "semibold",
});

const zoomPreviewListClass = css({
  mt: 3,
  mb: 0,
  pl: 4,
  listStyleType: "disc",
  color: "contents.primary",
  fontSize: "sm",
  lineHeight: "relaxed",
});

const zoomNoteCardClass = css({
  p: 4,
  borderRadius: "md",
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "border.default",
  backgroundColor: "bg.secondary",
  color: "contents.primary",
  lineHeight: "relaxed",
});

const zoomNoteListClass = css({
  mt: 3,
  mb: 0,
  pl: 4,
  listStyleType: "disc",
  fontSize: "sm",
  color: "contents.primary",
});

export function AccessibilityFeatures() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomPercent = Math.round(zoomLevel * 100);

  const handleZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(parseFloat(event.target.value));
  };

  return (
    <section
      id="accessibility-features"
      className={cx("accessibility-features", sectionClass)}
    >
      <h3 className={cx(headingClass)}>
        アクセシビリティ機能
      </h3>
      <ul className={cx(listClass)}>
        <li>✅ キーボード操作対応（Tab、Enter、Space）</li>
        <li>✅ フォーカスインジケーター表示</li>
        <li>✅ スクリーンリーダー対応（ARIA属性）</li>
        <li>✅ ラベルとフィールドの適切な関連付け</li>
        <li>✅ エラーの即座な通知（role="alert"）</li>
        <li>✅ 必須項目の明示</li>
        <li>✅ WCAG AA準拠のカラーコントラスト</li>
        <li>✅ 適切なセマンティックHTML</li>
      </ul>

      <div className={zoomDemoContainer}>
        <h4 className={css({ mt: 0, mb: 2, color: "contents.primary", fontSize: "lg" })}>
          ズーム＆リフロー デモ
        </h4>
        <p className={css({ color: "contents.secondary", fontSize: "sm", lineHeight: "relaxed", m: 0 })}>
          `meta viewport` とレスポンシブな余白設計により、モバイルでピンチズームしても文字は拡大しながらレイアウトが崩れにくいことを確認できます。スライダーで倍率を変えて挙動を体験してみてください。
        </p>

        <label htmlFor="zoom-range" className={sliderLabelClass}>
          <span>ズーム倍率</span>
          <span className={css({ fontSize: "lg" })} aria-live="polite">
            {zoomPercent}%
          </span>
        </label>
        <input
          id="zoom-range"
          className={sliderInputClass}
          type="range"
          min="1"
          max="4"
          step="0.25"
          value={zoomLevel}
          onChange={handleZoomChange}
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={zoomLevel}
          aria-valuetext={`${zoomPercent}%`}
        />
        <p className={sliderHintClass}>
          100%は初期スケール（`initial-scale=1.0`）。最大400%まで拡大してもフォーカススタイルや余白が保たれる想定です。
        </p>

        <div className={zoomPreviewWrapperClass}>
          <div
            className={cx(
              zoomPreviewCardClass,
              css({
                fontSize: `${zoomLevel}rem`,
              })
            )}
          >
            <p className={zoomPreviewHeadingClass}>現在の見え方</p>
            <p className={css({ m: 0 })}>
              このカード全体をズーム倍率に追随させています。文字サイズだけでなく余白も相対的に広がり、行間が詰まりすぎないように設計しています。
            </p>
            <ul className={zoomPreviewListClass}>
              <li>倍率: {zoomPercent}%（約 {zoomLevel.toFixed(2)}rem）</li>
              <li>行の長さを 60-70 文字程度に保ち、リーダビリティを確保</li>
              <li>余白は `spacing.scale` を用いて一貫管理</li>
            </ul>
          </div>

          <div className={zoomNoteCardClass}>
            <p className={zoomPreviewHeadingClass}>ズーム対応のポイント</p>
            <ul className={zoomNoteListClass}>
              <li>`meta viewport` で `user-scalable=yes` を設定し、ピンチズームを妨げない</li>
              <li>コンポーネントは `rem` とデザイントークンを基準に余白・サイズを指定</li>
              <li>フォーカスリングやアウトラインはピクセル固定ではなく CSS カスタムプロパティで制御</li>
              <li>400%ズーム時でも縦方向にリフローさせ、横スクロールを発生させない</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
