import { useState, useId } from "react";
import { css } from "@/styled-system/css";
import { useToast, Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell, Button, Tooltip, Input } from "../design-system/components";
import { ScreenReaderDemo } from "../components/ScreenReaderDemo";
import { InfoBox } from "../design-system/components/InfoBox";
import { SectionHeading } from "../components/SectionHeading";
import { CodeBlock } from "../components/CodeBlock";
import { ComponentDemos } from "../sections/ComponentDemos";

const tableUsageRows = [
  {
    scenario: "基本構造",
    elements:
      "<Table> + <TableHeader> + <TableBody> + <TableRow> + <TableCell>",
    accessibility:
      "captionでテーブル名を提供し、srOnlyCaptionで視覚的に隠すことも可能",
  },
  {
    scenario: "スクロールが必要な場合",
    elements: "responsive / responsiveLabel / stickyHeader",
    accessibility:
      'スクロール領域にrole="region"とラベルが付与され、ヘッダーはフォーカス時も読みやすい',
  },
  {
    scenario: "数値データ",
    elements: 'TableHeaderCell align="right" + TableCell isNumeric',
    accessibility:
      "支援技術には数値列として伝えつつ、視覚的にも右寄せで並びを保つ",
  },
  {
    scenario: "詳細な補足",
    elements: "helpText / showColumnDividers / highlightOnHover",
    accessibility:
      "補足説明を小さなテキストで提供し、縞模様やホバーで行の位置を明示",
  },
];

const tableUsageHighlights = [
  {
    title: "Propsの優先度",
    description:
      "variant（simple / striped）、size（sm/md/lg）、wcagLevel（A/AA/AAA）でコントラストと密度を制御します。",
  },
  {
    title: "アクセシビリティ",
    description:
      "caption + srOnlyCaption、responsiveLabel、helpTextなどスクリーンリーダー向けの補足情報を重ねられます。",
  },
  {
    title: "体験向上",
    description:
      "stickyHeader、highlightOnHover、showColumnDividersでデータの可読性を上げられます。全てデフォルトPropsで安全に扱えます。",
  },
];

export const ComponentsPage = () => {
  const { success, error, warning, info } = useToast();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tooltipHintId = useId();
  const tooltipInputId = useId();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    if (!newErrors.name && !newErrors.email && !newErrors.password) {
      alert("フォーム送信成功！");
    }
  };

  return (
    <>
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

      <section
        id="tooltip-guidance"
        className={css({
          mt: { base: 10, md: 16 },
          mb: { base: 10, md: 16 },
          p: { base: 4, md: 6 },
          borderRadius: "2xl",
          bg: "bg.primary",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.subtle",
          boxShadow: "lg",
        })}
      >
        <SectionHeading emoji="💬" level="h2">
          ツールチップの扱い
        </SectionHeading>
        <p
          className={css({
            color: "contents.secondary",
            fontSize: "md",
            lineHeight: "relaxed",
            m: 0,
          })}
        >
          design system には Tooltip コンポーネントがありますが、アクセシビリティ観点では「補足情報を添える場合のみ」使用します。
          重要な説明は DOM 上に常時表示し、このセクションでは ARIA ガイドの知見をまとめています。
        </p>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
            mt: 4,
          })}
        >
          <InfoBox variant="tip" icon="💡" title="実装時のチェックリスト">
            <ul className={css({ m: 0, pl: 5, lineHeight: "relaxed" })}>
              <li>role="tooltip" を付与し、一意の ID を持たせる</li>
              <li>トリガー要素から aria-describedby で参照する</li>
              <li>ホバーだけでなくキーボードフォーカスでも表示する</li>
              <li>約 300ms 以内の遅延制御と視認しやすい位置調整を行う</li>
            </ul>
          </InfoBox>
          <InfoBox variant="warning" icon="⚠️" title="重要情報には使わない">
            <ul className={css({ m: 0, pl: 5, lineHeight: "relaxed" })}>
              <li>スクリーンリーダーで aria-describedby が読まれない場合がある</li>
              <li>ホバー前提 UI はキーボード・タッチ操作で発見しづらい</li>
              <li>表示条件が曖昧で、利用者が情報の存在に気づけないことがある</li>
            </ul>
            <p className={css({ m: 0, mt: 2, lineHeight: "relaxed" })}>
              重要な説明はテキストとして常時表示し、ツールチップは補足情報の重複提示に留めます。
            </p>
          </InfoBox>
        </div>
        <InfoBox
          variant="warning"
          icon="🚫"
          title="title 属性の活用は不可"
          className={css({ mt: 4 })}
        >
          <p className={css({ m: 0, lineHeight: "relaxed" })}>
            HTML の <code>title</code> 属性はキーボードユーザーやタッチ端末では表示されず、支援技術でも確実に読まれません。
            aria-describedby と role="tooltip" を組み合わせた実装、もしくは常時表示の説明文を採用してください。
          </p>
        </InfoBox>
        <div className={css({ mt: 4 })}>
          <CodeBlock
            language="jsx"
            code={`<Tooltip content="追加の説明テキスト" position="top">
  <button>ホバーまたはフォーカス</button>
</Tooltip>`}
          />
        </div>
        <div
          className={css({
            mt: 4,
            p: 4,
            borderRadius: "lg",
            bg: "bg.secondary",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            display: "grid",
            gap: 3,
          })}
        >
          <h3 className={css({ m: 0, color: "contents.primary", fontSize: "lg" })}>
            フォームと aria-describedby の実演
          </h3>
          <p className={css({ m: 0, color: "contents.secondary", fontSize: "sm" })}>
            入力欄は <code>aria-describedby</code> でヒントテキストと結びつけ、同じ内容をツールチップでも重複表示しています。
            下の読み上げデモから、スクリーンリーダーが説明をどう取得するかを確認できます。
          </p>
          <ScreenReaderDemo
            label="スクリーンリーダーの読み上げ"
            description="フォーカスすると『カード番号』→ヒントテキストの順で読み上げられ、ツールチップは視覚的な補助に留まります。"
          >
            <div className={css({ display: "flex", flexDirection: "column", gap: 2 })}>
              <label
                htmlFor={tooltipInputId}
                className={css({ fontWeight: "medium", display: "flex", alignItems: "center", gap: 2 })}
              >
                カード番号
                <Tooltip content="4桁ごとにスペースを入れると読みやすい形式になります" position="top">
                  <span
                    aria-hidden="true"
                    className={css({
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 5,
                      height: 5,
                      borderRadius: "full",
                      backgroundColor: "bg.tertiary",
                      color: "contents.secondary",
                      fontSize: "xs",
                      fontWeight: "bold",
                      cursor: "help",
                    })}
                  >
                    i
                  </span>
                </Tooltip>
              </label>
              <Input
                id={tooltipInputId}
                placeholder="1234 5678 9012 3456"
                aria-describedby={tooltipHintId}
              />
              <p id={tooltipHintId} className={css({ m: 0, fontSize: "sm", color: "contents.secondary" })}>
                セキュリティコードとカード番号は別送メールで共有されます。入力後は <code>Tab</code> で次のフィールドへ移動してください。
              </p>
            </div>
          </ScreenReaderDemo>
          <CodeBlock
            language="html"
            code={`<label for="card-number">
  カード番号
  <Tooltip content="4桁ごとにスペースを入れると読みやすい形式になります">
    <span aria-hidden="true">i</span>
  </Tooltip>
</label>
<input id="card-number" aria-describedby="card-hint" />
<p id="card-hint">セキュリティコードとカード番号は別送メールで共有されます。</p>`}
          />
        </div>
        <div
          className={css({
            mt: 4,
            p: 4,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          <h3
            className={css({
              m: 0,
              mb: 3,
              fontSize: "lg",
              color: "contents.primary",
            })}
          >
            🎨 実例
          </h3>
          <div
            className={css({
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              alignItems: "center",
            })}
          >
            <Tooltip content="これは上に表示されるツールチップです" position="top">
              <Button variant="outline" size="sm">
                上
              </Button>
            </Tooltip>
            <Tooltip content="これは下に表示されるツールチップです" position="bottom">
              <Button variant="outline" size="sm">
                下
              </Button>
            </Tooltip>
            <Tooltip content="これは左に表示されるツールチップです" position="left">
              <Button variant="outline" size="sm">
                左
              </Button>
            </Tooltip>
            <Tooltip content="これは右に表示されるツールチップです" position="right">
              <Button variant="outline" size="sm">
                右
              </Button>
            </Tooltip>
            <Tooltip content="このアイコンについての詳細情報" position="top">
              <span
                className={css({
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "bg.tertiary",
                  color: "contents.secondary",
                  fontSize: "sm",
                  fontWeight: "bold",
                  cursor: "help",
                  textDecoration: "none",
                })}
              >
                ?
              </span>
            </Tooltip>
          </div>
        </div>
        <p
          className={css({
            color: "contents.secondary",
            fontSize: "sm",
            lineHeight: "relaxed",
            mt: 3,
            mb: 0,
          })}
        >
          より詳細な例や実装のデモは「ARIA ガイド &gt; ツールチップ」セクションで確認できます。
        </p>
      </section>

      <section
        id="table-component"
        className={css({
          mt: { base: 10, md: 16 },
          mb: { base: 10, md: 16 },
          p: { base: 4, md: 6 },
          borderRadius: "2xl",
          bg: "bg.secondary",
          boxShadow: "2xl",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mb: 6,
          })}
        >
          <span
            className={css({
              fontSize: "sm",
              color: "contents.tertiary",
              letterSpacing: "widest",
              textTransform: "uppercase",
            })}
          >
            Table component
          </span>
          <h2
            className={css({
              fontSize: { base: "2xl", md: "3xl" },
              m: 0,
              color: "contents.primary",
            })}
          >
            データの比較を迷わせないテーブルの使い方
          </h2>
          <p
            className={css({
              fontSize: "md",
              color: "contents.secondary",
              lineHeight: "relaxed",
              maxW: "720px",
            })}
          >
            <code
              className={css({
                backgroundColor: "bg.primary",
                px: 2,
                py: 1,
                borderRadius: "sm",
                borderWidth: "thin",
                borderColor: "border.subtle",
                fontSize: "sm",
              })}
            >
              Table
            </code>{" "}
            コンポーネントは、captionやsticky headerを含めてWCAG
            AA/AAAを満たす状態を簡単に構築できます。
            下記の表ではユースケース別に props
            とアクセシビリティのポイントをまとめています。
          </p>
        </div>

        <div
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
            mb: 6,
          })}
        >
          {tableUsageHighlights.map((item) => (
            <div
              key={item.title}
              className={css({
                p: 4,
                bg: "bg.primary",
                borderRadius: "xl",
                borderWidth: "thin",
                borderColor: "border.subtle",
                minHeight: "150px",
              })}
            >
              <h3
                className={css({
                  m: 0,
                  fontSize: "lg",
                  color: "contents.primary",
                })}
              >
                {item.title}
              </h3>
              <p
                className={css({
                  fontSize: "sm",
                  color: "contents.secondary",
                  lineHeight: "relaxed",
                  mt: 2,
                })}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <Table
          caption="TableコンポーネントのPropsとユースケース"
          variant="striped"
          showColumnDividers
          stickyHeader
          wcagLevel="AA"
        >
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ユースケース</TableHeaderCell>
              <TableHeaderCell>使う要素 / Props</TableHeaderCell>
              <TableHeaderCell>アクセシビリティの意図</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableUsageRows.map((row) => (
              <TableRow key={row.scenario}>
                <TableCell>{row.scenario}</TableCell>
                <TableCell>{row.elements}</TableCell>
                <TableCell>{row.accessibility}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};
