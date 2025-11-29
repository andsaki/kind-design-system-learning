import { useState } from "react";
import { css } from "@/styled-system/css";
import { Button, Input, Accordion, AccordionSummary, AccordionContent, Breadcrumbs, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, Modal } from "../design-system/components";
import { InfoBox } from "../design-system/components/InfoBox";
import { icons } from "../design-system/tokens/icons";
import { SectionHeading } from "../components/SectionHeading";
import { Tooltip } from "../components/Tooltip";
import { CodeBlock } from "../components/CodeBlock";

export const ARIAGuide = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="aria-guide"
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
        borderBottomWidth: "thick", borderBottomStyle: "solid", borderBottomColor: "pink.500",
        paddingBottom: 2,
        marginBottom: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      })}>
        <icons.philosophy.inclusive size={28} color={"pink.600"} strokeWidth={2} />
        ARIAラベルとrole属性ガイド
      </h2>
      <p className={css({ color: "contents.secondary", marginBottom: 6 })}>
        ARIA（Accessible Rich Internet Applications）は、Webアプリケーションをスクリーンリーダーなどの支援技術に対してアクセシブルにするための仕様です。
        適切なARIA属性を使用することで、視覚障害者やキーボードユーザーに対して、より良いユーザー体験を提供できます。
      </p>

      {/* ARIAの基本概要 */}
      <div className={css({
        marginTop: 6,
        marginBottom: 8,
        padding: 6,
        backgroundColor: "bg.secondary",
        borderRadius: "lg",
        borderWidth: "base", borderStyle: "solid", borderColor: "border.default",
      })}>
        <h3 className={css({
          marginTop: 0,
          marginBottom: 4,
          color: "contents.primary",
          fontSize: "xl",
          fontWeight: "semibold",
          display: 'flex',
          alignItems: 'center',
          gap: 2
        })}>
          <icons.concept.wcag size={24} color={"blue.600"} strokeWidth={2} />
          ARIAの基本的な役割
        </h3>

        <div className={css({ display: 'grid', gap: 4 })}>
          <div className={css({
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}>
            <h4 className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}>
              🎭 役割（Role）を伝える
            </h4>
            <p className={css({ margin: 0, color: "contents.secondary", fontSize: "sm", lineHeight: "relaxed" })}>
              要素が何であるかを支援技術に伝えます。例：<code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>role="button"</code>、
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>role="navigation"</code>など。
              HTMLのセマンティック要素（<code>&lt;button&gt;</code>、<code>&lt;nav&gt;</code>）を使えば、roleは自動的に付与されます。
            </p>
          </div>

          <div className={css({
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}>
            <h4 className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}>
              🏷️ 名前（Name）をつける
            </h4>
            <p className={css({ margin: 0, color: "contents.secondary", fontSize: "sm", lineHeight: "relaxed" })}>
              要素に読み上げられる名前を与えます。<code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>aria-label</code>、
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>aria-labelledby</code>などで指定します。
              「閉じるボタン」「メニューを開く」など、要素の目的を明確に伝えます。
            </p>
          </div>

          <div className={css({
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}>
            <h4 className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}>
              📊 状態（State）を伝える
            </h4>
            <p className={css({ margin: 0, color: "contents.secondary", fontSize: "sm", lineHeight: "relaxed" })}>
              要素の現在の状態を伝えます。<code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>aria-expanded="true"</code>（展開中）、
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>aria-checked="false"</code>（未チェック）、
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>aria-disabled="true"</code>（無効）など、
              動的に変化する状態を支援技術に伝えます。
            </p>
          </div>

          <div className={css({
            padding: 4,
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}>
            <h4 className={css({
              marginTop: 0,
              marginBottom: 2,
              color: "contents.primary",
              fontSize: "base",
              fontWeight: "semibold",
            })}>
              🔗 関係性（Relationship）を示す
            </h4>
            <p className={css({ margin: 0, color: "contents.secondary", fontSize: "sm", lineHeight: "relaxed" })}>
              要素間の関係を伝えます。<code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>aria-describedby</code>（説明要素）、
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>aria-controls</code>（制御する要素）、
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 1, paddingX: 2, borderRadius: "sm" })}>aria-owns</code>（所有する要素）など、
              要素同士のつながりを明確にします。
            </p>
          </div>
        </div>

        <div className={css({
          marginTop: 4,
          padding: 3,
          backgroundColor: "bg.secondary",
          borderWidth: "base", borderStyle: "solid", borderColor: "border.warning",
          borderRadius: "md",
          fontSize: "sm",
          color: "contents.primary",
        })}>
          <strong>💡 重要な原則:</strong> まずは<strong>セマンティックHTML</strong>（<code>&lt;button&gt;</code>、<code>&lt;nav&gt;</code>、<code>&lt;main&gt;</code>など）を使いましょう。
          ARIAは、HTMLの機能では実現できない場合の「補完」として使用します。
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <SectionHeading>主要なARIA属性</SectionHeading>

        <div className={css({
          display: 'grid',
          gap: 4,
          marginBottom: 8,
          width: '100%',
          minWidth: 0
        })}>
          {/* aria-label */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
            minWidth: 0
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>aria-label</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              要素に対して、スクリーンリーダーが読み上げるラベルを指定します。視覚的なテキストがない要素に使用します。
            </p>
            <div className={css({ marginTop: 2 })}>
              <CodeBlock
                code={`<button aria-label="メニューを開く">
  <icons.menu />
</button>`}
                language="html"
                showLineNumbers={false}
              />
            </div>
            <div className={css({ marginTop: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' })}>
              <Button
                aria-label="設定を開く"
                icon={<icons.component.button size={16} />}
                variant="outline"
                size="sm"
              >
              </Button>
              <span className={css({ fontSize: "sm", color: "contents.tertiary" })}>
                ← アイコンのみのボタンに aria-label を使用
              </span>
            </div>
          </div>

          {/* aria-labelledby */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
            minWidth: 0
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>aria-labelledby</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              他の要素のIDを参照して、その要素のテキストをラベルとして使用します。複数のIDをスペース区切りで指定できます。
            </p>
            <div className={css({ marginTop: 2 })}>
              <CodeBlock
                code={`<h2 id="section-title">ユーザー設定</h2>
<section aria-labelledby="section-title">
  {/* セクションの内容 */}
</section>`}
                language="html"
              />
            </div>
          </div>

          {/* aria-describedby */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
            minWidth: 0
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>aria-describedby</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              要素の説明や補足情報を提供する他の要素のIDを参照します。エラーメッセージやヒントテキストに使用します。
            </p>
            <div className={css({ marginTop: 2 })}>
              <CodeBlock
                code={`<input
  type="password"
  aria-describedby="password-hint"
/>
<span id="password-hint">
  8文字以上、英数字を含む
</span>`}
                language="html"
              />
            </div>
            <div className={css({ marginTop: 3 })}>
              <Input
                label="パスワード"
                type="password"
                placeholder="パスワード"
                aria-describedby="demo-password-hint"
              />
              <span id="demo-password-hint" className={css({
                display: 'block',
                marginTop: 1,
                fontSize: "sm",
                color: "contents.tertiary"
              })}>
                8文字以上、英数字を含む
              </span>
            </div>
          </div>

          {/* aria-current */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
            minWidth: 0
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>aria-current</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              現在の項目を示します。ナビゲーションやパンくずリストで使用します。
            </p>

            <div className={css({
              marginTop: 4,
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "base",
              borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
            })}>
              <h5 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary", fontSize: "base" })}>
                📋 aria-current の値の種類
              </h5>
              <div className={css({ overflowX: 'auto' })}>
                <table className={css({ width: '100%', borderCollapse: 'collapse', fontSize: "sm" })}>
                <thead>
                  <tr className={css({ borderBottomWidth: "base", borderBottomStyle: "solid", borderBottomColor: "border.default" })}>
                    <th className={css({ textAlign: 'left', padding: 2, color: "contents.primary" })}>値</th>
                    <th className={css({ textAlign: 'left', padding: 2, color: "contents.primary" })}>使用場面</th>
                    <th className={css({ textAlign: 'left', padding: 2, color: "contents.primary" })}>例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={css({ borderBottomWidth: "thin", borderBottomStyle: "solid", borderBottomColor: "bg.tertiary" })}>
                    <td className={css({ padding: 2, fontFamily: 'fonts.mono', color: "contents.primary" })}>page</td>
                    <td className={css({ padding: 2, color: "contents.secondary" })}>現在表示中のページ</td>
                    <td className={css({ padding: 2, color: "contents.tertiary", fontSize: "xs" })}>パンくずリスト、ページネーション</td>
                  </tr>
                  <tr className={css({ borderBottomWidth: "thin", borderBottomStyle: "solid", borderBottomColor: "bg.tertiary" })}>
                    <td className={css({ padding: 2, fontFamily: 'fonts.mono', color: "contents.primary" })}>step</td>
                    <td className={css({ padding: 2, color: "contents.secondary" })}>ステップ形式の現在位置</td>
                    <td className={css({ padding: 2, color: "contents.tertiary", fontSize: "xs" })}>フォームウィザード、チュートリアル</td>
                  </tr>
                  <tr className={css({ borderBottomWidth: "thin", borderBottomStyle: "solid", borderBottomColor: "bg.tertiary" })}>
                    <td className={css({ padding: 2, fontFamily: 'fonts.mono', color: "contents.primary" })}>location</td>
                    <td className={css({ padding: 2, color: "contents.secondary" })}>視覚的にハイライトされた場所</td>
                    <td className={css({ padding: 2, color: "contents.tertiary", fontSize: "xs" })}>フローチャート、サイトマップ</td>
                  </tr>
                  <tr className={css({ borderBottomWidth: "thin", borderBottomStyle: "solid", borderBottomColor: "bg.tertiary" })}>
                    <td className={css({ padding: 2, fontFamily: 'fonts.mono', color: "contents.primary" })}>date</td>
                    <td className={css({ padding: 2, color: "contents.secondary" })}>現在選択中の日付</td>
                    <td className={css({ padding: 2, color: "contents.tertiary", fontSize: "xs" })}>カレンダー、日付ピッカー</td>
                  </tr>
                  <tr className={css({ borderBottomWidth: "thin", borderBottomStyle: "solid", borderBottomColor: "bg.tertiary" })}>
                    <td className={css({ padding: 2, fontFamily: 'fonts.mono', color: "contents.primary" })}>time</td>
                    <td className={css({ padding: 2, color: "contents.secondary" })}>現在選択中の時刻</td>
                    <td className={css({ padding: 2, color: "contents.tertiary", fontSize: "xs" })}>タイムピッカー、スケジュール</td>
                  </tr>
                  <tr className={css({ borderBottomWidth: "thin", borderBottomStyle: "solid", borderBottomColor: "bg.tertiary" })}>
                    <td className={css({ padding: 2, fontFamily: 'fonts.mono', color: "contents.primary" })}>true</td>
                    <td className={css({ padding: 2, color: "contents.secondary" })}>上記に当てはまらない現在項目</td>
                    <td className={css({ padding: 2, color: "contents.tertiary", fontSize: "xs" })}>汎用的な「現在」の表示</td>
                  </tr>
                  <tr>
                    <td className={css({ padding: 2, fontFamily: 'fonts.mono', color: "contents.primary" })}>false</td>
                    <td className={css({ padding: 2, color: "contents.secondary" })}>現在項目ではない（デフォルト）</td>
                    <td className={css({ padding: 2, color: "contents.tertiary", fontSize: "xs" })}>通常は省略可能</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>

            <div className={css({
              backgroundColor: "bg.primary",
              padding: 3,
              borderRadius: "base",
              marginTop: 3,
              borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
            })}>
              <h5 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary", fontSize: "base" })}>
                💡 使用例：パンくずリスト
              </h5>
              <CodeBlock
                code={`<BreadcrumbItem
  aria-current="page"
  isCurrent
>
  現在のページ
</BreadcrumbItem>`}
                language="jsx"
              />
            </div>
            <div className={css({ marginTop: 3 })}>
              <Breadcrumbs>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/products">商品</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrent>現在のページ</BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumbs>
            </div>
          </div>

          {/* aria-expanded */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
            minWidth: 0
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>aria-expanded</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              要素が展開されているか折りたたまれているかを示します。アコーディオンやドロップダウンメニューで使用します。
            </p>
            <div className={css({ marginTop: 2 })}>
              <CodeBlock
                code={`<AccordionSummary
  aria-expanded={isOpen}
>
  セクションタイトル
</AccordionSummary>`}
                language="jsx"
              />
            </div>
            <div className={css({ marginTop: 3 })}>
              <Accordion>
                <AccordionSummary>
                  クリックして展開/折りたたみ（aria-expandedが自動で切り替わります）
                </AccordionSummary>
                <AccordionContent>
                  このコンテンツは、AccordionSummaryの aria-expanded 属性によって、スクリーンリーダーに展開状態が伝えられます。
                </AccordionContent>
              </Accordion>
            </div>
          </div>

          {/* aria-hidden */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.tertiary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.subtle",
            minWidth: 0
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>aria-hidden</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              要素をスクリーンリーダーから隠します。装飾的なアイコンやSVGに使用します。
            </p>
            <div className={css({ marginTop: 2 })}>
              <CodeBlock
                code={`<svg aria-hidden="true">
  <path d="..." />
</svg>
<span>アイコンの意味を説明するテキスト</span>`}
                language="html"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <SectionHeading>ツールチップ（role="tooltip"）</SectionHeading>

        <div className={css({
          padding: 4,
          backgroundColor: "bg.secondary",
          borderRadius: "md",
          borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
        })}>
          <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
            <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>role="tooltip"</code>
          </h4>
          <p className={css({ color: "contents.secondary", marginTop: 0 })}>
            ツールチップは、要素に関する補足情報を提供するポップアップです。aria-describedby と組み合わせて使用します。
          </p>

          <InfoBox variant="tip" icon="💡" title="ツールチップのアクセシビリティ要件" className={css({ marginTop: 3 })}>
            <ul className={css({ lineHeight: "relaxed", margin: 0, paddingLeft: 5 })}>
              <li>role="tooltip" を使用する</li>
              <li>一意のIDを持つ</li>
              <li>トリガー要素から aria-describedby で参照される</li>
              <li>キーボードフォーカスとマウスホバーの両方に対応</li>
              <li>適切な遅延時間を設定（推奨：300ms）</li>
              <li>視覚的に明確なポジショニング</li>
            </ul>
          </InfoBox>

          <div className={css({ marginTop: 3 })}>
            <CodeBlock
              code={`<Tooltip content="追加の説明テキスト" position="top">
  <button>ホバーまたはフォーカス</button>
</Tooltip>`}
              language="jsx"
            />
          </div>

          <div className={css({
            marginTop: 4,
            padding: 3,
            backgroundColor: "bg.primary",
            borderRadius: "base",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}>
            <h5 className={css({ marginTop: 0, marginBottom: 3, color: "contents.primary", fontSize: "base" })}>
              🎨 実例
            </h5>
            <div className={css({ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' })}>
              <Tooltip content="これは上に表示されるツールチップです" position="top">
                <Button variant="outline" size="sm">上</Button>
              </Tooltip>
              <Tooltip content="これは下に表示されるツールチップです" position="bottom">
                <Button variant="outline" size="sm">下</Button>
              </Tooltip>
              <Tooltip content="これは左に表示されるツールチップです" position="left">
                <Button variant="outline" size="sm">左</Button>
              </Tooltip>
              <Tooltip content="これは右に表示されるツールチップです" position="right">
                <Button variant="outline" size="sm">右</Button>
              </Tooltip>
              <Tooltip content="このアイコンについての詳細情報" position="top">
                <span className={css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: "bg.tertiary",
                  color: "contents.secondary",
                  fontSize: "sm",
                  fontWeight: 'bold',
                  cursor: 'help',
                  textDecoration: 'none',
                })}>
                  ?
                </span>
              </Tooltip>
            </div>
          </div>

          <div className={css({
            marginTop: 3,
            padding: 3,
            backgroundColor: "bg.secondary",
            borderRadius: "base",
            borderWidth: "base", borderStyle: "solid", borderColor: "border.warning",
          })}>
            <h5 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary", fontSize: "base" })}>
              ⚠️ ツールチップ vs タイトル属性
            </h5>
            <p className={css({ color: "contents.primary", margin: 0, lineHeight: "relaxed" })}>
              HTML の title 属性はアクセシビリティの観点から推奨されません。キーボードユーザーには利用できず、タッチデバイスでは表示されないためです。
              代わりに、適切に実装された aria-describedby と role="tooltip" を使用してください。
            </p>
          </div>
        </div>
      </div>

      <div className={css({ marginTop: 8 })}>
        <SectionHeading>主要なrole属性</SectionHeading>

        <div className={css({
          display: 'grid',
          gap: 4,
        })}>
          {/* role="button" */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>role="button"</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              div や span などの要素をボタンとして扱います。可能な限り &lt;button&gt; 要素を使用してください。
            </p>
            <div className={css({ marginTop: 2 })}>
              <CodeBlock
                code={`<!-- ❌ 避けるべき -->
<div role="button" tabIndex={0}>
  クリック
</div>

<!-- ✅ 推奨 -->
<button>クリック</button>`}
                language="html"
              />
            </div>
          </div>

          {/* role="dialog" */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>role="dialog"</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              モーダルダイアログを示します。aria-labelledby または aria-label と組み合わせて使用します。
            </p>

            <InfoBox variant="tip" icon="💡" title="モーダルのアクセシビリティ要件" className={css({ marginTop: 3 })}>
              <ul className={css({ lineHeight: "relaxed", margin: 0, paddingLeft: 5 })}>
                <li>role="dialog" と aria-modal="true" を使用</li>
                <li>aria-labelledby でタイトルを参照</li>
                <li>フォーカストラップ（Tab キーでモーダル内を循環）</li>
                <li>Esc キーで閉じる機能</li>
                <li>背景スクロールの防止</li>
                <li>開いた時に最初のフォーカス可能要素にフォーカス</li>
                <li>閉じた時に元の場所にフォーカスを戻す</li>
              </ul>
            </InfoBox>

            <div className={css({ marginTop: 3 })}>
              <CodeBlock
                code={`<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="確認"
>
  この操作を実行してもよろしいですか？
</Modal>`}
                language="jsx"
              />
            </div>

            <div className={css({ marginTop: 3 })}>
              <Button onClick={() => setIsModalOpen(true)} variant="primary">
                モーダルを開く
              </Button>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="アクセシブルなモーダル"
                footer={
                  <>
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      キャンセル
                    </Button>
                    <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                      OK
                    </Button>
                  </>
                }
              >
                <p className={css({ margin: 0, color: "contents.secondary" })}>
                  このモーダルは以下のアクセシビリティ機能を実装しています：
                </p>
                <ul className={css({ color: "contents.secondary", lineHeight: "relaxed" })}>
                  <li>フォーカストラップ（Tabキーでモーダル内を循環）</li>
                  <li>Escキーで閉じる</li>
                  <li>背景スクロール防止</li>
                  <li>適切なARIA属性（role="dialog", aria-modal="true"）</li>
                  <li>閉じた後、元の要素にフォーカスを戻す</li>
                </ul>
              </Modal>
            </div>
          </div>

          {/* role="navigation" */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>role="navigation"</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              ナビゲーションリンクのグループを示します。&lt;nav&gt; 要素を使用すれば、暗黙的にこのroleが付与されます。
            </p>
            <div className={css({ marginTop: 2 })}>
              <CodeBlock
                code={`<!-- ✅ 推奨: セマンティックHTML -->
<nav aria-label="メインナビゲーション">
  <ul>
    <li><a href="/">ホーム</a></li>
  </ul>
</nav>

<!-- または -->
<div role="navigation" aria-label="...">
  {/* ナビゲーション */}
</div>`}
                language="html"
              />
            </div>
          </div>

          {/* role="alert" */}
          <div className={css({
            padding: 4,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            borderWidth: "thin", borderStyle: "solid", borderColor: "border.error",
          })}>
            <h4 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary" })}>
              <code className={css({ backgroundColor: "bg.tertiary", paddingY: 2, paddingX: 4, borderRadius: "sm" })}>role="alert"</code>
            </h4>
            <p className={css({ color: "contents.secondary", marginTop: 0 })}>
              重要なメッセージを即座にスクリーンリーダーに通知します。エラーメッセージや警告に使用します。
            </p>
            <div className={css({ marginTop: 2 })}>
              <CodeBlock
                code={`<div role="alert">
  エラー: フォームの送信に失敗しました
</div>`}
                language="html"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={css({
        marginTop: 8,
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "base", borderStyle: "solid", borderColor: "border.default",
      })}>
        <h4 className={css({ color: "contents.primary", marginTop: 0 })}>
          💡 ARIAの第一原則
        </h4>
        <ul className={css({ color: "contents.primary", lineHeight: "relaxed", mb: 0 })}>
          <li><strong>セマンティックHTMLを優先する</strong>: 可能な限り、適切なHTML要素を使用してください</li>
          <li><strong>ARIAは最後の手段</strong>: ネイティブHTML要素で実現できない場合のみARIAを使用</li>
          <li><strong>不要なARIAは追加しない</strong>: &lt;button&gt; に role="button" は不要です</li>
          <li><strong>テストを忘れずに</strong>: スクリーンリーダーで実際に確認してください</li>
        </ul>
      </div>

      {/* 試してみようセクション */}
      <div className={css({ marginTop: 8 })}>
        <h3
          className={css({
            fontSize: "xl",
            fontWeight: "semibold",
            color: "contents.secondary",
            marginBottom: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <icons.component.button size={24} color={"pink.600"} strokeWidth={2} />
          4. インタラクティブデモ：試してみよう
        </h3>

        <div className={css({ display: "grid", gap: 6 })}>
          {/* ARIA属性の有無を比較 */}
          <ARIAComparisonDemo />

          {/* スクリーンリーダーシミュレーター */}
          <ScreenReaderSimulator />

          {/* 動的なaria-live */}
          <LiveRegionDemo />
        </div>
      </div>

      <div className={css({
        marginTop: 6,
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
      })}>
        <h4 className={css({ color: "contents.primary", marginTop: 0 })}>
          📚 このデザインシステムで使用しているARIA属性
        </h4>
        <ul className={css({ color: "contents.primary", lineHeight: "relaxed" })}>
          <li><strong>Button</strong>: aria-busy (ローディング状態)</li>
          <li><strong>Input</strong>: aria-invalid, aria-describedby (エラー表示)</li>
          <li><strong>Modal</strong>: role="dialog", aria-modal, aria-labelledby</li>
          <li><strong>Accordion</strong>: aria-expanded, aria-controls</li>
          <li><strong>Breadcrumbs</strong>: aria-label, aria-current</li>
          <li><strong>Toast</strong>: role="alert", role="status"</li>
        </ul>
      </div>
    </section>
  );
};

// ARIA属性の有無を比較するデモ
function ARIAComparisonDemo() {
  const [selectedExample, setSelectedExample] = useState<'button' | 'input' | 'link'>('button');

  const examples = {
    button: {
      title: "アイコンのみのボタン",
      bad: {
        code: '<button>\n  <XIcon />\n</button>',
        element: (
          <button
            className={css({
              padding: 2,
              borderWidth: "thin", borderStyle: "solid", borderColor: "border.subtle",
              borderRadius: "md",
              backgroundColor: "bg.primary",
              cursor: "pointer",
              color: "contents.primary",
              fontSize: "lg",
            })}
          >
            ✕
          </button>
        ),
        screenReader: "ボタン",
        issue: "何のボタンか分からない",
      },
      good: {
        code: '<button aria-label="閉じる">\n  <XIcon />\n</button>',
        element: (
          <button
            aria-label="閉じる"
            className={css({
              padding: 2,
              borderWidth: "thin", borderStyle: "solid", borderColor: "border.subtle",
              borderRadius: "md",
              backgroundColor: "bg.primary",
              cursor: "pointer",
              color: "contents.primary",
              fontSize: "lg",
            })}
          >
            ✕
          </button>
        ),
        screenReader: "閉じる ボタン",
        benefit: "明確な目的を伝える",
      },
    },
    input: {
      title: "エラーのあるフォーム",
      bad: {
        code: '<input type="email" />\n<span style="color: red">\n  無効なメールアドレス\n</span>',
        element: (
          <div>
            <input
              type="email"
              className={css({
                padding: 2,
                borderWidth: "base", borderStyle: "solid", borderColor: "border.error",
                borderRadius: "md",
                width: "100%",
              })}
            />
            <span className={css({ color: "contents.error", fontSize: "sm" })}>
              無効なメールアドレス
            </span>
          </div>
        ),
        screenReader: "メールアドレス 編集可能",
        issue: "エラーメッセージが読まれない",
      },
      good: {
        code: '<input\n  type="email"\n  aria-invalid="true"\n  aria-describedby="error-msg"\n/>\n<span id="error-msg" role="alert">\n  無効なメールアドレス\n</span>',
        element: (
          <div>
            <input
              type="email"
              aria-invalid="true"
              aria-describedby="good-error-msg"
              className={css({
                padding: 2,
                borderWidth: "base", borderStyle: "solid", borderColor: "border.error",
                borderRadius: "md",
                width: "100%",
              })}
            />
            <span
              id="good-error-msg"
              role="alert"
              className={css({ color: "contents.error", fontSize: "sm" })}
            >
              無効なメールアドレス
            </span>
          </div>
        ),
        screenReader: "メールアドレス 無効 編集可能 無効なメールアドレス",
        benefit: "エラー内容を即座に伝える",
      },
    },
    link: {
      title: "「詳しくはこちら」リンク",
      bad: {
        code: '<a href="/about">詳しくはこちら</a>',
        element: (
          <a
            href="/about"
            onClick={(e) => e.preventDefault()}
            className={css({
              color: "contents.link",
              textDecoration: "underline",
            })}
          >
            詳しくはこちら
          </a>
        ),
        screenReader: "詳しくはこちら リンク",
        issue: "何について詳しいのか不明",
      },
      good: {
        code: '<a\n  href="/about"\n  aria-label="会社概要について詳しく見る"\n>\n  詳しくはこちら\n</a>',
        element: (
          <a
            href="/about"
            onClick={(e) => e.preventDefault()}
            aria-label="会社概要について詳しく見る"
            className={css({
              color: "contents.link",
              textDecoration: "underline",
            })}
          >
            詳しくはこちら
          </a>
        ),
        screenReader: "会社概要について詳しく見る リンク",
        benefit: "リンク先の内容が明確",
      },
    },
  };

  const current = examples[selectedExample];

  return (
    <div
      className={css({
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
        minWidth: 0,
        maxWidth: '100%'
      })}
    >
      <h4
        className={css({
          marginTop: 0,
          fontSize: "lg",
          fontWeight: "semibold",
          color: "contents.primary",
        })}
      >
        🔍 ARIA属性の効果を比較
      </h4>

      <div className={css({ display: "flex", gap: 2, marginTop: 3, flexWrap: "wrap" })}>
        {(Object.keys(examples) as Array<keyof typeof examples>).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedExample(key)}
            className={css({
              paddingX: 3,
              paddingY: 2,
              borderWidth: "base",
              borderStyle: "solid",
              borderColor: selectedExample === key ? "border.default" : "border.subtle",
              borderRadius: "md",
              backgroundColor: selectedExample === key ? "bg.secondary" : "bg.primary",
              color: selectedExample === key ? "contents.primary" : "contents.secondary",
              cursor: "pointer",
              fontWeight: selectedExample === key ? "semibold" : "normal",
            })}
          >
            {examples[key].title}
          </button>
        ))}
      </div>

      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 4,
          marginTop: 4,
        })}
      >
        {/* 悪い例 */}
        <div
          className={css({
            padding: 3,
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "base", borderStyle: "solid", borderColor: "border.error",
            minWidth: 0
          })}
        >
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: 2,
            })}
          >
            <span className={css({ fontSize: "lg" })}>❌</span>
            <strong className={css({ color: "contents.error" })}>ARIA属性なし</strong>
          </div>

          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.secondary",
              borderRadius: "sm",
              marginBottom: 2,
            })}
          >
            {current.bad.element}
          </div>

          <div className={css({ marginBottom: 2 })}>
            <CodeBlock
              code={current.bad.code}
              language="html"
              showCopyButton={false}
            />
          </div>

          <div
            className={css({
              padding: 2,
              backgroundColor: "bg.secondary",
              borderRadius: "sm",
              fontSize: "sm",
            })}
          >
            <strong className={css({ color: "contents.primary" })}>スクリーンリーダー:</strong>
            <div className={css({ marginTop: 1, color: "contents.secondary", fontStyle: "italic" })}>
              "{current.bad.screenReader}"
            </div>
          </div>

          <div
            className={css({
              marginTop: 2,
              padding: 2,
              backgroundColor: "bg.secondary",
              borderRadius: "sm",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            ⚠️ 問題: {current.bad.issue}
          </div>
        </div>

        {/* 良い例 */}
        <div
          className={css({
            padding: 3,
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "base", borderStyle: "solid", borderColor: "border.success",
            minWidth: 0
          })}
        >
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: 2,
            })}
          >
            <span className={css({ fontSize: "lg" })}>✅</span>
            <strong className={css({ color: "contents.success" })}>ARIA属性あり</strong>
          </div>

          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.secondary",
              borderRadius: "sm",
              marginBottom: 2,
            })}
          >
            {current.good.element}
          </div>

          <div className={css({ marginBottom: 2 })}>
            <CodeBlock
              code={current.good.code}
              language="html"
              showCopyButton={false}
            />
          </div>

          <div
            className={css({
              padding: 2,
              backgroundColor: "bg.secondary",
              borderRadius: "sm",
              fontSize: "sm",
            })}
          >
            <strong className={css({ color: "contents.primary" })}>スクリーンリーダー:</strong>
            <div className={css({ marginTop: 1, color: "contents.secondary", fontStyle: "italic" })}>
              "{current.good.screenReader}"
            </div>
          </div>

          <div
            className={css({
              marginTop: 2,
              padding: 2,
              backgroundColor: "bg.secondary",
              borderRadius: "sm",
              fontSize: "sm",
              color: "contents.primary",
            })}
          >
            ✓ 改善: {current.good.benefit}
          </div>
        </div>
      </div>
    </div>
  );
}

// スクリーンリーダーシミュレーター
function ScreenReaderSimulator() {
  const [isReading, setIsReading] = useState(false);
  const [currentText, setCurrentText] = useState("");

  const simulateReading = () => {
    setIsReading(true);
    const texts = [
      "ボタン",
      "閉じる",
      "クリック可能",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < texts.length) {
        setCurrentText(texts[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsReading(false);
        setCurrentText("");
      }
    }, 800);
  };

  return (
    <div
      className={css({
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
        minWidth: 0,
        maxWidth: '100%'
      })}
    >
      <h4
        className={css({
          marginTop: 0,
          fontSize: "lg",
          fontWeight: "semibold",
          color: "contents.primary",
        })}
      >
        🔊 スクリーンリーダーシミュレーター
      </h4>

      <p className={css({ color: "contents.secondary", fontSize: "sm" })}>
        ボタンをクリックして、スクリーンリーダーがどのように読み上げるかを確認できます
      </p>

      <div className={css({ marginTop: 4, display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" })}>
        <button
          onClick={simulateReading}
          disabled={isReading}
          aria-label="閉じる"
          className={css({
            padding: 3,
            borderWidth: "base", borderStyle: "solid", borderColor: "border.default",
            borderRadius: "md",
            backgroundColor: "bg.primary",
            cursor: isReading ? "not-allowed" : "pointer",
            fontSize: "lg",
            opacity: isReading ? 0.6 : 1,
            color: "contents.primary",
          })}
        >
          ✕
        </button>

        <div
          className={css({
            flex: 1,
            padding: 3,
            backgroundColor: "bg.primary",
            color: "contents.success",
            borderRadius: "md",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            fontSize: "lg",
            fontWeight: "semibold",
          })}
        >
          {isReading ? (
            <span className={css({ animation: "pulse 1s infinite" })}>🔊 {currentText}</span>
          ) : (
            <span className={css({ color: "contents.tertiary" })}>クリックして読み上げを開始...</span>
          )}
        </div>
      </div>

      <div className={css({ marginTop: 3 })}>
        <CodeBlock
          code={`<button aria-label="閉じる">
  ✕
</button>`}
          language="html"
          description={`// スクリーンリーダーが読み上げる内容:
// "ボタン" → "閉じる" → "クリック可能"`}
        />
      </div>
    </div>
  );
}

// aria-live デモ
function LiveRegionDemo() {
  const [message, setMessage] = useState("");
  const [messageCount, setMessageCount] = useState(0);

  const addMessage = (type: 'success' | 'error' | 'info') => {
    const messages = {
      success: "✓ 保存に成功しました",
      error: "✕ エラーが発生しました",
      info: "ℹ 処理中です...",
    };
    setMessage(messages[type]);
    setMessageCount(messageCount + 1);
  };

  return (
    <div
      className={css({
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "thin", borderStyle: "solid", borderColor: "border.default",
        minWidth: 0,
        maxWidth: '100%'
      })}
    >
      <h4
        className={css({
          marginTop: 0,
          fontSize: "lg",
          fontWeight: "semibold",
          color: "contents.primary",
        })}
      >
        📢 aria-live デモ（動的な通知）
      </h4>

      <p className={css({ color: "contents.secondary", fontSize: "sm" })}>
        aria-live を使うと、画面の変更をスクリーンリーダーに自動で通知できます
      </p>

      <div className={css({ display: "flex", gap: 2, marginTop: 3, flexWrap: "wrap" })}>
        <Button variant="primary" size="sm" onClick={() => addMessage('success')}>
          成功メッセージ
        </Button>
        <Button variant="danger" size="sm" onClick={() => addMessage('error')}>
          エラーメッセージ
        </Button>
        <Button variant="secondary" size="sm" onClick={() => addMessage('info')}>
          情報メッセージ
        </Button>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className={css({
          marginTop: 3,
          padding: 3,
          backgroundColor: "bg.primary",
          borderWidth: "base", borderStyle: "solid", borderColor: "border.success",
          borderRadius: "md",
          minHeight: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "base",
        })}
      >
        {message || <span className={css({ color: "contents.tertiary" })}>ボタンをクリックしてメッセージを表示</span>}
      </div>

      <div className={css({ marginTop: 3 })}>
        <CodeBlock
          code={`<div
  aria-live="polite"
  aria-atomic="true"
>
  {message}
</div>`}
          language="jsx"
          description={`// aria-live="polite": 適切なタイミングで読み上げ
// aria-live="assertive": すぐに読み上げ（緊急時）
// aria-atomic="true": 領域全体を読み上げ`}
        />
      </div>

      <div
        className={css({
          marginTop: 3,
          padding: 3,
          backgroundColor: "bg.secondary",
          borderWidth: "base", borderStyle: "solid", borderColor: "border.default",
          borderRadius: "md",
          fontSize: "sm",
          color: "contents.primary",
        })}
      >
        <strong>💡 ヒント:</strong> メッセージが変更されると、スクリーンリーダーが自動的に読み上げます（通知回数: {messageCount}回）
      </div>
    </div>
  );
}
