import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, MouseEvent } from "react";
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

      <div className={css({ marginTop: 8 })}>
        <SectionHeading>インライン要素の使い分け</SectionHeading>
        <p
          className={css({
            color: "contents.secondary",
            lineHeight: "relaxed",
            marginBottom: 3,
          })}
        >
          ARIA 属性の説明では <code>&lt;code&gt;</code> や <code>&lt;strong&gt;</code>{" "}
          などのインライン要素がよく登場します。これらは視覚的な強調だけでなく、スクリーンリーダーに
          「ここはコード片」「ここは重要語」と伝える役割もあります。
        </p>
        <ul
          className={css({
            color: "contents.primary",
            lineHeight: "relaxed",
            margin: 0,
            paddingLeft: 5,
          })}
        >
          <li>
            <code>&lt;code&gt;</code>: 属性名やサンプルの値を囲むと「コード」として読み上げられ、
            等幅フォントで表示されます。例:{" "}
            <code>&lt;code&gt;aria-haspopup="menu"&lt;/code&gt;</code>
          </li>
          <li>
            <code>&lt;strong&gt;</code>: 重要語を強調し、スクリーンリーダーも
            「強調」や「ストロング」と案内します。例:{" "}
            <code>&lt;strong&gt;必須&lt;/strong&gt;</code>
          </li>
          <li>
            <code>&lt;em&gt;</code>: ニュアンスや語調を変えたい語句に使用。多くのスクリーンリーダーが
            「強調」や声のトーンで違いを伝えるので、単なるスタイル目的ではなく意味的な強調に限定します。
          </li>
        </ul>
        <CodeBlock
          language="html"
          code={`<p>
  <strong>重要:</strong> <code>aria-label</code> には
  <em>常に</em> 簡潔な説明文を設定してください。
</p>`}
        />
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

      <div
        className={css({
          marginTop: 8,
          padding: 4,
          backgroundColor: "bg.primary",
          borderRadius: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          boxShadow: "sm",
        })}
      >
        <SectionHeading>aria-haspopup の使い方</SectionHeading>
        <p
          className={css({
            color: "contents.primary",
            lineHeight: "relaxed",
            marginBottom: 4,
          })}
        >
          <code>aria-haspopup</code> は「このトリガーからどんな種類のポップアップが現れるか」を
          スクリーンリーダーに予告する属性です。ネイティブの{" "}
          <code>&lt;select&gt;</code> などでは不要ですが、カスタム UI を作るときは付与することで
          ユーザーがフォーカス移動方法や期待される操作を把握できます。
        </p>
        <ul
          className={css({
            color: "contents.primary",
            lineHeight: "relaxed",
            margin: 0,
            paddingLeft: 5,
          })}
        >
          <li>
            <strong>用途の違い:</strong>{" "}
            <code>listbox</code> は「値を選ぶ」入力コンポーネント、<code>menu</code>{" "}
            は「操作を選ぶ」コマンド一覧、<code>dialog</code> は「モーダルウィンドウ」を表現します。
            実現したい UI の目的に応じて適切な値を選択してください。
          </li>
          <li>
            <strong>値の選び方:</strong>{" "}
            <code>"menu"</code> / <code>"listbox"</code> / <code>"dialog"</code>{" "}
            などポップアップの種類を指定。Dropdown/Select では{" "}
            <code>aria-haspopup="listbox"</code> が適切です。
          </li>
          <li>
            <strong>スクリーンリーダーの案内:</strong>{" "}
            <code>listbox</code> → 「リストボックス、N項目」、<code>menu</code>{" "}
            → 「メニュー」、<code>dialog</code> → 「ダイアログ」のように
            読み上げ内容が変わるため、ユーザーに期待される操作（矢印キーで移動、Enterで実行など）も伝わりやすくなります。
          </li>
          <li>
            <strong>セットで使う属性:</strong>{" "}
            <code>aria-expanded</code> で開閉状態を同期し、必要に応じて{" "}
            <code>aria-controls</code> や <code>aria-labelledby</code> で
            ポップアップとの関連を示します。
          </li>
          <li>
            <strong>当プロジェクトの実装:</strong> Dropdown トリガーで{" "}
            <code>aria-haspopup="listbox"</code> を使用し、開いたリストには{" "}
            <code>role="listbox"</code> + <code>role="option"</code> を設定。
            これによりスクリーンリーダーが「候補リストが開く」ことを認識できます。
          </li>
        </ul>
        <CodeBlock
          language="tsx"
          code={`<button
  type="button"
  aria-haspopup="listbox"
  aria-expanded={isOpen}
  aria-controls="fruit-listbox"
>
  フルーツを選択
</button>
<ul id="fruit-listbox" role="listbox">
  <li role="option" aria-selected="true">りんご</li>
  <li role="option">バナナ</li>
</ul>`}
        />
        <ScreenReaderDemo
          label="スクリーンリーダーデモ"
          description="VoiceOver では「りんご、ボタン、候補リストを開く」と案内され、Tab/Enterでリストを開くと各 option が順に読み上げられます。NVDA/JAWS でも aria-haspopup と role=listbox の組み合わせによりリストであることが伝わります。"
        >
          <AriaHaspopupDemo />
        </ScreenReaderDemo>

        <div className={css({ mt: 8 })}>
          <h4
            className={css({
              mt: 0,
              mb: 3,
              fontSize: "lg",
              color: "contents.primary",
              display: "flex",
              alignItems: "center",
              gap: 2,
            })}
          >
            <icons.component.button size={20} className={css({ color: "blue.600" })} />
            メニュー (aria-haspopup="menu")
          </h4>
          <p
            className={css({
              color: "contents.secondary",
              lineHeight: "relaxed",
              marginBottom: 4,
            })}
          >
            コンテキストメニューやアクションメニューは <code>aria-haspopup="menu"</code>{" "}
            と <code>role="menu"</code> の組み合わせを使います。上下キーで項目移動、Enter/Spaceで決定できるようにし、項目には{" "}
            <code>role="menuitem"</code> を設定します。
          </p>
          <ScreenReaderDemo
            label="スクリーンリーダーデモ（メニュー）"
            description="Tab でボタンにフォーカス → Enter/Space でメニューを開く → 上下矢印で項目移動 → Enter でアクションを決定できます。"
          >
            <AriaMenuHaspopupDemo />
          </ScreenReaderDemo>
        </div>

        <div className={css({ mt: 8 })}>
          <h4
            className={css({
              mt: 0,
              mb: 3,
              fontSize: "lg",
              color: "contents.primary",
              display: "flex",
              alignItems: "center",
              gap: 2,
            })}
          >
            <icons.component.info size={20} className={css({ color: "orange.600" })} />
            ダイアログ (aria-haspopup="dialog")
          </h4>
          <p
            className={css({
              color: "contents.secondary",
              lineHeight: "relaxed",
              marginBottom: 4,
            })}
          >
            モーダルを開くトリガーは <code>aria-haspopup="dialog"</code>{" "}
            を指定し、開いたダイアログ本体に <code>role="dialog"</code> +{" "}
            <code>aria-modal="true"</code> を設定します。タイトルと本文を{" "}
            <code>aria-labelledby</code> / <code>aria-describedby</code> で結びつけ、
            Escapeキーで閉じられるように実装します。
          </p>
          <ScreenReaderDemo
            label="スクリーンリーダーデモ（ダイアログ）"
            description="トリガーを押すとモーダルが開き、VoiceOver/NVDA ではタイトル→本文→操作ボタンの順に読み上げられます。Esc か「閉じる」で元のボタンにフォーカスが戻ります。"
          >
            <AriaDialogHaspopupDemo />
          </ScreenReaderDemo>
        </div>
      </div>
    </section>
  );
};

const demoOptions = [
  { value: "apple", label: "りんご" },
  { value: "banana", label: "バナナ" },
  { value: "grape", label: "ぶどう" },
  { value: "orange", label: "オレンジ" },
];

function AriaHaspopupDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(demoOptions[0].value);
  const buttonId = useId();
  const listboxId = `${buttonId}-listbox`;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selectedOption =
    demoOptions.find((option) => option.value === selectedValue) ?? demoOptions[0];

  useEffect(() => {
    if (!isOpen) return;
    const optionId = `${listboxId}-${selectedValue}`;
    const optionEl = document.getElementById(optionId);
    if (optionEl instanceof HTMLElement) {
      optionEl.focus();
    }
  }, [isOpen, listboxId, selectedValue]);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (
      wrapperRef.current &&
      event.relatedTarget &&
      wrapperRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    setIsOpen(false);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLLIElement>, value: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      onBlur={handleBlur}
      className={css({
        mt: 4,
        p: 4,
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.default",
        borderRadius: "md",
        backgroundColor: "bg.secondary",
        maxW: "320px",
      })}
    >
      <p className={css({ mt: 0, mb: 3, color: "contents.secondary", fontSize: "sm" })}>
        下のボタンは <code>aria-haspopup="listbox"</code> を指定したカスタムの
        ドロップダウン例です。
      </p>
      <button
        id={buttonId}
        type="button"
        className={css({
          width: "100%",
          textAlign: "left",
          padding: 3,
          borderRadius: "sm",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          backgroundColor: "bg.primary",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        })}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{selectedOption.label}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={buttonId}
          className={css({
            mt: 2,
            mb: 0,
            listStyle: "none",
            padding: 0,
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            borderRadius: "md",
            backgroundColor: "bg.primary",
            boxShadow: "md",
          })}
        >
          {demoOptions.map((option) => {
            const optionId = `${listboxId}-${option.value}`;
            const isSelected = option.value === selectedOption.value;
            return (
              <li
                key={option.value}
                id={optionId}
                role="option"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleSelect(option.value)}
                onKeyDown={(event) => handleOptionKeyDown(event, option.value)}
                className={css({
                  px: 3,
                  py: 2,
                  cursor: "pointer",
                  backgroundColor: isSelected ? "blue.50" : "transparent",
                  color: "contents.primary",
                  _hover: { backgroundColor: "blue.100" },
                })}
              >
                {option.label}
                {isSelected && (
                  <span className={css({ ml: 2, color: "blue.700" })} aria-hidden="true">
                    ✓
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const menuItems = [
  { value: "edit", label: "編集する" },
  { value: "duplicate", label: "複製する" },
  { value: "archive", label: "アーカイブ" },
  { value: "delete", label: "削除する" },
];

function AriaMenuHaspopupDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastAction, setLastAction] = useState<string>("");
  const buttonId = useId();
  const menuId = `${buttonId}-menu`;
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const targetId = `${menuId}-item-${activeIndex}`;
    const el = document.getElementById(targetId);
    if (el instanceof HTMLElement) {
      el.focus();
    }
  }, [activeIndex, isOpen, menuId]);

  const handleWrapperBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (
      wrapperRef.current &&
      event.relatedTarget &&
      wrapperRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    closeMenu();
  };

  const openMenu = () => {
    setIsOpen(true);
    setActiveIndex(0);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLLIElement>, index: number) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % menuItems.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(menuItems.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(menuItems[index].label);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  };

  const handleSelect = (label: string) => {
    setLastAction(`「${label}」を選択しました`);
    closeMenu();
  };

  return (
    <div
      ref={wrapperRef}
      onBlur={handleWrapperBlur}
      className={css({
        mt: 4,
        p: 4,
        borderRadius: "md",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.subtle",
        backgroundColor: "bg.primary",
        maxW: "320px",
      })}
    >
      <p className={css({ mt: 0, mb: 3, color: "contents.secondary", fontSize: "sm" })}>
        メニュー項目には <code>role="menuitem"</code> を付け、上下キーで移動させます。
      </p>
      <button
        id={buttonId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        className={css({
          width: "100%",
          padding: 3,
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          borderRadius: "sm",
          backgroundColor: "bg.primary",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        アクションを選択
        <span aria-hidden="true">⋮</span>
      </button>
      {isOpen && (
        <ul
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          className={css({
            mt: 2,
            mb: 0,
            listStyle: "none",
            padding: 0,
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            borderRadius: "md",
            backgroundColor: "bg.secondary",
            boxShadow: "md",
          })}
        >
          {menuItems.map((item, index) => {
            const itemId = `${menuId}-item-${index}`;
            const isActive = index === activeIndex;
            return (
              <li
                key={item.value}
                id={itemId}
                role="menuitem"
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(event) => handleMenuKeyDown(event, index)}
                onClick={() => handleSelect(item.label)}
                className={css({
                  px: 3,
                  py: 2,
                  cursor: "pointer",
                  backgroundColor: isActive ? "blue.50" : "transparent",
                  color: "contents.primary",
                  _hover: { backgroundColor: "blue.100" },
                })}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      )}
      {lastAction && (
        <p
          className={css({
            margin: "0.5rem 0 0",
            fontSize: "xs",
            color: "contents.secondary",
          })}
        >
          {lastAction}
        </p>
      )}
    </div>
  );
}

function AriaDialogHaspopupDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descId = `${dialogId}-desc`;

  const closeDialog = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
    }
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  return (
    <div
      className={css({
        position: "relative",
        p: 4,
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border.subtle",
        borderRadius: "md",
        backgroundColor: "bg.primary",
      })}
    >
      <p className={css({ mt: 0, mb: 3, color: "contents.secondary", fontSize: "sm" })}>
        <code>aria-haspopup="dialog"</code> + <code>aria-expanded</code> でモーダルを開くボタンを表現します。
      </p>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={`${dialogId}-panel`}
        onClick={() => setIsOpen(true)}
        className={css({
          padding: 3,
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
          borderRadius: "sm",
          backgroundColor: "blue.600",
          color: "white",
          fontWeight: "semibold",
        })}
      >
        モーダルを開く
      </button>
      {isOpen && (
        <div
          role="presentation"
          onClick={handleOverlayClick}
          className={css({
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          })}
        >
          <div
            id={`${dialogId}-panel`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            onKeyDown={handleDialogKeyDown}
            tabIndex={-1}
            className={css({
              width: "min(90vw, 360px)",
              backgroundColor: "bg.primary",
              borderRadius: "lg",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "border.default",
              boxShadow: "xl",
              p: 5,
            })}
          >
            <h5 id={titleId} className={css({ mt: 0, mb: 2, color: "contents.primary" })}>
              事前確認
            </h5>
            <p
              id={descId}
              className={css({
                margin: 0,
                color: "contents.secondary",
                lineHeight: "relaxed",
              })}
            >
              このモーダルは <code>role="dialog"</code> と{" "}
              <code>aria-modal="true"</code> を使用しています。Esc で閉じることも可能です。
            </p>
            <div
              className={css({
                mt: 4,
                display: "flex",
                gap: 3,
                justifyContent: "flex-end",
              })}
            >
              <button
                type="button"
                className={css({
                  padding: "0.5rem 0.75rem",
                  borderWidth: "thin",
                  borderStyle: "solid",
                  borderColor: "border.default",
                  borderRadius: "sm",
                  backgroundColor: "bg.secondary",
                })}
                onClick={closeDialog}
              >
                キャンセル
              </button>
              <button
                ref={closeButtonRef}
                type="button"
                className={css({
                  padding: "0.5rem 0.75rem",
                  borderRadius: "sm",
                  borderWidth: "thin",
                  borderStyle: "solid",
                  borderColor: "blue.700",
                  backgroundColor: "blue.700",
                  color: "white",
                  fontWeight: "semibold",
                })}
                onClick={closeDialog}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
