import type { GetPandaSemanticToken } from "./interfaces";

/**
 * セマンティックカラートークンの型安全な定義
 *
 * 嬉しいポイント:
 * 1. VSCodeで補完が効く
 *    - bg.primary, contents.primary など、定義済みのトークンが候補に出る
 *    - 存在しないトークン名を書くとエラーになる（typo防止）
 *
 * 2. ダークモード対応が型安全
 *    - { base: string, _dark: string } の形式を強制
 *    - ダークモードの定義漏れを防げる
 *
 * 3. リファクタリングが安全
 *    - トークン名変更時、全ての使用箇所がエラーになる
 *    - 変更漏れを防げる
 *
 * 4. ドキュメント効果
 *    - どんなセマンティックトークンが存在するか一目瞭然
 *    - コメントで各トークンの用途を説明できる
 */
export const pandaSemanticColors: GetPandaSemanticToken<"colors"> = {
  // ブランドカラー - サイト全体で使用するプライマリカラー
  brand: {
    primary: { value: "#2196f3" },
    primaryLight: { value: "#64b5f6" },
    primaryDark: { value: "#1976d2" },
  },

  // 背景カラー - ライト/ダークモード対応
  bg: {
    primary: { value: { base: "{colors.white}", _dark: "{colors.gray.900}" } },
    secondary: { value: { base: "{colors.gray.50}", _dark: "{colors.gray.800}" } },
    tertiary: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.700}" } },
    hover: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.700}" } },
    active: { value: { base: "{colors.gray.200}", _dark: "{colors.gray.600}" } },
    disabled: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.800}" } },
  },

  // コンテンツカラー - テキストやアイコンなど
  contents: {
    primary: { value: { base: "{colors.gray.900}", _dark: "{colors.gray.100}" } },
    secondary: { value: { base: "{colors.gray.700}", _dark: "{colors.gray.200}" } },
    tertiary: { value: { base: "{colors.gray.600}", _dark: "{colors.gray.300}" } },
    disabled: { value: { base: "{colors.gray.400}", _dark: "{colors.gray.600}" } },
    inverse: { value: { base: "{colors.white}", _dark: "{colors.gray.900}" } },
    link: { value: { base: "{colors.blue.600}", _dark: "#63b3ff" } },
    linkHover: { value: { base: "{colors.blue.700}", _dark: "#8cc8ff" } },
    error: { value: { base: "{colors.red.600}", _dark: "{colors.red.400}" } },
    success: { value: { base: "{colors.green.600}", _dark: "{colors.green.400}" } },
    warning: { value: { base: "{colors.orange.600}", _dark: "{colors.orange.400}" } },
  },

  // 状態色 - 成功/警告などのアクセント
  accent: {
    primary: { value: { base: "{colors.blue.600}", _dark: "{colors.blue.400}" } },
    success: { value: { base: "{colors.green.600}", _dark: "{colors.green.400}" } },
    error: { value: { base: "{colors.red.600}", _dark: "{colors.red.400}" } },
    warn: { value: { base: "{colors.orange.600}", _dark: "{colors.orange.400}" } },
    disabled: { value: { base: "{colors.gray.400}", _dark: "{colors.gray.600}" } },
  },

  // ボーダーカラー - ライト/ダークモード対応
  border: {
    default: { value: { base: "{colors.gray.300}", _dark: "{colors.gray.700}" } },
    subtle: { value: { base: "{colors.gray.200}", _dark: "{colors.gray.800}" } },
    strong: { value: { base: "{colors.gray.400}", _dark: "{colors.gray.600}" } },
    hover: { value: { base: "{colors.gray.400}", _dark: "{colors.gray.600}" } },
    focus: { value: "{colors.blue.500}" },
    error: { value: "{colors.red.500}" },
    success: { value: "{colors.green.500}" },
    warning: { value: "{colors.orange.500}" },
  },

  // アコーディオンカラー - コンポーネント固有
  accordion: {
    bg: { value: { base: "{colors.white}", _dark: "{colors.gray.800}" } },
    bgHover: { value: { base: "{colors.gray.50}", _dark: "{colors.gray.700}" } },
    bgActive: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.600}" } },
    bgOpen: { value: { base: "{colors.gray.50}", _dark: "{colors.gray.800}" } },
    border: { value: { base: "{colors.gray.300}", _dark: "{colors.gray.700}" } },
    text: { value: { base: "{colors.gray.900}", _dark: "{colors.gray.100}" } },
    icon: { value: { base: "{colors.gray.600}", _dark: "{colors.gray.300}" } },
  },

  // インプットカラー - フォーム要素用
  input: {
    bg: { value: { base: "{colors.white}", _dark: "{colors.gray.800}" } },
    bgDisabled: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.700}" } },
    text: { value: { base: "{colors.gray.900}", _dark: "{colors.gray.100}" } },
    textDisabled: { value: { base: "{colors.gray.500}", _dark: "{colors.gray.600}" } },
    placeholder: { value: { base: "{colors.gray.500}", _dark: "{colors.gray.500}" } },
    border: { value: { base: "{colors.gray.300}", _dark: "{colors.gray.700}" } },
    borderHover: { value: { base: "{colors.gray.400}", _dark: "{colors.gray.600}" } },
    borderFocus: { value: "{colors.blue.500}" },
    borderError: { value: "{colors.red.500}" },
    borderSuccess: { value: "{colors.green.500}" },
    label: { value: { base: "{colors.gray.700}", _dark: "{colors.gray.200}" } },
    helperText: { value: { base: "{colors.gray.600}", _dark: "{colors.gray.300}" } },
    errorText: { value: { base: "{colors.red.700}", _dark: "{colors.red.400}" } },
  },
};
