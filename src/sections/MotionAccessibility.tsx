import { css } from "@/styled-system/css";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "../design-system/components";
import { icons } from "../design-system/tokens/icons";

// 検索用メタデータ
export const searchMetadata = {
  title: "モーションとアニメーション",
  path: "/accessibility/motion",
  headings: [
    "アニメーションの必要性を検討する",
    "prefers-reduced-motionに対応する",
    "ユーザーコントロールを提供する",
    "安全なアニメーションガイドライン"
  ],
  keywords: [
    "モーション", "アニメーション", "prefers-reduced-motion", "前庭障害", "てんかん",
    "ADHD", "視差効果", "自動再生", "一時停止", "ユーザーコントロール",
    "アニメーションの必要性", "回避方法", "アクセシビリティ"
  ]
};

const inlineCodeClass = css({
  backgroundColor: "bg.tertiary",
  paddingY: 1,
  paddingX: 2,
  borderRadius: "sm",
  fontFamily: "monospace",
  fontSize: "0.9em",
});

export function MotionAccessibility() {
  return (
    <section
      id="motion-accessibility"
      className={css({
        marginBottom: 12,
        padding: 6,
        backgroundColor: "bg.primary",
        borderRadius: "lg",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.default",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      })}
    >
      <h2
        className={css({
          marginTop: 0,
          color: "contents.primary",
          fontSize: "2xl",
          fontWeight: "bold",
          borderBottomWidth: "thick",
          borderBottomStyle: "solid",
          borderBottomColor: "pink.500",
          paddingBottom: 2,
          marginBottom: 4,
          display: "flex",
          alignItems: "center",
          gap: 2,
        })}
      >
        <icons.philosophy.inclusive
          size={28}
          color={"pink.600"}
          strokeWidth={2}
        />
        モーションとアニメーションのアクセシビリティ
      </h2>

      <p
        className={css({
          color: "contents.secondary",
          marginBottom: 6,
          lineHeight: "relaxed",
        })}
      >
        アニメーションは視覚的な魅力を高めますが、一部のユーザー（前庭障害、てんかん、注意欠陥障害など）にとっては
        <strong>不快感や健康被害</strong>を引き起こす可能性があります。
        採用前に必要性を検討し、採用する場合はユーザーが無効化できる仕組みを提供しましょう。
      </p>

      <div
        className={css({
          marginTop: 6,
          padding: 4,
          backgroundColor: "bg.secondary",
          borderRadius: "base",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.warning",
        })}
      >
        <p
          className={css({
            marginTop: 0,
            marginBottom: 2,
            fontWeight: "bold",
            color: "contents.primary",
          })}
        >
          ⚠️ アニメーションが引き起こす問題
        </p>
        <ul
          className={css({
            marginY: 2,
            paddingLeft: 6,
            lineHeight: "relaxed",
            color: "contents.primary",
          })}
        >
          <li>
            <strong>前庭障害</strong>: めまい、吐き気、平衡感覚の喪失
          </li>
          <li>
            <strong>光感受性てんかん</strong>: 点滅やフラッシュによる発作
          </li>
          <li>
            <strong>注意欠陥障害（ADHD）</strong>: 集中力の妨げ
          </li>
          <li>
            <strong>認知障害</strong>: 情報理解の困難
          </li>
        </ul>
      </div>

      {/* ステップ1 */}
      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <icons.concept.wcag size={24} color={"blue.600"} strokeWidth={2} />
          ステップ1: アニメーションの必要性を検討する
        </h3>

        <div
          className={css({
            marginTop: 3,
            padding: 3,
            backgroundColor: "bg.secondary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.info",
          })}
        >
          <p
            className={css({
              marginTop: 0,
              marginBottom: 2,
              fontWeight: "bold",
              color: "contents.primary",
            })}
          >
            💡 採用前に自問する
          </p>
          <ul
            className={css({
              marginY: 2,
              paddingLeft: 6,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <li>
              このアニメーションは<strong>機能的な目的</strong>があるか？
            </li>
            <li>
              ユーザー体験を<strong>本質的に改善</strong>するか？
            </li>
            <li>
              情報を<strong>理解しやすく</strong>しているか？
            </li>
            <li>
              単なる<strong>装飾</strong>ではないか？
            </li>
          </ul>
        </div>

        <div
          className={css({
            marginTop: 3,
            padding: 3,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.success",
          })}
        >
          <strong className={css({ color: "contents.success" })}>
            ✅ 機能的なアニメーション（推奨）
          </strong>
          <ul
            className={css({
              marginTop: 2,
              marginBottom: 0,
              paddingLeft: 6,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <li>
              <strong>フィードバック</strong>: ボタンクリック時の視覚的確認
            </li>
            <li>
              <strong>状態変化の表示</strong>: ローディング、成功、エラー
            </li>
            <li>
              <strong>空間的な関係性</strong>: ドロワーの開閉、モーダルの表示
            </li>
            <li>
              <strong>注意の誘導</strong>: 重要な変更や通知
            </li>
          </ul>
        </div>

        <div
          className={css({
            marginTop: 3,
            padding: 3,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.error",
          })}
        >
          <strong className={css({ color: "contents.error" })}>
            ❌ 不要なアニメーション（避けるべき）
          </strong>
          <ul
            className={css({
              marginTop: 2,
              marginBottom: 0,
              paddingLeft: 6,
              lineHeight: "relaxed",
              color: "contents.primary",
            })}
          >
            <li>
              <strong>装飾目的のみ</strong>: ページロード時の派手な演出
            </li>
            <li>
              <strong>自動再生される背景動画</strong>: 注意散漫の原因
            </li>
            <li>
              <strong>連続的なループアニメーション</strong>:
              停止できない場合は問題
            </li>
            <li>
              <strong>視差スクロール</strong>:
              過度な使用は前庭障害を引き起こす
            </li>
          </ul>
        </div>
      </div>

      {/* ステップ2 */}
      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          ステップ2: prefers-reduced-motionに対応する
        </h3>

        <p
          className={css({
            marginTop: 2,
            marginBottom: 3,
            lineHeight: "relaxed",
            color: "contents.primary",
          })}
        >
          <code className={inlineCodeClass}>prefers-reduced-motion</code>
          メディアクエリを使用して、OSレベルでモーション削減を設定したユーザーに配慮します。
        </p>

        <div
          className={css({
            marginTop: 3,
            padding: 3,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.success",
          })}
        >
          <strong className={css({ color: "contents.success" })}>
            ✅ 良い例: CSSでの実装
          </strong>
          <pre
            className={css({
              marginTop: 2,
              padding: 3,
              backgroundColor: "bg.tertiary",
              borderRadius: "sm",
              overflow: "auto",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            <code>
              {`/* デフォルト: アニメーションあり */
.button {
  transition: transform 0.3s ease, background-color 0.2s;
}

.button:hover {
  transform: scale(1.05);
}

/* モーション削減設定時: アニメーション無効化 */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }

  .button:hover {
    transform: none;
  }
}`}
            </code>
          </pre>
        </div>

        <div
          className={css({
            marginTop: 3,
            padding: 3,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.success",
          })}
        >
          <strong className={css({ color: "contents.success" })}>
            ✅ 良い例: JavaScriptでの検出
          </strong>
          <pre
            className={css({
              marginTop: 2,
              padding: 3,
              backgroundColor: "bg.tertiary",
              borderRadius: "sm",
              overflow: "auto",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            <code>
              {`// モーション削減設定を検出
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  element.style.animation = 'none';
} else {
  element.style.animation = 'slideIn 0.3s ease';
}`}
            </code>
          </pre>
        </div>

        <div
          className={css({
            marginTop: 3,
            padding: 3,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.success",
          })}
        >
          <strong className={css({ color: "contents.success" })}>
            ✅ 良い例: Reactでの実装
          </strong>
          <pre
            className={css({
              marginTop: 2,
              padding: 3,
              backgroundColor: "bg.tertiary",
              borderRadius: "sm",
              overflow: "auto",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            <code>
              {`import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}`}
            </code>
          </pre>
        </div>
      </div>

      {/* ステップ3 */}
      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          ステップ3: ユーザーコントロールを提供する
        </h3>

        <div
          className={css({
            marginTop: 3,
            padding: 3,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.success",
          })}
        >
          <strong className={css({ color: "contents.success" })}>
            ✅ 良い例: アニメーション設定トグル
          </strong>
          <pre
            className={css({
              marginTop: 2,
              padding: 3,
              backgroundColor: "bg.tertiary",
              borderRadius: "sm",
              overflow: "auto",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            <code>
              {`<fieldset>
  <legend>アニメーション設定</legend>
  <label>
    <input type="checkbox" id="reduce-motion" checked />
    アニメーションを削減する
  </label>
  <p class="help-text">
    チェックを入れると、画面のアニメーションや動きが最小限になります。
  </p>
</fieldset>`}
            </code>
          </pre>
        </div>
      </div>

      {/* ステップ4 */}
      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          ステップ4: 安全なアニメーションガイドライン
        </h3>

        <Table
          caption="アニメーションの安全性ガイドライン"
          variant="striped"
          highlightOnHover
          wcagLevel="AA"
        >
          <TableHeader>
            <TableRow>
              <TableHeaderCell>項目</TableHeaderCell>
              <TableHeaderCell>推奨値</TableHeaderCell>
              <TableHeaderCell>理由</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong className={css({ color: "contents.primary" })}>
                  点滅頻度
                </strong>
              </TableCell>
              <TableCell>
                <strong className={css({ color: "contents.error" })}>
                  1秒間に3回以下
                </strong>
              </TableCell>
              <TableCell>光感受性てんかんの予防</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong className={css({ color: "contents.primary" })}>
                  アニメーション時間
                </strong>
              </TableCell>
              <TableCell>5秒以内（推奨: 0.2〜0.5秒）</TableCell>
              <TableCell>快適な体験と待機時間のバランス</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong className={css({ color: "contents.primary" })}>
                  視差効果
                </strong>
              </TableCell>
              <TableCell>最小限、または無効化オプション提供</TableCell>
              <TableCell>前庭障害への配慮</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong className={css({ color: "contents.primary" })}>
                  自動再生
                </strong>
              </TableCell>
              <TableCell>5秒で自動停止、または手動停止可能</TableCell>
              <TableCell>WCAG 2.2.2 基準適合</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong className={css({ color: "contents.primary" })}>
                  画面の大きな領域
                </strong>
              </TableCell>
              <TableCell>全画面の25%以下</TableCell>
              <TableCell>視覚的ストレスの軽減</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* OS設定方法 */}
      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            marginTop: 0,
            marginBottom: 4,
            color: "contents.primary",
            fontSize: "xl",
            fontWeight: "semibold",
          })}
        >
          OS設定でモーション削減を有効化する方法
        </h3>

        <div
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
            gap: 3,
            marginTop: 3,
          })}
        >
          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.secondary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
            })}
          >
            <strong className={css({ color: "contents.primary" })}>
              macOS
            </strong>
            <ol
              className={css({
                marginTop: 2,
                paddingLeft: 6,
                fontSize: "sm",
                lineHeight: "relaxed",
                color: "contents.secondary",
              })}
            >
              <li>システム設定を開く</li>
              <li>「アクセシビリティ」→「ディスプレイ」</li>
              <li>「視差効果を減らす」をオン</li>
            </ol>
          </div>

          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.secondary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
            })}
          >
            <strong className={css({ color: "contents.primary" })}>
              Windows
            </strong>
            <ol
              className={css({
                marginTop: 2,
                paddingLeft: 6,
                fontSize: "sm",
                lineHeight: "relaxed",
                color: "contents.secondary",
              })}
            >
              <li>設定を開く</li>
              <li>「簡単操作」→「ディスプレイ」</li>
              <li>「Windowsでアニメーションを表示する」をオフ</li>
            </ol>
          </div>

          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.secondary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
            })}
          >
            <strong className={css({ color: "contents.primary" })}>iOS</strong>
            <ol
              className={css({
                marginTop: 2,
                paddingLeft: 6,
                fontSize: "sm",
                lineHeight: "relaxed",
                color: "contents.secondary",
              })}
            >
              <li>設定を開く</li>
              <li>「アクセシビリティ」→「動作」</li>
              <li>「視差効果を減らす」をオン</li>
            </ol>
          </div>

          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.secondary",
              borderRadius: "base",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
            })}
          >
            <strong className={css({ color: "contents.primary" })}>
              Android
            </strong>
            <ol
              className={css({
                marginTop: 2,
                paddingLeft: 6,
                fontSize: "sm",
                lineHeight: "relaxed",
                color: "contents.secondary",
              })}
            >
              <li>設定を開く</li>
              <li>「ユーザー補助」→「視覚」</li>
              <li>「アニメーションを無効化」をオン</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
