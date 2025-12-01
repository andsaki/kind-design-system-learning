import { css, cx } from "@/styled-system/css";
import { button as buttonRecipe } from "@/styled-system/recipes";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "../design-system/components";
import { icons } from "../design-system/tokens/icons";

export function ImageComparison() {
  const recommendationRows = [
    {
      condition: "外部SVGファイル",
      recommendation: '<img alt="...">',
      reason: "シンプルで標準的",
    },
    {
      condition: "インラインSVG",
      recommendation: '<svg role="img" aria-label="...">',
      reason: "CSSでの細かいスタイル制御が可能",
    },
    {
      condition: "アイコンライブラリ使用",
      recommendation: '<svg role="img" aria-label="...">',
      reason: "ライブラリが生成するSVGをそのまま使える",
    },
    {
      condition: "明示的にラベルを分離したい",
      recommendation: "aria-hidden + visually-hidden",
      reason: "コードの意図が最も明確",
    },
  ];

  const visibilityRows: Array<{
    method: string;
    visual: string;
    sr: string;
    visualTone: "primary" | "success" | "error";
    srTone: "primary" | "success" | "error";
  }> = [
    {
      method: 'aria-hidden="true"',
      visual: "✅ 表示される",
      sr: "❌ 読まれない",
      visualTone: "success",
      srTone: "error",
    },
    {
      method: "display: none",
      visual: "❌ 非表示",
      sr: "❌ 読まれない",
      visualTone: "error",
      srTone: "error",
    },
    {
      method: "visually-hidden",
      visual: "❌ 非表示",
      sr: "✅ 読まれる",
      visualTone: "error",
      srTone: "success",
    },
  ];

  const inlineCodeClass = css({
    backgroundColor: "bg.primary",
    px: 2,
    py: 1,
    borderRadius: "sm",
    fontSize: "sm",
  });

  const toneClass = {
    primary: css({ color: "contents.primary" }),
    success: css({ color: "contents.success" }),
    error: css({ color: "contents.error" }),
  };

  const primaryButtonClass = buttonRecipe({ variant: "primary", size: "sm" });
  const buttonContentClass = css({
    display: "inline-flex",
    alignItems: "center",
    gap: 2,
    paddingLeft: 3,
    paddingRight: 3,
  });
  const relativeButtonClass = css({ position: "relative" });
  const visuallyHiddenClass = css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(100%)",
    whiteSpace: "nowrap",
    border: 0,
  });
  const plusIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m-7-7h14"/></svg>`;
  const plusIconDataUri = `data:image/svg+xml,${encodeURIComponent(plusIconSvg)}`;

  return (
    <section
      id="image-comparison"
      className={css({
        marginBottom: 12,
        padding: 6,
        backgroundColor: "bg.primary",
        borderRadius: "lg",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.default",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      })}
    >
      <h2
        className={css({
          marginTop: 0,
          color: "contents.primary",
          fontSize: "2xl",
          fontWeight: "bold",
          borderBottomWidth: "thick",
          borderBottomStyle: "solid",
          borderBottomColor: "border.default",
          paddingBottom: 2,
          marginBottom: 4,
          display: "flex",
          alignItems: "center",
          gap: 2,
        })}
      >
        <icons.philosophy.inclusive
          size={28}
          color="currentColor"
          strokeWidth={2}
        />
        ボタン内の画像比較: img vs svg
      </h2>
      <p
        className={css({
          lineHeight: "normal",
          color: "contents.primary",
        })}
      >
        <code>type="button"</code>のとき、
        <code>&lt;img&gt;</code>と<code>&lt;svg&gt;</code>
        でどう違うか見てみましょう。
      </p>

      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          A. <code>&lt;img&gt;</code>を使う場合
        </h3>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          <h4
            className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            コード例
          </h4>
          <pre
            className={css({
              padding: 3,
              backgroundColor: "bg.tertiary",
              borderRadius: "sm",
              overflow: "auto",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            <code>
              {`<button type="button">
  <img src="/icons/add.svg" alt="追加" />
</button>`}
            </code>
          </pre>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            スクリーンリーダーでの読み上げ
          </h4>
          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "sm",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.success",
            })}
          >
            <strong className={css({ color: "contents.success" })}>
              "追加 ボタン"
            </strong>
          </div>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            特徴
          </h4>
          <ul
            className={css({
              marginY: 2,
              paddingLeft: 6,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <li>
              <code>alt</code>
              属性でスクリーンリーダーに伝わる
            </li>
            <li>
              <code>&lt;img&gt;</code>
              は自動的に意味のある画像として認識される
            </li>
          </ul>

          <div
            className={css({
              marginTop: 4,
              padding: 3,
              display: "flex",
              gap: 2,
              alignItems: "center",
            })}
          >
            <button
              type="button"
              className={cx(primaryButtonClass, buttonContentClass)}
            >
              <img
                src={plusIconDataUri}
                alt="追加"
                width={20}
                height={20}
                className={css({ display: "block" })}
              />
            </button>
            <span className={css({ color: "contents.secondary", fontSize: "sm" })}>
              ← 実際の例（SVGアイコンを使用）
            </span>
          </div>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          B. <code>&lt;svg&gt;</code>を使う場合
        </h3>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          <h4
            className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            コード例
          </h4>
          <pre
            className={css({
              padding: 3,
              backgroundColor: "bg.tertiary",
              borderRadius: "sm",
              overflow: "auto",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            <code>
              {`<button type="button">
  <svg role="img" aria-label="追加">
    <path d="M12 5v14m-7-7h14" />
  </svg>
</button>`}
            </code>
          </pre>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            スクリーンリーダーでの読み上げ
          </h4>
          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "sm",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.success",
            })}
          >
            <strong className={css({ color: "contents.success" })}>
              "追加 ボタン"
            </strong>
          </div>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            特徴
          </h4>
          <ul
            className={css({
              marginY: 2,
              paddingLeft: 6,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <li>
              <code>role="img"</code>
              でスクリーンリーダーに「これは画像だ」と伝える
            </li>
            <li>
              <code>aria-label</code>で画像の説明を提供
            </li>
          </ul>

          <div
            className={css({
              marginTop: 4,
              padding: 3,
              display: "flex",
              gap: 2,
              alignItems: "center",
            })}
          >
            <button
              type="button"
              className={cx(primaryButtonClass, buttonContentClass)}
            >
              <svg
                role="img"
                aria-label="追加"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14m-7-7h14" />
              </svg>
            </button>
            <span className={css({ color: "contents.secondary", fontSize: "sm" })}>
              ← 実際の例（SVGインライン）
            </span>
          </div>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          C. <code>aria-hidden="true"</code> + visually-hidden を使う場合
        </h3>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          <h4
            className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            コード例
          </h4>
          <pre
            className={css({
              padding: 3,
              backgroundColor: "bg.tertiary",
              borderRadius: "sm",
              overflow: "auto",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            <code>
              {`<button type="button">
  <svg aria-hidden="true">
    <path d="M12 5v14m-7-7h14" />
  </svg>
  <span class="visually-hidden">追加</span>
</button>`}
            </code>
          </pre>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            スクリーンリーダーでの読み上げ
          </h4>
          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "sm",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.success",
            })}
          >
            <strong className={css({ color: "contents.success" })}>
              "追加 ボタン"
            </strong>
          </div>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            特徴
          </h4>
          <ul
            className={css({
              marginY: 2,
              paddingLeft: 6,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <li>
              <code>aria-hidden="true"</code>
              でSVGをスクリーンリーダーから隠す
            </li>
            <li>
              <code>visually-hidden</code>
              クラスで視覚的には非表示、スクリーンリーダーには表示
            </li>
            <li>
              <strong>最も明示的でわかりやすい方法</strong>
            </li>
          </ul>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            visually-hidden クラスの実装
          </h4>

          <div
            className={css({
              marginTop: 3,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
            })}
          >
            <strong className={css({ color: "contents.primary" })}>
              方法1: 従来の方法（互換性重視）
            </strong>
            <pre
              className={css({
                marginTop: 2,
                padding: 3,
                backgroundColor: "bg.tertiary",
                borderRadius: "sm",
                overflow: "auto",
                fontSize: "sm",
                color: "contents.primary",
              })}
            >
              <code>
                {`.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}`}
              </code>
            </pre>
          </div>

          <div
            className={css({
              marginTop: 3,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.success",
            })}
          >
            <strong className={css({ color: "contents.primary" })}>
              方法2: モダンな方法（推奨）
            </strong>
            <pre
              className={css({
                marginTop: 2,
                padding: 3,
                backgroundColor: "bg.tertiary",
                borderRadius: "sm",
                overflow: "auto",
                fontSize: "sm",
                color: "contents.primary",
              })}
            >
              <code>
                {`.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(100%);
  white-space: nowrap;
  border-width: 0;
}`}
              </code>
            </pre>
            <div
              className={css({
                marginTop: 3,
                fontSize: "sm",
                color: "contents.secondary",
                lineHeight: "relaxed",
              })}
            >
              <strong className={css({ color: "contents.primary" })}>
                <code>clip-path: inset(100%)</code> とは？
              </strong>
              <ul
                className={css({
                  marginTop: 2,
                  marginBottom: 0,
                  paddingLeft: 6,
                })}
              >
                <li>
                  要素を完全にクリッピングして視覚的に非表示にする
                </li>
                <li>
                  <code>clip: rect(0, 0, 0, 0)</code>の現代版（非推奨の代替）
                </li>
                <li>
                  <code>inset(100%)</code> = 上下左右すべて100%内側にクリップ = 何も表示されない
                </li>
                <li>
                  スクリーンリーダーには読み上げられる
                </li>
              </ul>
            </div>
          </div>

          <div
            className={css({
              marginTop: 4,
              padding: 3,
              display: "flex",
              gap: 2,
              alignItems: "center",
            })}
          >
            <button
              type="button"
              className={cx(primaryButtonClass, buttonContentClass, relativeButtonClass)}
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14m-7-7h14" />
              </svg>
              <span className={visuallyHiddenClass}>追加</span>
            </button>
            <span className={css({ color: "contents.secondary", fontSize: "sm" })}>
              ← 実際の例（visually-hidden使用）
            </span>
          </div>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <span aria-hidden="true">✅</span>
          どちらを選ぶべきか？
        </h3>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          <Table
            caption="img と svg の選び方"
            variant="striped"
            wcagLevel="AA"
            responsiveLabel="imgとsvgの比較表"
          >
            <TableHeader>
              <TableRow>
                <TableHeaderCell>条件</TableHeaderCell>
                <TableHeaderCell>推奨</TableHeaderCell>
                <TableHeaderCell>理由</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recommendationRows.map((row) => (
                <TableRow key={row.condition}>
                  <TableCell>{row.condition}</TableCell>
                  <TableCell>
                    <code className={inlineCodeClass}>{row.recommendation}</code>
                  </TableCell>
                  <TableCell className={css({ color: "contents.secondary" })}>
                    {row.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <span aria-hidden="true">🔍</span>
          <code>aria-hidden</code>とは？
        </h3>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          <p
            className={css({
              marginTop: 0,
              marginBottom: 3,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <code>aria-hidden</code>
            は、要素をスクリーンリーダーから「完全に隠す」属性です。
          </p>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            動作の仕組み
          </h4>

          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: 3,
              marginTop: 3,
            })}
          >
            <div
              className={css({
                padding: 3,
                backgroundColor: "bg.primary",
                borderRadius: "base",
                borderWidth: "thin",
                borderStyle: "solid",
                borderColor: "border.default",
              })}
            >
              <strong className={css({ color: "contents.primary" })}>
                <code>aria-hidden="true"</code>
              </strong>
              <p
                className={css({
                  marginTop: 2,
                  marginBottom: 0,
                  fontSize: "sm",
                  color: "contents.secondary",
                  lineHeight: "relaxed",
                })}
              >
                スクリーンリーダーは、この要素とその子要素を
                <strong>完全に無視</strong>します。
                <br />
                視覚的には表示されますが、読み上げられません。
              </p>
            </div>

            <div
              className={css({
                padding: 3,
                backgroundColor: "bg.primary",
                borderRadius: "base",
                borderWidth: "thin",
                borderStyle: "solid",
                borderColor: "border.default",
              })}
            >
              <strong className={css({ color: "contents.primary" })}>
                <code>aria-hidden="false"</code> または 省略
              </strong>
              <p
                className={css({
                  marginTop: 2,
                  marginBottom: 0,
                  fontSize: "sm",
                  color: "contents.secondary",
                  lineHeight: "relaxed",
                })}
              >
                通常通り、スクリーンリーダーに読み上げられます。
              </p>
            </div>
          </div>

          <h4
            className={css({
              marginTop: 6,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            使用例
          </h4>

          <div
            className={css({
              marginTop: 3,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.success",
            })}
          >
            <strong className={css({ color: "contents.success" })}>
              ✅ 良い使い方: 装飾的なアイコンを隠す
            </strong>
            <pre
              className={css({
                marginTop: 2,
                padding: 3,
                backgroundColor: "bg.tertiary",
                borderRadius: "sm",
                overflow: "auto",
                fontSize: "sm",
                color: "contents.primary",
              })}
            >
              <code>
                {`<button>
  <svg aria-hidden="true"><!-- 装飾アイコン --></svg>
  保存
</button>
<!-- 読み上げ: "保存 ボタン" -->`}
              </code>
            </pre>
            <p
              className={css({
                marginTop: 2,
                marginBottom: 0,
                fontSize: "sm",
                color: "contents.secondary",
                lineHeight: "relaxed",
              })}
            >
              ボタンに既にテキストラベルがあるので、アイコンは読み上げ不要
            </p>
          </div>

          <div
            className={css({
              marginTop: 3,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.error",
            })}
          >
            <strong className={css({ color: "contents.error" })}>
              ❌ 悪い使い方: 重要な情報を隠す
            </strong>
            <pre
              className={css({
                marginTop: 2,
                padding: 3,
                backgroundColor: "bg.tertiary",
                borderRadius: "sm",
                overflow: "auto",
                fontSize: "sm",
                color: "contents.primary",
              })}
            >
              <code>
                {`<button aria-hidden="true">
  <svg><!-- アイコンのみ --></svg>
</button>
<!-- 読み上げ: 何も読まれない！ -->`}
              </code>
            </pre>
            <p
              className={css({
                marginTop: 2,
                marginBottom: 0,
                fontSize: "sm",
                color: "contents.secondary",
                lineHeight: "relaxed",
              })}
            >
              ボタン全体を隠すと、スクリーンリーダーユーザーが操作できなくなる
            </p>
          </div>

          <h4
            className={css({
              marginTop: 6,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            視覚的な隠し方との違い
          </h4>

          <div
            className={css({
              marginTop: 3,
            })}
          >
            <Table
              caption="aria-hidden と視覚的な非表示の違い"
              variant="striped"
              size="sm"
              wcagLevel="AA"
              responsiveLabel="aria-hiddenと視覚表示の比較表"
            >
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>方法</TableHeaderCell>
                  <TableHeaderCell>視覚的に表示</TableHeaderCell>
                  <TableHeaderCell>スクリーンリーダー</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibilityRows.map((row) => (
                  <TableRow key={row.method}>
                    <TableCell>
                      <code className={inlineCodeClass}>{row.method}</code>
                    </TableCell>
                    <TableCell className={toneClass[row.visualTone]}>
                      {row.visual}
                    </TableCell>
                    <TableCell className={toneClass[row.srTone]}>
                      {row.sr}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div
        className={css({
          marginTop: 8,
          padding: 4,
          backgroundColor: "bg.secondary",
          borderRadius: "base",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "border.warning",
        })}
      >
        <h4
          className={css({
            marginTop: 0,
            marginBottom: 2,
            color: "contents.primary",
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <span aria-hidden="true">💡</span>
          重要なポイント
        </h4>
        <ul
          className={css({
            marginY: 2,
            paddingLeft: 6,
            lineHeight: "relaxed",
            color: "contents.primary",
          })}
        >
          <li>
            <strong>ボタン内のアイコンには必ずラベルを付ける</strong>
            <br />
            <code>&lt;img&gt;</code>なら<code>alt</code>、
            <code>&lt;svg&gt;</code>なら<code>aria-label</code>
          </li>
          <li>
            <strong>装飾目的のアイコンには<code>aria-hidden="true"</code></strong>
            <br />
            ボタンに既にテキストラベルがある場合、アイコンは装飾として扱う
          </li>
          <li>
            <strong>
              どちらの方法でも、スクリーンリーダーでの読み上げ結果は同じ
            </strong>
            <br />
            大事なのは、適切なラベルを提供すること
          </li>
        </ul>
      </div>
    </section>
  );
}
