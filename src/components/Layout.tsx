import { Outlet } from "react-router-dom";
import { css } from "@/styled-system/css";
import { useTheme } from "../design-system/theme";
import { Button, Breadcrumbs, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "../design-system/components";
import { icons } from "../design-system/tokens/icons";
import { Navigation } from "./Navigation";

export const Layout = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <div
      className={css({
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
        bg: "bg.primary",
        color: "contents.primary",
        px: { base: 4, md: 8 },
        py: { base: 6, md: 10 },
        maxW: "1400px",
        mx: "auto",
      })}
    >
      <header className={css({ mb: 8 })}>
        <div className={css({ mb: 4 })}>
          <Breadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">
                  デザインシステム
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumbs>
        </div>

        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 3,
            mb: 4,
          })}
        >
          <div className={css({ flex: 1, minW: "300px" })}>
            <h1
              className={css({
                mb: 2,
                fontSize: { base: "1.75rem", md: "2.5rem" },
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 2,
              })}
            >
              <span
                className={css({ color: "pink.400", display: "inline-flex" })}
                aria-hidden="true"
              >
                <icons.philosophy.kind
                  size={32}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </span>
              優しい体験を学ぶデザインシステム
            </h1>
            <p
              className={css({
                color: "contents.secondary",
                fontSize: "lg",
                lineHeight: "normal",
              })}
            >
              すべてのユーザーに寄り添う、アクセシブルで心地よいUIコンポーネント集
            </p>
          </div>
          <div
            className={css({
              display: "flex",
              gap: 2,
              alignItems: { base: "stretch", md: "flex-start" },
              flexWrap: "wrap",
            })}
          >
            <Button
              onClick={() =>
                window.open("/kind-design-system-learning/storybook/", "_blank")
              }
              variant="secondary"
              size="sm"
              aria-label="Storybookを開く"
            >
              <icons.component.button
                size={20}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className={css({ ml: 1 })}>Storybook</span>
            </Button>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              aria-label={
                mode === "light"
                  ? "ダークモードに切り替え"
                  : "ライトモードに切り替え"
              }
            >
              {mode === "light" ? (
                <icons.concept.theme.dark
                  size={20}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              ) : (
                <icons.concept.theme.light
                  size={20}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div
        className={css({
          display: "flex",
          flexDirection: { base: "column", lg: "row" },
          gap: { base: 4, lg: 8 },
          alignItems: { base: "stretch", md: "flex-start" },
        })}
      >
        <aside
          className={css({
            width: { base: "100%", lg: "280px" },
            flexShrink: 0,
            position: { base: "static", lg: "sticky" },
            top: { base: "auto", lg: 4 },
          })}
        >
          <Navigation />
        </aside>

        <main className={css({ flex: 1, minW: 0 })}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
