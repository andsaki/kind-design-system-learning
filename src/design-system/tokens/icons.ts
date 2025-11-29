/**
 * アイコントークンの再エクスポート
 *
 * 実体は Panda CSS 用の型定義と共有するため `panda-config` 側で
 * 管理しているので、ここではそれらをアプリケーションから参照しやすい
 * 形でまとめて再エクスポートする。
 */

export {
  icons,
  philosophy,
  component,
  concept,
} from '../../../panda-config/types/icons';

export type { IconTokens } from '../../../panda-config/types/icons';
