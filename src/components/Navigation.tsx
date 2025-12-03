import { NavLink } from "react-router-dom";
import { css } from "@/styled-system/css";
import { icons } from "../design-system/tokens/icons";

const navigationItems = [
  {
    title: "ホーム",
    path: "/",
    icon: icons.philosophy.kind,
  },
  {
    title: "コンポーネント",
    path: "/components",
    icon: icons.component.button,
  },
  {
    title: "ARIA",
    icon: icons.philosophy.inclusive,
    children: [
      { title: "主要プロパティ", path: "/aria/properties" },
      { title: "ラベルとrole属性", path: "/aria/guide" },
      { title: "APG (Authoring Practices)", path: "/aria/apg" },
      { title: "ステートプロパティ", path: "/aria/states" },
      { title: "Input type属性", path: "/aria/input-types" },
      { title: 'role="presentation"', path: "/aria/role-presentation" },
      { title: "フォームラベリング", path: "/aria/form-labeling" },
    ],
  },
  {
    title: "アクセシビリティ",
    icon: icons.concept.wcag,
    children: [
      { title: "機能一覧", path: "/accessibility/features" },
      { title: "WCAGレベル", path: "/accessibility/wcag-levels" },
    ],
  },
  {
    title: "デザイン",
    icon: icons.concept.theme.light,
    children: [
      { title: "デザイントークン", path: "/design/tokens" },
      { title: "画像比較", path: "/design/image-comparison" },
    ],
  },
];

export const Navigation = () => {
  return (
    <nav
      className={css({
        p: 4,
        bg: "bg.secondary",
        borderRadius: "lg",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.default",
      })}
      aria-label="メインナビゲーション"
    >
      <ul
        className={css({
          listStyle: "none",
          p: 0,
          m: 0,
        })}
      >
        {navigationItems.map((item) => (
          <li key={item.title} className={css({ mb: 2 })}>
            {item.path ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  css({
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: "md",
                    textDecoration: "none",
                    color: isActive ? "contents.link" : "contents.primary",
                    bg: isActive ? "bg.tertiary" : "transparent",
                    fontWeight: isActive ? "semibold" : "normal",
                    transition: "all 0.2s",
                    _hover: {
                      bg: "bg.tertiary",
                    },
                  })
                }
              >
                <item.icon size={20} strokeWidth={2} aria-hidden="true" />
                {item.title}
              </NavLink>
            ) : (
              <>
                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    color: "contents.secondary",
                    fontWeight: "semibold",
                    fontSize: "sm",
                  })}
                >
                  <item.icon size={20} strokeWidth={2} aria-hidden="true" />
                  {item.title}
                </div>
                {item.children && (
                  <ul
                    className={css({
                      listStyle: "none",
                      p: 0,
                      pl: 8,
                      m: 0,
                    })}
                  >
                    {item.children.map((child) => (
                      <li key={child.path} className={css({ mb: 1 })}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            css({
                              display: "block",
                              p: 2,
                              borderRadius: "md",
                              textDecoration: "none",
                              color: isActive
                                ? "contents.link"
                                : "contents.primary",
                              bg: isActive ? "bg.tertiary" : "transparent",
                              fontWeight: isActive ? "semibold" : "normal",
                              fontSize: "sm",
                              transition: "all 0.2s",
                              _hover: {
                                bg: "bg.tertiary",
                              },
                            })
                          }
                        >
                          {child.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
