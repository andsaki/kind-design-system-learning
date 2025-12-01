import type { ComponentProps } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from './Table';

const renderTable = (props?: Partial<ComponentProps<typeof Table>>) => {
  return render(
    <Table caption="テーブルの説明" {...props}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>列1</TableHeaderCell>
          <TableHeaderCell>列2</TableHeaderCell>
          <TableHeaderCell align="right">数値</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>セル1</TableCell>
          <TableCell>セル2</TableCell>
          <TableCell isNumeric>42</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );
};

describe('Table', () => {
  it('captionをアクセシブルネームとして利用できる', () => {
    renderTable();
    const table = screen.getByRole('table', { name: 'テーブルの説明' });
    expect(table).toBeInTheDocument();
    expect(table).toHaveAttribute('data-size', 'md');
  });

  it('srOnlyCaptionでcaptionを非表示にできる', () => {
    renderTable({ srOnlyCaption: true });
    const caption = screen.getByText('テーブルの説明');
    expect(caption.tagName).toBe('CAPTION');
    expect(caption).toHaveAttribute('data-sr-only', 'true');
  });

  it('variantやstickyHeaderなどの状態をデータ属性で公開する', () => {
    renderTable({
      variant: 'striped',
      stickyHeader: true,
      showColumnDividers: true,
      highlightOnHover: false,
    });
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('data-variant', 'striped');
    expect(table).toHaveAttribute('data-sticky-header', 'true');
    expect(table).toHaveAttribute('data-column-dividers', 'true');
    expect(table).toHaveAttribute('data-hover', 'false');
  });

  it('TableCellが数値列を右寄せできる', () => {
    renderTable();
    const numericCell = screen.getByText('42').closest('td');
    expect(numericCell).toHaveAttribute('data-align', 'right');
  });

  it('ヘッダーセルに説明文を表示できる', () => {
    render(
      <Table caption="説明">
        <TableHeader>
          <TableRow>
            <TableHeaderCell helpText="補足情報">タイトル</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>値</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('補足情報')).toBeInTheDocument();
  });

  it('レスポンシブコンテナーの有無を切り替えられる', () => {
    renderTable({ responsive: false });
    const table = screen.getByRole('table');
    const container = table.parentElement;
    expect(container).toHaveAttribute('data-responsive', 'false');
    expect(container).not.toHaveAttribute('role', 'region');
  });
});
