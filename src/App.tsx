import { useState, useEffect } from "react";
import { useToast, Breadcrumbs, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, Button } from "./design-system/components";
import { spacing, typography, radii, icons, borders } from "./design-system/tokens";
import { primitive } from "./design-system/tokens/colors";
import { breakpointValues } from "./design-system/tokens/breakpoints";
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
import "./App.css";

function App() {
  const { mode, toggleTheme, colors: themeColors } = useTheme();
  const { success, error, warning, info } = useToast();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpointValues.md);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpointValues.md);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // URLハッシュからセクションにスクロール
  useEffect(() => {
    const hash = window.location.hash.slice(1); // "#" を除去
    if (hash) {
      // DOMが完全にレンダリングされるまで少し待つ
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  // Input用のstate
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
      setCount((count) => count + 1);
      setIsLoading(false);
    }, 1000);
  };

  // Input用のバリデーション
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
  ];

  const activeId = useActiveSection(tocItems);

  return (
    <div style={{
      backgroundColor: themeColors.background.default,
      color: themeColors.text.primary,
      minHeight: '100vh',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      padding: isMobile ? spacing.scale[3] : spacing.scale[8],
      maxWidth: "1400px",
      margin: "0 auto"
    }}>
      {isMobile && (
        <>
          <HamburgerButton isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
          <MobileDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            items={tocItems}
            activeId={activeId}
          />
        </>
      )}

      <header style={{ marginBottom: spacing.scale[8] }}>
        <Breadcrumbs style={{ marginBottom: spacing.scale[4] }}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/design-system">デザインシステム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent>コンポーネント一覧</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumbs>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.scale[4], flexWrap: 'wrap', gap: spacing.scale[3] }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{
              marginBottom: spacing.scale[2],
              fontSize: isMobile ? "1.75rem" : "2.5rem",
              color: themeColors.text.primary,
              fontWeight: typography.fontWeight.bold,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.scale[2]
            }}>
              <icons.philosophy.kind size={isMobile ? 28 : 40} color={primitive.pink?.[400] || primitive.blue[400]} strokeWidth={1.5} aria-hidden="true" />
              優しい体験を学ぶデザインシステム
            </h1>
            <p style={{ color: themeColors.text.secondary, fontSize: typography.fontSize.lg, lineHeight: typography.lineHeight.normal }}>
              すべてのユーザーに寄り添う、アクセシブルで心地よいUIコンポーネント集
            </p>
          </div>
          <div style={{ display: 'flex', gap: spacing.scale[2], alignItems: 'flex-start' }}>
            <Button
              onClick={() => window.open('/kind-design-system-learning/storybook/', '_blank')}
              variant="secondary"
              size="sm"
              aria-label="Storybookを開く"
            >
              <icons.component.button size={20} strokeWidth={2} aria-hidden="true" />
              <span style={{ marginLeft: spacing.scale[1] }}>Storybook</span>
            </Button>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              aria-label={mode === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
            >
              {mode === 'light' ? (
                <icons.concept.theme.dark size={20} strokeWidth={2} aria-hidden="true" />
              ) : (
                <icons.concept.theme.light size={20} strokeWidth={2} aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        <div style={{
          padding: spacing.scale[6],
          backgroundColor: primitive.blue[50],
          borderRadius: radii.borderRadius.xl,
          border: `${borders.width.base} solid ${primitive.blue[200]}`,
        }}>
          <h2 style={{
            marginTop: 0,
            marginBottom: spacing.scale[3],
            color: primitive.blue[900],
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.scale[2]
          }}>
            <icons.philosophy.overview size={24} color={primitive.blue[600]} strokeWidth={2} aria-hidden="true" />
            デザイン哲学：優しさの3原則
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: spacing.scale[4],
            marginTop: spacing.scale[4],
          }}>
            <div style={{
              padding: spacing.scale[4],
              backgroundColor: primitive.white,
              borderRadius: radii.borderRadius.lg,
              border: `${borders.width.thin} solid ${primitive.blue[200]}`,
            }}>
              <icons.philosophy.inclusive size={32} color={primitive.blue[500]} strokeWidth={1.5} style={{ marginBottom: spacing.scale[2] }} aria-hidden="true" />
              <h3 style={{
                marginTop: 0,
                marginBottom: spacing.scale[2],
                color: primitive.blue[900],
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
              }}>
                誰一人として置き去りにしない
              </h3>
              <p style={{
                margin: 0,
                color: primitive.gray[700],
                fontSize: typography.fontSize.sm,
                lineHeight: typography.lineHeight.relaxed,
              }}>
                視覚・聴覚・運動機能に関わらず、すべての人が等しく情報にアクセスできる設計
              </p>
            </div>

            <div style={{
              padding: spacing.scale[4],
              backgroundColor: primitive.white,
              borderRadius: radii.borderRadius.lg,
              border: `${borders.width.thin} solid ${primitive.blue[200]}`,
            }}>
              <icons.philosophy.pleasant size={32} color={primitive.blue[500]} strokeWidth={1.5} style={{ marginBottom: spacing.scale[2] }} aria-hidden="true" />
              <h3 style={{
                marginTop: 0,
                marginBottom: spacing.scale[2],
                color: primitive.blue[900],
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
              }}>
                心地よさを感じる体験
              </h3>
              <p style={{
                margin: 0,
                color: primitive.gray[700],
                fontSize: typography.fontSize.sm,
                lineHeight: typography.lineHeight.relaxed,
              }}>
                柔らかな色彩、滑らかな動き、適切な余白で、ストレスのない使い心地を実現
              </p>
            </div>

            <div style={{
              padding: spacing.scale[4],
              backgroundColor: primitive.white,
              borderRadius: radii.borderRadius.lg,
              border: `${borders.width.thin} solid ${primitive.blue[200]}`,
            }}>
              <icons.philosophy.scalable size={32} color={primitive.blue[500]} strokeWidth={1.5} style={{ marginBottom: spacing.scale[2] }} aria-hidden="true" />
              <h3 style={{
                marginTop: 0,
                marginBottom: spacing.scale[2],
                color: primitive.blue[900],
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
              }}>
                成長し続ける仕組み
              </h3>
              <p style={{
                margin: 0,
                color: primitive.gray[700],
                fontSize: typography.fontSize.sm,
                lineHeight: typography.lineHeight.relaxed,
              }}>
                スケーラブルなトークンシステムで、プロジェクトとともに進化するデザイン
              </p>
            </div>
          </div>

          <div style={{
            marginTop: spacing.scale[4],
            padding: spacing.scale[3],
            backgroundColor: primitive.white,
            borderRadius: radii.borderRadius.md,
            fontSize: typography.fontSize.sm,
            color: primitive.blue[800],
          }}>
            <strong>📚 詳しくは：</strong>
            {' '}
            <a
              href="https://github.com/andsaki/accessibility-learning/blob/master/DESIGN_PHILOSOPHY.md"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: primitive.blue[700], textDecoration: 'underline' }}
            >
              DESIGN_PHILOSOPHY.md
            </a>
            {' '}をご覧ください
          </div>
        </div>
      </header>

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? spacing.scale[4] : spacing.scale[8],
        marginTop: spacing.scale[8]
      }}>
        {!isMobile && (
          <aside style={{
            width: "280px",
            flexShrink: 0
          }}>
            <TableOfContents items={tocItems} />
          </aside>
        )}

        <main style={{ flex: 1, minWidth: 0 }}>
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
        </main>
      </div>
    </div>
  );
}

export default App;
