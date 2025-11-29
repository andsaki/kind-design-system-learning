import { InfoBox } from "../design-system/components/InfoBox";
import { css, cx } from "@/styled-system/css";

const containerClass = css({
  mt: 4,
  display: "grid",
  gap: 3,
});

const infoGridClass = css({
  display: "grid",
  gap: 3,
});

const infoCardBaseClass = css({
  p: 3,
  bg: "white",
  rounded: "md",
  borderWidth: "thin",
  borderStyle: "solid",
});

const infoCardBorderClass = css({
  borderColor: "blue.200",
});

const infoTitleClass = css({
  color: "blue.900",
  fontSize: "base",
});

const infoTextClass = css({
  mt: 1,
  color: "gray.700",
  fontSize: "sm",
  lineHeight: "relaxed",
});

const warningListClass = css({
  m: 0,
  pl: 5,
  fontSize: "sm",
  lineHeight: "relaxed",
  color: "gray.900",
});

/**
 * WCAGレベルの説明を表示する共通コンポーネント
 */
export const WCAGLevelInfo = () => {
  return (
    <div className={cx(containerClass)}>
      <InfoBox variant="info" icon="📊" title="WCAGレベルについて">
        <div className={cx(infoGridClass)}>
          <div className={cx(infoCardBaseClass, infoCardBorderClass)}>
            <strong className={cx(infoTitleClass)}>
              レベルA（最低限）
            </strong>
            <p className={cx(infoTextClass)}>
              最低限満たすべき基本的なアクセシビリティ要件
            </p>
          </div>

          <div className={cx(infoCardBaseClass, infoCardBorderClass)}>
            <strong className={cx(infoTitleClass)}>
              レベルAA（推奨）⭐
            </strong>
            <p className={cx(infoTextClass)}>
              一般的なWebサイトで目指すべき標準レベル
            </p>
          </div>

          <div className={cx(infoCardBaseClass, infoCardBorderClass)}>
            <strong className={cx(infoTitleClass)}>
              レベルAAA（最高）
            </strong>
            <p className={cx(infoTextClass)}>
              公共サービスや医療など、最高水準のアクセシビリティが求められる場合
            </p>
          </div>
        </div>
      </InfoBox>

      <InfoBox
        variant="warning"
        icon="💡"
        title="実用的な選び方"
        className={css({
          bg: "yellow",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "black",
        })}
      >
        <ul
          className={cx(warningListClass)}
        >
          <li>
            <strong>一般的なWebサイト</strong>: AA を目指す
          </li>
          <li>
            <strong>公共サービス、医療、金融</strong>: AAA を検討
          </li>
          <li>
            <strong>最低限</strong>: A は避け、少なくとも AA を満たす
          </li>
        </ul>
      </InfoBox>
    </div>
  );
};
