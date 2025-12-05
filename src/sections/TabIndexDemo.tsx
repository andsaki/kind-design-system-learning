import { useRef } from "react";
import { css } from "@/styled-system/css";
import { Button } from "../design-system/components";
import { InfoBox } from "../design-system/components/InfoBox";
import { CodeBlock } from "../components/CodeBlock";

const sectionContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  mt: { base: 8, md: 14 },
  mb: { base: 10, md: 16 },
});

const grid = css({
  display: "grid",
  gap: 4,
  gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" },
});

const card = css({
  p: 4,
  borderRadius: "xl",
  borderWidth: "thin",
  borderColor: "border.default",
  bg: "bg.primary",
  boxShadow: "lg",
  display: "flex",
  flexDirection: "column",
  gap: 3,
});

const focusTarget = css({
  borderWidth: "thin",
  borderColor: "border.default",
  borderRadius: "lg",
  p: 4,
  bg: "bg.secondary",
  cursor: "pointer",
  transition: "outline 0.2s ease, box-shadow 0.2s ease",
  _focusVisible: {
    outline: "3px solid token(colors.accent.primary)",
    boxShadow: "0 0 0 4px token(colors.accent.primaryAlpha/40)",
  },
});

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  mb: 0,
  pl: { base: 4, md: 5 },
  color: "contents.secondary",
  fontSize: "sm",
  lineHeight: "relaxed",
});

export const TabIndexDemo = () => {
  const sequenceStartRef = useRef<HTMLDivElement | null>(null);
  const negativeTargetRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className={sectionContainer}>
      <div>
        <p
          className={css({
            fontSize: "sm",
            textTransform: "uppercase",
            letterSpacing: "widest",
            color: "contents.tertiary",
            mb: 2,
          })}
        >
          Tab order
        </p>
        <h2
          className={css({
            fontSize: { base: "2xl", md: "3xl" },
            m: 0,
            color: "contents.primary",
          })}
        >
          tabIndex=0 と tabIndex=-1 の体感デモ
        </h2>
        <p
          className={css({
            color: "contents.secondary",
            fontSize: "md",
            lineHeight: "relaxed",
            maxW: "720px",
            mt: 3,
          })}
        >
          tabIndexの値はキーボードフォーカスの振る舞いを直接変えます。以下のデモは、既存の文書フローに参加させたい場合
          (0) と、プログラムからだけフォーカスを移動したい場合 (-1)
          の違いを再現しています。TabキーやShift+Tabで実際に試してみてください。
        </p>
      </div>

      <div className={grid}>
        <div className={card}>
          <h3 className={css({ m: 0, fontSize: "xl", color: "contents.primary" })}>
            tabIndex=0
          </h3>
          <p className={css({ m: 0, color: "contents.secondary", fontSize: "sm" })}>
            DOM上の順番そのままにTabキーの巡回へ参加します。ここではdiv要素をタブ移動可能にし、ボタンやリンクと同様の順序でフォーカスされます。
          </p>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: 2,
            })}
          >
            <Button variant="secondary" size="sm">
              自然なボタン
            </Button>
            <a
              className={css({
                color: "contents.link",
                textDecoration: "underline",
                fontSize: "sm",
                width: "fit-content",
              })}
              href="#tabindex-demo"
            >
              自然なリンク
            </a>
            <div tabIndex={0} className={focusTarget}>
              div + tabIndex=0。Tabキーでここまで移動できます。
            </div>
          </div>
          <InfoBox
            variant="info"
            title="いつ使う？"
            className={css({ mt: 2 })}
          >
            <p className={css({ m: 0, fontSize: "sm", color: "contents.secondary" })}>
              カード全体をクリック可能にする場合など、DOM順を崩さずフォーカス可能にしたい時にだけ使用します。
            </p>
          </InfoBox>
        </div>

        <div className={card}>
          <h3 className={css({ m: 0, fontSize: "xl", color: "contents.primary" })}>
            tabIndex=-1
          </h3>
          <p className={css({ m: 0, color: "contents.secondary", fontSize: "sm" })}>
            Tabキーの巡回には含めず、JavaScriptからfocus()された時だけフォーカスを当てたい場合に利用します。通知パネルやモーダル内のトラップなどで活躍します。
          </p>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: 3,
            })}
          >
            <Button
              onClick={() => negativeTargetRef.current?.focus()}
              variant="outline"
              size="sm"
            >
              focus() で tabIndex=-1 へ移動
            </Button>
            <p className={css({ m: 0, fontSize: "xs", color: "contents.secondary" })}>
              Enter/Space でこのボタンを押しても click と同じ扱いになり、プログラムから <code>focus()</code> を呼び出す → 下の -1 要素へフォーカス移動、という流れを確認できます。
            </p>
            <div
              tabIndex={-1}
              ref={negativeTargetRef}
              className={focusTarget}
              aria-describedby="tabindex-negative-note"
            >
              div + tabIndex=-1。ボタンを押した時のみフォーカスが移動します。
            </div>
            <p
              id="tabindex-negative-note"
              className={css({ m: 0, fontSize: "sm", color: "contents.secondary" })}
            >
              Tabキーではこの要素を飛ばしますが、Escで閉じたモーダルから元のボタンへ戻すなど、アプリ側でフォーカスを管理できます。
            </p>
          </div>
          <InfoBox
            variant="warning"
            title="濫用注意"
            className={css({ mt: 2 })}
          >
            <p className={css({ m: 0, fontSize: "sm", color: "contents.secondary" })}>
              -1の要素はキーボード利用者から見えなくなるため、必ず代わりの移動手段を提供してください。必要に応じて <code>element.focus()</code> を呼び出し、UI側で意図的にフォーカスさせます。
            </p>
          </InfoBox>
        </div>
      </div>

      <div
        className={css({
          borderRadius: "xl",
          borderWidth: "thin",
          borderColor: "border.default",
          bg: "bg.secondary",
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        })}
      >
        <h3 className={css({ m: 0, color: "contents.primary", fontSize: "lg" })}>
          フォーカス移動での違い
        </h3>
        <p className={css({ m: 0, color: "contents.secondary", fontSize: "sm" })}>
          「ここからTab移動を開始」を押すと 1 のエリアにフォーカスを合わせられるので、そのまま Tab/Shift+Tab
          で順番をトレースできます。tabIndex=-1 のエリアはスキップされますが、最後のボタン（クリック/Space/Enter）が
          <code>focus()</code> を呼び、-1 の要素にもアクセスできるコントラストを示しています。
        </p>
        <CodeBlock
          language="text"
          code={`[Tab] ここからTab移動を開始 (button)
    ↓ Tab
1. div tabIndex=0
    ↓ Tab
2. div tabIndex=0
    ↓ Tab
3. div tabIndex=-1 (Tabでは飛ばされる)
    ↓ Tab
4. Button「プログラムで -1 へフォーカス」
    ↓ Enter / Space / Click
focus() を実行 → 上の div tabIndex=-1 にフォーカスが当たる`}
        />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "flex-start",
          })}
        >
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              sequenceStartRef.current?.focus();
            }}
          >
            ここからTab移動を開始
          </Button>
          <div className={focusTarget} tabIndex={0} ref={sequenceStartRef}>
            1. tabIndex=0 のパネル
          </div>
          <div className={focusTarget} tabIndex={0}>
            2. tabIndex=0 の別パネル
          </div>
          <div className={focusTarget} tabIndex={-1}>
            3. tabIndex=-1 (Tabキーでは飛ばされます)
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              negativeTargetRef.current?.focus();
            }}
          >
            4. プログラムで -1 へフォーカス
          </Button>
        </div>
      </div>

      <div
        className={css({
          borderRadius: "xl",
          borderWidth: "thin",
          borderColor: "border.default",
          bg: "bg.primary",
          p: 4,
        })}
      >
        <h3 className={css({ m: 0, color: "contents.primary", fontSize: "lg" })}>
          コード例
        </h3>
        <CodeBlock
          language="tsx"
          code={`const Modal = () => {
  const dismissButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus(); // tabIndex={-1} なので開いた瞬間にフォーカスできる
  }, []);

  return (
    <div role="dialog" tabIndex={-1} ref={dialogRef}>
      <p>Escで閉じられます</p>
      <button ref={dismissButtonRef} onClick={close}>閉じる</button>
    </div>
  );
};

const CardLink = () => (
  <article tabIndex={0} onClick={handleClick}>
    <h3>カード全体がフォーカス可能</h3>
  </article>
);`}
        />
        <ul className={list}>
          <li>
            `tabIndex=0` は自然なタブ順に参加し、`div` や `article` を人工的にフォーカス可能にする場合のみ使用します。
          </li>
          <li>
            `tabIndex=-1` はプログラムで `focus()` を当てたい時専用。Tabキーの順番を崩さず、モーダルにフォーカスを移すなどに適します。
          </li>
          <li>
            0/-1 以外の正の値は推奨されません。自然なDOM順序を壊し、予測不能なフォーカス移動になります。
          </li>
        </ul>
      </div>
    </section>
  );
};
