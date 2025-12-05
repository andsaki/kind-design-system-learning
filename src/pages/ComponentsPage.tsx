import { useState, useId } from "react";
import { css } from "@/styled-system/css";
import {
  useToast,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Button,
  Tooltip,
  Input,
} from "../design-system/components";
import { ScreenReaderDemo } from "../components/ScreenReaderDemo";
import { CodeBlock } from "../components/CodeBlock";
import { ComponentDemos } from "../sections/ComponentDemos";
import { SectionHeading } from "../components/SectionHeading";
import { icons } from "../design-system/tokens/icons";

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

const tooltipUsageHighlights = [
  {
    title: "実装のベストプラクティス",
    description:
      "role='tooltip' と一意のIDを付与し、トリガー要素からaria-describedbyで参照。ホバーとキーボードフォーカス両方で表示し、300ms以内の遅延制御を行います。",
  },
  {
    title: "スクリーンリーダー対応",
    description:
      "NVDA/JAWSでは自動読み上げされますが、VoiceOverでは初回フォーカス時に読まれません。重要な情報はhelperTextとして常時表示することを推奨します。",
  },
  {
    title: "使用上の注意",
    description:
      "補足情報のみに使用し、重要な説明はDOM上に常時表示。基本はaria-describedby + role='tooltip' またはhelperTextで届け、最小限の保険としてaタグにはtitle属性にも同じ説明を入れてポインター/長押し環境でも拾えるようにします。",
  },
];

export const ComponentsPage = () => {
  const { success, error, warning, info } = useToast();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          mb: 12,
          p: 6,
          bg: "bg.primary",
          rounded: "lg",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          maxW: "full",
          overflowX: "hidden",
          boxSizing: "border-box",
        })}
      >
        <h2
          className={css({
            mt: 0,
            color: "contents.primary",
            fontSize: "2xl",
            fontWeight: "bold",
            borderBottomWidth: "thick",
            borderBottomStyle: "solid",
            borderBottomColor: "blue.500",
            pb: 2,
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <icons.component.info size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Tooltip コンポーネント
        </h2>
        <p
          className={css({
            color: "contents.primary",
            mt: 0,
            mb: 6,
          })}
        >
          ツールチップ（Tooltip）は、補足情報を効果的に伝えるUIコンポーネントです。
          アクセシビリティ観点では「補足情報を添える場合のみ」使用します。
          重要な説明はDOM上に常時表示し、スクリーンリーダー間の挙動の違いにも配慮した実装が必要です。
        </p>

        <div className={css({ mt: 6 })}>
          <SectionHeading>実装ガイドライン</SectionHeading>
          <div
            className={css({
              display: "grid",
              gridTemplateColumns: { base: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
              mb: 6,
            })}
          >
          {tooltipUsageHighlights.map((item) => (
            <div
              key={item.title}
              className={css({
                p: 4,
                bg: "bg.tertiary",
                borderRadius: "base",
                borderWidth: "thin",
                borderStyle: "solid",
                borderColor: "border.default",
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
        </div>

        <div className={css({ mt: 6 })}>
          <SectionHeading>実装例</SectionHeading>
          <div
            className={css({
              mt: 4,
              p: 4,
              borderRadius: "base",
              bg: "bg.tertiary",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
              display: "grid",
              gap: 3,
            })}
          >
          <h3
            className={css({ m: 0, mb: 3, color: "contents.primary", fontSize: "lg", fontWeight: "bold" })}
          >
            フォームと aria-describedby の実演
          </h3>
          <p
            className={css({
              m: 0,
              color: "contents.secondary",
              fontSize: "sm",
            })}
          >
            入力欄は <code>aria-describedby</code>{" "}
            でヒントテキストと結びつけ、同じ内容をツールチップでも重複表示しています。
            下の読み上げデモから、スクリーンリーダーが説明をどう取得するかを確認できます。
          </p>
          <ScreenReaderDemo
            label="スクリーンリーダーの読み上げ"
            description="aria-describedby による説明文の提供。VoiceOverでは VO+Shift+H でヘルプテキストを読めます（初回フォーカス時は自動読み上げされません）。NVDA/JAWSでは自動読み上げされます。"
          >
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: 2,
              })}
            >
              <div
                className={css({
                  fontWeight: "medium",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                })}
                aria-hidden="true"
              >
                <span>カード番号</span>
                <Tooltip
                  content="4桁ごとにスペースを入れると読みやすい形式になります"
                  position="top"
                >
                  <span
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
              </div>
              <Input
                label="カード番号"
                id={tooltipInputId}
                placeholder="1234 5678 9012 3456"
                helperText="4桁ごとにスペースを入れると読みやすい形式になります。セキュリティコードとカード番号は別送メールで共有されます。入力後は Tab で次のフィールドへ移動してください。"
              />
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
<p id="card-hint">セキュリティコードとカード番号は別送メールで共有されます。</p>

<a
  href="https://www.w3.org/WAI/ARIA/apg/"
  title="リンク先の概要をtitleにも複製し、長押し操作でも確認できるようにします"
  rel="noreferrer"
>
  ARIA ベストプラクティスを見る
</a>`}
          />
          </div>
        </div>

        <div className={css({ mt: 6 })}>
          <SectionHeading>ポジション別のデモ</SectionHeading>
          <div
            className={css({
              mt: 4,
              p: 4,
              backgroundColor: "bg.tertiary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
            })}
          >
          <div
            className={css({
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              alignItems: "center",
            })}
          >
            <Tooltip
              content="これは上に表示されるツールチップです"
              position="top"
            >
              <Button variant="outline" size="sm">
                上
              </Button>
            </Tooltip>
            <Tooltip
              content="これは下に表示されるツールチップです"
              position="bottom"
            >
              <Button variant="outline" size="sm">
                下
              </Button>
            </Tooltip>
            <Tooltip
              content="これは左に表示されるツールチップです"
              position="left"
            >
              <Button variant="outline" size="sm">
                左
              </Button>
            </Tooltip>
            <Tooltip
              content="これは右に表示されるツールチップです"
              position="right"
            >
              <Button variant="outline" size="sm">
                右
              </Button>
            </Tooltip>
            <Tooltip content="このアイコンについての詳細情報" position="top">
              <button
                type="button"
                aria-label="このアイコンについての詳細情報"
                onClick={() => alert("アイコンの補足情報です")}
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
                  border: "none",
                })}
              >
                ?
              </button>
            </Tooltip>
            <a
              href="https://www.w3.org/WAI/ARIA/apg/"
              target="_blank"
              rel="noreferrer"
              title="ヒントをtitle属性にも複製しておくと、長押し/ポインター環境でも最低限確認できます"
              className={css({
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                paddingInline: 3,
                paddingBlock: 2,
                borderRadius: "full",
                backgroundColor: "bg.tertiary",
                color: "contents.link",
                fontSize: "sm",
                textDecoration: "none",
                fontWeight: "medium",
              })}
            >
              ARIAベストプラクティス
            </a>
          </div>
          </div>
        </div>
      </section>

      <section
        id="table-component"
        className={css({
          mb: 12,
          p: 6,
          bg: "bg.primary",
          rounded: "lg",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          maxW: "full",
          overflowX: "hidden",
          boxSizing: "border-box",
        })}
      >
        <h2
          className={css({
            mt: 0,
            color: "contents.primary",
            fontSize: "2xl",
            fontWeight: "bold",
            borderBottomWidth: "thick",
            borderBottomStyle: "solid",
            borderBottomColor: "blue.500",
            pb: 2,
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <icons.component.table size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Table コンポーネント
        </h2>
        <p
          className={css({
            color: "contents.primary",
            mt: 0,
            mb: 6,
          })}
        >
          テーブル（Table）コンポーネントは、データの比較を迷わせない表組みを実現します。
          captionやsticky headerを含めてWCAG AA/AAAを満たす状態を簡単に構築できます。
          下記の表ではユースケース別に props とアクセシビリティのポイントをまとめています。
        </p>

        <div className={css({ mt: 6 })}>
          <SectionHeading>主な機能</SectionHeading>
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
                  bg: "bg.tertiary",
                  borderRadius: "base",
                  borderWidth: "thin",
                  borderStyle: "solid",
                  borderColor: "border.default",
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
        </div>

        <div className={css({ mt: 6 })}>
          <SectionHeading>ユースケース別の実装例</SectionHeading>
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
