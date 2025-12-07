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
  Select,
  TextArea,
  Checkbox,
  Dropdown,
  InfoBox,
  Accordion,
  AccordionSummary,
  AccordionContent,
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "../design-system/components";
import { ScreenReaderDemo } from "../components/ScreenReaderDemo";
import { CodeBlock } from "../components/CodeBlock";
import { ComponentDemos } from "../sections/ComponentDemos";
import { SectionHeading } from "../components/SectionHeading";
import { icons } from "../design-system/tokens/icons";
import type { ComponentWCAGLevel } from "../design-system/constants/accessibility";

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
      "variant（simple / striped）、size（sm/md/lg）、wcagLevel（AA/AAA）でコントラストと密度を制御します。",
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

const wcagComponentMatrix = [
  {
    component: "Button / Toast / InfoBox / Modal",
    aa: "薄い青や淡い背景 + 3px アウトライン。視認性とデザインの調和を両立。",
    aaa: "黄色背景 + 黒 4px アウトライン。誤操作を避けたいクリティカルな導線向け。",
  },
  {
    component: "Input / TextArea / Select / Dropdown",
    aa: "青系の背景 + 濃いアウトライン。通常のフォームで推奨。",
    aaa: "黄色系背景 + 黒縁取り。医療・公共などミスできない入力欄に適用。",
  },
  {
    component: "Checkbox / Radio / Accordion / Breadcrumbs",
    aa: "濃い青のリングと柔らかい背景。一般的なナビゲーションや設定画面に適用。",
    aaa: "黄色背景 + 黒枠。選択状態を見逃せないケース（承認ステップ等）向け。",
  },
  {
    component: "Form",
    aa: "フォーム全体を AA で統一。業務アプリや SaaS での標準。",
    aaa: "フォーム単位で AAA を指定すると、すべての子コンポーネントが強調表示される。",
  },
  {
    component: "Table / Breadcrumbs",
    aa: "行ホバーやフォーカスリングが青系。通常の一覧画面にマッチ。",
    aaa: "黄色背景や濃い境界線。アクセシビリティ対応が最重要な一覧に使用。",
  },
];

const wcagFocusDetails: Record<
  ComponentWCAGLevel,
  {
    background: string;
    backgroundLabel: string;
    outline: string;
    outlineLabel: string;
    outlineWidth: string;
    outlineOffset: string;
    text: string;
    textLabel: string;
  }
> = {
  AA: {
    background: "blue.50",
    backgroundLabel: "blue.50",
    outline: "blue.700",
    outlineLabel: "blue.700",
    outlineWidth: "0.1875rem（約3px）",
    outlineOffset: "0.125rem（約2px）",
    text: "gray.900",
    textLabel: "gray.900",
  },
  AAA: {
    background: "yellow.100",
    backgroundLabel: "yellow.100",
    outline: "black",
    outlineLabel: "black",
    outlineWidth: "0.25rem（約4px）",
    outlineOffset: "0.125rem（約2px）",
    text: "black",
    textLabel: "black",
  },
};

const DropdownWcagSample: React.FC<{ level: ComponentWCAGLevel }> = ({
  level,
}) => {
  const [value, setValue] = useState("basic");
  return (
    <Dropdown
      label={`プラン (${level})`}
      options={[
        { value: "basic", label: "Basic" },
        { value: "pro", label: "Pro" },
        { value: "enterprise", label: "Enterprise" },
      ]}
      placeholder="選択してください"
      value={value}
      onChange={setValue}
      wcagLevel={level}
    />
  );
};

const AccordionWcagSample: React.FC<{ level: ComponentWCAGLevel }> = ({
  level,
}) => (
  <Accordion wcagLevel={level}>
    <AccordionSummary>FAQ ({level})</AccordionSummary>
    <AccordionContent>
      キーボード操作で Tab → Space/Enter で開閉できます。
    </AccordionContent>
  </Accordion>
);

const BreadcrumbsWcagSample: React.FC<{ level: ComponentWCAGLevel }> = ({
  level,
}) => (
  <Breadcrumbs wcagLevel={level}>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/guide">ガイド</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>アクセシビリティ</BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumbs>
);

const wcagTableSampleRows = [
  { name: "A-101", status: "進行中", owner: "Sato" },
  { name: "A-102", status: "完了", owner: "Tanaka" },
] as const;

const TableWcagSample: React.FC<{ level: ComponentWCAGLevel }> = ({
  level,
}) => (
  <Table
    caption={`ミニテーブル (${level})`}
    variant="simple"
    size="sm"
    wcagLevel={level}
  >
    <TableHeader>
      <TableRow>
        <TableHeaderCell>タスク</TableHeaderCell>
        <TableHeaderCell>状態</TableHeaderCell>
        <TableHeaderCell>担当</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {wcagTableSampleRows.map((row) => (
        <TableRow key={row.name}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell>{row.owner}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const FocusColorLegend: React.FC<{ level: ComponentWCAGLevel }> = ({ level }) => {
  const config = wcagFocusDetails[level];
  const rows = [
    { label: "背景色", value: config.backgroundLabel, color: config.background },
    { label: "アウトライン色", value: config.outlineLabel, color: config.outline },
    { label: "アウトライン太さ", value: config.outlineWidth },
    { label: "アウトラインオフセット", value: config.outlineOffset },
    { label: "推奨文字色", value: config.textLabel, color: config.text },
  ];

  return (
    <dl
      className={css({
        mt: 4,
        p: 4,
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.default",
        backgroundColor: "bg.tertiary",
        borderRadius: "md",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      })}
    >
      {rows.map((row) => (
        <div
          key={`${level}-${row.label}`}
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          })}
        >
          <dt
            className={css({
              margin: 0,
              fontSize: "sm",
              color: "contents.secondary",
            })}
          >
            {row.label}
          </dt>
          <dd
            className={css({
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 2,
              fontFamily: "mono",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            {row.color ? (
              <span
                aria-hidden="true"
                className={css({
                  width: 4,
                  height: 4,
                  borderRadius: "sm",
                  borderWidth: "thin",
                  borderStyle: "solid",
                  borderColor: "border.subtle",
                  backgroundColor: row.color,
                })}
              />
            ) : null}
            <span>{row.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
};

const wcagGalleryItems: {
  key: string;
  title: string;
  description: string;
  render: (level: ComponentWCAGLevel) => React.ReactNode;
}[] = [
  {
    key: "button",
    title: "Button",
    description: "wcagLevel を指定するとフォーカスリングとコントラストが切り替わります。",
    render: (level) => (
      <Button wcagLevel={level} variant="primary">
        レベル {level} のボタン
      </Button>
    ),
  },
  {
    key: "input",
    title: "Input",
    description: "フォームフィールドのフォーカス背景/枠線がレベルごとに変化します。",
    render: (level) => (
      <Input
        wcagLevel={level}
        label={`お名前 (${level})`}
        placeholder="山田太郎"
        defaultValue="山田太郎"
      />
    ),
  },
  {
    key: "textarea",
    title: "TextArea",
    description: "長文入力でも AA/AAA のフォーカスを選択できます。",
    render: (level) => (
      <TextArea
        wcagLevel={level}
        label={`メモ (${level})`}
        defaultValue="キーボード操作時のフォーカスを確認してください。"
      />
    ),
  },
  {
    key: "select",
    title: "Select",
    description: "選択肢のトリガーにもレベル別アウトラインを適用できます。",
    render: (level) => (
      <Select
        wcagLevel={level}
        label={`国 (${level})`}
        defaultValue="jp"
        options={[
          { value: "jp", label: "日本" },
          { value: "us", label: "アメリカ" },
        ]}
      />
    ),
  },
  {
    key: "checkbox",
    title: "Checkbox",
    description: "チェック状態の枠線を強調したい場合に AAA を選択します。",
    render: (level) => (
      <Checkbox
        wcagLevel={level}
        label={`メール通知 (${level})`}
        defaultChecked
      />
    ),
  },
  {
    key: "dropdown",
    title: "Dropdown",
    description: "カスタム UI でも wcagLevel を渡せばAA/AAA を切替可能です。",
    render: (level) => <DropdownWcagSample level={level} />,
  },
  {
    key: "infobox",
    title: "InfoBox",
    description: "情報カードの境界線・背景のコントラストを段階的に調整します。",
    render: (level) => (
      <InfoBox
        wcagLevel={level}
        variant="info"
        title={`お知らせ (${level})`}
      >
        重要なメッセージは InfoBox で伝えます。フォーカスはタブ移動で確認できます。
      </InfoBox>
    ),
  },
  {
    key: "accordion",
    title: "Accordion",
    description: "summary 要素のフォーカスリングがレベルに応じて強調されます。",
    render: (level) => <AccordionWcagSample level={level} />,
  },
  {
    key: "breadcrumbs",
    title: "Breadcrumbs",
    description: "リンクのフォーカスリングと文字色を AA/AAA で切り替え可能です。",
    render: (level) => <BreadcrumbsWcagSample level={level} />,
  },
  {
    key: "table",
    title: "Table",
    description: "テーブル全体のヘッダー/セル/フォーカスリングがレベルに合わせて変化します。",
    render: (level) => <TableWcagSample level={level} />,
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
        id="wcag-focus-summary"
        className={css({
          mb: 12,
          p: 6,
          bg: "bg.primary",
          rounded: "lg",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          boxShadow: "md",
        })}
      >
        <SectionHeading>
          WCAG レベル AA / AAA の違い
        </SectionHeading>
        <p
          className={css({
            color: "contents.primary",
            lineHeight: "relaxed",
            mb: 6,
          })}
        >
          すべてのコンポーネントは <strong>WCAG AA</strong> をデフォルトにしています。
          さらに強いフォーカスやコントラストが必要な画面では <strong>AAA</strong> を指定してください。
          ここでは「いつ AA を使い」「いつ AAA を検討するか」の指針をまとめました。
        </p>
        <div
          className={css({
            display: "grid",
            gap: 4,
            gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          })}
        >
          <div
            className={css({
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "blue.200",
              rounded: "md",
              bg: "blue.50",
              p: 4,
            })}
          >
            <h3
              className={css({
                m: 0,
                fontSize: "lg",
                fontWeight: "semibold",
                color: "blue.900",
              })}
            >
              レベル AA（推奨 / デフォルト）
            </h3>
            <ul
              className={css({
                mt: 3,
                pl: 5,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              <li>コントラスト比 4.5:1 以上。ほとんどの UI で要件を満たす。</li>
              <li>フォーカスは薄い青背景 + 3px アウトライン（見やすさと控えめさのバランス）。</li>
              <li>企業サイト・アプリ・管理画面など、一般的なプロダクトで使用。</li>
              <li>「強調し過ぎないが確かに見える」必要があるパーツに適用。</li>
            </ul>
            <div
              className={css({
                mt: 4,
              })}
            >
              <p
                className={css({
                  m: 0,
                  mb: 2,
                  fontSize: "sm",
                  color: "contents.secondary",
                })}
              >
                フォーカスリング/背景/文字色の仕様
              </p>
              <FocusColorLegend level="AA" />
            </div>
          </div>
          <div
            className={css({
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "yellow.400",
              rounded: "md",
              bg: "yellow.50",
              p: 4,
            })}
          >
            <h3
              className={css({
                m: 0,
                fontSize: "lg",
                fontWeight: "semibold",
                color: "orange.900",
              })}
            >
              レベル AAA（最大強調）
            </h3>
            <ul
              className={css({
                mt: 3,
                pl: 5,
                lineHeight: "relaxed",
                color: "contents.primary",
              })}
            >
              <li>コントラスト比 7:1 以上。弱視ユーザー向けにフォーカスを最優先で見せる。</li>
              <li>黄色背景 + 黒アウトライン（4px）で確実に視認できる表現に切り替わる。</li>
              <li>医療・公共・金融・申請系など、入力ミスが致命的な画面で使用。</li>
              <li>AA では見逃される、と判断したコンポーネントにピンポイント適用。</li>
            </ul>
            <div
              className={css({
                mt: 4,
              })}
            >
              <p
                className={css({
                  m: 0,
                  mb: 2,
                  fontSize: "sm",
                  color: "contents.secondary",
                })}
              >
                フォーカスリング/背景/文字色の仕様
              </p>
              <FocusColorLegend level="AAA" />
            </div>
          </div>
        </div>
        <p
          className={css({
            mt: 4,
            fontSize: "sm",
            color: "contents.secondary",
            lineHeight: "relaxed",
          })}
        >
          補足: AAA を選んでもボタンやリンク本体の配色（青・赤など）のブランド性は保持されます。
          フォーカス時のみ上の仕様で黄色背景 + 黒アウトライン（または薄い青 + 濃い青）に切り替わる設計です。
          すべてのレシピで <code>wcagLevel</code> variant がこの定義を参照します。
        </p>
        <div
          className={css({
            mt: 6,
            p: 4,
            bg: "bg.secondary",
            rounded: "md",
            borderWidth: "dashed",
            borderColor: "border.default",
            lineHeight: "relaxed",
            color: "contents.primary",
          })}
        >
          <p className={css({ m: 0 })}>
            実装では <code>wcagLevel</code> プロップ（または Panda レシピの <code>wcagLevel</code> variant）
            に <code>"AA"</code> か <code>"AAA"</code> を指定します。
            迷ったら AA にし、AAA が必要な理由（業務フロー・想定ユーザー）をコメントやドキュメントに残して運用するとレビュー時に議論しやすくなります。
          </p>
        </div>
        <div className={css({ mt: 8 })}>
          <Table
            caption="コンポーネントごとの AA / AAA 使い分け"
            variant="striped"
            size="md"
            wcagLevel="AA"
            responsive
          >
            <TableHeader>
              <TableRow>
                <TableHeaderCell>コンポーネント</TableHeaderCell>
                <TableHeaderCell>AA（デフォルト）</TableHeaderCell>
                <TableHeaderCell>AAA（必要に応じて）</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wcagComponentMatrix.map((row) => (
                <TableRow key={row.component}>
                  <TableCell>{row.component}</TableCell>
                  <TableCell>{row.aa}</TableCell>
                  <TableCell>{row.aaa}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section
        id="wcag-component-gallery"
        className={css({
          mb: 12,
          p: 6,
          bg: "bg.primary",
          rounded: "lg",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          boxShadow: "md",
        })}
      >
        <SectionHeading>コンポーネント別 AA / AAA デモ</SectionHeading>
        <p
          className={css({
            color: "contents.primary",
            lineHeight: "relaxed",
            mb: 6,
          })}
        >
          下のカードでは、それぞれのコンポーネントで <code>wcagLevel</code> を切り替えたときの表示を比較できます。
          Tab キーでフォーカスを当てると違いが分かりやすくなります。
        </p>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: 6,
          })}
        >
          {wcagGalleryItems.map((item) => (
            <div
              key={item.key}
              className={css({
                borderWidth: "thin",
                borderStyle: "solid",
                borderColor: "border.default",
                rounded: "lg",
                p: 4,
                backgroundColor: "bg.secondary",
              })}
            >
              <h3
                className={css({
                  marginTop: 0,
                  marginBottom: 2,
                  fontSize: "xl",
                  color: "contents.primary",
                })}
              >
                {item.title}
              </h3>
              <p
                className={css({
                  marginTop: 0,
                  marginBottom: 4,
                  color: "contents.secondary",
                  lineHeight: "relaxed",
                })}
              >
                {item.description}
              </p>
              <div
                className={css({
                  display: "grid",
                  gap: 4,
                  gridTemplateColumns: {
                    base: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                  },
                })}
              >
                {(["AA", "AAA"] as ComponentWCAGLevel[]).map((level) => (
                  <div
                    key={level}
                    className={css({
                      borderWidth: "thin",
                      borderStyle: "solid",
                      borderColor:
                        level === "AAA" ? "yellow.400" : "blue.200",
                      backgroundColor:
                        level === "AAA" ? "yellow.50" : "blue.50",
                      rounded: "md",
                      p: 4,
                    })}
                  >
                    <p
                      className={css({
                        marginTop: 0,
                        marginBottom: 3,
                        fontWeight: "semibold",
                        color:
                          level === "AAA" ? "orange.900" : "blue.900",
                      })}
                    >
                      レベル {level}
                    </p>
                    <div>{item.render(level)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
            VoiceOver (macOS) では入力欄にフォーカスした後 <strong>Control + Option + Shift + H</strong>{" "}
            でヘルプテキスト（aria-describedby）を読めます。NVDA/JAWS では初回フォーカス時に自動読み上げされます。
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
        </div>
      </section>
    </>
  );
};
