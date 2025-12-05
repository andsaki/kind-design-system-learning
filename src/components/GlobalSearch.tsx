import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import { css } from "@/styled-system/css";
import { Input } from "../design-system/components";
import { icons } from "../design-system/tokens/icons";
import { searchIndex } from "../utils/searchIndex";

interface GlobalSearchProps {
  onClose?: () => void;
}

export const GlobalSearch = ({ onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(searchIndex);
  const navigate = useNavigate();
  const location = useLocation();

  // Fuse.js インスタンスをメモ化
  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 3 },      // タイトルに最も重み付け
          { name: "headings", weight: 2 },   // 見出しに次に重み付け
          { name: "content", weight: 1 }     // 本文は通常の重み
        ],
        threshold: 0.3,                      // 0.0 = 完全一致, 1.0 = すべてマッチ
        includeScore: true,
        minMatchCharLength: 2,               // 最低2文字でマッチ
        ignoreLocation: true,                // 位置を無視して全体から検索
      }),
    []
  );

  useEffect(() => {
    if (!query.trim()) {
      setResults(searchIndex);
      return;
    }

    // Fuse.js で検索
    const searchResults = fuse.search(query);
    setResults(searchResults.map((result) => result.item));
  }, [query, fuse]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setQuery("");
    onClose?.();
  };

  const handleClear = () => {
    setQuery("");
    setResults(searchIndex);
  };

  const searchStatusText = query
    ? results.length > 0
      ? `${results.length}件の結果`
      : "一致するページが見つかりません"
    : "キーワードを入力して検索を開始できます";

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

      <p
        id="search-help"
        className={css({
          marginTop: 2,
          fontSize: "sm",
          color: "contents.tertiary"
        })}
        aria-live="polite"
      >
        {searchStatusText}
      </p>

      {query && results.length > 0 && (
        <ul
          className={css({
            marginTop: 4,
            padding: 3,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            maxHeight: "400px",
            overflowY: "auto",
            listStyle: "none",
            m: 0
          })}
          aria-label="検索結果"
        >
          {results.map((page) => (
            <li key={page.path}>
              <button
                onClick={() => handleNavigate(page.path)}
                className={css({
                  width: "100%",
                  padding: 3,
                  textAlign: "left",
                  backgroundColor:
                    location.pathname === page.path ? "bg.tertiary" : "transparent",
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
            </li>
          ))}
        </ul>
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
