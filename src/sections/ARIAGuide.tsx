import { useEffect, useState, useRef } from "react";
import { css } from "@/styled-system/css";
import {
  Button,
  Input,
  Accordion,
  AccordionSummary,
  AccordionContent,
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  Modal,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "../design-system/components";
import { InfoBox } from "../design-system/components/InfoBox";
import { icons } from "../design-system/tokens/icons";
import { SectionHeading } from "../components/SectionHeading";
import { Tooltip } from "../components/Tooltip";
import { CodeBlock } from "../components/CodeBlock";
import { ScreenReaderDemo } from "../components/ScreenReaderDemo";

export const ARIAGuide = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ariaCurrentRows = [
    {
      value: "page",
      usage: "現在表示中のページ",
      example: "パンくずリスト、ページネーション",
    },
    {
      value: "step",
      usage: "ステップ形式の現在位置",
      example: "フォームウィザード、チュートリアル",
    },
    {
      value: "location",
      usage: "視覚的にハイライトされた場所",
      example: "フローチャート、サイトマップ",
    },
    {
      value: "date",
      usage: "現在選択中の日付",
      example: "カレンダー、日付ピッカー",
    },
    {
      value: "time",
      usage: "現在選択中の時刻",
      example: "タイムピッカー、スケジュール",
    },
    {
      value: "true",
      usage: "上記に当てはまらない現在項目",
      example: "汎用的な「現在」の表示",
    },
    {
      value: "false",
      usage: "現在項目ではない（デフォルト）",
      example: "通常は省略可能",
    },
  ];

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
        <icons.philosophy.inclusive size={28} color="currentColor" strokeWidth={2} />
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
                code={`<button aria-label="設定を開く">
  <SettingsIcon />
</button>`}
                language="html"
                showLineNumbers={false}
              />
            </div>
            <ScreenReaderDemo
              label="スクリーンリーダー実演"
              description="アイコンのみのボタンにaria-labelでラベルを追加した例です"
            >
              <Button
                aria-label="設定を開く"
                icon={<icons.component.button size={16} />}
                variant="outline"
                size="sm"
              >
              </Button>
            </ScreenReaderDemo>
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
                code={`<span id="prefix">重要な</span>
<span id="main">お知らせ</span>
<button aria-labelledby="prefix main">
  詳細を見る
</button>`}
                language="html"
              />
            </div>

            <ScreenReaderDemo
              label="スクリーンリーダー実演"
              description="複数の要素を参照してラベルを構成する例です"
            >
              <div>
                <span id="aria-demo-prefix" className={css({ fontWeight: "bold", marginRight: 2 })}>
                  重要な
                </span>
                <span id="aria-demo-main" className={css({ marginRight: 2 })}>
                  お知らせ
                </span>
                <Button
                  aria-labelledby="aria-demo-prefix aria-demo-main"
                  variant="primary"
                  size="sm"
                >
                  詳細を見る
                </Button>
              </div>
            </ScreenReaderDemo>
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
                code={`<label for="password">パスワード</label>
<input
  id="password"
  type="password"
  aria-describedby="password-hint"
/>
<span id="password-hint">
  8文字以上、英数字を含む
</span>`}
                language="html"
              />
            </div>
            <ScreenReaderDemo
              label="スクリーンリーダー実演"
              description="aria-describedbyで補足情報を追加した例です。ラベルの後に説明文が読み上げられます"
            >
              <div>
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
            </ScreenReaderDemo>
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
              <Table
                caption="aria-current の値と使用場面"
                variant="striped"
                size="md"
                wcagLevel="AA"
                responsiveLabel="aria-currentの値一覧"
                showColumnDividers
              >
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>値</TableHeaderCell>
                    <TableHeaderCell>使用場面</TableHeaderCell>
                    <TableHeaderCell>例</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ariaCurrentRows.map((row) => (
                    <TableRow key={row.value}>
                      <TableCell>
                        <code
                          className={css({
                            fontFamily: "fonts.mono",
                            fontSize: "sm",
                            color: "contents.primary",
                          })}
                        >
                          {row.value}
                        </code>
                      </TableCell>
                      <TableCell>{row.usage}</TableCell>
                      <TableCell className={css({ fontSize: "xs", color: "contents.tertiary" })}>
                        {row.example}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

          {/* aria-live まとめ */}
          <AriaLiveSummary />

          {/* aria-live / atomic / alert / log / status / progressbar 総合まとめ */}
          <LiveRegionComprehensiveGuide />

          {/* Notification API デモ */}
          <NotificationDemo />

          {/* 動的なaria-live */}
          <LiveRegionDemo />

          {/* アクセシブルなカルーセル */}
          <AccessibleCarousel />
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
          <li>
            <strong>Button</strong>: <code>aria-busy</code> / <code>aria-disabled</code> でロード状態を伝達、
            スピナーには <code>role="status"</code>、装飾アイコンは <code>aria-hidden</code>
          </li>
          <li>
            <strong>Input / TextArea</strong>: <code>aria-required</code>、<code>aria-invalid</code>、
            <code>aria-describedby</code>、エラー表示は <code>role="alert"</code> + <code>aria-live="polite"</code>
          </li>
          <li>
            <strong>Select / Dropdown</strong>: <code>aria-haspopup="listbox"</code>、<code>aria-expanded</code>、
            <code>aria-labelledby</code>、各オプションに <code>role="option"</code> と <code>aria-selected</code>
          </li>
          <li>
            <strong>Modal</strong>: <code>role="dialog"</code>、<code>aria-modal="true"</code>、
            <code>aria-labelledby</code> / <code>aria-describedby</code> でタイトルと本文を関連付け
          </li>
          <li>
            <strong>Accordion</strong>: トリガーに <code>aria-expanded</code> と <code>aria-controls</code>、
            パネルに <code>id</code> を付与して状態を同期
          </li>
          <li>
            <strong>Breadcrumbs</strong>: ナビゲーションに <code>aria-label</code>、
            現在ページに <code>aria-current="page"</code>、区切りアイコンは <code>aria-hidden</code>
          </li>
          <li>
            <strong>Toast / 通知</strong>: <code>role="alert"</code>、<code>aria-live="polite"</code>、
            <code>aria-atomic="true"</code>、閉じるボタンは <code>aria-label</code> 付き
          </li>
          <li>
            <strong>Loading</strong>: <code>role="status"</code> ＋ <code>aria-live="polite"</code> で進捗を共有、
            ラベルのないスピナーは <code>aria-label</code> で補足
          </li>
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

          <ScreenReaderDemo
            label="スクリーンリーダー実演"
            description="ARIA属性が付与された要素がどのように読み上げられるか確認できます"
          >
            <div
              className={css({
                padding: 3,
                backgroundColor: "bg.secondary",
                borderRadius: "sm",
              })}
            >
              {current.good.element}
            </div>
          </ScreenReaderDemo>

          <div className={css({ marginBottom: 2 })}>
            <CodeBlock
              code={current.good.code}
              language="html"
              showCopyButton={false}
            />
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

      <div
        className={css({
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        })}
      >
        <ScreenReaderDemo
          label="スクリーンリーダー実演（ARIAなし）"
          description={`${current.title} / 想定読み上げ`}
          srText={current.bad.screenReader}
        >
          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "md",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            })}
          >
            <strong className={css({ color: "contents.primary" })}>
              ARIA属性なし
            </strong>
            <p
              className={css({
                margin: 0,
                fontSize: "sm",
                color: "contents.secondary",
              })}
            >
              このカードの例をスクリーンリーダーで再生（読み上げは右側のパネルで確認できます）
            </p>
          </div>
        </ScreenReaderDemo>

        <ScreenReaderDemo
          label="スクリーンリーダー実演（ARIAあり）"
          description={`${current.title} / 想定読み上げ`}
          srText={current.good.screenReader}
        >
          <div
            className={css({
              padding: 3,
              backgroundColor: "bg.primary",
              borderRadius: "md",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            })}
          >
            <strong className={css({ color: "contents.primary" })}>
              ARIA属性あり
            </strong>
            <p
              className={css({
                margin: 0,
                fontSize: "sm",
                color: "contents.secondary",
              })}
            >
              改善後の読み上げを体験できます
            </p>
          </div>
        </ScreenReaderDemo>
      </div>
    </div>
  );
}

// スクリーンリーダーシミュレーター
function ScreenReaderSimulator() {
  const readingSequence = ["ボタン", "閉じる", "クリック可能"];

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
        代表的な「閉じる」ボタンを例に、スクリーンリーダーが
        {readingSequence.join(" → ")} の順で案内する様子を音声で確認できます。
      </p>

      <div className={css({ marginTop: 4 })}>
        <ScreenReaderDemo
          label="実際の音声で確認"
          description='スクリーンリーダーの読み上げ例（"ボタン" → "閉じる" → "クリック可能"）をWeb Speech APIで再生できます'
          srText={readingSequence.join(" ")}
        >
          <Button
            aria-label="閉じる"
            variant="outline"
            size="sm"
          >
            ✕
          </Button>
        </ScreenReaderDemo>
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

function AriaLiveSummary() {
  return (
    <div
      className={css({
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.default",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      })}
    >
      <div>
        <h4
          className={css({
            marginTop: 0,
            marginBottom: 2,
            fontSize: "lg",
            fontWeight: "semibold",
            color: "contents.primary",
          })}
        >
          🧭 aria-liveの使い所ガイド
        </h4>
        <p className={css({ color: "contents.secondary", fontSize: "sm", margin: 0 })}>
          動的なテキスト変更をスクリーンリーダーに自動通知する仕組みです。DOMを書き換えるだけで読み上げられるので、
          メッセージ領域は小さく保ち、必要な場面だけに限定しましょう。
        </p>
      </div>

      <div
        className={css({
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        })}
      >
        <div
          className={css({
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin",
            borderColor: "border.default",
            borderStyle: "solid",
            p: 3,
          })}
        >
          <strong className={css({ color: "contents.primary" })}>優先度の選択</strong>
          <ul className={css({ mt: 2, color: "contents.secondary", lineHeight: "relaxed" })}>
            <li><code>aria-live="polite"</code>: 通常はこちら。操作が落ち着いたら読み上げ。</li>
            <li><code>aria-live="assertive"</code>: 緊急時のみ。現在の読み上げを中断します。</li>
            <li><code>aria-atomic="true"</code> を足すと領域全体を再読させられます。</li>
          </ul>
        </div>

        <div
          className={css({
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin",
            borderColor: "border.default",
            borderStyle: "solid",
            p: 3,
          })}
        >
          <strong className={css({ color: "contents.primary" })}>代表的な組み合わせ</strong>
          <ul className={css({ mt: 2, color: "contents.secondary", lineHeight: "relaxed" })}>
            <li><code>role="status"</code> + polite: ローディング表示（<code>&lt;Loading /&gt;</code>）。</li>
            <li><code>role="alert"</code> + polite: フォームエラーやトースト（<code>&lt;Input /&gt;</code>, <code>&lt;Toast /&gt;</code>）。</li>
            <li>表示のみの装飾には付けず、動的に書き換える領域に限定。</li>
          </ul>
        </div>

        <div
          className={css({
            backgroundColor: "bg.primary",
            borderRadius: "md",
            borderWidth: "thin",
            borderColor: "border.default",
            borderStyle: "solid",
            p: 3,
          })}
        >
          <strong className={css({ color: "contents.primary" })}>実装チェックリスト</strong>
          <ul className={css({ mt: 2, color: "contents.secondary", lineHeight: "relaxed" })}>
            <li>メッセージはJavaScriptで更新し、空の状態も用意する。</li>
            <li>頻繁な更新は避け、必要最低限のテキストのみを挿入。</li>
            <li>必要ならボタンラベルなどで文脈も伝える（例: 「成功メッセージを追加」）。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function LiveRegionComprehensiveGuide() {
  const [progress, setProgress] = useState(0);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const startProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const addLogMessage = () => {
    const time = new Date().toLocaleTimeString('ja-JP');
    setLogMessages((prev) => [...prev, `[${time}] 新しいメッセージが追加されました`]);
  };

  return (
    <div
      className={css({
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.default",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      })}
    >
      <div>
        <h4
          className={css({
            marginTop: 0,
            marginBottom: 2,
            fontSize: "xl",
            fontWeight: "bold",
            color: "contents.primary",
          })}
        >
          📊 ライブリージョン完全ガイド
        </h4>
        <p className={css({ color: "contents.secondary", fontSize: "sm", margin: 0 })}>
          動的なコンテンツ変更をスクリーンリーダーに通知するためのARIA属性とroleの使い分けを理解しましょう。
        </p>
      </div>

      {/* aria-live 属性 */}
      <div
        className={css({
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderColor: "border.default",
          borderStyle: "solid",
          p: 4,
        })}
      >
        <h5 className={css({ marginTop: 0, marginBottom: 3, color: "contents.primary", fontSize: "lg", fontWeight: "semibold" })}>
          🔔 aria-live 属性
        </h5>

        <div className={css({ display: "grid", gap: 3 })}>
          <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md" })}>
            <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>
              <code>aria-live="off"</code>（デフォルト）
            </strong>
            <p className={css({ margin: 0, color: "contents.secondary", fontSize: "sm" })}>
              変更を通知しません。通常のコンテンツに使用します。
            </p>
          </div>

          <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md" })}>
            <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>
              <code>aria-live="polite"</code>
            </strong>
            <p className={css({ margin: 0, color: "contents.secondary", fontSize: "sm" })}>
              ユーザーの操作が落ち着いたタイミングで変更を通知します。ほとんどの場合はこれを使用します。
            </p>
            <div className={css({ marginTop: 2, fontSize: "xs", color: "contents.tertiary" })}>
              使用例: ステータスメッセージ、フォームエラー、検索結果の更新
            </div>
          </div>

          <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md" })}>
            <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>
              <code>aria-live="assertive"</code>
            </strong>
            <p className={css({ margin: 0, color: "contents.secondary", fontSize: "sm" })}>
              即座に読み上げを中断して変更を通知します。緊急時のみ使用してください。
            </p>
            <div className={css({ marginTop: 2, fontSize: "xs", color: "contents.tertiary" })}>
              使用例: 重大なエラー、セキュリティ警告、タイムアウト通知
            </div>
          </div>
        </div>

        <CodeBlock
          code={`<div aria-live="polite">
  {statusMessage}
</div>

<div aria-live="assertive">
  {criticalAlert}
</div>`}
          language="jsx"
          description="// polite: ユーザー操作後に通知
// assertive: 即座に通知（緊急時のみ）"
        />
      </div>

      {/* aria-atomic 属性 */}
      <div
        className={css({
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderColor: "border.default",
          borderStyle: "solid",
          p: 4,
        })}
      >
        <h5 className={css({ marginTop: 0, marginBottom: 3, color: "contents.primary", fontSize: "lg", fontWeight: "semibold" })}>
          ⚛️ aria-atomic 属性
        </h5>

        <div className={css({ display: "grid", gap: 3 })}>
          <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md" })}>
            <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>
              <code>aria-atomic="false"</code>（デフォルト）
            </strong>
            <p className={css({ margin: 0, color: "contents.secondary", fontSize: "sm" })}>
              変更された部分のみを読み上げます。
            </p>
            <div className={css({ marginTop: 2, fontSize: "xs", color: "contents.tertiary" })}>
              例: 「新しいメッセージ」だけが読まれる
            </div>
          </div>

          <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md" })}>
            <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>
              <code>aria-atomic="true"</code>
            </strong>
            <p className={css({ margin: 0, color: "contents.secondary", fontSize: "sm" })}>
              領域全体を最初から読み上げます。文脈が必要な場合に使用します。
            </p>
            <div className={css({ marginTop: 2, fontSize: "xs", color: "contents.tertiary" })}>
              例: 「件名: お知らせ 新しいメッセージ」全体が読まれる
            </div>
          </div>
        </div>

        <CodeBlock
          code={`{/* 変更部分のみ通知 */}
<div aria-live="polite" aria-atomic="false">
  <span>件名: {subject}</span>
  <span>{message}</span>  {/* ← この部分だけ読まれる */}
</div>

{/* 領域全体を通知 */}
<div aria-live="polite" aria-atomic="true">
  <span>件名: {subject}</span>
  <span>{message}</span>  {/* ← 全体が読まれる */}
</div>`}
          language="jsx"
          description="// atomic=false: 変更部分のみ
// atomic=true: 領域全体（文脈が必要な場合）"
        />
      </div>

      {/* role="alert" */}
      <div
        className={css({
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderColor: "border.error",
          borderStyle: "solid",
          p: 4,
        })}
      >
        <h5 className={css({ marginTop: 0, marginBottom: 3, color: "contents.primary", fontSize: "lg", fontWeight: "semibold" })}>
          🚨 role="alert"
        </h5>

        <p className={css({ margin: 0, marginBottom: 3, color: "contents.secondary", fontSize: "sm" })}>
          重要な、時間的制約のあるメッセージを伝えます。<strong>暗黙的に aria-live="assertive" と aria-atomic="true" を持ちます。</strong>
        </p>

        <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md", marginBottom: 3 })}>
          <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>使用場面</strong>
          <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.secondary", lineHeight: "relaxed" })}>
            <li>フォームのバリデーションエラー</li>
            <li>重要なシステムメッセージ</li>
            <li>セッションタイムアウト警告</li>
            <li>接続エラー通知</li>
          </ul>
        </div>

        <CodeBlock
          code={`<div role="alert">
  エラー: ユーザー名は必須です
</div>

{/* 以下と等価 */}
<div
  aria-live="assertive"
  aria-atomic="true"
>
  エラー: ユーザー名は必須です
</div>`}
          language="jsx"
          description="// role=alert は即座に全体を読み上げる"
        />
      </div>

      {/* role="status" */}
      <div
        className={css({
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderColor: "border.default",
          borderStyle: "solid",
          p: 4,
        })}
      >
        <h5 className={css({ marginTop: 0, marginBottom: 3, color: "contents.primary", fontSize: "lg", fontWeight: "semibold" })}>
          ℹ️ role="status"
        </h5>

        <p className={css({ margin: 0, marginBottom: 3, color: "contents.secondary", fontSize: "sm" })}>
          ユーザーへのアドバイザリー情報を伝えます。<strong>暗黙的に aria-live="polite" と aria-atomic="true" を持ちます。</strong>
        </p>

        <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md", marginBottom: 3 })}>
          <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>使用場面</strong>
          <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.secondary", lineHeight: "relaxed" })}>
            <li>ローディング状態（「読み込み中...」）</li>
            <li>成功メッセージ（「保存しました」）</li>
            <li>検索結果の件数（「25件見つかりました」）</li>
            <li>進捗状況の説明</li>
          </ul>
        </div>

        <CodeBlock
          code={`<div role="status">
  <Spinner />
  読み込み中...
</div>

<div role="status">
  保存しました
</div>

{/* 以下と等価 */}
<div
  aria-live="polite"
  aria-atomic="true"
>
  保存しました
</div>`}
          language="jsx"
          description="// role=status は適切なタイミングで全体を読み上げる"
        />
      </div>

      {/* role="log" */}
      <div
        className={css({
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderColor: "border.default",
          borderStyle: "solid",
          p: 4,
        })}
      >
        <h5 className={css({ marginTop: 0, marginBottom: 3, color: "contents.primary", fontSize: "lg", fontWeight: "semibold" })}>
          📝 role="log"
        </h5>

        <p className={css({ margin: 0, marginBottom: 3, color: "contents.secondary", fontSize: "sm" })}>
          新しい情報が追加され、古い情報が消える可能性があるログを表します。<strong>暗黙的に aria-live="polite" を持ちます。</strong>
        </p>

        <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md", marginBottom: 3 })}>
          <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>使用場面</strong>
          <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.secondary", lineHeight: "relaxed" })}>
            <li>チャットメッセージの履歴</li>
            <li>ゲームのイベントログ</li>
            <li>システムログ表示</li>
            <li>履歴や更新フィード</li>
          </ul>
        </div>

        <div className={css({ marginBottom: 3 })}>
          <Button onClick={addLogMessage} variant="outline" size="sm">
            ログメッセージを追加
          </Button>
        </div>

        <div
          role="log"
          aria-label="イベントログ"
          className={css({
            padding: 3,
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            maxHeight: "150px",
            overflowY: "auto",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          {logMessages.length === 0 ? (
            <p className={css({ margin: 0, color: "contents.tertiary", fontSize: "sm" })}>
              ログはまだありません
            </p>
          ) : (
            logMessages.map((msg, index) => (
              <div
                key={index}
                className={css({
                  padding: 2,
                  fontSize: "sm",
                  color: "contents.secondary",
                  borderBottomWidth: index < logMessages.length - 1 ? "thin" : "0",
                  borderBottomStyle: "solid",
                  borderBottomColor: "border.subtle",
                })}
              >
                {msg}
              </div>
            ))
          )}
        </div>

        <CodeBlock
          code={`<div role="log" aria-label="チャットログ">
  {messages.map((msg) => (
    <div key={msg.id}>{msg.text}</div>
  ))}
</div>

{/* 以下と等価 */}
<div
  aria-live="polite"
  aria-label="チャットログ"
>
  {messages.map((msg) => (
    <div key={msg.id}>{msg.text}</div>
  ))}
</div>`}
          language="jsx"
          description="// role=log は新しい項目が追加されると通知する"
        />
      </div>

      {/* role="progressbar" */}
      <div
        className={css({
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderColor: "border.default",
          borderStyle: "solid",
          p: 4,
        })}
      >
        <h5 className={css({ marginTop: 0, marginBottom: 3, color: "contents.primary", fontSize: "lg", fontWeight: "semibold" })}>
          📊 role="progressbar"
        </h5>

        <p className={css({ margin: 0, marginBottom: 3, color: "contents.secondary", fontSize: "sm" })}>
          長時間かかるタスクの進捗状況を表示します。必ず <code>aria-valuenow</code>、<code>aria-valuemin</code>、<code>aria-valuemax</code> を指定します。
        </p>

        <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md", marginBottom: 3 })}>
          <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>必須属性</strong>
          <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.secondary", lineHeight: "relaxed" })}>
            <li><code>aria-valuenow</code>: 現在の値（例: 50）</li>
            <li><code>aria-valuemin</code>: 最小値（通常 0）</li>
            <li><code>aria-valuemax</code>: 最大値（通常 100）</li>
            <li><code>aria-label</code> または <code>aria-labelledby</code>: 進捗バーの説明</li>
          </ul>
        </div>

        <div className={css({ marginBottom: 3 })}>
          <Button onClick={startProgress} variant="primary" size="sm">
            進捗開始
          </Button>
        </div>

        <div
          role="progressbar"
          aria-label="ファイルアップロードの進捗"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className={css({
            width: "100%",
            height: "30px",
            backgroundColor: "bg.secondary",
            borderRadius: "md",
            overflow: "hidden",
            position: "relative",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          <div
            className={css({
              height: "100%",
              backgroundColor: "blue.500",
              transition: "width 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "sm",
              fontWeight: "semibold",
            })}
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>

        <CodeBlock
          code={`<div
  role="progressbar"
  aria-label="ファイルアップロードの進捗"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
>
  <div style={{ width: \`\${progress}%\` }}>
    {progress}%
  </div>
</div>

{/* 不確定な進捗（完了時間不明） */}
<div
  role="progressbar"
  aria-label="処理中"
  aria-valuetext="処理中..."
>
  <Spinner />
</div>`}
          language="jsx"
          description="// progressbar: aria-valuenow で進捗を数値で伝える
// 不確定な場合は aria-valuetext を使用"
        />
      </div>

      {/* まとめ表 */}
      <div
        className={css({
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderColor: "border.default",
          borderStyle: "solid",
          p: 4,
        })}
      >
        <h5 className={css({ marginTop: 0, marginBottom: 3, color: "contents.primary", fontSize: "lg", fontWeight: "semibold" })}>
          📋 クイックリファレンス
        </h5>

        <div className={css({ overflowX: "auto" })}>
          <table className={css({ width: "100%", borderCollapse: "collapse", fontSize: "sm" })}>
            <thead>
              <tr className={css({ backgroundColor: "bg.secondary" })}>
                <th className={css({ padding: 2, textAlign: "left", borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>Role / 属性</th>
                <th className={css({ padding: 2, textAlign: "left", borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>暗黙の動作</th>
                <th className={css({ padding: 2, textAlign: "left", borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>使用場面</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  <code>aria-live="polite"</code>
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  適切なタイミングで通知
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  ステータス、検索結果
                </td>
              </tr>
              <tr className={css({ backgroundColor: "bg.secondary" })}>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  <code>aria-live="assertive"</code>
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  即座に通知
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  緊急エラー、警告
                </td>
              </tr>
              <tr>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  <code>aria-atomic="true"</code>
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  領域全体を読み上げ
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  文脈が必要な場合
                </td>
              </tr>
              <tr className={css({ backgroundColor: "bg.secondary" })}>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  <code>role="alert"</code>
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  assertive + atomic
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  エラー、重要通知
                </td>
              </tr>
              <tr>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  <code>role="status"</code>
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  polite + atomic
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  ローディング、成功通知
                </td>
              </tr>
              <tr className={css({ backgroundColor: "bg.secondary" })}>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  <code>role="log"</code>
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  polite（新規追加時）
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  チャット、履歴、ログ
                </td>
              </tr>
              <tr>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  <code>role="progressbar"</code>
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  valuenow を通知
                </td>
                <td className={css({ padding: 2, borderWidth: "thin", borderStyle: "solid", borderColor: "border.default" })}>
                  アップロード、処理進捗
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ベストプラクティス */}
      <div
        className={css({
          padding: 3,
          backgroundColor: "bg.secondary",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "border.warning",
          borderRadius: "md",
        })}
      >
        <h5 className={css({ marginTop: 0, marginBottom: 2, color: "contents.primary", fontSize: "base", fontWeight: "semibold" })}>
          💡 ベストプラクティス
        </h5>
        <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.primary", lineHeight: "relaxed" })}>
          <li>ほとんどの場合は <code>role="status"</code> または <code>role="alert"</code> で十分</li>
          <li><code>aria-live="assertive"</code> は本当に緊急な場合のみ使用</li>
          <li>頻繁に更新される領域では <code>aria-atomic="false"</code> を検討</li>
          <li>進捗バーには必ず <code>aria-label</code> で説明を追加</li>
          <li>ログには <code>aria-label</code> でログの種類を明示</li>
        </ul>
      </div>
    </div>
  );
}

function NotificationDemo() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [status, setStatus] = useState("ブラウザの対応状況を確認しています…");

  useEffect(() => {
    const available =
      typeof window !== "undefined" && "Notification" in window;
    setIsSupported(available);
    if (available) {
      setPermission(Notification.permission);
      setStatus("通知の許可状態を確認し、必要ならリクエストしてください。");
    } else {
      setStatus("このブラウザは Notification API をサポートしていません。");
    }
  }, []);

  const handleRequestPermission = async () => {
    if (!isSupported) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    setStatus(
      result === "granted"
        ? "通知が許可されました！下のボタンからテスト通知を送信できます。"
        : result === "denied"
          ? "通知は拒否されました。ブラウザ設定から再度許可してください。"
          : "ユーザーの判断待ちです。"
    );
  };

  const handleSendNotification = () => {
    if (!isSupported || permission !== "granted") {
      setStatus("通知を送信するには、まず許可を「許可」にしてください。");
      return;
    }

    const notification = new Notification("Notification API デモ", {
      body: "Accessibility Guide から送信されたテスト通知です。",
      tag: "a11y-notification-demo",
      data: { url: window.location.href },
    });

    notification.onclick = () => {
      window.focus?.();
      notification.close();
    };

    setStatus("テスト通知を送信しました。ブラウザの通知センターを確認してください。");
  };

  return (
    <div
      className={css({
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.default",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      })}
    >
      <div>
        <h4
          className={css({
            marginTop: 0,
            fontSize: "lg",
            fontWeight: "semibold",
            color: "contents.primary",
          })}
        >
          🔔 Notification API デモ
        </h4>
        <p className={css({ color: "contents.secondary", fontSize: "sm", marginBottom: 0 })}>
          ブラウザのネイティブ通知を呼び出す基本的な流れを試せます。必ずユーザー操作とセットで許可をリクエストしましょう。
        </p>
      </div>

      <div className={css({ display: "flex", flexWrap: "wrap", gap: 3 })}>
        <Button onClick={handleRequestPermission} variant="outline">
          許可をリクエスト
        </Button>
        <Button onClick={handleSendNotification} variant="primary">
          テスト通知を送信
        </Button>
        <div
          className={css({
            fontSize: "sm",
            color: "contents.secondary",
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <span>サポート状況:</span>
          <span className={css({ fontWeight: "semibold", color: isSupported ? "contents.success" : "contents.error" })}>
            {isSupported ? "利用可能" : "未対応"}
          </span>
          <span>/ 許可状態: {permission}</span>
        </div>
      </div>

      <p
        className={css({
          margin: 0,
          padding: 3,
          borderRadius: "md",
          backgroundColor: "bg.primary",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          color: "contents.secondary",
        })}
        aria-live="polite"
      >
        {status}
      </p>

      <CodeBlock
        language="ts"
        code={`if ("Notification" in window) {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const notification = new Notification("タイトル", {
      body: "本文テキスト",
      tag: "sample-demo",
      data: { url: location.href },
    });
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }
}`}
        description={`// Notification.requestPermission(): ユーザー操作とセットで呼び出す
// 許可済みになったら new Notification(...) で通知を生成
// Service Worker では registration.showNotification() を利用`}
      />
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

      <div className={css({ display: "flex", flexDirection: "column", gap: 3 })}>
        <div className={css({ display: "flex", gap: 2, flexWrap: "wrap" })}>
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

        <ScreenReaderDemo
          label="スクリーンリーダー実演"
          description="aria-live領域がどのように読み上げられるか確認できます"
        >
          <div
            aria-live="polite"
            aria-atomic="true"
            className={css({
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
            {message || "ボタンをクリックしてメッセージを表示"}
          </div>
        </ScreenReaderDemo>
      </div>

      <div className={css({ marginTop: 3 })}>
        <CodeBlock
          code={`<Button variant="primary" size="sm" onClick={() => addMessage('success')}>
  成功メッセージ
</Button>
<Button variant="danger" size="sm" onClick={() => addMessage('error')}>
  エラーメッセージ
</Button>
<Button variant="secondary" size="sm" onClick={() => addMessage('info')}>
  情報メッセージ
</Button>

<div
  aria-live="polite"
  aria-atomic="true"
>
  {message || "ボタンをクリックしてメッセージを表示"}
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

// アクセシブルなカルーセル
function AccessibleCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      title: "スライド 1",
      description: "美しい風景の写真",
      image: "🏔️",
    },
    {
      id: 2,
      title: "スライド 2",
      description: "都市の夜景",
      image: "🌃",
    },
    {
      id: 3,
      title: "スライド 3",
      description: "自然の中の小道",
      image: "🌲",
    },
    {
      id: 4,
      title: "スライド 4",
      description: "夕焼けのビーチ",
      image: "🌅",
    },
  ];

  const totalSlides = slides.length;

  // 自動再生
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // キーボード操作
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        goToPrevious();
        break;
      case "ArrowRight":
        e.preventDefault();
        goToNext();
        break;
      case "Home":
        e.preventDefault();
        goToSlide(0);
        break;
      case "End":
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
    }
  };

  // タッチ操作
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div
      className={css({
        padding: 4,
        backgroundColor: "bg.secondary",
        borderRadius: "md",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.default",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      })}
    >
      <div>
        <h4
          className={css({
            marginTop: 0,
            marginBottom: 2,
            fontSize: "xl",
            fontWeight: "bold",
            color: "contents.primary",
          })}
        >
          🎠 アクセシブルなカルーセル
        </h4>
        <p className={css({ color: "contents.secondary", fontSize: "sm", margin: 0 })}>
          キーボード操作、スクリーンリーダー対応、自動再生制御など、
          アクセシビリティに配慮したカルーセルの実装例です。
        </p>
      </div>

      {/* カルーセル本体 */}
      <div
        ref={carouselRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="画像カルーセル"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={css({
          position: "relative",
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          overflow: "hidden",
          outline: "none",
          "&:focus-visible": {
            borderColor: "border.focus",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
          },
        })}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* スライドコンテナ */}
        <div
          className={css({
            display: "flex",
            transition: "transform 0.5s ease-in-out",
          })}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${totalSlides}`}
              aria-hidden={index !== currentSlide}
              className={css({
                minWidth: "100%",
                padding: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              })}
            >
              <div className={css({ fontSize: "6xl" })}>{slide.image}</div>
              <h5
                className={css({
                  margin: 0,
                  fontSize: "xl",
                  fontWeight: "semibold",
                  color: "contents.primary",
                })}
              >
                {slide.title}
              </h5>
              <p
                className={css({
                  margin: 0,
                  fontSize: "sm",
                  color: "contents.secondary",
                })}
              >
                {slide.description}
              </p>
            </div>
          ))}
        </div>

        {/* 前へボタン */}
        <button
          onClick={goToPrevious}
          aria-label="前のスライドへ"
          className={css({
            position: "absolute",
            top: "50%",
            left: 2,
            transform: "translateY(-50%)",
            backgroundColor: "bg.primary",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            borderRadius: "full",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "xl",
            color: "contents.primary",
            opacity: 0.9,
            transition: "opacity 0.2s",
            "&:hover": {
              opacity: 1,
              backgroundColor: "bg.secondary",
            },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "border.focus",
              outlineOffset: "2px",
            },
          })}
        >
          ←
        </button>

        {/* 次へボタン */}
        <button
          onClick={goToNext}
          aria-label="次のスライドへ"
          className={css({
            position: "absolute",
            top: "50%",
            right: 2,
            transform: "translateY(-50%)",
            backgroundColor: "bg.primary",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            borderRadius: "full",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "xl",
            color: "contents.primary",
            opacity: 0.9,
            transition: "opacity 0.2s",
            "&:hover": {
              opacity: 1,
              backgroundColor: "bg.secondary",
            },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "border.focus",
              outlineOffset: "2px",
            },
          })}
        >
          →
        </button>
      </div>

      {/* コントロールパネル */}
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          flexWrap: "wrap",
        })}
      >
        {/* インジケーター */}
        <div
          role="group"
          aria-label="スライドインジケーター"
          className={css({
            display: "flex",
            gap: 2,
            alignItems: "center",
          })}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              aria-label={`スライド ${index + 1} へ移動`}
              aria-current={index === currentSlide ? "true" : undefined}
              className={css({
                width: "12px",
                height: "12px",
                borderRadius: "full",
                borderWidth: "thin",
                borderStyle: "solid",
                borderColor: "border.default",
                backgroundColor: index === currentSlide ? "blue.500" : "bg.tertiary",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "border.focus",
                  outlineOffset: "2px",
                },
              })}
            />
          ))}
        </div>

        {/* 再生/一時停止ボタン */}
        <Button
          onClick={togglePlayPause}
          variant="outline"
          size="sm"
          aria-label={isPlaying ? "自動再生を一時停止" : "自動再生を開始"}
        >
          {isPlaying ? "⏸️ 一時停止" : "▶️ 再生"}
        </Button>
      </div>

      {/* 現在のスライド情報（aria-live） */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className={css({
          padding: 3,
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          fontSize: "sm",
          color: "contents.secondary",
          textAlign: "center",
        })}
      >
        スライド {currentSlide + 1} / {totalSlides}: {slides[currentSlide].title}
      </div>

      {/* アクセシビリティ要件 */}
      <div
        className={css({
          padding: 4,
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
        })}
      >
        <h5
          className={css({
            marginTop: 0,
            marginBottom: 3,
            color: "contents.primary",
            fontSize: "lg",
            fontWeight: "semibold",
          })}
        >
          ✅ 実装されているアクセシビリティ機能
        </h5>

        <div className={css({ display: "grid", gap: 3 })}>
          <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md" })}>
            <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>
              ⌨️ キーボード操作
            </strong>
            <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.secondary", lineHeight: "relaxed" })}>
              <li><kbd>←</kbd> / <kbd>→</kbd>: 前後のスライドへ移動</li>
              <li><kbd>Home</kbd>: 最初のスライドへ</li>
              <li><kbd>End</kbd>: 最後のスライドへ</li>
              <li><kbd>Tab</kbd>: インジケーターやボタンへフォーカス移動</li>
            </ul>
          </div>

          <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md" })}>
            <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>
              🏷️ ARIA属性
            </strong>
            <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.secondary", lineHeight: "relaxed" })}>
              <li><code>role="region"</code> + <code>aria-roledescription="carousel"</code>: カルーセル領域を明示</li>
              <li><code>aria-label</code>: カルーセルの目的を説明</li>
              <li><code>role="group"</code> + <code>aria-roledescription="slide"</code>: 各スライドを識別</li>
              <li><code>aria-label="n / total"</code>: スライドの位置情報</li>
              <li><code>aria-hidden</code>: 非表示スライドをスクリーンリーダーから隠す</li>
              <li><code>aria-current="true"</code>: 現在のインジケーターを示す</li>
            </ul>
          </div>

          <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md" })}>
            <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>
              📢 ライブリージョン
            </strong>
            <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.secondary", lineHeight: "relaxed" })}>
              <li><code>aria-live="polite"</code>: スライド変更を通知</li>
              <li><code>aria-atomic="false"</code>: 変更部分のみを読み上げ</li>
              <li>スライド番号とタイトルを自動読み上げ</li>
            </ul>
          </div>

          <div className={css({ padding: 3, backgroundColor: "bg.secondary", borderRadius: "md" })}>
            <strong className={css({ color: "contents.primary", display: "block", marginBottom: 2 })}>
              🎮 ユーザー制御
            </strong>
            <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.secondary", lineHeight: "relaxed" })}>
              <li>自動再生の再生/一時停止ボタン</li>
              <li>明確なラベル付きナビゲーションボタン</li>
              <li>タッチ/スワイプ操作対応</li>
              <li>フォーカスインジケーターの明示</li>
            </ul>
          </div>
        </div>
      </div>

      {/* コード例 */}
      <CodeBlock
        language="tsx"
        code={`// カルーセルのコンテナ
<div
  ref={carouselRef}
  role="region"
  aria-roledescription="carousel"
  aria-label="画像カルーセル"
  onKeyDown={handleKeyDown}
  tabIndex={0}
>
  {/* スライド */}
  {slides.map((slide, index) => (
    <div
      key={slide.id}
      role="group"
      aria-roledescription="slide"
      aria-label={\`\${index + 1} / \${totalSlides}\`}
      aria-hidden={index !== currentSlide}
    >
      {slide.content}
    </div>
  ))}

  {/* ナビゲーションボタン */}
  <button
    onClick={goToPrevious}
    aria-label="前のスライドへ"
  >
    ←
  </button>
  <button
    onClick={goToNext}
    aria-label="次のスライドへ"
  >
    →
  </button>
</div>

{/* インジケーター */}
<div role="group" aria-label="スライドインジケーター">
  {slides.map((slide, index) => (
    <button
      key={slide.id}
      onClick={() => goToSlide(index)}
      aria-label={\`スライド \${index + 1} へ移動\`}
      aria-current={index === currentSlide ? "true" : undefined}
    />
  ))}
</div>

{/* ライブリージョン */}
<div aria-live="polite" aria-atomic="false">
  スライド {currentSlide + 1} / {totalSlides}: {slides[currentSlide].title}
</div>

{/* 自動再生コントロール */}
<button
  onClick={togglePlayPause}
  aria-label={isPlaying ? "自動再生を一時停止" : "自動再生を開始"}
>
  {isPlaying ? "⏸️ 一時停止" : "▶️ 再生"}
</button>`}
        description="// カルーセルの基本構造とARIA属性の実装例"
      />

      {/* ベストプラクティス */}
      <div
        className={css({
          padding: 3,
          backgroundColor: "bg.secondary",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "border.warning",
          borderRadius: "md",
        })}
      >
        <h5
          className={css({
            marginTop: 0,
            marginBottom: 2,
            color: "contents.primary",
            fontSize: "base",
            fontWeight: "semibold",
          })}
        >
          💡 カルーセルのベストプラクティス
        </h5>
        <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.primary", lineHeight: "relaxed" })}>
          <li>自動再生はデフォルトでオフにし、ユーザーが制御できるようにする</li>
          <li>自動再生中でもキーボード操作で即座に停止できるようにする</li>
          <li>非表示のスライドには <code>aria-hidden="true"</code> を付ける</li>
          <li>各スライドに意味のある <code>aria-label</code> を付ける</li>
          <li>ナビゲーションボタンには明確なラベルを付ける</li>
          <li>インジケーターで現在位置を視覚的・音声的に示す</li>
          <li>タッチデバイスでもスワイプ操作を可能にする</li>
          <li>フォーカスインジケーターを明確に表示する</li>
          <li>スライド変更時は <code>aria-live</code> で通知する</li>
        </ul>
      </div>

      {/* 参考リンク */}
      <div
        className={css({
          padding: 3,
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
        })}
      >
        <h5
          className={css({
            marginTop: 0,
            marginBottom: 2,
            color: "contents.primary",
            fontSize: "base",
            fontWeight: "semibold",
          })}
        >
          📚 参考資料
        </h5>
        <ul className={css({ margin: 0, paddingLeft: 5, color: "contents.secondary", lineHeight: "relaxed" })}>
          <li>
            <a
              href="https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
              target="_blank"
              rel="noopener noreferrer"
              className={css({ color: "contents.link", textDecoration: "underline" })}
            >
              W3C ARIA Authoring Practices - Carousel Pattern
            </a>
          </li>
          <li>
            <a
              href="https://www.w3.org/WAI/tutorials/carousels/"
              target="_blank"
              rel="noopener noreferrer"
              className={css({ color: "contents.link", textDecoration: "underline" })}
            >
              W3C Web Accessibility Tutorials - Carousels
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
