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

// 検索用メタデータ
export const searchMetadata = {
  title: "画像比較・フォーム検証・モーション",
  path: "/design/image-comparison",
  headings: [
    "ボタン内の画像比較: img vs svg",
    "画像の5つの分類とalt属性の書き方",
    "情報を提供する画像",
    "装飾画像",
    "機能を持つ画像",
    "文字画像",
    "複雑な画像（グラフや図表）",
    "alt属性を書くときの考え方",
    "装飾画像には alt=\"\"",
    "aria-hiddenとは",
    "フォームの検証: pattern属性",
    "モーションアニメーション: 必要性の検討と回避方法"
  ],
  keywords: [
    "画像", "img", "svg", "alt属性", "aria-label", "aria-hidden", "visually-hidden",
    "ボタン", "装飾画像", "情報を提供する画像", "機能を持つ画像", "文字画像", "複雑な画像",
    "グラフ", "図表", "aria-describedby", "適切なラベル", "ラベルを提供",
    "フォーム検証", "pattern属性", "正規表現", "バリデーション", "title", "aria-invalid",
    "郵便番号", "電話番号", "ユーザー名", "カタカナ", "inputmode",
    "モーションアニメーション", "prefers-reduced-motion", "前庭障害", "てんかん", "ADHD",
    "視差効果", "自動再生", "一時停止", "ユーザーコントロール", "アニメーションの必要性", "回避方法"
  ]
};

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
              aria-label="追加"
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
              aria-label="追加"
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
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <span aria-hidden="true">📚</span>
          画像の5つの分類とalt属性の書き方
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
              marginBottom: 4,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            W3Cのガイドラインでは、画像を以下の5つに分類しています。
            それぞれの目的に応じて、適切なalt属性の書き方が異なります。
          </p>

          <Table
            caption="画像の分類とalt属性の指針"
            variant="striped"
            highlightOnHover
            wcagLevel="AA"
          >
            <TableHeader>
              <TableRow>
                <TableHeaderCell>分類</TableHeaderCell>
                <TableHeaderCell>説明</TableHeaderCell>
                <TableHeaderCell>alt属性の書き方</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    1. 情報を提供する画像
                  </strong>
                </TableCell>
                <TableCell>
                  コンテンツの一部として情報を伝える画像
                  <br />
                  <span className={css({ fontSize: "sm", color: "contents.secondary" })}>
                    例: 写真、イラスト、アイコン
                  </span>
                </TableCell>
                <TableCell>
                  画像の内容を簡潔に説明
                  <br />
                  <code className={inlineCodeClass}>alt="桜の花びら"</code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    2. 装飾画像
                  </strong>
                </TableCell>
                <TableCell>
                  視覚的な装飾のみで情報を提供しない画像
                  <br />
                  <span className={css({ fontSize: "sm", color: "contents.secondary" })}>
                    例: 背景、区切り線、装飾パターン
                  </span>
                </TableCell>
                <TableCell>
                  空のalt属性
                  <br />
                  <code className={inlineCodeClass}>alt=""</code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    3. 機能を持つ画像
                  </strong>
                </TableCell>
                <TableCell>
                  ボタンやリンクとして機能する画像
                  <br />
                  <span className={css({ fontSize: "sm", color: "contents.secondary" })}>
                    例: アイコンボタン、ロゴリンク
                  </span>
                </TableCell>
                <TableCell>
                  機能・動作を説明
                  <br />
                  <code className={inlineCodeClass}>alt="検索"</code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    4. 文字画像
                  </strong>
                </TableCell>
                <TableCell>
                  テキストを画像化したもの
                  <br />
                  <span className={css({ fontSize: "sm", color: "contents.secondary" })}>
                    例: ロゴ、見出し画像
                  </span>
                </TableCell>
                <TableCell>
                  画像内のテキストをそのまま記述
                  <br />
                  <code className={inlineCodeClass}>alt="株式会社ABC"</code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    5. 複雑な画像
                  </strong>
                </TableCell>
                <TableCell>
                  詳細な情報を含む画像
                  <br />
                  <span className={css({ fontSize: "sm", color: "contents.secondary" })}>
                    例: グラフ、図表、地図
                  </span>
                </TableCell>
                <TableCell>
                  概要をaltに、詳細を別途提供
                  <br />
                  <code className={inlineCodeClass}>alt="売上推移"</code>
                  <br />
                  <code className={inlineCodeClass}>aria-describedby="..."</code>
                </TableCell>
              </TableRow>
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
          <span aria-hidden="true">1️⃣</span>
          情報を提供する画像
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
            コンテンツの一部として情報を伝える画像です。
            画像が見えないユーザーにも同じ情報が伝わるように、<strong>画像の内容を具体的に説明</strong>します。
          </p>

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
              ✅ 良い例
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
                {`<!-- 商品画像 -->
<img src="product.jpg" alt="ワイヤレスヘッドホン XM-100 ブラック" />

<!-- プロフィール写真 -->
<img src="avatar.jpg" alt="山田太郎のプロフィール写真" />

<!-- アイコン（意味を持つ） -->
<img src="alert.svg" alt="注意" />
重要なお知らせがあります`}
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
              borderColor: "border.error",
            })}
          >
            <strong className={css({ color: "contents.error" })}>
              ❌ 悪い例
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
                {`<!-- ファイル名をそのまま -->
<img src="product_001.jpg" alt="product_001.jpg" />

<!-- 一般的すぎる -->
<img src="avatar.jpg" alt="画像" />

<!-- 不要な接頭辞 -->
<img src="alert.svg" alt="アイコン：注意" />
<!-- スクリーンリーダーが「画像 アイコン：注意」と冗長に読む -->`}
              </code>
            </pre>
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
          <span aria-hidden="true">2️⃣</span>
          装飾画像
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
            視覚的な装飾のみで情報を提供しない画像です。
            <code>alt=""</code>（空のalt属性）を設定して、スクリーンリーダーが読み飛ばすようにします。
          </p>

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
              ✅ 良い例
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
                {`<!-- 装飾パターン -->
<img src="pattern.png" alt="" />

<!-- テキストラベルと一緒のアイコン -->
<button>
  <img src="save.svg" alt="" />
  保存
</button>

<!-- リストの装飾アイコン -->
<ul>
  <li>
    <img src="check.svg" alt="" />
    完了しました
  </li>
</ul>`}
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
              borderColor: "border.info",
            })}
          >
            <p
              className={css({
                marginTop: 0,
                marginBottom: 2,
                fontWeight: "bold",
                color: "contents.primary",
              })}
            >
              💡 判断基準
            </p>
            <p
              className={css({
                marginTop: 0,
                marginBottom: 0,
                fontSize: "sm",
                lineHeight: "relaxed",
                color: "contents.secondary",
              })}
            >
              「この画像が表示されなかったら、ページの内容は理解できなくなる？」
              <br />
              <strong>NO</strong> → 装飾画像。<code>alt=""</code>を使用
            </p>
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
          <span aria-hidden="true">3️⃣</span>
          機能を持つ画像
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
            ボタンやリンクとして機能する画像です。
            画像の見た目ではなく、<strong>クリックしたときの動作や行き先</strong>を説明します。
          </p>

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
              ✅ 良い例
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
                {`<!-- アイコンボタン（動作を説明） -->
<button>
  <img src="search.svg" alt="検索" />
</button>

<!-- ロゴリンク（行き先を説明） -->
<a href="/">
  <img src="logo.png" alt="ホームに戻る" />
</a>

<!-- 削除ボタン -->
<button>
  <img src="trash.svg" alt="削除" />
</button>`}
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
              borderColor: "border.error",
            })}
          >
            <strong className={css({ color: "contents.error" })}>
              ❌ 悪い例
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
                {`<!-- 見た目を説明（動作が不明） -->
<button>
  <img src="magnifier.svg" alt="虫眼鏡アイコン" />
</button>

<!-- 会社名のみ（行き先が不明） -->
<a href="/">
  <img src="logo.png" alt="株式会社ABC" />
</a>`}
              </code>
            </pre>
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
          <span aria-hidden="true">4️⃣</span>
          文字画像
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
            テキストを画像化したものです。
            <strong>画像内のテキストをそのまま</strong>alt属性に記述します。
          </p>

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
              ✅ 良い例
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
                {`<!-- 会社ロゴ -->
<img src="company-logo.png" alt="株式会社ABC" />

<!-- 見出し画像 -->
<img src="heading.png" alt="新商品のご案内" />

<!-- バナー -->
<img src="banner.png" alt="期間限定セール 最大50%OFF" />`}
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
              borderColor: "border.warning",
            })}
          >
            <p
              className={css({
                marginTop: 0,
                marginBottom: 2,
                fontWeight: "bold",
                color: "contents.primary",
              })}
            >
              ⚠️ 注意
            </p>
            <p
              className={css({
                marginTop: 0,
                marginBottom: 0,
                fontSize: "sm",
                lineHeight: "relaxed",
                color: "contents.secondary",
              })}
            >
              できるだけ<strong>画像ではなくHTMLテキストを使用</strong>することが推奨されます。
              テキストは拡大表示、カラー変更、翻訳などが可能だからです。
              <br />
              特別なフォントやデザインが必要な場合のみ、画像を使用してください。
            </p>
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
          <span aria-hidden="true">5️⃣</span>
          複雑な画像（グラフや図表）
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
            グラフ、図表、地図など、詳細な情報を含む画像です。
            <strong>alt属性には概要を記述</strong>し、<strong>詳細な説明は別途提供</strong>します。
          </p>

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
              ✅ 良い例: aria-describedbyを使用
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
                {`<img
  src="sales-chart.png"
  alt="2024年月別売上推移グラフ"
  aria-describedby="chart-description"
/>
<div id="chart-description">
  <p>2024年1月から12月までの月別売上推移を示す棒グラフです。</p>
  <ul>
    <li>1月: 100万円</li>
    <li>2月: 120万円</li>
    <li>3月: 150万円</li>
    <li>...</li>
    <li>12月: 300万円</li>
  </ul>
  <p>全体として右肩上がりの傾向が見られます。</p>
</div>`}
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
            <strong className={css({ color: "contents.success" })}>
              ✅ 良い例: longdescを使用（非推奨だが互換性のため）
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
                {`<img
  src="chart.png"
  alt="売上推移グラフ"
  longdesc="chart-details.html"
/>

<!-- または、詳細ページへのリンクを提供 -->
<img src="chart.png" alt="売上推移グラフ" />
<a href="chart-details.html">グラフの詳細説明</a>`}
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
              borderColor: "border.info",
            })}
          >
            <p
              className={css({
                marginTop: 0,
                marginBottom: 2,
                fontWeight: "bold",
                color: "contents.primary",
              })}
            >
              💡 ベストプラクティス
            </p>
            <ul
              className={css({
                marginY: 2,
                paddingLeft: 6,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              <li>alt属性には画像の種類と主題を簡潔に記述</li>
              <li>詳細な説明は<code>aria-describedby</code>で関連付ける</li>
              <li>数値データはテーブル形式でも提供する</li>
              <li>可能であれば、画像の代わりにHTMLとCSSで図表を作成</li>
            </ul>
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
          <span aria-hidden="true">📝</span>
          alt属性を書くときの考え方
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
            alt属性やaria-labelには、画像が伝える<strong>意味や目的</strong>を設定することが重要です。
            単にファイル名や「画像」といった説明ではなく、ユーザーが理解できる文言を使いましょう。
          </p>

          <div
            className={css({
              marginTop: 4,
              marginBottom: 4,
              padding: 4,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.info",
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
              <span aria-hidden="true">📞</span>
              考え方のヒント: 電話越しに伝えるイメージ
            </h4>
            <p
              className={css({
                marginTop: 0,
                marginBottom: 2,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              alt属性を書くときは、<strong>「電話越しの相手に、この画像の内容を説明する」</strong>
              と考えるとわかりやすくなります。
            </p>
            <div
              className={css({
                marginTop: 3,
                padding: 3,
                backgroundColor: "bg.secondary",
                borderRadius: "sm",
                fontSize: "sm",
                lineHeight: "relaxed",
                color: "contents.secondary",
              })}
            >
              <p className={css({ marginTop: 0, marginBottom: 2 })}>
                例えば、友人に電話で「このページにはこんな画像があるよ」と伝えるとき、
                あなたは何と言いますか？
              </p>
              <ul
                className={css({
                  marginY: 2,
                  paddingLeft: 6,
                  color: "contents.primary",
                })}
              >
                <li>
                  <span className={css({ color: "contents.error" })}>❌</span> 「icon_add.pngっていう画像があるよ」
                </li>
                <li>
                  <span className={css({ color: "contents.error" })}>❌</span> 「画像があるよ」
                </li>
                <li>
                  <span className={css({ color: "contents.success" })}>✅</span> 「タスクを追加するボタンがあるよ」
                </li>
              </ul>
              <p className={css({ marginBottom: 0 })}>
                スクリーンリーダーのユーザーも、まさに同じ情報が必要です。
                ファイル名ではなく、<strong>画像が伝えようとしている内容</strong>を説明しましょう。
              </p>
            </div>
          </div>

          <div
            className={css({
              marginTop: 4,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.error",
            })}
          >
            <strong className={css({ color: "contents.error" })}>
              ❌ 悪い例: 意味のない説明
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
                {`<!-- ファイル名をそのまま使用 -->
<img src="icon_add.png" alt="icon_add.png" />

<!-- 一般的すぎる説明 -->
<img src="profile.jpg" alt="画像" />
<img src="chart.png" alt="アイコン" />

<!-- 説明が不足 -->
<button>
  <img src="save.svg" alt="保存" />
  <!-- 何を保存するのか不明 -->
</button>`}
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
            <strong className={css({ color: "contents.success" })}>
              ✅ 良い例: 意味のある説明
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
                {`<!-- 画像の内容を具体的に説明 -->
<img src="profile.jpg" alt="山田太郎のプロフィール写真" />

<!-- グラフの内容を説明 -->
<img src="chart.png" alt="2024年の売上推移グラフ。1月から12月まで右肩上がり" />

<!-- ボタンの動作を明確に -->
<button>
  <img src="save.svg" alt="変更内容を保存" />
</button>

<!-- SVGでも同様 -->
<button>
  <svg role="img" aria-label="コメントを削除">
    <path d="..." />
  </svg>
</button>`}
              </code>
            </pre>
          </div>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            alt属性を書くときのポイント
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
              <strong>画像が伝える情報や目的を記述</strong>
              <br />
              ファイル名ではなく、画像の内容や意図を説明する
            </li>
            <li>
              <strong>文脈を考慮した説明</strong>
              <br />
              同じ画像でも、使われる場所によって適切な説明は変わる
            </li>
            <li>
              <strong>「画像」「アイコン」などの接頭辞は不要</strong>
              <br />
              スクリーンリーダーが自動的に「画像」と読み上げるため
            </li>
            <li>
              <strong>装飾目的の画像は空のaltを使用</strong>
              <br />
              <code>alt=""</code>または<code>aria-hidden="true"</code>
            </li>
            <li>
              <strong>複雑な画像は詳細な説明を別途提供</strong>
              <br />
              グラフやダイアグラムは<code>aria-describedby</code>で詳細説明を関連付ける
            </li>
          </ul>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            実例: 状況に応じた説明
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
                {`<!-- 検索結果の商品画像 -->
<img src="product.jpg" alt="ワイヤレスヘッドホン XM-100 ブラック" />

<!-- ニュース記事のサムネイル -->
<img src="news.jpg" alt="東京タワーをバックに満開の桜" />

<!-- エラーメッセージのアイコン -->
<div role="alert">
  <svg role="img" aria-label="エラー">
    <path d="..." />
  </svg>
  入力内容に誤りがあります
</div>

<!-- ステータスバッジ（装飾的なのでaria-hidden） -->
<div>
  <svg aria-hidden="true">
    <circle fill="green" />
  </svg>
  <span>オンライン</span>
  <!-- 「オンライン」というテキストが既にあるので、アイコンは装飾 -->
</div>`}
              </code>
            </pre>
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
          <span aria-hidden="true">🎨</span>
          装飾画像には <code>alt=""</code>
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
            情報を伝えない純粋な装飾目的の画像には、<code>alt=""</code>（空のalt属性）を設定します。
            これにより、スクリーンリーダーがその画像を読み飛ばし、ユーザー体験がスムーズになります。
          </p>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            装飾画像とは？
          </h4>
          <ul
            className={css({
              marginY: 2,
              paddingLeft: 6,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <li>ページの見た目を良くするための背景画像やパターン</li>
            <li>テキストラベルと一緒に使われる補助的なアイコン</li>
            <li>区切り線や装飾的なグラフィック</li>
            <li>周囲のテキストで既に説明されている内容の画像</li>
          </ul>

          <div
            className={css({
              marginTop: 4,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.success",
            })}
          >
            <strong className={css({ color: "contents.success" })}>
              ✅ 正しい装飾画像の扱い
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
                {`<!-- 空のalt属性 -->
<img src="decorative-border.png" alt="" />

<!-- テキストラベルがあるボタン -->
<button>
  <svg aria-hidden="true">
    <path d="..." />
  </svg>
  保存
</button>
<!-- 読み上げ: "保存 ボタン" -->

<!-- 背景装飾 -->
<div style="background-image: url('pattern.png')">
  <!-- CSSの背景画像は自動的にスクリーンリーダーから隠れる -->
</div>

<!-- リストアイコン（既にテキストで説明済み） -->
<ul>
  <li>
    <img src="checkmark.svg" alt="" />
    タスクが完了しました
  </li>
</ul>
<!-- 読み上げ: "タスクが完了しました" -->`}
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
              borderColor: "border.error",
            })}
          >
            <strong className={css({ color: "contents.error" })}>
              ❌ よくある間違い
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
                {`<!-- alt属性を省略 -->
<img src="decorative.png" />
<!-- スクリーンリーダーがファイル名を読み上げてしまう -->

<!-- 不要な説明 -->
<button>
  <img src="save.svg" alt="保存アイコン" />
  保存
</button>
<!-- 読み上げ: "保存アイコン 保存 ボタン" →冗長 -->

<!-- "装飾"という説明 -->
<img src="border.png" alt="装飾" />
<!-- 読み上げ: "装飾 画像" →不要な情報 -->`}
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
              装飾画像には<code>alt=""</code>を設定することで、スクリーンリーダーが完全に無視します。
              <code>alt="装飾"</code>のように説明を入れると、かえってノイズになります。
            </p>
          </div>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            判断のポイント: 装飾か意味のある画像か？
          </h4>
          <div
            className={css({
              marginTop: 3,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.info",
            })}
          >
            <p
              className={css({
                marginTop: 0,
                marginBottom: 2,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              迷ったときは、次の質問を自分に問いかけてみましょう：
            </p>
            <div
              className={css({
                padding: 3,
                backgroundColor: "bg.secondary",
                borderRadius: "sm",
                fontSize: "sm",
                lineHeight: "relaxed",
              })}
            >
              <p
                className={css({
                  marginTop: 0,
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: "contents.primary",
                })}
              >
                「この画像が表示されなかったら、ページの内容は理解できなくなる？」
              </p>
              <ul
                className={css({
                  marginY: 2,
                  paddingLeft: 6,
                  color: "contents.primary",
                })}
              >
                <li>
                  <strong>YES</strong> → 意味のある画像。具体的なalt属性が必要
                </li>
                <li>
                  <strong>NO</strong> → 装飾画像。<code>alt=""</code>または<code>aria-hidden="true"</code>
                </li>
              </ul>
            </div>
          </div>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            実例で比較
          </h4>
          <div
            className={css({
              display: "grid",
              gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
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
                意味のある画像
              </strong>
              <pre
                className={css({
                  marginTop: 2,
                  padding: 2,
                  backgroundColor: "bg.tertiary",
                  borderRadius: "sm",
                  overflow: "auto",
                  fontSize: "xs",
                  color: "contents.primary",
                })}
              >
                <code>
                  {`<!-- 商品画像 -->
<img
  src="product.jpg"
  alt="無線イヤホン"
/>

<!-- 警告アイコン -->
<img
  src="warning.svg"
  alt="警告"
/>`}
                </code>
              </pre>
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
                装飾画像
              </strong>
              <pre
                className={css({
                  marginTop: 2,
                  padding: 2,
                  backgroundColor: "bg.tertiary",
                  borderRadius: "sm",
                  overflow: "auto",
                  fontSize: "xs",
                  color: "contents.primary",
                })}
              >
                <code>
                  {`<!-- 背景パターン -->
<img
  src="pattern.png"
  alt=""
/>

<!-- テキスト付きアイコン -->
<img
  src="warning.svg"
  alt=""
/>
警告: 入力エラー`}
                </code>
              </pre>
            </div>
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
              size="md"
              wcagLevel="AA"
              responsiveLabel="aria-hiddenと視覚表示の比較表"
              showColumnDividers
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
          <span aria-hidden="true">🔒</span>
          フォームの検証: pattern属性
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
            <code>pattern</code>
            属性を使うと、正規表現で入力値を検証できます。
            アクセシブルな検証には、適切なエラーメッセージと説明が必要です。
          </p>

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
              ✅ 良い例: 電話番号の検証
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
                {`<label for="phone">電話番号</label>
<input
  type="tel"
  id="phone"
  name="phone"
  pattern="[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}"
  title="電話番号は03-1234-5678の形式で入力してください"
  aria-describedby="phone-format"
  required
/>
<span id="phone-format" class="help-text">
  例: 03-1234-5678
</span>`}
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
            <strong className={css({ color: "contents.success" })}>
              ✅ 良い例: 郵便番号の検証
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
                {`<label for="zipcode">郵便番号</label>
<input
  type="text"
  id="zipcode"
  name="zipcode"
  pattern="[0-9]{3}-[0-9]{4}"
  title="郵便番号は123-4567の形式で入力してください"
  aria-describedby="zipcode-format"
  inputmode="numeric"
  required
/>
<span id="zipcode-format" class="help-text">
  ハイフン付きの7桁（例: 123-4567）
</span>`}
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
            <strong className={css({ color: "contents.success" })}>
              ✅ 良い例: ユーザー名の検証
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
                {`<label for="username">ユーザー名</label>
<input
  type="text"
  id="username"
  name="username"
  pattern="[a-zA-Z0-9_]{3,16}"
  title="ユーザー名は3〜16文字の英数字とアンダースコアのみ使用できます"
  aria-describedby="username-rules"
  required
/>
<span id="username-rules" class="help-text">
  3〜16文字の英数字とアンダースコア（_）のみ
</span>`}
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
              borderColor: "border.error",
            })}
          >
            <strong className={css({ color: "contents.error" })}>
              ❌ 悪い例: 説明が不足している
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
                {`<!-- title属性がない -->
<input
  type="tel"
  pattern="[0-9]{3}-[0-9]{4}"
/>

<!-- aria-describedbyがない -->
<label for="phone">電話番号</label>
<input
  type="tel"
  id="phone"
  pattern="[0-9]{3}-[0-9]{4}"
  title="正しい形式で入力してください"
/>
<!-- どんな形式？ユーザーには不明 -->`}
              </code>
            </pre>
          </div>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            pattern属性のアクセシビリティポイント
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
              <strong><code>title</code>属性</strong>
              <br />
              期待される入力形式を具体的に説明する（検証失敗時に表示される）
            </li>
            <li>
              <strong><code>aria-describedby</code></strong>
              <br />
              入力フィールドの下にヘルプテキストを配置し、IDで関連付ける
            </li>
            <li>
              <strong>ヘルプテキスト</strong>
              <br />
              入力例を示して、ユーザーが正しく入力できるようにサポート
            </li>
            <li>
              <strong><code>inputmode</code>属性</strong>
              <br />
              数値入力の場合は<code>inputmode="numeric"</code>を指定してモバイルで数字キーボードを表示
            </li>
            <li>
              <strong>明確なエラーメッセージ</strong>
              <br />
              検証失敗時には、何が間違っているか、どう修正すればよいかを明示
            </li>
          </ul>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            よく使われる正規表現パターン
          </h4>

          <Table
            caption="フォーム検証でよく使うパターン"
            variant="striped"
            highlightOnHover
            wcagLevel="AA"
          >
            <TableHeader>
              <TableRow>
                <TableHeaderCell>用途</TableHeaderCell>
                <TableHeaderCell>正規表現パターン</TableHeaderCell>
                <TableHeaderCell>説明</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    郵便番号
                  </strong>
                </TableCell>
                <TableCell>
                  <code className={inlineCodeClass}>[0-9]&#123;3&#125;-[0-9]&#123;4&#125;</code>
                </TableCell>
                <TableCell>123-4567形式</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    電話番号
                  </strong>
                </TableCell>
                <TableCell>
                  <code className={inlineCodeClass}>[0-9]&#123;2,4&#125;-[0-9]&#123;2,4&#125;-[0-9]&#123;3,4&#125;</code>
                </TableCell>
                <TableCell>03-1234-5678形式</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    半角英数字
                  </strong>
                </TableCell>
                <TableCell>
                  <code className={inlineCodeClass}>[a-zA-Z0-9]+</code>
                </TableCell>
                <TableCell>1文字以上の英数字</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    ユーザー名
                  </strong>
                </TableCell>
                <TableCell>
                  <code className={inlineCodeClass}>[a-zA-Z0-9_]&#123;3,16&#125;</code>
                </TableCell>
                <TableCell>3〜16文字の英数字+アンダースコア</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    カタカナ
                  </strong>
                </TableCell>
                <TableCell>
                  <code className={inlineCodeClass}>[ァ-ヶー]+</code>
                </TableCell>
                <TableCell>全角カタカナのみ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    日付
                  </strong>
                </TableCell>
                <TableCell>
                  <code className={inlineCodeClass}>[0-9]&#123;4&#125;-[0-9]&#123;2&#125;-[0-9]&#123;2&#125;</code>
                </TableCell>
                <TableCell>YYYY-MM-DD形式</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    URL
                  </strong>
                </TableCell>
                <TableCell>
                  <code className={inlineCodeClass}>https?://.+</code>
                </TableCell>
                <TableCell>http/httpsで始まるURL</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div
            className={css({
              marginTop: 4,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.info",
            })}
          >
            <p
              className={css({
                marginTop: 0,
                marginBottom: 2,
                fontWeight: "bold",
                color: "contents.primary",
              })}
            >
              💡 ベストプラクティス
            </p>
            <ul
              className={css({
                marginY: 2,
                paddingLeft: 6,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              <li>
                <code>pattern</code>属性だけでなく、JavaScriptでもバリデーションを実装する
              </li>
              <li>
                検証エラーは<code>aria-live</code>領域で動的に通知する
              </li>
              <li>
                エラー状態の入力フィールドには<code>aria-invalid="true"</code>を設定
              </li>
              <li>
                複雑な検証ルールは段階的に実装し、ユーザーに優しいUXを心がける
              </li>
            </ul>
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
          <span aria-hidden="true">🎬</span>
          モーションアニメーション: 必要性の検討と回避方法
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
            アニメーションは視覚的な魅力を高めますが、一部のユーザー（前庭障害、てんかん、注意欠陥障害など）にとっては
            <strong>不快感や健康被害</strong>を引き起こす可能性があります。
            採用前に必要性を検討し、採用する場合はユーザーが無効化できる仕組みを提供しましょう。
          </p>

          <div
            className={css({
              marginTop: 3,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.warning",
            })}
          >
            <p
              className={css({
                marginTop: 0,
                marginBottom: 2,
                fontWeight: "bold",
                color: "contents.primary",
              })}
            >
              ⚠️ アニメーションが引き起こす問題
            </p>
            <ul
              className={css({
                marginY: 2,
                paddingLeft: 6,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              <li>
                <strong>前庭障害</strong>: めまい、吐き気、平衡感覚の喪失
              </li>
              <li>
                <strong>光感受性てんかん</strong>: 点滅やフラッシュによる発作
              </li>
              <li>
                <strong>注意欠陥障害（ADHD）</strong>: 集中力の妨げ
              </li>
              <li>
                <strong>認知障害</strong>: 情報理解の困難
              </li>
            </ul>
          </div>

          <h4
            className={css({
              marginTop: 4,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            ステップ1: アニメーションの必要性を検討する
          </h4>

          <div
            className={css({
              marginTop: 3,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.info",
            })}
          >
            <p
              className={css({
                marginTop: 0,
                marginBottom: 2,
                fontWeight: "bold",
                color: "contents.primary",
              })}
            >
              💡 採用前に自問する
            </p>
            <ul
              className={css({
                marginY: 2,
                paddingLeft: 6,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              <li>このアニメーションは<strong>機能的な目的</strong>があるか？</li>
              <li>ユーザー体験を<strong>本質的に改善</strong>するか？</li>
              <li>情報を<strong>理解しやすく</strong>しているか？</li>
              <li>単なる<strong>装飾</strong>ではないか？</li>
            </ul>
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
            <strong className={css({ color: "contents.success" })}>
              ✅ 機能的なアニメーション（推奨）
            </strong>
            <ul
              className={css({
                marginTop: 2,
                marginBottom: 0,
                paddingLeft: 6,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              <li>
                <strong>フィードバック</strong>: ボタンクリック時の視覚的確認
              </li>
              <li>
                <strong>状態変化の表示</strong>: ローディング、成功、エラー
              </li>
              <li>
                <strong>空間的な関係性</strong>: ドロワーの開閉、モーダルの表示
              </li>
              <li>
                <strong>注意の誘導</strong>: 重要な変更や通知
              </li>
            </ul>
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
              ❌ 不要なアニメーション（避けるべき）
            </strong>
            <ul
              className={css({
                marginTop: 2,
                marginBottom: 0,
                paddingLeft: 6,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              <li>
                <strong>装飾目的のみ</strong>: ページロード時の派手な演出
              </li>
              <li>
                <strong>自動再生される背景動画</strong>: 注意散漫の原因
              </li>
              <li>
                <strong>連続的なループアニメーション</strong>: 停止できない場合は問題
              </li>
              <li>
                <strong>視差スクロール</strong>: 過度な使用は前庭障害を引き起こす
              </li>
            </ul>
          </div>

          <h4
            className={css({
              marginTop: 6,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            ステップ2: prefers-reduced-motionに対応する
          </h4>

          <p
            className={css({
              marginTop: 2,
              marginBottom: 3,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <code>prefers-reduced-motion</code>
            メディアクエリを使用して、OSレベルでモーション削減を設定したユーザーに配慮します。
          </p>

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
              ✅ 良い例: CSSでの実装
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
                {`/* デフォルト: アニメーションあり */
.button {
  transition: transform 0.3s ease, background-color 0.2s;
}

.button:hover {
  transform: scale(1.05);
}

/* モーション削減設定時: アニメーション無効化 */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }

  .button:hover {
    transform: none;
  }
}

/* または、最小限の変化のみ許可 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
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
            <strong className={css({ color: "contents.success" })}>
              ✅ 良い例: JavaScriptでの検出
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
                {`// モーション削減設定を検出
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // アニメーションを無効化
  element.style.animation = 'none';
} else {
  // 通常のアニメーション
  element.style.animation = 'slideIn 0.3s ease';
}

// 設定変更を監視
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
motionQuery.addEventListener('change', (e) => {
  if (e.matches) {
    // アニメーションを停止
    disableAnimations();
  } else {
    // アニメーションを有効化
    enableAnimations();
  }
});`}
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
            <strong className={css({ color: "contents.success" })}>
              ✅ 良い例: Reactでの実装
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
                {`import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// 使用例
function AnimatedComponent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      style={{
        transition: prefersReducedMotion ? 'none' : 'transform 0.3s ease',
        transform: prefersReducedMotion ? 'none' : 'scale(1.05)',
      }}
    >
      コンテンツ
    </div>
  );
}`}
              </code>
            </pre>
          </div>

          <h4
            className={css({
              marginTop: 6,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            ステップ3: ユーザーコントロールを提供する
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
              ✅ 良い例: アニメーション設定トグル
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
                {`<!-- ユーザー設定画面 -->
<fieldset>
  <legend>アニメーション設定</legend>

  <label>
    <input
      type="checkbox"
      id="reduce-motion"
      checked
    />
    アニメーションを削減する
  </label>

  <p class="help-text">
    チェックを入れると、画面のアニメーションや動きが最小限になります。
    めまいや吐き気を感じる場合に有効です。
  </p>
</fieldset>

<script>
  const checkbox = document.getElementById('reduce-motion');
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.body.classList.add('reduce-motion');
      localStorage.setItem('reduce-motion', 'true');
    } else {
      document.body.classList.remove('reduce-motion');
      localStorage.setItem('reduce-motion', 'false');
    }
  });
</script>

<style>
  /* ユーザー設定に基づくスタイル */
  .reduce-motion * {
    animation: none !important;
    transition: none !important;
  }
</style>`}
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
            <strong className={css({ color: "contents.success" })}>
              ✅ 良い例: 自動再生動画の一時停止ボタン
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
                {`<div class="video-container">
  <video
    id="background-video"
    autoplay
    muted
    loop
    aria-label="背景動画"
  >
    <source src="background.mp4" type="video/mp4" />
  </video>

  <button
    id="pause-button"
    aria-label="動画を一時停止"
    aria-pressed="false"
  >
    <span aria-hidden="true">⏸️</span>
    一時停止
  </button>
</div>

<script>
  const video = document.getElementById('background-video');
  const button = document.getElementById('pause-button');

  button.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      button.textContent = '⏸️ 一時停止';
      button.setAttribute('aria-label', '動画を一時停止');
      button.setAttribute('aria-pressed', 'false');
    } else {
      video.pause();
      button.textContent = '▶️ 再生';
      button.setAttribute('aria-label', '動画を再生');
      button.setAttribute('aria-pressed', 'true');
    }
  });
</script>`}
              </code>
            </pre>
          </div>

          <h4
            className={css({
              marginTop: 6,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            ステップ4: 安全なアニメーションガイドライン
          </h4>

          <Table
            caption="アニメーションの安全性ガイドライン"
            variant="striped"
            highlightOnHover
            wcagLevel="AA"
          >
            <TableHeader>
              <TableRow>
                <TableHeaderCell>項目</TableHeaderCell>
                <TableHeaderCell>推奨値</TableHeaderCell>
                <TableHeaderCell>理由</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    点滅頻度
                  </strong>
                </TableCell>
                <TableCell>
                  <strong className={css({ color: "contents.error" })}>
                    1秒間に3回以下
                  </strong>
                </TableCell>
                <TableCell>光感受性てんかんの予防</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    アニメーション時間
                  </strong>
                </TableCell>
                <TableCell>5秒以内（推奨: 0.2〜0.5秒）</TableCell>
                <TableCell>快適な体験と待機時間のバランス</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    視差効果
                  </strong>
                </TableCell>
                <TableCell>最小限、または無効化オプション提供</TableCell>
                <TableCell>前庭障害への配慮</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    自動再生
                  </strong>
                </TableCell>
                <TableCell>5秒で自動停止、または手動停止可能</TableCell>
                <TableCell>WCAG 2.2.2 基準適合</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong className={css({ color: "contents.primary" })}>
                    画面の大きな領域
                  </strong>
                </TableCell>
                <TableCell>全画面の25%以下</TableCell>
                <TableCell>視覚的ストレスの軽減</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h4
            className={css({
              marginTop: 6,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            実装例: モーション対応のボタン
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
              ✅ 包括的な実装例
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
                {`/* CSS */
.button {
  /* デフォルト: スムーズなアニメーション */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
}

.button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.button:active {
  transform: scale(0.98);
}

/* モーション削減設定時: 色変化のみ */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: background-color 0.1s;
  }

  .button:hover,
  .button:active {
    transform: none;
    box-shadow: none;
  }
}

/* ユーザー設定でモーション削減時 */
.reduce-motion .button {
  transition: none;
  transform: none !important;
}

/* フォーカス表示は常に維持（重要） */
.button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}`}
              </code>
            </pre>
          </div>

          <div
            className={css({
              marginTop: 4,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.info",
            })}
          >
            <p
              className={css({
                marginTop: 0,
                marginBottom: 2,
                fontWeight: "bold",
                color: "contents.primary",
              })}
            >
              💡 ベストプラクティス
            </p>
            <ul
              className={css({
                marginY: 2,
                paddingLeft: 6,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              <li>
                <strong>デフォルトでシンプル</strong>: 過度なアニメーションは避ける
              </li>
              <li>
                <strong>prefers-reduced-motionを必ず実装</strong>: WCAG 2.1 AAA基準
              </li>
              <li>
                <strong>代替フィードバック</strong>: アニメーション無しでも状態変化が分かるように
              </li>
              <li>
                <strong>停止・一時停止ボタン</strong>: 5秒以上動くコンテンツには必須
              </li>
              <li>
                <strong>テスト</strong>: 実際にモーション削減設定でテストする
              </li>
            </ul>
          </div>

          <h4
            className={css({
              marginTop: 6,
              marginBottom: 2,
              color: "contents.primary",
            })}
          >
            OS設定でモーション削減を有効化する方法
          </h4>

          <div
            className={css({
              display: "grid",
              gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
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
                macOS
              </strong>
              <ol
                className={css({
                  marginTop: 2,
                  paddingLeft: 6,
                  fontSize: "sm",
                  lineHeight: "relaxed",
                  color: "contents.secondary",
                })}
              >
                <li>システム設定を開く</li>
                <li>「アクセシビリティ」→「ディスプレイ」</li>
                <li>「視差効果を減らす」をオン</li>
              </ol>
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
                Windows
              </strong>
              <ol
                className={css({
                  marginTop: 2,
                  paddingLeft: 6,
                  fontSize: "sm",
                  lineHeight: "relaxed",
                  color: "contents.secondary",
                })}
              >
                <li>設定を開く</li>
                <li>「簡単操作」→「ディスプレイ」</li>
                <li>「Windowsでアニメーションを表示する」をオフ</li>
              </ol>
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
                iOS
              </strong>
              <ol
                className={css({
                  marginTop: 2,
                  paddingLeft: 6,
                  fontSize: "sm",
                  lineHeight: "relaxed",
                  color: "contents.secondary",
                })}
              >
                <li>設定を開く</li>
                <li>「アクセシビリティ」→「動作」</li>
                <li>「視差効果を減らす」をオン</li>
              </ol>
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
                Android
              </strong>
              <ol
                className={css({
                  marginTop: 2,
                  paddingLeft: 6,
                  fontSize: "sm",
                  lineHeight: "relaxed",
                  color: "contents.secondary",
                })}
              >
                <li>設定を開く</li>
                <li>「ユーザー補助」→「視覚」</li>
                <li>「アニメーションを無効化」をオン</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
