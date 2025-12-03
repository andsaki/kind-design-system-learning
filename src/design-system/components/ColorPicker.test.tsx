import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
});
