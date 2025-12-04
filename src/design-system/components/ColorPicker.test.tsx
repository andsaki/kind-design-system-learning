import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColorPicker } from "./ColorPicker";

describe("ColorPicker", () => {
  it("ラベルとカラー入力が関連付けられる", () => {
    render(<ColorPicker label="ブランドカラー" />);
    const input = screen.getByLabelText("ブランドカラー");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "color");
  });

  it("値ラベルが現在のHEXを表示する", () => {
    render(<ColorPicker label="アクセント" value="#123456" />);
    expect(screen.getByText("#123456")).toBeInTheDocument();
  });

  it("changeイベントでonChangeが呼び出される", () => {
    const handleChange = vi.fn();
    render(<ColorPicker label="前景色" onChange={handleChange} />);
    const input = screen.getByLabelText("前景色");
    fireEvent.change(input, { target: { value: "#ff0000" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("非制御モードでは値バッジが更新される", () => {
    render(<ColorPicker label="背景色" defaultValue="#000000" />);
    const input = screen.getByLabelText("背景色");
    fireEvent.change(input, { target: { value: "#abcdef" } });
    expect(screen.getByText("#ABCDEF")).toBeInTheDocument();
  });

  it("helperTextとaria-describedbyが関連付けられる", () => {
    render(<ColorPicker label="カラー" helperText="HEX形式" />);
    const helper = screen.getByText("HEX形式");
    const input = screen.getByLabelText("カラー");
    expect(input).toHaveAttribute("aria-describedby", helper.id);
  });

  it("エラー表示時はaria-invalidがtrueになりrole=alertで表示される", () => {
    render(<ColorPicker label="カラー" error="無効な値です" />);
    const input = screen.getByLabelText("カラー");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("無効な値です");
  });

  it("エラー優先でaria-describedbyがエラー要素を参照する", () => {
    render(<ColorPicker label="brand" helperText="説明" error="エラー" />);
    const input = screen.getByLabelText("brand");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent("エラー");
    expect(screen.queryByText("説明")).not.toBeInTheDocument();
  });

  it("disabled属性が機能する", () => {
    render(<ColorPicker label="固定色" disabled />);
    const input = screen.getByLabelText("固定色");
    expect(input).toBeDisabled();
  });

  it("showValueLabel=false の場合は値バッジを表示しない", () => {
    render(
      <ColorPicker label="隠し値" value="#112233" showValueLabel={false} />
    );
    expect(screen.queryByText("#112233")).not.toBeInTheDocument();
  });

  it("必須マークがレンダリングされ aria-required が設定される", () => {
    render(<ColorPicker label="必須色" required />);
    const label = screen.getByText("必須色");
    expect(label.closest("label")?.querySelector('[aria-label="必須"]')).toBeTruthy();
    const input = screen.getByLabelText(/必須色/);
    expect(input).toHaveAttribute("aria-required", "true");
  });

  it("値バッジは変更時にライブリージョンとして読み上げられる", async () => {
    const user = userEvent.setup();
    render(<ColorPicker label="ライブ" defaultValue="#000000" />);
    const badge = screen.getByText("#000000");
    expect(badge).toHaveAttribute("aria-live", "polite");

    const input = screen.getByLabelText("ライブ");
    await user.click(input);
    fireEvent.change(input, { target: { value: "#ff00ff" } });
    expect(screen.getByText("#FF00FF")).toBeInTheDocument();
  });

  it("サイズとWCAGレベルのバリアントが適用できる", () => {
    render(<ColorPicker label="Variant" size="lg" wcagLevel="AAA" />);
    const input = screen.getByLabelText("Variant");
    expect(input.className).toContain("colorpicker");
  });
});
