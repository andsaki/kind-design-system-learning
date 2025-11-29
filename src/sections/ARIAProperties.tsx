import { Button, Accordion, AccordionSummary, AccordionContent } from "../design-system/components";
import { CodeBlock } from "../components/CodeBlock";
import { icons } from "../design-system/tokens";
import { css, cx } from "@/styled-system/css";
import { token } from "@/styled-system/tokens";

const sectionClass = css({
  mb: 12,
  p: 6,
  bg: "bg.primary",
  rounded: "lg",
  borderWidth: "base",
  borderStyle: "solid",
  borderColor: "border.default",
  maxW: "full",
  overflowX: "hidden",
  boxSizing: "border-box",
});

const headingClass = css({
  mt: 0,
  color: "contents.primary",
  fontSize: "2xl",
  fontWeight: "bold",
  borderBottomWidth: "thick",
  borderBottomStyle: "solid",
  borderBottomColor: {
    base: token("colors.pink.500"),
    _dark: token("colors.pink.400"),
  },
  pb: 2,
  mb: 6,
  display: "flex",
  alignItems: "center",
  gap: 2,
});

const introTextClass = css({
  color: "contents.secondary",
  mb: 6,
  fontSize: "base",
  lineHeight: "relaxed",
});

const propertyCardBase = css({
  mb: 8,
  p: 6,
  rounded: "lg",
  borderWidth: "base",
  borderStyle: "solid",
});

const propertyCardPink = css({
  bg: {
    base: token("colors.pink.50"),
    _dark: token("colors.pink.950"),
  },
  borderColor: {
    base: token("colors.pink.200"),
    _dark: token("colors.pink.800"),
  },
});

const propertyCardBlue = css({
  bg: {
    base: token("colors.blue.50"),
    _dark: token("colors.blue.950"),
  },
  borderColor: {
    base: token("colors.blue.200"),
    _dark: token("colors.blue.800"),
  },
});

const propertyCardGreen = css({
  bg: {
    base: token("colors.green.50"),
    _dark: token("colors.green.950"),
  },
  borderColor: {
    base: token("colors.green.200"),
    _dark: token("colors.green.800"),
  },
});

const propertyCardOrange = css({
  bg: {
    base: token("colors.orange.50"),
    _dark: token("colors.orange.950"),
  },
  borderColor: {
    base: token("colors.orange.200"),
    _dark: token("colors.orange.800"),
  },
});

const summaryCardClass = css({
  p: 6,
  bg: {
    base: token("colors.blue.50"),
    _dark: token("colors.blue.950"),
  },
  rounded: "lg",
  borderWidth: "base",
  borderStyle: "solid",
  borderColor: {
    base: token("colors.blue.200"),
    _dark: token("colors.blue.800"),
  },
});

const h3Class = css({
  mt: 0,
  mb: 4,
  fontSize: "xl",
  fontWeight: "semibold",
  display: "flex",
  alignItems: "center",
  gap: 2,
});

const h3PinkClass = css({
  color: {
    base: token("colors.pink.900"),
    _dark: token("colors.pink.100"),
  },
});

const h3BlueClass = css({
  color: {
    base: token("colors.blue.900"),
    _dark: token("colors.blue.100"),
  },
});

const h3GreenClass = css({
  color: {
    base: token("colors.green.900"),
    _dark: token("colors.green.100"),
  },
});

const h3OrangeClass = css({
  color: {
    base: token("colors.orange.900"),
    _dark: token("colors.orange.100"),
  },
});

const descriptionTextClass = css({
  color: "contents.secondary",
  mb: 4,
  lineHeight: "relaxed",
});

const gridClass = css({
  display: "grid",
  gap: 4,
});

const innerCardBase = css({
  p: 4,
  bg: "bg.primary",
  rounded: "md",
  borderWidth: "thin",
  borderStyle: "solid",
});

const innerCardPinkClass = css({
  borderColor: {
    base: token("colors.pink.200"),
    _dark: token("colors.pink.800"),
  },
});

const innerCardBlueClass = css({
  borderColor: {
    base: token("colors.blue.200"),
    _dark: token("colors.blue.800"),
  },
});

const innerCardGreenClass = css({
  borderColor: {
    base: token("colors.green.200"),
    _dark: token("colors.green.800"),
  },
});

const innerCardOrangeClass = css({
  borderColor: {
    base: token("colors.orange.200"),
    _dark: token("colors.orange.800"),
  },
});

const h4Base = css({
  mt: 0,
  mb: 3,
  fontSize: "lg",
  fontWeight: "semibold",
});

const h4PinkClass = css({
  color: {
    base: token("colors.pink.900"),
    _dark: token("colors.pink.100"),
  },
});

const h4BlueClass = css({
  color: {
    base: token("colors.blue.900"),
    _dark: token("colors.blue.100"),
  },
});

const h4GreenClass = css({
  color: {
    base: token("colors.green.900"),
    _dark: token("colors.green.100"),
  },
});

const h4OrangeClass = css({
  color: {
    base: token("colors.orange.900"),
    _dark: token("colors.orange.100"),
  },
});

const paragraphClass = css({
  color: "contents.secondary",
  mb: 3,
});

const demoContainerClass = css({
  mt: 4,
  display: "flex",
  gap: 3,
  alignItems: "center",
  flexWrap: "wrap",
});

const demoLabelClass = css({
  fontSize: "sm",
  color: "contents.tertiary",
});

const tipBoxClass = css({
  p: 3,
  bg: {
    base: token("colors.yellow"),
    _dark: token("colors.yellow.900"),
  },
  rounded: "md",
  borderWidth: "base",
  borderStyle: "solid",
  borderColor: {
    base: token("colors.black"),
    _dark: token("colors.yellow.700"),
  },
  fontSize: "sm",
  color: {
    base: token("colors.gray.900"),
    _dark: token("colors.yellow.50"),
  },
});

const roleItemClass = css({
  p: 3,
  bg: {
    base: token("colors.blue.50"),
    _dark: token("colors.blue.950"),
  },
  rounded: "sm",
});

const roleCodeClass = css({
  color: {
    base: token("colors.blue.800"),
    _dark: token("colors.blue.200"),
  },
  fontWeight: "semibold",
  fontSize: "base",
});

const roleDescClass = css({
  m: 0,
  mt: 2,
  color: "contents.secondary",
  fontSize: "sm",
});

const comparisonBoxBase = css({
  p: 3,
  rounded: "sm",
  mb: 3,
  borderWidth: "thin",
  borderStyle: "solid",
});

const comparisonBoxRed = css({
  bg: {
    base: token("colors.red.50"),
    _dark: token("colors.red.950"),
  },
  borderColor: {
    base: token("colors.red.200"),
    _dark: token("colors.red.800"),
  },
});

const comparisonBoxGreen = css({
  bg: {
    base: token("colors.green.50"),
    _dark: token("colors.green.950"),
  },
  borderColor: {
    base: token("colors.green.300"),
    _dark: token("colors.green.700"),
  },
});

const comparisonTextClass = css({
  m: 0,
  mt: 2,
  color: "contents.secondary",
  fontStyle: "italic",
  fontSize: "sm",
});

const infoBoxOrangeClass = css({
  mt: 4,
  p: 3,
  bg: {
    base: token("colors.orange.50"),
    _dark: token("colors.orange.950"),
  },
  rounded: "sm",
  fontSize: "sm",
});

const infoBoxBlueClass = css({
  mt: 4,
  p: 3,
  bg: {
    base: token("colors.blue.50"),
    _dark: token("colors.blue.950"),
  },
  rounded: "sm",
  fontSize: "sm",
});

const infoListClass = css({
  mt: 2,
  mb: 0,
  color: "contents.secondary",
});

const summaryH4Class = css({
  mt: 0,
  mb: 3,
  fontSize: "base",
  fontWeight: "semibold",
  color: {
    base: token("colors.blue.900"),
    _dark: token("colors.blue.100"),
  },
});

const emojiClass = css({
  fontSize: "2xl",
});

export const ARIAProperties = () => {

  return (
    <section
      id="aria-properties"
      className={sectionClass}
    >
      <h2 className={headingClass}>
        <icons.concept.wcag size={28} color={token("colors.pink.600")} strokeWidth={2} />
        WAI-ARIA 主要プロパティ
      </h2>

      <p className={introTextClass}>
        WAI-ARIAの4つの主要プロパティ（Name、Role、Description、Expanded）について、実装例とともに解説します。
      </p>

      {/* Name プロパティ */}
      <div className={cx(propertyCardBase, propertyCardPink)}>
        <h3 className={cx(h3Class, h3PinkClass)}>
          <span className={emojiClass}>🏷️</span>
          1. Name（名前）プロパティ
        </h3>

        <p className={descriptionTextClass}>
          要素に読み上げられる名前を付与し、要素の目的を明確に伝えます。
        </p>

        <div className={gridClass}>
          {/* aria-label */}
          <div className={cx(innerCardBase, innerCardPinkClass)}>
            <h4 className={cx(h4Base, h4PinkClass)}>
              aria-label
            </h4>
            <p className={paragraphClass}>
              直接ラベルテキストを指定します。視覚的なテキストがない要素に使用します。
            </p>

            <CodeBlock
              code={`<!-- アイコンのみのボタン -->
<button aria-label="メニューを開く">
  <MenuIcon />
</button>

<!-- 閉じるボタン -->
<button aria-label="閉じる">✕</button>`}
              language="html"
              description="スクリーンリーダーの読み上げ: 「閉じる ボタン」"
            />

            <div className={demoContainerClass}>
              <Button
                aria-label="設定を開く"
                icon={<icons.component.button size={16} />}
                variant="outline"
                size="sm"
              />
              <span className={demoLabelClass}>
                ← aria-label="設定を開く" を使用
              </span>
            </div>
          </div>

          {/* aria-labelledby */}
          <div className={cx(innerCardBase, innerCardPinkClass)}>
            <h4 className={cx(h4Base, h4PinkClass)}>
              aria-labelledby
            </h4>
            <p className={paragraphClass}>
              他の要素のIDを参照して、その要素のテキストをラベルとして使用します。
            </p>

            <CodeBlock
              code={`<h2 id="section-title">ユーザー設定</h2>
<section aria-labelledby="section-title">
  {/* セクションの内容 */}
</section>

<!-- 複数のIDを参照 -->
<div aria-labelledby="title-1 title-2">
  <h3 id="title-1">商品名</h3>
  <span id="title-2">限定版</span>
</div>`}
              language="html"
              description="モーダルのタイトル参照、セクション見出しとの関連付けに使用"
            />
          </div>

          <div className={tipBoxClass}>
            <strong>💡 使用場面:</strong> アイコンのみのボタン、モーダルのタイトル参照、セクション見出しとの関連付け
          </div>
        </div>
      </div>

      {/* Role プロパティ */}
      <div className={cx(propertyCardBase, propertyCardBlue)}>
        <h3 className={cx(h3Class, h3BlueClass)}>
          <span className={emojiClass}>🎭</span>
          2. Role（役割）プロパティ
        </h3>

        <p className={descriptionTextClass}>
          要素が何であるかを支援技術に伝えます。
        </p>

        <div className={gridClass}>
          {/* 主要なロール一覧 */}
          <div className={cx(innerCardBase, innerCardBlueClass)}>
            <h4 className={cx(h4Base, h4BlueClass)}>
              主要なロール
            </h4>

            <div className={gridClass}>
              <div className={roleItemClass}>
                <code className={roleCodeClass}>
                  role="button"
                </code>
                <p className={roleDescClass}>
                  ボタンとして機能（可能な限り &lt;button&gt; を使用）
                </p>
              </div>

              <div className={roleItemClass}>
                <code className={roleCodeClass}>
                  role="dialog"
                </code>
                <p className={roleDescClass}>
                  モーダルダイアログ（aria-modal="true" と組み合わせる）
                </p>
              </div>

              <div className={roleItemClass}>
                <code className={roleCodeClass}>
                  role="navigation"
                </code>
                <p className={roleDescClass}>
                  ナビゲーション領域（&lt;nav&gt; は暗黙的にこのroleを持つ）
                </p>
              </div>

              <div className={roleItemClass}>
                <code className={roleCodeClass}>
                  role="alert"
                </code>
                <p className={roleDescClass}>
                  重要な即時通知（エラーメッセージ、警告）
                </p>
              </div>

              <div className={roleItemClass}>
                <code className={roleCodeClass}>
                  role="tooltip"
                </code>
                <p className={roleDescClass}>
                  ツールチップ（aria-describedby で参照）
                </p>
              </div>
            </div>
          </div>

          {/* 実装例 */}
          <div className={cx(innerCardBase, innerCardBlueClass)}>
            <h4 className={cx(h4Base, h4BlueClass)}>
              実装例
            </h4>

            <CodeBlock
              code={`<!-- ✅ 推奨: セマンティックHTML -->
<button>クリック</button>
<nav aria-label="メインナビゲーション">...</nav>

<!-- ❌ 避けるべき -->
<div role="button" tabIndex={0}>クリック</div>

<!-- ✅ モーダルダイアログ -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">確認</h2>
</div>`}
              language="html"
            />
          </div>

          <div className={tipBoxClass}>
            <strong>💡 ARIAの第一原則:</strong> まずは<strong>セマンティックHTML</strong>（&lt;button&gt;、&lt;nav&gt;、&lt;main&gt;）を使いましょう。ARIAはHTMLで実現できない場合の補完として使用します。
          </div>
        </div>
      </div>

      {/* Description プロパティ */}
      <div className={cx(propertyCardBase, propertyCardGreen)}>
        <h3 className={cx(h3Class, h3GreenClass)}>
          <span className={emojiClass}>📝</span>
          3. Description（説明）プロパティ
        </h3>

        <p className={descriptionTextClass}>
          要素の補足情報を提供します。
        </p>

        <div className={gridClass}>
          {/* aria-describedby */}
          <div className={cx(innerCardBase, innerCardGreenClass)}>
            <h4 className={cx(h4Base, h4GreenClass)}>
              aria-describedby
            </h4>
            <p className={paragraphClass}>
              説明要素のIDを参照します。エラーメッセージやヘルプテキストに使用します。
            </p>

            <CodeBlock
              code={`<!-- パスワード入力のヘルプテキスト -->
<input
  type="password"
  aria-describedby="password-hint"
/>
<span id="password-hint">
  8文字以上、英数字を含む
</span>

<!-- エラーメッセージとの組み合わせ -->
<input
  type="email"
  aria-invalid="true"
  aria-describedby="error-msg"
/>
<span id="error-msg" role="alert">
  無効なメールアドレス
</span>`}
              language="html"
            />
          </div>

          {/* スクリーンリーダーの読み上げ比較 */}
          <div className={cx(innerCardBase, innerCardGreenClass)}>
            <h4 className={cx(h4Base, h4GreenClass)}>
              スクリーンリーダーの読み上げ比較
            </h4>

            <div className={cx(comparisonBoxBase, comparisonBoxRed)}>
              <strong className={css({ color: { base: token("colors.red.900"), _dark: token("colors.red.100") } })}>❌ aria-describedby なし:</strong>
              <p className={comparisonTextClass}>
                "メールアドレス 編集可能"
              </p>
            </div>

            <div className={cx(comparisonBoxBase, comparisonBoxGreen)}>
              <strong className={css({ color: { base: token("colors.green.900"), _dark: token("colors.green.100") } })}>✅ aria-describedby あり:</strong>
              <p className={comparisonTextClass}>
                "メールアドレス 無効 編集可能 無効なメールアドレス"
              </p>
            </div>
          </div>

          <div className={tipBoxClass}>
            <strong>💡 使用場面:</strong> フォームのヘルプテキスト、エラーメッセージ、ツールチップの参照、補足説明が必要な要素
          </div>
        </div>
      </div>

      {/* Expanded プロパティ */}
      <div className={cx(propertyCardBase, propertyCardOrange)}>
        <h3 className={cx(h3Class, h3OrangeClass)}>
          <span className={emojiClass}>📊</span>
          4. Expanded（展開状態）プロパティ
        </h3>

        <p className={descriptionTextClass}>
          要素の展開/折りたたみ状態を動的に伝えます。
        </p>

        <div className={gridClass}>
          {/* aria-expanded */}
          <div className={cx(innerCardBase, innerCardOrangeClass)}>
            <h4 className={cx(h4Base, h4OrangeClass)}>
              aria-expanded
            </h4>
            <p className={paragraphClass}>
              要素が展開されているか折りたたまれているかを示します。
            </p>

            <CodeBlock
              code={`const [isOpen, setIsOpen] = useState(false);

<button
  aria-expanded={isOpen}
  aria-controls="content-1"
  onClick={() => setIsOpen(!isOpen)}
>
  セクションタイトル
</button>

<div id="content-1">
  {isOpen && <p>展開されたコンテンツ</p>}
</div>`}
              language="tsx"
            />

            <div className={infoBoxOrangeClass}>
              <strong className={css({ color: { base: token("colors.orange.900"), _dark: token("colors.orange.100") } })}>値の種類:</strong>
              <ul className={infoListClass}>
                <li><code>aria-expanded="true"</code>: 展開中</li>
                <li><code>aria-expanded="false"</code>: 折りたたみ中</li>
                <li>未指定: 展開/折りたたみ機能なし</li>
              </ul>
            </div>
          </div>

          {/* 実装例（アコーディオン） */}
          <div className={cx(innerCardBase, innerCardOrangeClass)}>
            <h4 className={cx(h4Base, h4OrangeClass)}>
              実装例（アコーディオン）
            </h4>

            <Accordion>
              <AccordionSummary>
                クリックして展開/折りたたみ（aria-expandedが自動で切り替わります）
              </AccordionSummary>
              <AccordionContent>
                <p className={css({ m: 0, color: "contents.secondary" })}>
                  このコンテンツの表示状態が aria-expanded で伝えられます。
                  スクリーンリーダーは「展開されています」または「折りたたまれています」と読み上げます。
                </p>
              </AccordionContent>
            </Accordion>

            <div className={infoBoxBlueClass}>
              <strong className={css({ color: { base: token("colors.blue.900"), _dark: token("colors.blue.100") } })}>スクリーンリーダーの読み上げ:</strong>
              <ul className={infoListClass}>
                <li>折りたたみ時: "セクションタイトル ボタン 折りたたまれています"</li>
                <li>展開時: "セクションタイトル ボタン 展開されています"</li>
              </ul>
            </div>
          </div>

          <div className={tipBoxClass}>
            <strong>💡 使用場面:</strong> アコーディオン、ドロップダウンメニュー、展開可能なナビゲーション、ツリービュー、コンボボックス
          </div>
        </div>
      </div>

      {/* まとめ */}
      <div className={summaryCardClass}>
        <h3 className={cx(h3Class, h3BlueClass)}>
          <span className={emojiClass}>📚</span>
          プロパティの組み合わせ例
        </h3>

        <div className={gridClass}>
          {/* モーダルダイアログ */}
          <div>
            <h4 className={summaryH4Class}>
              モーダルダイアログ
            </h4>
            <CodeBlock
              code={`<div
  role="dialog"                    // Role
  aria-modal="true"
  aria-labelledby="modal-title"   // Name
  aria-describedby="modal-desc"   // Description
>
  <h2 id="modal-title">確認</h2>
  <p id="modal-desc">この操作を実行してもよろしいですか？</p>
</div>`}
              language="html"
              showLineNumbers={false}
            />
          </div>

          {/* アコーディオン */}
          <div>
            <h4 className={summaryH4Class}>
              アコーディオン
            </h4>
            <CodeBlock
              code={`<button
  aria-expanded={isOpen}           // Expanded
  aria-controls="panel-1"
  aria-label="詳細を表示"          // Name
>
  詳細情報
</button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          {/* エラーのあるフォーム */}
          <div>
            <h4 className={summaryH4Class}>
              エラーのあるフォーム
            </h4>
            <CodeBlock
              code={`<input
  type="email"
  aria-label="メールアドレス"      // Name
  aria-invalid="true"
  aria-describedby="error-msg"     // Description
/>
<span id="error-msg" role="alert"> // Role
  無効なメールアドレス
</span>`}
              language="html"
              showLineNumbers={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
