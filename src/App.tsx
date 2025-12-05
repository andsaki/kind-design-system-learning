import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ARIAPropertiesPage } from "./pages/aria/ARIAPropertiesPage";
import { ARIAGuidePage } from "./pages/aria/ARIAGuidePage";
import { APGGuidePage } from "./pages/aria/APGGuidePage";
import { ARIAStatesPage } from "./pages/aria/ARIAStatesPage";
import { InputTypesPage } from "./pages/aria/InputTypesPage";
import { RolePresentationPage } from "./pages/aria/RolePresentationPage";
import { FormLabelingPage } from "./pages/aria/FormLabelingPage";
import { TabIndexDemoPage } from "./pages/aria/TabIndexDemoPage";
import { AccessibilityFeaturesPage } from "./pages/accessibility/AccessibilityFeaturesPage";
import { WCAGLevelsPage } from "./pages/accessibility/WCAGLevelsPage";
import { MotionAccessibilityPage } from "./pages/accessibility/MotionAccessibilityPage";
import { DesignTokensPage } from "./pages/design/DesignTokensPage";
import { ImageComparisonPage } from "./pages/design/ImageComparisonPage";
import { HueWheelPage } from "./pages/design/HueWheelPage";

// まとめ: モバイルナビでは HamburgerButton.controlsId と MobileDrawer.drawerId を共有し、
// aria-controls で制御対象を結びつけることで支援技術に開閉先を伝える。
// Storybook でも同パターンを解説しているため、実装時はこの接続を崩さないこと。
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="components" element={<ComponentsPage />} />
          <Route path="aria">
            <Route path="properties" element={<ARIAPropertiesPage />} />
            <Route path="guide" element={<ARIAGuidePage />} />
            <Route path="apg" element={<APGGuidePage />} />
            <Route path="states" element={<ARIAStatesPage />} />
            <Route path="input-types" element={<InputTypesPage />} />
            <Route path="role-presentation" element={<RolePresentationPage />} />
            <Route path="form-labeling" element={<FormLabelingPage />} />
            <Route path="tabindex" element={<TabIndexDemoPage />} />
          </Route>
        <Route path="accessibility">
          <Route path="features" element={<AccessibilityFeaturesPage />} />
          <Route path="wcag-levels" element={<WCAGLevelsPage />} />
          <Route path="motion" element={<MotionAccessibilityPage />} />
        </Route>
        <Route path="design">
          <Route path="tokens" element={<DesignTokensPage />} />
          <Route path="image-comparison" element={<ImageComparisonPage />} />
          <Route path="hue-wheel" element={<HueWheelPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
