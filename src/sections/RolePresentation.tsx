import { css } from "@/styled-system/css";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "../design-system/components";
import { InfoBox } from "../design-system/components/InfoBox";
import { icons } from "../design-system/tokens/icons";
import { CodeBlock } from "../components/CodeBlock";

export const RolePresentation = () => {
  const useCaseRows = [
    {
      useCase: "装飾的な画像",
      example: '<img src="decorative.png" role="presentation" alt="">',
      description: "意味を持たない装飾目的の画像",
    },
    {
      useCase: "レイアウト用のテーブル",
      example: '<table role="presentation">...</table>',
      description: "データテーブルではなく、レイアウト目的のテーブル",
    },
    {
      useCase: "視覚的なリスト",
      example: '<ul role="presentation">...</ul>',
      description: "リストとしての意味を持たせず、視覚的なレイアウトのみ",
    },
  ];

  return (
    <section
      id="role-presentation"
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
          borderBottomColor: "pink.500",
          paddingBottom: 2,
          marginBottom: 4,
          display: "flex",
          alignItems: "center",
          gap: 2,
        })}
      >
        <icons.philosophy.inclusive
          size={28}
          color={"pink.600"}
          strokeWidth={2}
        />
        role="presentation" ガイド
      </h2>
      <p className={css({ color: "contents.secondary", marginBottom: 6 })}>
        <code
          className={css({
            backgroundColor: "bg.secondary",
            paddingY: 1,
            paddingX: 2,
            borderRadius: "sm",
          })}
        >
          role="presentation"
        </code>{" "}
        は、要素の意味的な役割（セマンティクス）を取り除き、純粋に視覚的な表示のみに使用することをスクリーンリーダーなどの支援技術に伝えるARIA属性です。
      </p>

      {/* 概要 */}
      <div
        className={css({
          marginTop: 6,
          marginBottom: 8,
          padding: 6,
          backgroundColor: "bg.secondary",
          borderRadius: "lg",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "border.default",
        })}
      >
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
          <icons.concept.wcag size={24} color={"blue.600"} strokeWidth={2} />
          概要
        </h3>

        <p
          className={css({
            color: "contents.secondary",
            lineHeight: "relaxed",
            marginBottom: 4,
          })}
        >
          <code
            className={css({
              backgroundColor: "bg.tertiary",
              paddingY: 1,
              paddingX: 2,
              borderRadius: "sm",
            })}
          >
            role="presentation"
          </code>{" "}
          を使用すると、要素が支援技術に対して「意味を持たない装飾的な要素」として扱われます。
          これにより、スクリーンリーダーはその要素のセマンティクスを無視し、純粋に視覚的な目的のみで使用されていることを理解します。
        </p>

        <InfoBox
          variant="info"
          icon="💡"
          title="role=&quot;none&quot; との関係"
          className={css({ marginTop: 3 })}
        >
          <p
            className={css({
              margin: 0,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <code
              className={css({
                backgroundColor: "bg.tertiary",
                paddingY: 1,
                paddingX: 2,
                borderRadius: "sm",
              })}
            >
              role="none"
            </code>{" "}
            は{" "}
            <code
              className={css({
                backgroundColor: "bg.tertiary",
                paddingY: 1,
                paddingX: 2,
                borderRadius: "sm",
              })}
            >
              role="presentation"
            </code>{" "}
            の同義語として ARIA 1.1
            で導入されました。動作は完全に同じで、より直感的な名前として追加されました。
          </p>
        </InfoBox>
      </div>

      {/* 主な用途 */}
      <div className={css({ marginTop: 8, marginBottom: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          主な用途
        </h3>

        <Table
          caption="role=&quot;presentation&quot; の主な用途"
          variant="striped"
          wcagLevel="AA"
          showColumnDividers
          stickyHeader
        >
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ユースケース</TableHeaderCell>
              <TableHeaderCell>コード例</TableHeaderCell>
              <TableHeaderCell>説明</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {useCaseRows.map((row) => (
              <TableRow key={row.useCase}>
                <TableCell>{row.useCase}</TableCell>
                <TableCell>
                  <code
                    className={css({
                      fontFamily: "fonts.mono",
                      fontSize: "xs",
                      color: "contents.primary",
                      wordBreak: "break-all",
                    })}
                  >
                    {row.example}
                  </code>
                </TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div
          className={css({
            marginTop: 4,
            display: "grid",
            gap: 4,
          })}
        >
          {/* 装飾的な画像 */}
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.secondary",
              borderRadius: "md",
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
                fontSize: "base",
                fontWeight: "semibold",
              })}
            >
              1. 装飾的な画像
            </h4>
            <p
              className={css({
                color: "contents.secondary",
                marginTop: 0,
                fontSize: "sm",
                lineHeight: "relaxed",
              })}
            >
              意味を持たない装飾目的の画像に使用します。{" "}
              <code
                className={css({
                  backgroundColor: "bg.tertiary",
                  paddingY: 1,
                  paddingX: 2,
                  borderRadius: "sm",
                })}
              >
                alt=""
              </code>{" "}
              と併用することで装飾的であることを明示します。
            </p>
            <div className={css({ marginTop: 3 })}>
              <CodeBlock
                code={`<img src="decorative.png" role="presentation" alt="">`}
                language="html"
                showLineNumbers={false}
              />
            </div>
          </div>

          {/* レイアウト用のテーブル */}
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.secondary",
              borderRadius: "md",
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
                fontSize: "base",
                fontWeight: "semibold",
              })}
            >
              2. レイアウト用のテーブル
            </h4>
            <p
              className={css({
                color: "contents.secondary",
                marginTop: 0,
                fontSize: "sm",
                lineHeight: "relaxed",
              })}
            >
              データテーブルではなく、レイアウト目的でテーブルを使用する場合に指定します。
            </p>
            <div className={css({ marginTop: 3 })}>
              <CodeBlock
                code={`<table role="presentation">
  <tr>
    <td>レイアウト目的のセル</td>
  </tr>
</table>`}
                language="html"
              />
            </div>
          </div>

          {/* 視覚的なリスト */}
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.secondary",
              borderRadius: "md",
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
                fontSize: "base",
                fontWeight: "semibold",
              })}
            >
              3. 視覚的なリスト
            </h4>
            <p
              className={css({
                color: "contents.secondary",
                marginTop: 0,
                fontSize: "sm",
                lineHeight: "relaxed",
              })}
            >
              リストとしての意味を持たせず、視覚的なレイアウトのみに使用する場合に指定します。
            </p>
            <div className={css({ marginTop: 3 })}>
              <CodeBlock
                code={`<ul role="presentation">
  <li>ナビゲーション項目</li>
</ul>`}
                language="html"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 重要な注意点 */}
      <div className={css({ marginTop: 8, marginBottom: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          重要な注意点
        </h3>

        <div className={css({ display: "grid", gap: 4 })}>
          {/* フォーカス可能な要素には使用不可 */}
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.secondary",
              borderRadius: "md",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.warning",
            })}
          >
            <h4
              className={css({
                marginTop: 0,
                marginBottom: 2,
                color: "contents.primary",
                fontSize: "base",
                fontWeight: "semibold",
              })}
            >
              ⚠️ フォーカス可能な要素には使用不可
            </h4>
            <p
              className={css({
                color: "contents.secondary",
                marginTop: 0,
                fontSize: "sm",
                lineHeight: "relaxed",
              })}
            >
              ボタンやリンクなど、ユーザーが操作できる要素に使うと、操作できるのに意味が伝わらない状態になります。
            </p>
          </div>

          {/* alt="" との併用 */}
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.secondary",
              borderRadius: "md",
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
                fontSize: "base",
                fontWeight: "semibold",
              })}
            >
              💡 alt="" との併用
            </h4>
            <p
              className={css({
                color: "contents.secondary",
                marginTop: 0,
                fontSize: "sm",
                lineHeight: "relaxed",
              })}
            >
              画像の場合、
              <code
                className={css({
                  backgroundColor: "bg.tertiary",
                  paddingY: 1,
                  paddingX: 2,
                  borderRadius: "sm",
                })}
              >
                alt=""
              </code>{" "}
              と併用することで装飾的であることを明示します。
            </p>
          </div>

          {/* 子要素への影響 */}
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.secondary",
              borderRadius: "md",
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
                fontSize: "base",
                fontWeight: "semibold",
              })}
            >
              📌 子要素への影響
            </h4>
            <p
              className={css({
                color: "contents.secondary",
                marginTop: 0,
                fontSize: "sm",
                lineHeight: "relaxed",
              })}
            >
              親要素に{" "}
              <code
                className={css({
                  backgroundColor: "bg.tertiary",
                  paddingY: 1,
                  paddingX: 2,
                  borderRadius: "sm",
                })}
              >
                role="presentation"
              </code>{" "}
              を指定しても、子孫要素のセマンティクスには影響しません。
            </p>
          </div>
        </div>
      </div>

      {/* 使用例 */}
      <div className={css({ marginTop: 8, marginBottom: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          使用例
        </h3>

        <div className={css({ display: "grid", gap: 4 })}>
          {/* 良い例 */}
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.secondary",
              borderRadius: "md",
              borderWidth: "base",
              borderStyle: "solid",
              borderColor: "border.success",
            })}
          >
            <h4
              className={css({
                marginTop: 0,
                marginBottom: 3,
                color: "contents.success",
                fontSize: "lg",
                fontWeight: "semibold",
                display: "flex",
                alignItems: "center",
                gap: 2,
              })}
            >
              <span className={css({ fontSize: "xl" })}>✅</span>
              良い例
            </h4>

            <div className={css({ display: "grid", gap: 3 })}>
              <div>
                <p
                  className={css({
                    margin: 0,
                    marginBottom: 2,
                    color: "contents.primary",
                    fontSize: "sm",
                    fontWeight: "semibold",
                  })}
                >
                  装飾的なアイコン
                </p>
                <CodeBlock
                  code={`<img src="icon.png" role="presentation" alt="">`}
                  language="html"
                  showLineNumbers={false}
                />
              </div>

              <div>
                <p
                  className={css({
                    margin: 0,
                    marginBottom: 2,
                    color: "contents.primary",
                    fontSize: "sm",
                    fontWeight: "semibold",
                  })}
                >
                  レイアウト用テーブル
                </p>
                <CodeBlock
                  code={`<table role="presentation">
  <tr>
    <td><img src="logo.png" alt="会社ロゴ"></td>
    <td>コンテンツ</td>
  </tr>
</table>`}
                  language="html"
                />
              </div>
            </div>
          </div>

          {/* 悪い例 */}
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.secondary",
              borderRadius: "md",
              borderWidth: "base",
              borderStyle: "solid",
              borderColor: "border.error",
            })}
          >
            <h4
              className={css({
                marginTop: 0,
                marginBottom: 3,
                color: "contents.error",
                fontSize: "lg",
                fontWeight: "semibold",
                display: "flex",
                alignItems: "center",
                gap: 2,
              })}
            >
              <span className={css({ fontSize: "xl" })}>❌</span>
              悪い例
            </h4>

            <div className={css({ display: "grid", gap: 3 })}>
              <div>
                <p
                  className={css({
                    margin: 0,
                    marginBottom: 2,
                    color: "contents.primary",
                    fontSize: "sm",
                    fontWeight: "semibold",
                  })}
                >
                  操作可能な要素
                </p>
                <CodeBlock
                  code={`<button role="presentation">送信</button>`}
                  language="html"
                  showLineNumbers={false}
                />
              </div>

              <div>
                <p
                  className={css({
                    margin: 0,
                    marginBottom: 2,
                    color: "contents.primary",
                    fontSize: "sm",
                    fontWeight: "semibold",
                  })}
                >
                  意味のあるデータテーブル
                </p>
                <CodeBlock
                  code={`<table role="presentation">
  <tr><th>商品名</th><th>価格</th></tr>
  <tr><td>りんご</td><td>100円</td></tr>
</table>`}
                  language="html"
                />
              </div>

              <div>
                <p
                  className={css({
                    margin: 0,
                    marginBottom: 2,
                    color: "contents.primary",
                    fontSize: "sm",
                    fontWeight: "semibold",
                  })}
                >
                  意味のあるコンテンツ画像
                </p>
                <CodeBlock
                  code={`<img src="chart.png" role="presentation">`}
                  language="html"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* まとめ */}
      <div
        className={css({
          marginTop: 8,
          padding: 4,
          backgroundColor: "bg.secondary",
          borderRadius: "md",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "border.default",
        })}
      >
        <h4 className={css({ color: "contents.primary", marginTop: 0 })}>
          📝 まとめ
        </h4>
        <ul
          className={css({
            color: "contents.primary",
            lineHeight: "relaxed",
            mb: 0,
          })}
        >
          <li>
            <code
              className={css({
                backgroundColor: "bg.tertiary",
                paddingY: 1,
                paddingX: 2,
                borderRadius: "sm",
              })}
            >
              role="presentation"
            </code>{" "}
            は、純粋に装飾的・視覚的な要素にのみ使用する
          </li>
          <li>
            意味を持つコンテンツや操作可能な要素には使用しない
          </li>
          <li>
            <code
              className={css({
                backgroundColor: "bg.tertiary",
                paddingY: 1,
                paddingX: 2,
                borderRadius: "sm",
              })}
            >
              role="none"
            </code>{" "}
            は同義語として使用可能
          </li>
          <li>
            画像の場合は{" "}
            <code
              className={css({
                backgroundColor: "bg.tertiary",
                paddingY: 1,
                paddingX: 2,
                borderRadius: "sm",
              })}
            >
              alt=""
            </code>{" "}
            と併用する
          </li>
        </ul>
      </div>
    </section>
  );
};
