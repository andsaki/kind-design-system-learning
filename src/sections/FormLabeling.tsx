import { css } from "@/styled-system/css";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Input,
} from "../design-system/components";
import { RadioGroup, Radio } from "../design-system/components/Radio";
import { InfoBox } from "../design-system/components/InfoBox";
import { icons } from "../design-system/tokens/icons";
import { CodeBlock } from "../components/CodeBlock";
import { ScreenReaderDemo } from "../components/ScreenReaderDemo";

export const FormLabeling = () => {
  const comparisonRows = [
    {
      method: "<label>",
      usage: "単一のフォーム要素",
      example: "テキストボックス、チェックボックス",
      pros: "シンプルで直感的",
    },
    {
      method: "<fieldset> + <legend>",
      usage: "関連するフォーム要素のグループ",
      example: "ラジオボタングループ、チェックボックスグループ",
      pros: "視覚的・意味的にグループ化",
    },
    {
      method: "aria-labelledby",
      usage: "既存の要素をラベルとして参照",
      example: "見出しをラベルとして使用",
      pros: "柔軟なラベル指定",
    },
    {
      method: "aria-describedby",
      usage: "補足説明の追加",
      example: "ヒント、エラーメッセージ",
      pros: "追加情報を関連付け",
    },
  ];

  return (
    <section
      id="form-labeling"
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
          color="currentColor"
          strokeWidth={2}
        />
        フォームのラベリング完全ガイド
      </h2>
      <p className={css({ color: "contents.secondary", marginBottom: 6 })}>
        フォーム要素に適切なラベルを付けることは、アクセシビリティの基本です。
        <code
          className={css({
            backgroundColor: "bg.secondary",
            paddingY: 1,
            paddingX: 2,
            borderRadius: "sm",
          })}
        >
          fieldset/legend
        </code>
        、
        <code
          className={css({
            backgroundColor: "bg.secondary",
            paddingY: 1,
            paddingX: 2,
            borderRadius: "sm",
          })}
        >
          aria-labelledby
        </code>
        、
        <code
          className={css({
            backgroundColor: "bg.secondary",
            paddingY: 1,
            paddingX: 2,
            borderRadius: "sm",
          })}
        >
          aria-describedby
        </code>
        の使い分けを学びましょう。
      </p>

      {/* 比較表 */}
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
          各手法の比較
        </h3>

        <Table
          caption="フォームラベリング手法の比較"
          variant="striped"
          wcagLevel="AA"
          showColumnDividers
          stickyHeader
        >
          <TableHeader>
            <TableRow>
              <TableHeaderCell>手法</TableHeaderCell>
              <TableHeaderCell>使用場面</TableHeaderCell>
              <TableHeaderCell>具体例</TableHeaderCell>
              <TableHeaderCell>利点</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonRows.map((row) => (
              <TableRow key={row.method}>
                <TableCell>
                  <code
                    className={css({
                      fontFamily: "fonts.mono",
                      fontSize: "sm",
                      color: "contents.primary",
                    })}
                  >
                    {row.method}
                  </code>
                </TableCell>
                <TableCell>{row.usage}</TableCell>
                <TableCell className={css({ fontSize: "sm" })}>
                  {row.example}
                </TableCell>
                <TableCell>{row.pros}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* fieldset + legend */}
      <div
        className={css({
          marginTop: 8,
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
          <icons.concept.wcag size={24} color="currentColor" strokeWidth={2} />
          fieldset と legend
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
            &lt;fieldset&gt;
          </code>{" "}
          と{" "}
          <code
            className={css({
              backgroundColor: "bg.tertiary",
              paddingY: 1,
              paddingX: 2,
              borderRadius: "sm",
            })}
          >
            &lt;legend&gt;
          </code>{" "}
          は、関連するフォーム要素をグループ化し、そのグループに名前を付けるためのHTML要素です。
        </p>

        <InfoBox
          variant="tip"
          icon="💡"
          title="使用すべき場面"
          className={css({ marginTop: 3, marginBottom: 4 })}
        >
          <ul
            className={css({
              margin: 0,
              paddingLeft: 5,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <li>ラジオボタンのグループ</li>
            <li>チェックボックスのグループ</li>
            <li>関連する入力フィールドのセット（住所、クレジットカード情報など）</li>
          </ul>
        </InfoBox>

        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            基本的な使い方
          </h4>
          <CodeBlock
            code={`<fieldset>
  <legend>配送方法を選択</legend>
  <label>
    <input type="radio" name="shipping" value="standard" />
    通常配送（3-5日）
  </label>
  <label>
    <input type="radio" name="shipping" value="express" />
    速達配送（1-2日）
  </label>
</fieldset>`}
            language="html"
          />
        </div>

        <ScreenReaderDemo
          label="スクリーンリーダー実演"
          description="fieldsetとlegendにより、グループ名が最初に読み上げられ、各ラジオボタンがグループの一部として認識されます。"
        >
          <fieldset
            className={css({
              borderWidth: "base",
              borderStyle: "solid",
              borderColor: "border.default",
              borderRadius: "md",
              padding: 4,
            })}
          >
            <legend
              className={css({
                color: "contents.primary",
                fontWeight: "semibold",
                paddingX: 2,
              })}
            >
              配送方法を選択
            </legend>
            <RadioGroup name="shipping-demo" label="配送方法" defaultValue="">
              <Radio value="standard" label="通常配送（3-5日）" />
              <Radio value="express" label="速達配送（1-2日）" />
              <Radio value="overnight" label="翌日配送" />
            </RadioGroup>
          </fieldset>
        </ScreenReaderDemo>
      </div>

      {/* aria-labelledby */}
      <div
        className={css({
          marginTop: 8,
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
          <icons.concept.wcag size={24} color="currentColor" strokeWidth={2} />
          aria-labelledby
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
            aria-labelledby
          </code>{" "}
          は、他の要素のIDを参照して、その要素のテキストをラベルとして使用します。
          複数のIDをスペース区切りで指定することもできます。
        </p>

        <InfoBox
          variant="info"
          icon="💡"
          title="labelとの優先順位"
          className={css({ marginTop: 3, marginBottom: 4 })}
        >
          <p
            className={css({
              margin: 0,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            aria-labelledby は{" "}
            <code
              className={css({
                backgroundColor: "bg.tertiary",
                paddingY: 1,
                paddingX: 2,
                borderRadius: "sm",
              })}
            >
              &lt;label&gt;
            </code>{" "}
            や{" "}
            <code
              className={css({
                backgroundColor: "bg.tertiary",
                paddingY: 1,
                paddingX: 2,
                borderRadius: "sm",
              })}
            >
              aria-label
            </code>{" "}
            よりも優先されます。
          </p>
        </InfoBox>

        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            使用例1：見出しをラベルとして使用
          </h4>
          <CodeBlock
            code={`<h2 id="personal-info">個人情報</h2>
<section aria-labelledby="personal-info">
  <label for="name">お名前</label>
  <input type="text" id="name" />

  <label for="email">メールアドレス</label>
  <input type="email" id="email" />
</section>`}
            language="html"
          />
        </div>

        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            使用例2：複数の要素を組み合わせる
          </h4>
          <CodeBlock
            code={`<span id="billing">請求先</span>
<span id="address">住所</span>
<input
  type="text"
  aria-labelledby="billing address"
  placeholder="東京都..."
/>

<!-- スクリーンリーダー: "請求先 住所 編集可能" -->`}
            language="html"
          />
        </div>

        <ScreenReaderDemo
          label="スクリーンリーダー実演"
          description="複数の要素（「ユーザー」と「名前」）のIDを参照して、それらのテキストを組み合わせてラベルを作成します。"
        >
          <div>
            <span
              id="demo-label-1"
              className={css({
                color: "contents.primary",
                fontWeight: "semibold",
                marginRight: 2,
              })}
            >
              ユーザー
            </span>
            <span
              id="demo-label-2"
              className={css({
                color: "contents.secondary",
                marginRight: 2,
              })}
            >
              名前
            </span>
            <Input
              label="フルネーム"
              aria-labelledby="demo-label-1 demo-label-2"
              placeholder="山田太郎"
            />
          </div>
        </ScreenReaderDemo>
      </div>

      {/* aria-describedby */}
      <div
        className={css({
          marginTop: 8,
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
          <icons.concept.wcag size={24} color="currentColor" strokeWidth={2} />
          aria-describedby
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
            aria-describedby
          </code>{" "}
          は、要素の説明や補足情報を提供する他の要素のIDを参照します。
          エラーメッセージ、ヒントテキスト、詳細な説明などに使用します。
        </p>

        <InfoBox
          variant="tip"
          icon="💡"
          title="aria-labelledby との違い"
          className={css({ marginTop: 3, marginBottom: 4 })}
        >
          <ul
            className={css({
              margin: 0,
              paddingLeft: 5,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <li>
              <strong>aria-labelledby</strong>:
              要素の「名前」を指定（必須情報）
            </li>
            <li>
              <strong>aria-describedby</strong>:
              要素の「説明」を追加（補足情報）
            </li>
          </ul>
        </InfoBox>

        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            使用例1：ヒントテキスト
          </h4>
          <CodeBlock
            code={`<label for="password">パスワード</label>
<input
  type="password"
  id="password"
  aria-describedby="password-hint"
/>
<span id="password-hint">
  8文字以上、英数字を含む
</span>`}
            language="html"
          />
        </div>

        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            使用例2：エラーメッセージ
          </h4>
          <CodeBlock
            code={`<label for="email">メールアドレス</label>
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  有効なメールアドレスを入力してください
</span>`}
            language="html"
          />
        </div>

        <ScreenReaderDemo
          label="スクリーンリーダー実演"
          description="aria-describedbyを使って、入力フィールドにヒントテキストを関連付けます。ラベルの後に補足情報が読み上げられます。"
        >
          <div>
            <label
              htmlFor="demo-password"
              className={css({
                display: "block",
                marginBottom: 2,
                color: "contents.primary",
                fontWeight: "semibold",
              })}
            >
              パスワード
            </label>
            <Input
              id="demo-password"
              label="パスワード"
              type="password"
              aria-describedby="demo-password-hint"
              placeholder="パスワードを入力"
            />
            <span
              id="demo-password-hint"
              className={css({
                display: "block",
                marginTop: 1,
                fontSize: "sm",
                color: "contents.tertiary",
              })}
            >
              8文字以上、英数字を含む
            </span>
          </div>
        </ScreenReaderDemo>

        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            使用例3：複数の説明を組み合わせる
          </h4>
          <CodeBlock
            code={`<label for="username">ユーザー名</label>
<input
  type="text"
  id="username"
  aria-describedby="username-hint username-error"
/>
<span id="username-hint">
  3文字以上の英数字
</span>
<span id="username-error" role="alert">
  既に使用されているユーザー名です
</span>

<!-- スクリーンリーダー:
     "ユーザー名 編集可能
      3文字以上の英数字
      既に使用されているユーザー名です" -->`}
            language="html"
          />
        </div>
      </div>

      {/* 組み合わせパターン */}
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
        <h4
          className={css({
            color: "contents.primary",
            marginTop: 0,
            marginBottom: 3,
          })}
        >
          📝 組み合わせパターン
        </h4>

        <div className={css({ display: "grid", gap: 4 })}>
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
            <strong
              className={css({ color: "contents.primary", display: "block" })}
            >
              パターン1: fieldset + aria-describedby
            </strong>
            <CodeBlock
              code={`<fieldset aria-describedby="payment-note">
  <legend>支払い方法</legend>
  <!-- ラジオボタン -->
</fieldset>
<p id="payment-note">
  選択した方法により手数料が変わります
</p>`}
              language="html"
              showLineNumbers={false}
            />
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
            <strong
              className={css({ color: "contents.primary", display: "block" })}
            >
              パターン2: label + aria-describedby
            </strong>
            <CodeBlock
              code={`<label for="email">メールアドレス</label>
<input
  type="email"
  id="email"
  aria-describedby="email-hint email-error"
/>
<span id="email-hint">確認メールが送信されます</span>
<span id="email-error" role="alert">
  有効なメールアドレスを入力してください
</span>`}
              language="html"
              showLineNumbers={false}
            />
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
            <strong
              className={css({ color: "contents.primary", display: "block" })}
            >
              パターン3: aria-labelledby + aria-describedby
            </strong>
            <CodeBlock
              code={`<span id="section-title">配送情報</span>
<span id="section-desc">お届け先の住所を入力してください</span>
<section
  aria-labelledby="section-title"
  aria-describedby="section-desc"
>
  <!-- フォーム要素 -->
</section>`}
              language="html"
              showLineNumbers={false}
            />
          </div>
        </div>
      </div>

      {/* fieldset + legend + aria-invalid の実装例 */}
      <div
        className={css({
          marginTop: 8,
          padding: 6,
          backgroundColor: "bg.secondary",
          borderRadius: "md",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "border.default",
        })}
      >
        <h3
          className={css({
            color: "contents.primary",
            marginTop: 0,
            marginBottom: 4,
            fontSize: "xl",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <icons.philosophy.inclusive size={24} color="currentColor" strokeWidth={2} />
          fieldset + legend + aria-invalid の組み合わせ
        </h3>

        <p className={css({ color: "contents.secondary", marginBottom: 4 })}>
          グループ化されたフォーム要素（ラジオボタンやチェックボックス）にエラー状態を適切に伝える実装例です。
          <code className={css({ backgroundColor: "bg.primary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>
            fieldset
          </code>
          全体に
          <code className={css({ backgroundColor: "bg.primary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>
            aria-invalid
          </code>
          と
          <code className={css({ backgroundColor: "bg.primary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>
            aria-describedby
          </code>
          を設定することで、グループ全体のエラー状態をスクリーンリーダーに伝えることができます。
        </p>

        {/* 実装例 */}
        <div
          className={css({
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            marginBottom: 4,
          })}
        >
          <ScreenReaderDemo
            label="スクリーンリーダー実演"
            description="エラー状態のfieldsetがどのように読み上げられるか確認できます"
          >
            <fieldset
              aria-invalid="true"
              aria-describedby="delivery-error"
              className={css({
                padding: 4,
                borderWidth: "base",
                borderStyle: "solid",
                borderColor: "colors.red.600",
                borderRadius: "md",
                backgroundColor: "colors.red.50",
              })}
            >
              <legend
                className={css({
                  fontWeight: "bold",
                  color: "contents.primary",
                  paddingX: 2,
                })}
              >
                配送方法を選択してください *
              </legend>

              <RadioGroup name="delivery-invalid-example" label="配送方法" defaultValue="">
                <Radio value="standard" label="通常配送（3-5営業日）" />
                <Radio value="express" label="速達配送（1-2営業日）" />
                <Radio value="overnight" label="翌日配送" />
              </RadioGroup>

              <div
                id="delivery-error"
                role="alert"
                aria-live="polite"
                className={css({
                  marginTop: 3,
                  padding: 2,
                  fontSize: "sm",
                  color: "colors.red.700",
                  backgroundColor: "colors.red.100",
                  borderRadius: "sm",
                  borderWidth: "thin",
                  borderStyle: "solid",
                  borderColor: "colors.red.300",
                })}
              >
                ⚠️ 配送方法を選択してください
              </div>
            </fieldset>
          </ScreenReaderDemo>
        </div>

        {/* コード例 */}
        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              color: "contents.primary",
              marginTop: 0,
              marginBottom: 2,
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            実装コード
          </h4>
          <CodeBlock
            code={`<fieldset
  aria-invalid="true"
  aria-describedby="delivery-error"
  style={{
    borderColor: 'red',
    backgroundColor: '#fee'
  }}
>
  <legend>配送方法を選択してください *</legend>

  <input type="radio" id="standard" name="delivery" value="standard" />
  <label htmlFor="standard">通常配送（3-5営業日）</label>

  <input type="radio" id="express" name="delivery" value="express" />
  <label htmlFor="express">速達配送（1-2営業日）</label>

  <input type="radio" id="overnight" name="delivery" value="overnight" />
  <label htmlFor="overnight">翌日配送</label>

  <div id="delivery-error" role="alert" aria-live="polite">
    ⚠️ 配送方法を選択してください
  </div>
</fieldset>

{/* スクリーンリーダーの読み上げ例:
   "配送方法を選択してください 必須 グループ 無効な入力
    配送方法を選択してください" */}`}
            language="jsx"
          />
        </div>

        {/* ポイント */}
        <InfoBox
          variant="info"
          title="実装のポイント"
          className={css({ marginTop: 4 })}
        >
          <ul
            className={css({
              margin: 0,
              paddingLeft: 5,
              lineHeight: "relaxed",
            })}
          >
            <li>
              <strong>fieldsetにaria-invalid</strong>:
              グループ全体がエラー状態であることを示す
            </li>
            <li>
              <strong>aria-describedby</strong>:
              エラーメッセージのIDを参照してエラー内容を伝える
            </li>
            <li>
              <strong>role="alert"</strong>:
              エラーメッセージを即座に読み上げる
            </li>
            <li>
              <strong>視覚的なフィードバック</strong>:
              赤い枠線や背景色でエラー状態を視覚的に示す
            </li>
            <li>
              <strong>legendに必須マーク</strong>:
              アスタリスク（*）で必須項目であることを明示
            </li>
          </ul>
        </InfoBox>

        {/* 正常状態との比較 */}
        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              color: "contents.primary",
              marginTop: 0,
              marginBottom: 2,
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            正常状態（aria-invalid="false"）
          </h4>
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.primary",
              borderRadius: "md",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
            })}
          >
            <fieldset
              aria-invalid="false"
              className={css({
                padding: 4,
                borderWidth: "base",
                borderStyle: "solid",
                borderColor: "border.default",
                borderRadius: "md",
              })}
            >
              <legend
                className={css({
                  fontWeight: "bold",
                  color: "contents.primary",
                  paddingX: 2,
                })}
              >
                配送方法を選択してください *
              </legend>

              <RadioGroup name="delivery-valid-example" label="配送方法" defaultValue="standard">
                <Radio value="standard" label="通常配送（3-5営業日）" />
                <Radio value="express" label="速達配送（1-2営業日）" />
                <Radio value="overnight" label="翌日配送" />
              </RadioGroup>

              <p
                className={css({
                  marginTop: 3,
                  fontSize: "sm",
                  color: "contents.tertiary",
                })}
              >
                選択された配送方法に応じて料金が変わります
              </p>
            </fieldset>
          </div>
        </div>
      </div>

      {/* 高度な組み合わせ例 */}
      <div
        className={css({
          marginTop: 8,
          padding: 6,
          backgroundColor: "bg.secondary",
          borderRadius: "md",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "border.default",
        })}
      >
        <h3
          className={css({
            color: "contents.primary",
            marginTop: 0,
            marginBottom: 4,
            fontSize: "xl",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <icons.philosophy.inclusive size={24} color="currentColor" strokeWidth={2} />
          高度な組み合わせ：RadioGroup + すべてのARIA属性
        </h3>

        <p className={css({ color: "contents.secondary", marginBottom: 4 })}>
          <code className={css({ backgroundColor: "bg.primary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>
            aria-labelledby
          </code>
          、
          <code className={css({ backgroundColor: "bg.primary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>
            aria-describedby
          </code>
          、
          <code className={css({ backgroundColor: "bg.primary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>
            aria-invalid
          </code>
          、
          <code className={css({ backgroundColor: "bg.primary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>
            role="radiogroup"
          </code>
          をすべて組み合わせた実践的な例です。
        </p>

        {/* 実装例 */}
        <div
          className={css({
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            marginBottom: 4,
          })}
        >
          <ScreenReaderDemo
            label="スクリーンリーダー実演"
            description="すべてのARIA属性を組み合わせることで、グループの名前、説明、エラー状態がすべてスクリーンリーダーに伝わります"
          >
            <div>
              {/* グループのタイトルと説明 */}
              <h4
                id="payment-method-title"
                className={css({
                  fontSize: "base",
                  fontWeight: "bold",
                  color: "contents.primary",
                  marginTop: 0,
                  marginBottom: 2,
                })}
              >
                お支払い方法 *
              </h4>
              <p
                id="payment-method-description"
                className={css({
                  fontSize: "sm",
                  color: "contents.secondary",
                  marginBottom: 3,
                })}
              >
                ご希望のお支払い方法を選択してください。選択後、詳細情報の入力画面に進みます。
              </p>

              {/* RadioGroup with all ARIA attributes */}
              <div
                role="radiogroup"
                aria-labelledby="payment-method-title"
                aria-describedby="payment-method-description payment-method-error"
                aria-invalid="true"
                aria-required="true"
                className={css({
                  padding: 4,
                  borderWidth: "base",
                  borderStyle: "solid",
                  borderColor: "colors.red.600",
                  borderRadius: "md",
                  backgroundColor: "colors.red.50",
                })}
              >
                <RadioGroup name="payment-advanced-example" label="お支払い方法" defaultValue="">
                  <Radio value="credit" label="クレジットカード（手数料無料）" />
                  <Radio value="bank" label="銀行振込（手数料 ¥200）" />
                  <Radio value="convenience" label="コンビニ決済（手数料 ¥150）" />
                  <Radio value="cod" label="代金引換（手数料 ¥300）" />
                </RadioGroup>

                {/* エラーメッセージ */}
                <div
                  id="payment-method-error"
                  role="alert"
                  aria-live="polite"
                  className={css({
                    marginTop: 3,
                    padding: 2,
                    fontSize: "sm",
                    color: "colors.red.700",
                    backgroundColor: "colors.red.100",
                    borderRadius: "sm",
                    borderWidth: "thin",
                    borderStyle: "solid",
                    borderColor: "colors.red.300",
                  })}
                >
                  ⚠️ お支払い方法を選択してください
                </div>
              </div>
            </div>
          </ScreenReaderDemo>
        </div>

        {/* コード例 */}
        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              color: "contents.primary",
              marginTop: 0,
              marginBottom: 2,
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            実装コード
          </h4>
          <CodeBlock
            code={`<!-- グループのタイトルと説明 -->
<h4 id="payment-method-title">お支払い方法 *</h4>
<p id="payment-method-description">
  ご希望のお支払い方法を選択してください。
  選択後、詳細情報の入力画面に進みます。
</p>

<!-- RadioGroup with all ARIA attributes -->
<div
  role="radiogroup"
  aria-labelledby="payment-method-title"
  aria-describedby="payment-method-description payment-method-error"
  aria-invalid="true"
  aria-required="true"
>
  <input type="radio" id="credit" name="payment" value="credit" />
  <label htmlFor="credit">クレジットカード（手数料無料）</label>

  <input type="radio" id="bank" name="payment" value="bank" />
  <label htmlFor="bank">銀行振込（手数料 ¥200）</label>

  <input type="radio" id="convenience" name="payment" value="convenience" />
  <label htmlFor="convenience">コンビニ決済（手数料 ¥150）</label>

  <input type="radio" id="cod" name="payment" value="cod" />
  <label htmlFor="cod">代金引換（手数料 ¥300）</label>

  <!-- エラーメッセージ -->
  <div id="payment-method-error" role="alert" aria-live="polite">
    ⚠️ お支払い方法を選択してください
  </div>
</div>

<!-- スクリーンリーダーの読み上げ例:
     "お支払い方法 必須 ラジオグループ 無効な入力
      ご希望のお支払い方法を選択してください。選択後、詳細情報の入力画面に進みます。
      お支払い方法を選択してください" -->`}
            language="html"
          />
        </div>

        {/* 各属性の役割 */}
        <InfoBox
          variant="info"
          title="各ARIA属性の役割"
          className={css({ marginTop: 4 })}
        >
          <ul
            className={css({
              margin: 0,
              paddingLeft: 5,
              lineHeight: "relaxed",
            })}
          >
            <li>
              <strong>role="radiogroup"</strong>:
              ラジオボタンのグループであることを明示
            </li>
            <li>
              <strong>aria-labelledby</strong>:
              グループの名前を指定（"お支払い方法 *"）
            </li>
            <li>
              <strong>aria-describedby</strong>:
              グループの説明とエラーメッセージを関連付け（複数ID指定）
            </li>
            <li>
              <strong>aria-invalid="true"</strong>:
              グループ全体がエラー状態であることを示す
            </li>
            <li>
              <strong>aria-required="true"</strong>:
              必須項目であることを明示
            </li>
            <li>
              <strong>role="alert" + aria-live="polite"</strong>:
              エラーメッセージをスクリーンリーダーに即座に通知
            </li>
          </ul>
        </InfoBox>

        {/* 正常状態との比較 */}
        <div className={css({ marginTop: 4 })}>
          <h4
            className={css({
              color: "contents.primary",
              marginTop: 0,
              marginBottom: 2,
              fontSize: "base",
              fontWeight: "semibold",
            })}
          >
            正常状態（aria-invalid="false"）
          </h4>
          <div
            className={css({
              padding: 4,
              backgroundColor: "bg.primary",
              borderRadius: "md",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
            })}
          >
            <div>
              <h4
                id="payment-method-title-valid"
                className={css({
                  fontSize: "base",
                  fontWeight: "bold",
                  color: "contents.primary",
                  marginTop: 0,
                  marginBottom: 2,
                })}
              >
                お支払い方法 *
              </h4>
              <p
                id="payment-method-description-valid"
                className={css({
                  fontSize: "sm",
                  color: "contents.secondary",
                  marginBottom: 3,
                })}
              >
                ご希望のお支払い方法を選択してください。選択後、詳細情報の入力画面に進みます。
              </p>

              <div
                role="radiogroup"
                aria-labelledby="payment-method-title-valid"
                aria-describedby="payment-method-description-valid"
                aria-invalid="false"
                aria-required="true"
                className={css({
                  padding: 4,
                  borderWidth: "base",
                  borderStyle: "solid",
                  borderColor: "border.default",
                  borderRadius: "md",
                })}
              >
                <RadioGroup name="payment-valid-example" label="お支払い方法" defaultValue="credit">
                  <Radio value="credit" label="クレジットカード（手数料無料）" />
                  <Radio value="bank" label="銀行振込（手数料 ¥200）" />
                  <Radio value="convenience" label="コンビニ決済（手数料 ¥150）" />
                  <Radio value="cod" label="代金引換（手数料 ¥300）" />
                </RadioGroup>

                <p
                  className={css({
                    marginTop: 3,
                    fontSize: "sm",
                    color: "colors.green.700",
                  })}
                >
                  ✓ クレジットカードが選択されています
                </p>
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
          📚 まとめ
        </h4>
        <ul
          className={css({
            color: "contents.primary",
            lineHeight: "relaxed",
            mb: 0,
          })}
        >
          <li>
            <strong>fieldset + legend</strong>:
            関連するフォーム要素をグループ化（ラジオボタン、チェックボックス）
          </li>
          <li>
            <strong>aria-labelledby</strong>:
            既存の要素をラベルとして参照、複数指定可能
          </li>
          <li>
            <strong>aria-describedby</strong>:
            補足情報やエラーメッセージを関連付け（複数ID指定可能）
          </li>
          <li>
            <strong>role="radiogroup"</strong>:
            ラジオボタングループの明示的な役割指定
          </li>
          <li>
            <strong>aria-invalid</strong>:
            エラー状態の明示（個別要素にもグループ全体にも使用可能）
          </li>
          <li>
            <strong>組み合わせ使用</strong>:
            これらの手法は組み合わせて使用可能で、より豊富な情報をスクリーンリーダーに提供
          </li>
          <li>
            <strong>優先順位</strong>: aria-labelledby &gt; aria-label &gt;
            label要素
          </li>
        </ul>
      </div>
    </section>
  );
};
