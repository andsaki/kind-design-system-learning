import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ARIAPropertiesPage } from "./pages/aria/ARIAPropertiesPage";
import { ARIAGuidePage } from "./pages/aria/ARIAGuidePage";
import { RolePresentationPage } from "./pages/aria/RolePresentationPage";
import { AccessibilityFeaturesPage } from "./pages/accessibility/AccessibilityFeaturesPage";
import { WCAGLevelsPage } from "./pages/accessibility/WCAGLevelsPage";
import { DesignTokensPage } from "./pages/design/DesignTokensPage";
import { ImageComparisonPage } from "./pages/design/ImageComparisonPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="aria">
          <Route path="properties" element={<ARIAPropertiesPage />} />
          <Route path="guide" element={<ARIAGuidePage />} />
          <Route path="role-presentation" element={<RolePresentationPage />} />
        </Route>
        <Route path="accessibility">
          <Route path="features" element={<AccessibilityFeaturesPage />} />
          <Route path="wcag-levels" element={<WCAGLevelsPage />} />
        </Route>
        <Route path="design">
          <Route path="tokens" element={<DesignTokensPage />} />
          <Route path="image-comparison" element={<ImageComparisonPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
