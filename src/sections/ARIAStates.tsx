import { css } from '../../styled-system/css';
import { icons } from '../design-system/tokens/icons';

const sectionStyle = css({
  marginBottom: '3rem',
});

const headingStyle = css({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: 'contents.primary',
});

const subHeadingStyle = css({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginTop: '1.5rem',
  marginBottom: '0.75rem',
  color: 'contents.primary',
});

const listStyle = css({
  marginLeft: '1.5rem',
  marginTop: '0.5rem',
  listStyleType: 'disc',
  color: 'contents.primary',
});

const listItemStyle = css({
  marginBottom: '0.5rem',
});

const codeStyle = css({
  backgroundColor: 'bg.secondary',
  padding: '0.125rem 0.375rem',
  borderRadius: 'sm',
  fontFamily: 'monospace',
  fontSize: '0.9rem',
  color: 'contents.primary',
});

const tableStyle = css({
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '1rem',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
});

const thStyle = css({
  padding: '0.75rem',
  textAlign: 'left',
  backgroundColor: 'bg.secondary',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
  fontWeight: 'bold',
  color: 'contents.primary',
});

const tdStyle = css({
  padding: '0.75rem',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
  color: 'contents.primary',
});

const iconStyle = css({
  display: 'inline',
  verticalAlign: 'middle',
  marginRight: '0.5rem',
});

const exampleBoxStyle = css({
  padding: '1rem',
  backgroundColor: 'bg.secondary',
  borderRadius: 'md',
  marginTop: '1rem',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
});

export function ARIAStates() {
  const StateIcon = icons.concept.wcag;

  return (
    <div className={css({ maxWidth: '64rem', margin: '0 auto', padding: '2rem' })}>
      <h1
        className={css({
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: 'contents.primary',
        })}
      >
        <StateIcon className={iconStyle} size={40} color="currentColor" strokeWidth={2} />
        カスタムコンポーネントの状態とARIAステートプロパティ
      </h1>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>概要</h2>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          カスタムコンポーネントには様々な状態があり、それらを支援技術に正しく伝えるためにARIAステートプロパティを使用します。
          標準のHTML要素では自動的に伝えられる状態も、カスタムコンポーネントでは明示的に指定する必要があります。
        </p>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>選択状態</h2>

        <h3 className={subHeadingStyle}>aria-selected</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          選択可能な要素（タブ、リストアイテム、グリッドセルなど）の選択状態を示します。
        </p>
        <div className={exampleBoxStyle}>
          <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>使用例：タブ</p>
          <pre className={css({ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'auto', color: 'contents.primary' })}>
{`<div role="tablist">
  <button role="tab" aria-selected="true">タブ1</button>
  <button role="tab" aria-selected="false">タブ2</button>
  <button role="tab" aria-selected="false">タブ3</button>
</div>`}
          </pre>
        </div>
        <ul className={listStyle}>
          <li className={listItemStyle}>値: <code className={codeStyle}>true</code> / <code className={codeStyle}>false</code></li>
          <li className={listItemStyle}>使用場面: タブ、リストボックス、ツリービュー、グリッド</li>
        </ul>

        <h3 className={subHeadingStyle}>aria-checked</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          チェックボックス、ラジオボタン、スイッチなどのチェック状態を示します。
        </p>
        <div className={exampleBoxStyle}>
          <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>使用例：カスタムチェックボックス</p>
          <pre className={css({ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'auto', color: 'contents.primary' })}>
{`<div role="checkbox" aria-checked="true" tabindex="0">
  利用規約に同意する
</div>

<div role="checkbox" aria-checked="mixed" tabindex="0">
  すべて選択（一部選択済み）
</div>`}
          </pre>
        </div>
        <ul className={listStyle}>
          <li className={listItemStyle}>値: <code className={codeStyle}>true</code> / <code className={codeStyle}>false</code> / <code className={codeStyle}>mixed</code></li>
          <li className={listItemStyle}><code className={codeStyle}>mixed</code>: 一部チェック状態（親チェックボックスなど）</li>
          <li className={listItemStyle}>使用場面: カスタムチェックボックス、ラジオボタン</li>
        </ul>

        <h3 className={subHeadingStyle}>aria-pressed</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          トグルボタンの押下状態を示します。
        </p>
        <div className={exampleBoxStyle}>
          <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>使用例：トグルボタン</p>
          <pre className={css({ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'auto', color: 'contents.primary' })}>
{`<button aria-pressed="true">
  太字
</button>

<button aria-pressed="false">
  イタリック
</button>`}
          </pre>
        </div>
        <ul className={listStyle}>
          <li className={listItemStyle}>値: <code className={codeStyle}>true</code> / <code className={codeStyle}>false</code> / <code className={codeStyle}>mixed</code></li>
          <li className={listItemStyle}>使用場面: トグルボタン、ツールバーのボタン</li>
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>展開/折りたたみ状態</h2>

        <h3 className={subHeadingStyle}>aria-expanded</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          コンテンツの展開・折りたたみ状態を示します。
        </p>
        <div className={exampleBoxStyle}>
          <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>使用例：アコーディオン</p>
          <pre className={css({ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'auto', color: 'contents.primary' })}>
{`<button aria-expanded="true" aria-controls="panel1">
  セクション1
</button>
<div id="panel1">
  コンテンツ...
</div>

<button aria-expanded="false" aria-controls="panel2">
  セクション2
</button>
<div id="panel2" hidden>
  コンテンツ...
</div>`}
          </pre>
        </div>
        <ul className={listStyle}>
          <li className={listItemStyle}>値: <code className={codeStyle}>true</code> / <code className={codeStyle}>false</code></li>
          <li className={listItemStyle}>使用場面: アコーディオン、ドロップダウン、ツリービュー、コンボボックス</li>
          <li className={listItemStyle}><code className={codeStyle}>aria-controls</code>と併用して、制御対象を指定</li>
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>入力状態</h2>

        <h3 className={subHeadingStyle}>aria-required</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          フォームフィールドが必須であることを示します。
        </p>
        <div className={exampleBoxStyle}>
          <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>使用例：必須フィールド</p>
          <pre className={css({ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'auto', color: 'contents.primary' })}>
{`<label for="email">
  メールアドレス <span aria-hidden="true">*</span>
</label>
<input
  type="email"
  id="email"
  aria-required="true"
  required
/>`}
          </pre>
        </div>
        <ul className={listStyle}>
          <li className={listItemStyle}>値: <code className={codeStyle}>true</code> / <code className={codeStyle}>false</code></li>
          <li className={listItemStyle}>HTML5の<code className={codeStyle}>required</code>属性と併用推奨</li>
          <li className={listItemStyle}>使用場面: テキストフィールド、テキストエリア、セレクトボックス</li>
        </ul>

        <h3 className={subHeadingStyle}>aria-disabled</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          要素が無効化されていることを示します。
        </p>
        <div className={exampleBoxStyle}>
          <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>使用例：無効化されたボタン</p>
          <pre className={css({ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'auto', color: 'contents.primary' })}>
{`<button aria-disabled="true" disabled>
  送信
</button>

<!-- カスタムコンポーネントの場合 -->
<div role="button" aria-disabled="true" tabindex="-1">
  送信
</div>`}
          </pre>
        </div>
        <ul className={listStyle}>
          <li className={listItemStyle}>値: <code className={codeStyle}>true</code> / <code className={codeStyle}>false</code></li>
          <li className={listItemStyle}>HTML5の<code className={codeStyle}>disabled</code>属性と併用推奨</li>
          <li className={listItemStyle}>無効化時は<code className={codeStyle}>tabindex="-1"</code>でフォーカス不可にする</li>
        </ul>

        <h3 className={subHeadingStyle}>aria-readonly</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          要素が読み取り専用であることを示します。
        </p>
        <div className={exampleBoxStyle}>
          <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>使用例：読み取り専用フィールド</p>
          <pre className={css({ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'auto', color: 'contents.primary' })}>
{`<input
  type="text"
  value="user@example.com"
  aria-readonly="true"
  readonly
/>`}
          </pre>
        </div>
        <ul className={listStyle}>
          <li className={listItemStyle}>値: <code className={codeStyle}>true</code> / <code className={codeStyle}>false</code></li>
          <li className={listItemStyle}>HTML5の<code className={codeStyle}>readonly</code>属性と併用推奨</li>
          <li className={listItemStyle}>フォーカスは可能だが編集不可</li>
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>エラー/検証状態</h2>

        <h3 className={subHeadingStyle}>aria-invalid</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          入力値が検証エラーであることを示します。
        </p>
        <div className={exampleBoxStyle}>
          <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>使用例：検証エラー</p>
          <pre className={css({ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'auto', color: 'contents.primary' })}>
{`<label for="email">メールアドレス</label>
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<div id="email-error" role="alert">
  有効なメールアドレスを入力してください
</div>`}
          </pre>
        </div>
        <ul className={listStyle}>
          <li className={listItemStyle}>値: <code className={codeStyle}>true</code> / <code className={codeStyle}>false</code> / <code className={codeStyle}>grammar</code> / <code className={codeStyle}>spelling</code></li>
          <li className={listItemStyle}><code className={codeStyle}>aria-describedby</code>でエラーメッセージを関連付け</li>
          <li className={listItemStyle}>エラーメッセージには<code className={codeStyle}>role="alert"</code>を使用</li>
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>状態プロパティの比較表</h2>
        <table className={tableStyle}>
          <thead>
            <tr>
              <th className={thStyle}>プロパティ</th>
              <th className={thStyle}>値</th>
              <th className={thStyle}>主な用途</th>
              <th className={thStyle}>HTML属性</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>aria-selected</code></td>
              <td className={tdStyle}>true / false</td>
              <td className={tdStyle}>タブ、リストアイテム</td>
              <td className={tdStyle}>-</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>aria-checked</code></td>
              <td className={tdStyle}>true / false / mixed</td>
              <td className={tdStyle}>チェックボックス、ラジオ</td>
              <td className={tdStyle}>checked</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>aria-pressed</code></td>
              <td className={tdStyle}>true / false / mixed</td>
              <td className={tdStyle}>トグルボタン</td>
              <td className={tdStyle}>-</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>aria-expanded</code></td>
              <td className={tdStyle}>true / false</td>
              <td className={tdStyle}>アコーディオン、ドロップダウン</td>
              <td className={tdStyle}>-</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>aria-required</code></td>
              <td className={tdStyle}>true / false</td>
              <td className={tdStyle}>必須フォームフィールド</td>
              <td className={tdStyle}>required</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>aria-disabled</code></td>
              <td className={tdStyle}>true / false</td>
              <td className={tdStyle}>無効化された要素</td>
              <td className={tdStyle}>disabled</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>aria-readonly</code></td>
              <td className={tdStyle}>true / false</td>
              <td className={tdStyle}>読み取り専用フィールド</td>
              <td className={tdStyle}>readonly</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>aria-invalid</code></td>
              <td className={tdStyle}>true / false / grammar / spelling</td>
              <td className={tdStyle}>検証エラーのフィールド</td>
              <td className={tdStyle}>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>ベストプラクティス</h2>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            <strong>HTML属性と併用</strong>: <code className={codeStyle}>disabled</code>、<code className={codeStyle}>required</code>、<code className={codeStyle}>readonly</code>などのHTML属性がある場合は、ARIA属性と併用する
          </li>
          <li className={listItemStyle}>
            <strong>動的な更新</strong>: JavaScriptで状態が変わったら、対応するARIA属性も必ず更新する
          </li>
          <li className={listItemStyle}>
            <strong>視覚的なフィードバック</strong>: ARIA属性だけでなく、視覚的にも状態が分かるようにスタイルを適用する
          </li>
          <li className={listItemStyle}>
            <strong>適切な組み合わせ</strong>: <code className={codeStyle}>aria-invalid</code>は<code className={codeStyle}>aria-describedby</code>と、<code className={codeStyle}>aria-expanded</code>は<code className={codeStyle}>aria-controls</code>と併用する
          </li>
          <li className={listItemStyle}>
            <strong>デフォルト値の省略</strong>: <code className={codeStyle}>aria-expanded="false"</code>など、明示的に示す必要がある場合を除き、デフォルト値は省略可能
          </li>
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>このプロジェクトでの実装例</h2>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            <a href="/aria/form-labeling" className={css({ color: 'contents.link', textDecoration: 'underline', _hover: { opacity: 0.8 } })}>
              フォームラベリング - aria-invalid, aria-required の実装例
            </a>
          </li>
          <li className={listItemStyle}>
            <a href="/components" className={css({ color: 'contents.link', textDecoration: 'underline', _hover: { opacity: 0.8 } })}>
              コンポーネント一覧 - 各種状態を持つコンポーネント
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
