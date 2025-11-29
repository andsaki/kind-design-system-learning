import type { Config } from "@pandacss/dev";

/**
 * Panda CSS設定から型を抽出するためのヘルパー型
 *
 * 嬉しいポイント:
 * - panda.config.tsでトークンを定義すると、自動的に型が生成される
 * - typoを防げる（存在しないトークン名はエラーになる）
 * - VSCodeで補完が効く（Ctrl+Spaceでトークン一覧が出る）
 */

/**
 * Config型からtheme.extend.tokensの型を抽出
 * これにより、定義したトークンの型が自動的に推論される
 */
export type GetPandaConfigMap<
  T extends keyof Required<Required<Config>["theme"]>["tokens"],
> = Required<Required<Config>["theme"]>["tokens"][T];

/**
 * Config型からtheme.extend.semanticTokensの型を抽出
 * セマンティックトークン（bg.primary、contents.primaryなど）の型を推論
 */
export type GetPandaSemanticToken<
  T extends keyof Required<Required<Config>["theme"]>["semanticTokens"],
> = Required<Required<Config>["theme"]>["semanticTokens"][T];
