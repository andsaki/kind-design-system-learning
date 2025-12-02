import { css } from "@/styled-system/css";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "../design-system/components";

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

export const TablePage = () => {
  return (
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
  );
};
