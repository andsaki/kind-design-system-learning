import { Link } from "react-router-dom";
import { css } from "@/styled-system/css";
import { icons } from "../design-system/tokens/icons";

const heroPrinciples = [
  {
    icon: icons.philosophy.inclusive,
    title: "誰一人として置き去りにしない",
    description:
      "視覚・聴覚・運動機能に関わらず、すべての人が等しく情報にアクセスできる設計",
  },
  {
    icon: icons.philosophy.pleasant,
    title: "心地よさを感じる体験",
    description:
      "柔らかな色彩、滑らかな動き、適切な余白で、ストレスのない使い心地を実現",
  },
  {
    icon: icons.philosophy.scalable,
    title: "成長し続ける仕組み",
    description:
      "スケーラブルなトークンシステムで、プロジェクトとともに進化するデザイン",
  },
];

const navigationCards = [
  {
    title: "コンポーネント",
    description: "アクセシブルなUIコンポーネントの実装例を確認",
    path: "/components",
    icon: icons.component.button,
  },
  {
    title: "ARIA属性",
    description: "WAI-ARIAの主要プロパティとガイドを学ぶ",
    path: "/aria/properties",
    icon: icons.philosophy.inclusive,
  },
  {
    title: "アクセシビリティ",
    description: "WCAG準拠とアクセシビリティ機能について",
    path: "/accessibility/features",
    icon: icons.concept.wcag,
  },
  {
    title: "デザイントークン",
    description: "デザインシステムのトークンとスタイリング",
    path: "/design/tokens",
    icon: icons.concept.theme.light,
  },
];

export const Home = () => {
  return (
    <div>
      <div
        className={css({
          mt: 6,
          p: 6,
          bg: "bg.secondary",
          borderRadius: "xl",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "border.default",
        })}
      >
        <h2
          className={css({
            mt: 0,
            mb: 3,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <span
            className={css({
              color: "contents.link",
              display: "inline-flex",
            })}
            aria-hidden="true"
          >
            <icons.philosophy.overview
              size={24}
              strokeWidth={2}
              color="currentColor"
            />
          </span>
          デザイン哲学：優しさの3原則
        </h2>

        <div
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", lg: "repeat(3, 1fr)" },
            gap: 4,
            mt: 4,
          })}
        >
          {heroPrinciples.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className={css({
                p: 4,
                bg: "bg.primary",
                borderRadius: "lg",
                borderWidth: "thin",
                borderStyle: "solid",
                borderColor: "border.default",
              })}
            >
              <span
                className={css({
                  mb: 2,
                  display: "inline-flex",
                  color: "contents.link",
                })}
                aria-hidden="true"
              >
                <Icon size={32} strokeWidth={1.5} color="currentColor" />
              </span>
              <h3
                className={css({
                  mt: 0,
                  mb: 2,
                  color: "contents.primary",
                  fontSize: "base",
                  fontWeight: "semibold",
                })}
              >
                {title}
              </h3>
              <p
                className={css({
                  m: 0,
                  color: "contents.secondary",
                  fontSize: "sm",
                  lineHeight: "relaxed",
                })}
              >
                {description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={css({
            mt: 4,
            p: 3,
            bg: "bg.primary",
            borderRadius: "md",
            fontSize: "sm",
            color: "contents.primary",
          })}
        >
          <strong>📚 詳しくは：</strong>{" "}
          <a
            href="https://github.com/andsaki/accessibility-learning/blob/master/DESIGN_PHILOSOPHY.md"
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              color: "contents.link",
              textDecoration: "underline",
            })}
          >
            DESIGN_PHILOSOPHY.md
          </a>{" "}
          をご覧ください
        </div>
      </div>

      <div
        className={css({
          mt: 8,
          display: "grid",
          gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
          gap: 4,
        })}
      >
        {navigationCards.map(({ title, description, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={css({
              p: 6,
              bg: "bg.secondary",
              borderRadius: "lg",
              borderWidth: "base",
              borderStyle: "solid",
              borderColor: "border.default",
              textDecoration: "none",
              transition: "all 0.2s",
              _hover: {
                borderColor: "border.focus",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              },
            })}
          >
            <span
              className={css({
                display: "inline-flex",
                mb: 3,
                color: "contents.link",
              })}
              aria-hidden="true"
            >
              <Icon size={32} strokeWidth={1.5} color="currentColor" />
            </span>
            <h3
              className={css({
                mt: 0,
                mb: 2,
                color: "contents.primary",
                fontSize: "lg",
                fontWeight: "semibold",
              })}
            >
              {title}
            </h3>
            <p
              className={css({
                m: 0,
                color: "contents.secondary",
                fontSize: "sm",
                lineHeight: "relaxed",
              })}
            >
              {description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
