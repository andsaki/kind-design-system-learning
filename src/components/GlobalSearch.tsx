import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { css } from "@/styled-system/css";
import { Input } from "../design-system/components";
import { icons } from "../design-system/tokens/icons";

// 検索可能なページの定義
const searchablePages = [
  {
    title: "ホーム",
    path: "/",
    keywords: "home ホーム トップ デザインシステム アクセシビリティ"
  },
  {
    title: "コンポーネント",
    path: "/components",
    keywords: "components コンポーネント button input modal table form"
  },
  {
    title: "主要プロパティ",
    path: "/aria/properties",
    keywords: "aria properties プロパティ 属性"
  },
  {
    title: "ラベルとrole属性",
    path: "/aria/guide",
    keywords: "aria label role ラベル 属性 aria-label aria-labelledby aria-describedby aria-current aria-expanded aria-hidden aria-live aria-atomic polite assertive tooltip dialog navigation button alert modal スクリーンリーダー"
  },
  {
    title: "role=\"presentation\"",
    path: "/aria/role-presentation",
    keywords: "role presentation プレゼンテーション 装飾"
  },
  {
    title: "フォームラベリング",
    path: "/aria/form-labeling",
    keywords: "form labeling フォーム ラベル input label fieldset legend"
  },
  {
    title: "機能一覧",
    path: "/accessibility/features",
    keywords: "accessibility features アクセシビリティ 機能 キーボード focus フォーカス screen reader"
  },
  {
    title: "WCAGレベル",
    path: "/accessibility/wcag-levels",
    keywords: "wcag level レベル A AA AAA ガイドライン"
  },
  {
    title: "デザイントークン",
    path: "/design/tokens",
    keywords: "design token デザイン トークン color 色 spacing font"
  },
  {
    title: "画像比較",
    path: "/design/image-comparison",
    keywords: "image comparison 画像 比較 alt テキスト"
  }
];

interface GlobalSearchProps {
  onClose?: () => void;
}

export const GlobalSearch = ({ onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(searchablePages);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!query.trim()) {
      setResults(searchablePages);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchablePages.filter((page) =>
      page.title.toLowerCase().includes(lowerQuery) ||
      page.keywords.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setQuery("");
    onClose?.();
  };

  const handleClear = () => {
    setQuery("");
    setResults(searchablePages);
  };

  return (
    <div className={css({ width: "100%", maxWidth: "600px" })}>
      <Input
        label="サイト内を検索"
        placeholder="例: aria-label, modal, button..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        clearable
        onClear={handleClear}
        aria-describedby="search-help"
      />

      {query && (
        <p
          id="search-help"
          className={css({
            marginTop: 2,
            fontSize: "sm",
            color: "contents.tertiary"
          })}
        >
          {results.length}件の結果
        </p>
      )}

      {query && results.length > 0 && (
        <div
          className={css({
            marginTop: 4,
            padding: 3,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            maxHeight: "400px",
            overflowY: "auto"
          })}
          role="list"
          aria-label="検索結果"
        >
          {results.map((page) => (
            <button
              key={page.path}
              onClick={() => handleNavigate(page.path)}
              className={css({
                width: "100%",
                padding: 3,
                textAlign: "left",
                backgroundColor: location.pathname === page.path ? "bg.tertiary" : "transparent",
                borderRadius: "sm",
                cursor: "pointer",
                transition: "background-color 0.2s",
                borderWidth: "0",
                color: "contents.primary",
                _hover: {
                  backgroundColor: "bg.tertiary"
                },
                _focus: {
                  outline: "2px solid",
                  outlineColor: "border.focus",
                  outlineOffset: "2px"
                }
              })}
              role="listitem"
            >
              <div className={css({ display: "flex", alignItems: "center", gap: 2 })}>
                <icons.component.button
                  size={16}
                  aria-hidden="true"
                  className={css({ flexShrink: 0 })}
                />
                <span className={css({ fontWeight: "semibold" })}>
                  {page.title}
                </span>
              </div>
              <div
                className={css({
                  fontSize: "xs",
                  color: "contents.tertiary",
                  marginTop: 1
                })}
              >
                {page.path}
              </div>
            </button>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            textAlign: "center",
            color: "contents.secondary",
            backgroundColor: "bg.secondary",
            borderRadius: "md"
          })}
          role="status"
        >
          「{query}」に一致する結果が見つかりませんでした
        </div>
      )}
    </div>
  );
};
