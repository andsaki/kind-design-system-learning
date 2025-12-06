import React from "react";
import { cx } from "@/styled-system/css";
import { table } from "@/styled-system/recipes";
import type { ComponentWCAGLevel } from "../constants/accessibility";

const srOnlyClass = {
  position: "absolute" as const,
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap" as const,
  border: 0,
};

export type TableVariant = "simple" | "striped";
export type TableSize = "sm" | "md" | "lg";

type TableContextValue = {
  size: TableSize;
  variant: TableVariant;
  stickyHeader: boolean;
  highlightOnHover: boolean;
  showColumnDividers: boolean;
  wcagLevel: ComponentWCAGLevel;
};

const defaultContext: TableContextValue = {
  size: "md",
  variant: "simple",
  stickyHeader: false,
  highlightOnHover: true,
  showColumnDividers: false,
  wcagLevel: "AA",
};

const TableContext = React.createContext<TableContextValue>(defaultContext);
const useTableContext = () => React.useContext(TableContext);

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /** 表の説明。caption要素としてレンダリングされます */
  caption?: React.ReactNode;
  /** captionの配置 */
  captionPlacement?: "top" | "bottom";
  /** 視覚的に隠すがスクリーンリーダーには読み上げるかどうか */
  srOnlyCaption?: boolean;
  /** テーブルのバリエーション */
  variant?: TableVariant;
  /** セルの密度 */
  size?: TableSize;
  /** ヘッダーをスクロール時に固定するか */
  stickyHeader?: boolean;
  /** 行ホバー時のハイライトを有効にするか */
  highlightOnHover?: boolean;
  /** 列の区切り線を表示するか */
  showColumnDividers?: boolean;
  /** WCAGコントラストレベル (AA/AAA) */
  wcagLevel?: ComponentWCAGLevel;
  /** 横スクロール用コンテナーのARIAラベル */
  responsiveLabel?: string;
  /** コンテナーをスクロール可能にするか */
  responsive?: boolean;
}

/**
 * WCAGを満たすアクセシブルなテーブルコンポーネント
 *
 * - captionとSR-onlyのサポート
 * - sticky header / striped / hover highlight
 * - 列の区切り線 / レスポンシブコンテナー
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      caption,
      captionPlacement = "top",
      srOnlyCaption = false,
      variant = "simple",
      size = "md",
      stickyHeader = false,
      highlightOnHover = true,
      showColumnDividers = false,
      wcagLevel = "AA",
      responsiveLabel = "スクロール可能なテーブル",
      responsive = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const contextValue = React.useMemo(
      () => ({
        size,
        variant,
        stickyHeader,
        highlightOnHover,
        showColumnDividers,
        wcagLevel,
      }),
      [size, variant, stickyHeader, highlightOnHover, showColumnDividers, wcagLevel],
    );

    const classes = table({
      size,
      variant,
      wcagLevel,
      responsive,
      stickyHeader,
      highlightOnHover,
      showColumnDividers,
    });

    return (
      <TableContext.Provider value={contextValue}>
        <div
          className={classes.container}
          data-responsive={responsive ? "true" : "false"}
          role={responsive ? "region" : undefined}
          aria-label={responsive ? responsiveLabel : undefined}
          tabIndex={responsive ? 0 : undefined}
        >
          <table
            ref={ref}
            className={cx(classes.root, className)}
            data-variant={variant}
            data-size={size}
            data-sticky-header={stickyHeader ? "true" : "false"}
            data-hover={highlightOnHover ? "true" : "false"}
            data-column-dividers={showColumnDividers ? "true" : "false"}
            data-wcag-level={wcagLevel}
            {...props}
          >
            {caption && (
              <TableCaption placement={captionPlacement} srOnly={srOnlyCaption}>
                {caption}
              </TableCaption>
            )}
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  },
);

Table.displayName = "Table";

export interface TableSectionProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableSectionProps> = ({
  className,
  children,
  ...props
}) => (
  <thead className={className} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<TableSectionProps> = ({
  className,
  children,
  ...props
}) => (
  <tbody className={className} {...props}>
    {children}
  </tbody>
);

export const TableFooter: React.FC<TableSectionProps> = ({
  className,
  children,
  ...props
}) => (
  <tfoot className={className} {...props}>
    {children}
  </tfoot>
);

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({
  className,
  children,
  ...props
}) => {
  const classes = table();

  return (
    <tr className={cx(classes.row, className)} {...props}>
      {children}
    </tr>
  );
};

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  helpText?: React.ReactNode;
  sortDirection?: "ascending" | "descending" | "none";
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  align = "left",
  helpText,
  sortDirection,
  className,
  scope = "col",
  ...props
}) => {
  const { size, stickyHeader, showColumnDividers, wcagLevel } = useTableContext();
  const helpTextId = React.useId();
  const classes = table({ size, wcagLevel, stickyHeader, showColumnDividers });

  return (
    <th
      scope={scope}
      data-align={align}
      className={cx(classes.headerCell, className)}
      style={{ textAlign: align }}
      aria-sort={sortDirection}
      aria-describedby={helpText ? helpTextId : undefined}
      {...props}
    >
      <span style={{ display: "block" }}>{children}</span>
      {helpText && (
        <span
          id={helpTextId}
          style={{
            display: "block",
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            fontWeight: "normal",
            color: "var(--colors-contents-tertiary)",
          }}
        >
          {helpText}
        </span>
      )}
    </th>
  );
};

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  isNumeric?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  align = "left",
  isNumeric = false,
  className,
  ...props
}) => {
  const { size, showColumnDividers, wcagLevel } = useTableContext();
  const classes = table({ size, wcagLevel, showColumnDividers });

  return (
    <td
      data-align={isNumeric ? "right" : align}
      className={cx(classes.cell, className)}
      style={{
        textAlign: isNumeric ? "right" : align,
        fontVariantNumeric: isNumeric ? "tabular-nums" : undefined,
      }}
      {...props}
    >
      {children}
    </td>
  );
};

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode;
  placement?: "top" | "bottom";
  srOnly?: boolean;
}

export const TableCaption: React.FC<TableCaptionProps> = ({
  children,
  placement = "top",
  srOnly = false,
  className,
  ...props
}) => {
  const { wcagLevel } = useTableContext();
  const classes = table({ wcagLevel });

  return (
    <caption
      className={cx(classes.caption, className)}
      style={{
        captionSide: placement,
        ...(srOnly ? srOnlyClass : {}),
      }}
      data-sr-only={srOnly ? "true" : undefined}
      {...props}
    >
      {children}
    </caption>
  );
};
