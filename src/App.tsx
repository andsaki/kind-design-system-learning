import { useState, useEffect } from "react";
import { css } from "@/styled-system/css";
import {
  useToast,
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "./design-system/components";
import { icons } from "./design-system/tokens/icons";
import { TableOfContents } from "./components/TableOfContents";
import { HamburgerButton } from "./components/HamburgerButton";
import { MobileDrawer } from "./components/MobileDrawer";
import { useActiveSection } from "./hooks/useActiveSection";
import { useTheme } from "./design-system/theme";
import { ComponentDemos } from "./sections/ComponentDemos";
import { ARIAProperties } from "./sections/ARIAProperties";
import { ARIAGuide } from "./sections/ARIAGuide";
import { AccessibilityFeatures } from "./sections/AccessibilityFeatures";
import { WCAGLevels } from "./sections/WCAGLevels";
import { DesignTokens } from "./sections/DesignTokens";
import { ImageComparison } from "./sections/ImageComparison";

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

function App() {
  const { mode, toggleTheme } = useTheme();
  const { success, error, warning, info } = useToast();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCount((value) => value + 1);
      setIsLoading(false);
    }, 1000);
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "" };

    if (!formData.name) {
      newErrors.name = "お名前を入力してください";
    }

    if (!formData.email) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }

    if (!formData.password) {
      newErrors.password = "パスワードを入力してください";
    } else if (formData.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("フォーム送信成功！");
    }
  };

  const tocItems = [
    { id: "button-component", title: "Buttonコンポーネント" },
    { id: "input-component", title: "Inputコンポーネント" },
    { id: "select-component", title: "Selectコンポーネント" },
    { id: "dropdown-component", title: "Dropdownコンポーネント" },
    { id: "textarea-component", title: "TextAreaコンポーネント" },
    { id: "checkbox-component", title: "Checkboxコンポーネント" },
    { id: "radio-component", title: "Radioコンポーネント" },
    { id: "loading-component", title: "Loadingコンポーネント" },
    { id: "form-component", title: "Formコンポーネント" },
    { id: "accordion-component", title: "Accordionコンポーネント" },
    { id: "toast-component", title: "Toastコンポーネント" },
    { id: "modal-component", title: "Modalコンポーネント" },
    { id: "text-component", title: "Textコンポーネント" },
    { id: "breadcrumbs-component", title: "Breadcrumbsコンポーネント" },
    { id: "aria-properties", title: "WAI-ARIA主要プロパティ" },
    { id: "aria-guide", title: "ARIAラベルとrole属性" },
    { id: "accessibility-features", title: "アクセシビリティ機能" },
    { id: "wcag-levels", title: "WCAGレベルとコントラスト比" },
    { id: "design-tokens", title: "デザイントークンシステム" },
    { id: "image-comparison", title: "ボタン内の画像比較" },
  ];

  const activeId = useActiveSection(tocItems);
  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.history.pushState(null, "", `#${id}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      <HamburgerButton
        isOpen={isDrawerOpen}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={tocItems}
        activeId={activeId}
      />

      <header className={css({ mb: 8 })}>
        <div className={css({ mb: 4 })}>
          <Breadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/design-system">
                  デザインシステム
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrent>コンポーネント一覧</BreadcrumbItem>
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
      </header>

      <div
        className={css({
          display: "flex",
          flexDirection: { base: "column", lg: "row" },
          gap: { base: 4, lg: 8 },
          alignItems: { base: "stretch", md: "flex-start" },
          mt: 8,
        })}
      >
        <aside
          className={css({
            width: "280px",
            flexShrink: 0,
            position: { base: "static", lg: "sticky" },
            top: { base: "auto", lg: 4 },
            display: { base: "none", lg: "block" },
          })}
        >
          <TableOfContents
            items={tocItems}
            activeId={activeId}
            onNavigate={handleNavigate}
          />
        </aside>

        <main className={css({ flex: 1, minW: 0 })}>
          <ComponentDemos
            count={count}
            isLoading={isLoading}
            handleClick={handleClick}
            formData={formData}
            errors={errors}
            setFormData={setFormData}
            setErrors={setErrors}
            handleSubmit={handleSubmit}
            success={success}
            error={error}
            warning={warning}
            info={info}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />

          <ARIAProperties />

          <ARIAGuide />

          <AccessibilityFeatures />

          <WCAGLevels />

          <DesignTokens />

          <ImageComparison />
        </main>
      </div>
    </div>
  );
}

export default App;
