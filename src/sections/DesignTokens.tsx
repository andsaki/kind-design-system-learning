import { css } from "@/styled-system/css";
import { icons } from "../design-system/tokens/icons";
import { SectionHeading } from "../components/SectionHeading";

export function DesignTokens() {
  return (
    <section
      id="design-tokens"
      className={css({
        marginBottom: 12,
        padding: 6,
        backgroundColor: "bg.primary",
        borderRadius: "lg",
        borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
        maxWidth: '100%',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      })}
    >
      <h2 className={css({
        marginTop: 0,
        color: "contents.primary",
        fontSize: "2xl",
        fontWeight: 'bold',
        borderBottomWidth: "thick", borderBottomStyle: "solid", borderBottomColor: "border.default",
        paddingBottom: 2,
        marginBottom: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      })}>
        <icons.concept.designTokens size={28} color={"currentColor"} strokeWidth={2} />
        デザイントークンシステム
      </h2>
      <p className={css({ lineHeight: "normal", color: "contents.primary" })}>
        このプロジェクトでは、一貫性のあるデザインを実現するために
        <strong>デザイントークン</strong>を使用しています。
      </p>

      <div className={css({ marginTop: 8 })}>
        <SectionHeading emoji="📏">スペーシング（spacing.ts）</SectionHeading>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}
        >
          <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
            なぜ8pxグリッド？
          </h4>
          <ul className={css({ marginY: 2, paddingLeft: 6, lineHeight: "relaxed", color: "contents.primary" })}>
            <li><strong>倍数で計算しやすい</strong>: 8の倍数は2,4でも割り切れる</li>
            <li><strong>デザイナーとの共通言語</strong>: Figma、Sketchなどでも標準</li>
            <li><strong>レティナディスプレイ対応</strong>: 8px = 4dp（デザインポイント）</li>
            <li><strong>業界標準</strong>: Material Design、Ant Designなど主要システムが採用</li>
          </ul>

          <h4 className={css({ marginTop: 4, color: "contents.primary" })}>
            使い方の原則
          </h4>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 })}>
            <div className={css({ padding: 2, backgroundColor: "bg.secondary", borderRadius: "base" })}>
              <strong>小さい余白（4px, 8px）</strong>: 関連する要素の間
              <div className={css({ marginTop: 1, fontSize: "sm", color: "contents.secondary" })}>
                例: 1 = 4px, 2 = 8px
              </div>
            </div>
            <div className={css({ padding: 2, backgroundColor: "bg.secondary", borderRadius: "base" })}>
              <strong>中程度（16px, 24px）</strong>: セクション内の要素
              <div className={css({ marginTop: 1, fontSize: "sm", color: "contents.secondary" })}>
                例: 4 = 16px, 6 = 24px
              </div>
            </div>
            <div className={css({ padding: 2, backgroundColor: "bg.secondary", borderRadius: "base" })}>
              <strong>大きい余白（32px以上）</strong>: セクション間、ページ構造
              <div className={css({ marginTop: 1, fontSize: "sm", color: "contents.secondary" })}>
                例: 8 = 32px, 12 = 48px
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <SectionHeading emoji="🎨">カラー（colors.ts）</SectionHeading>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}
        >
          <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
            3層構造のカラーシステム
          </h4>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 })}>
            <div>
              <div className={css({ padding: 2, backgroundColor: "bg.secondary", borderRadius: "base", borderWidth: "base", borderStyle: "solid", borderColor: "border.default" })}>
                <strong className={css({ color: "contents.primary" })}>1. プリミティブトークン（primitive）</strong>
                <p className={css({ marginY: 1, fontSize: "sm", color: "contents.secondary" })}>
                  基礎となるカラーパレット。グレースケール、ブルー、レッド、グリーンなど。
                  <br />
                  例: "blue.500", "gray.900"
                </p>
              </div>
            </div>
            <div>
              <div className={css({ padding: 2, backgroundColor: "bg.secondary", borderRadius: "base", borderWidth: "base", borderStyle: "solid", borderColor: "border.success" })}>
                <strong className={css({ color: "contents.primary" })}>2. セマンティックトークン（colors）</strong>
                <p className={css({ marginY: 1, fontSize: "sm", color: "contents.secondary" })}>
                  意味を持った色の定義。contents.primary、background.default、border.focusなど。
                  <br />
                  例: colors.contents.primary, colors.background.subtle
                </p>
              </div>
            </div>
            <div>
              <div className={css({ padding: 2, backgroundColor: "bg.secondary", borderRadius: "base", borderWidth: "base", borderStyle: "solid", borderColor: "border.warning" })}>
                <strong className={css({ color: "contents.primary" })}>3. コンポーネントトークン</strong>
                <p className={css({ marginY: 1, fontSize: "sm", color: "contents.secondary" })}>
                  特定のコンポーネント用の色。button.primary.bg、input.borderErrorなど。
                  <br />
                  例: colors.button.primary.bg, colors.input.borderError
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <SectionHeading emoji="🌍">トークンの3階層とは？</SectionHeading>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "base",
            borderWidth: "base", borderStyle: "solid", borderColor: "border.default",
          })}
        >
          <p className={css({ margin: 0, lineHeight: "relaxed", color: "contents.primary" })}>
            デザイントークンは<strong>3つの階層</strong>で構成され、段階的に抽象化されています。<br />
            これにより、保守性が高く、変更に強いデザインシステムを実現できます。
          </p>

          <div
            className={css({
              marginTop: 6,
              padding: 4,
              backgroundColor: "bg.secondary",
              borderRadius: "base",
              borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
            })}
          >
            <h4 className={css({ marginTop: 0, marginBottom: 3, color: "contents.primary", fontSize: "lg" })}>
              🍱 料理に例えると...
            </h4>
            <div className={css({ display: 'flex', flexDirection: 'column', gap: 2, fontSize: "sm", lineHeight: "relaxed" })}>
              <div>
                <strong className={css({ color: "contents.primary" })}>1. Primitive（食材）</strong>
                <span className={css({ color: "contents.secondary" })}> → 卵、砂糖、小麦粉など生の素材</span>
              </div>
              <div>
                <strong className={css({ color: "contents.primary" })}>2. Semantic（調味料・下ごしらえ）</strong>
                <span className={css({ color: "contents.secondary" })}> → 甘いタレ、塩味の調味料など、汎用的な中間素材</span>
              </div>
              <div>
                <strong className={css({ color: "contents.primary" })}>3. Component（完成した料理）</strong>
                <span className={css({ color: "contents.secondary" })}> → ハンバーグ、サラダなど、目的に合わせた最終形</span>
              </div>
            </div>
          </div>

          <h4 className={css({ marginTop: 6, color: "contents.primary" })}>
            具体的な階層の役割
          </h4>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 })}>
            <div className={css({ padding: 3, backgroundColor: "bg.primary", borderRadius: "base", borderWidth: "thin", borderStyle: "solid", borderColor: "border.default", })}>
              <div className={css({ fontSize: "sm", color: "contents.tertiary", marginBottom: 1 })}>
                レイヤー 1
              </div>
              <strong className={css({ color: "contents.primary", fontSize: "base" })}>Primitive tokens（プリミティブトークン）</strong>
              <p className={css({ marginTop: 2, marginBottom: 1, fontSize: "sm", color: "contents.secondary", lineHeight: "relaxed" })}>
                色や数値などの<strong>生の値</strong>。意味を持たない基本パーツ。
              </p>
              <div className={css({ padding: 2, backgroundColor: "bg.secondary", borderRadius: "sm", fontSize: "sm" })}>
                <code className={css({ color: "contents.link" })}>#3B82F6</code>
                <span className={css({ marginX: 2, color: "contents.tertiary" })}>|</span>
                <code className={css({ color: "contents.link" })}>16px</code>
                <span className={css({ marginX: 2, color: "contents.tertiary" })}>|</span>
                <code className={css({ color: "contents.link" })}>"gray.900"</code>
              </div>
            </div>

            <div className={css({ padding: 3, backgroundColor: "bg.primary", borderRadius: "base", borderWidth: "thin", borderStyle: "solid", borderColor: "border.default", })}>
              <div className={css({ fontSize: "sm", color: "contents.tertiary", marginBottom: 1 })}>
                レイヤー 2
              </div>
              <strong className={css({ color: "contents.primary", fontSize: "base" })}>Semantic tokens（セマンティックトークン）</strong>
              <p className={css({ marginTop: 2, marginBottom: 1, fontSize: "sm", color: "contents.secondary", lineHeight: "relaxed" })}>
                Primitiveに<strong>意味のある名前</strong>を付けたもの。「どこで使うか」が分かりやすい。<br />
                アプリ全体で再利用できる共通部品。
              </p>
              <div className={css({ padding: 2, backgroundColor: "bg.secondary", borderRadius: "sm", fontSize: "sm" })}>
                <div className={css({ marginBottom: 1 })}>
                  <code className={css({ color: "contents.link" })}>colors.contents.primary</code>
                  <span className={css({ color: "contents.tertiary" })}> = "gray.900"</span>
                </div>
                <div className={css({ marginBottom: 1 })}>
                  <code className={css({ color: "contents.link" })}>4</code>
                  <span className={css({ color: "contents.tertiary" })}> = 16px</span>
                </div>
                <div>
                  <code className={css({ color: "contents.link" })}>"base"</code>
                  <span className={css({ color: "contents.tertiary" })}> = 4px</span>
                </div>
              </div>
            </div>

            <div className={css({ padding: 3, backgroundColor: "bg.primary", borderRadius: "base", borderWidth: "thin", borderStyle: "solid", borderColor: "border.default", })}>
              <div className={css({ fontSize: "sm", color: "contents.tertiary", marginBottom: 1 })}>
                レイヤー 3
              </div>
              <strong className={css({ color: "contents.primary", fontSize: "base" })}>Component tokens（コンポーネントトークン）</strong>
              <p className={css({ marginTop: 2, marginBottom: 1, fontSize: "sm", color: "contents.secondary", lineHeight: "relaxed" })}>
                特定のコンポーネント専用の値。Semanticトークンを組み合わせて作る。
              </p>
              <div className={css({ padding: 2, backgroundColor: "bg.secondary", borderRadius: "sm", fontSize: "sm" })}>
                <div className={css({ marginBottom: 1 })}>
                  <code className={css({ color: "contents.link" })}>button.padding</code>
                  <span className={css({ color: "contents.tertiary" })}> = 3</span>
                </div>
                <div className={css({ marginBottom: 1 })}>
                  <code className={css({ color: "contents.link" })}>input.borderError</code>
                  <span className={css({ color: "contents.tertiary" })}> = colors.border.error</span>
                </div>
                <div>
                  <code className={css({ color: "contents.link" })}>card.borderRadius</code>
                  <span className={css({ color: "contents.tertiary" })}> = "lg"</span>
                </div>
              </div>
            </div>
          </div>

          <h4 className={css({ marginTop: 6, color: "contents.primary" })}>
            なぜ3階層に分けるの？
          </h4>
          <div
            className={css({
              marginTop: 3,
              padding: 4,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
            })}
          >
            <div className={css({ fontSize: "sm", lineHeight: "relaxed", color: "contents.primary" })}>
              <div className={css({ marginBottom: 3 })}>
                <strong className={css({ color: "contents.success" })}>✅ 変更に強い</strong>
                <p className={css({ marginY: 1, color: "contents.secondary" })}>
                  例: 「メインカラーを青→緑に変更」したい場合<br />
                  → <code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>"blue.500"</code> の値を1箇所変えるだけで、それを参照する全てに反映される
                </p>
              </div>
              <div className={css({ marginBottom: 3 })}>
                <strong className={css({ color: "contents.link" })}>✅ コードが読みやすい</strong>
                <p className={css({ marginY: 1, color: "contents.secondary" })}>
                  <code className={css({ backgroundColor: "bg.secondary", paddingY: 1, paddingX: 2, borderRadius: "sm", color: "contents.error" })}>color: #212121</code> より
                  <code className={css({ backgroundColor: "bg.secondary", paddingY: 1, paddingX: 2, borderRadius: "sm", color: "contents.success" })}>color: colors.contents.primary</code> の方が意図が明確
                </p>
              </div>
              <div>
                <strong className={css({ color: "contents.warning" })}>✅ テーマ切り替えが簡単</strong>
                <p className={css({ marginY: 1, color: "contents.secondary" })}>
                  ライトモード/ダークモードでSemanticトークンの参照先を変えるだけ
                </p>
              </div>
            </div>
          </div>

          <div className={css({ marginTop: 4, padding: 3, backgroundColor: "bg.secondary", borderRadius: "base", borderWidth: "thin", borderStyle: "solid", borderColor: "border.default", })}>
            <strong className={css({ color: "contents.primary" })}>📦 このプロジェクトのSemanticトークン</strong>
            <div className={css({ marginTop: 2, fontSize: "sm", color: "contents.secondary", display: 'flex', flexWrap: 'wrap', gap: 2 })}>
              <code className={css({ backgroundColor: "bg.secondary", paddingY: 1, paddingX: 2, borderRadius: "sm", color: "contents.primary" })}>spacing</code>
              <code className={css({ backgroundColor: "bg.secondary", paddingY: 1, paddingX: 2, borderRadius: "sm", color: "contents.primary" })}>typography</code>
              <code className={css({ backgroundColor: "bg.secondary", paddingY: 1, paddingX: 2, borderRadius: "sm", color: "contents.primary" })}>colors</code>
              <code className={css({ backgroundColor: "bg.secondary", paddingY: 1, paddingX: 2, borderRadius: "sm", color: "contents.primary" })}>radii</code>
            </div>
          </div>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <SectionHeading emoji="📐">ボーダー半径（radii.ts）</SectionHeading>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}
        >
          <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
            角丸のバリエーション
          </h4>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 })}>
            <div className={css({ padding: 2, backgroundColor: "blue.500", color: "white", borderRadius: "sm" })}>
              sm (2px) - "sm"
            </div>
            <div className={css({ padding: 2, backgroundColor: "blue.500", color: "white", borderRadius: "base" })}>
              base (4px) - "base"
            </div>
            <div className={css({ padding: 2, backgroundColor: "blue.500", color: "white", borderRadius: "md" })}>
              md (6px) - "md"
            </div>
            <div className={css({ padding: 2, backgroundColor: "blue.500", color: "white", borderRadius: "lg" })}>
              lg (8px) - "lg"
            </div>
            <div className={css({ padding: 2, backgroundColor: "blue.500", color: "white", borderRadius: "xl" })}>
              xl (12px) - "xl"
            </div>
          </div>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <SectionHeading emoji="🔤">タイポグラフィ（typography.ts）</SectionHeading>
        <div
          className={css({
            marginTop: 4,
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}
        >
          <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
            なぜrem単位？
          </h4>
          <ul className={css({ marginY: 2, paddingLeft: 6, lineHeight: "relaxed", color: "contents.primary" })}>
            <li><strong>ユーザーのブラウザ設定を尊重</strong>: 文字サイズの拡大縮小が容易</li>
            <li><strong>アクセシビリティの向上</strong>: 視覚障害者への配慮</li>
            <li><strong>レスポンシブデザインに最適</strong>: 一括でサイズ調整が可能</li>
          </ul>

          <h4 className={css({ marginTop: 4, color: "contents.primary" })}>
            行間（Line Height）
          </h4>
          <p className={css({ marginY: 2, color: "contents.secondary", fontSize: "sm" })}>
            <strong>WCAG 2.1推奨:</strong> 本文の行高は最低1.5以上（読みやすさ向上）
          </p>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 })}>
            <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "base" })}>
              <strong className={css({ color: "contents.primary" })}>tight (1.25)</strong> - 大見出し用
              <div className={css({ marginTop: 2, lineHeight: "tight", color: "contents.secondary", fontSize: "lg" })}>
                大きい文字は目の移動が少ないため、<br />
                行高は詰めても読みやすい
              </div>
            </div>
            <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "base" })}>
              <strong className={css({ color: "contents.primary" })}>normal (1.5)</strong> - 本文用（WCAG推奨） ★
              <div className={css({ marginTop: 2, lineHeight: "normal", color: "contents.secondary" })}>
                小さい文字は行を見失いやすいため、間隔が必要です。本文には1.5以上が推奨されています。これにより、文章が読みやすくなります。
              </div>
            </div>
            <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "base" })}>
              <strong className={css({ color: "contents.primary" })}>relaxed (1.625)</strong> - 長文用
              <div className={css({ marginTop: 2, lineHeight: "relaxed", color: "contents.secondary" })}>
                長文を読む場合、さらに広い行間にすることで目の疲れを軽減できます。ブログ記事や説明文など、じっくり読む文章に最適です。
              </div>
            </div>
          </div>

          <h4 className={css({ marginTop: 6, color: "contents.primary" })}>
            フォントサイズスケール
          </h4>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 })}>
            <div className={css({ fontSize: "xs", padding: 2, backgroundColor: "bg.secondary", borderRadius: "base", color: "contents.primary" })}>
              xs (12px) - "xs"
            </div>
            <div className={css({ fontSize: "sm", padding: 2, backgroundColor: "bg.secondary", borderRadius: "base", color: "contents.primary" })}>
              sm (14px) - "sm"
            </div>
            <div className={css({ fontSize: "base", padding: 2, backgroundColor: "bg.secondary", borderRadius: "base", color: "contents.primary" })}>
              base (16px) - "base" ← 基準サイズ
            </div>
            <div className={css({ fontSize: "lg", padding: 2, backgroundColor: "bg.secondary", borderRadius: "base", color: "contents.primary" })}>
              lg (18px) - "lg"
            </div>
            <div className={css({ fontSize: "xl", padding: 2, backgroundColor: "bg.secondary", borderRadius: "base", color: "contents.primary" })}>
              xl (20px) - "xl"
            </div>
            <div className={css({ fontSize: "2xl", padding: 2, backgroundColor: "bg.secondary", borderRadius: "base", color: "contents.primary" })}>
              2xl (24px) - typography.fontSize['2xl']
            </div>
          </div>
        </div>
      </div>

      <div
        className={css({
          marginTop: 8,
          padding: 4,
          backgroundColor: "bg.secondary",
          borderRadius: "base",
          borderWidth: "base", borderStyle: "solid", borderColor: "border.success",
        })}
      >
        <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
          ✅ トークンを使うメリット
        </h4>
        <ul className={css({ marginY: 2, paddingLeft: 6, lineHeight: "relaxed", color: "contents.primary" })}>
          <li><strong>一貫性</strong>: デザインが統一され、プロフェッショナルな見た目に</li>
          <li><strong>保守性</strong>: トークンを変更するだけで全体に反映</li>
          <li><strong>開発効率</strong>: 値を覚える必要がなく、迷わない</li>
          <li><strong>コミュニケーション</strong>: デザイナーとの共通言語</li>
        </ul>
      </div>
    </section>
  );
}
