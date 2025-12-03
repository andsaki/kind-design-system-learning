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

const codeBlockStyle = css({
  backgroundColor: 'bg.secondary',
  padding: '1rem',
  borderRadius: 'md',
  marginTop: '1rem',
  fontFamily: 'monospace',
  fontSize: '0.9rem',
  overflow: 'auto',
  color: 'contents.primary',
});

const iconStyle = css({
  display: 'inline',
  verticalAlign: 'middle',
  marginRight: '0.5rem',
});

const linkStyle = css({
  color: 'contents.link',
  textDecoration: 'underline',
  _hover: {
    opacity: 0.8,
  },
});

export function APGGuide() {
  const BookIcon = icons.philosophy.inclusive;

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
        <BookIcon className={iconStyle} size={40} color="currentColor" strokeWidth={2} />
        APG (ARIA Authoring Practices Guide)
      </h1>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>概要</h2>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem' })}>
          APG (ARIA Authoring Practices Guide) は、W3Cが提供するアクセシブルなWebコンポーネントを作成するための公式ガイドです。
          2014年にARIA 1.0向けに作成され、現在も活発に更新されています。
        </p>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>主要な特徴</h2>

        <h3 className={subHeadingStyle}>1. デザインパターンと実装例</h3>
        <ul className={listStyle}>
          <li className={listItemStyle}>アクセシブルなWebコンポーネントの作成方法を実演</li>
          <li className={listItemStyle}>ARIA role、state、propertyの具体的な実装例</li>
          <li className={listItemStyle}>キーボードサポートのガイダンス</li>
        </ul>

        <h3 className={subHeadingStyle}>2. 重点領域</h3>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            <strong>ARIAランドマーク</strong>: ページレイアウトをスクリーンリーダーユーザーに理解させる
          </li>
          <li className={listItemStyle}>
            <strong>アクセシブルな名前と説明</strong>: Accessible NameとDescriptionの実装方法
          </li>
          <li className={listItemStyle}>
            <strong>セマンティクス</strong>: HTMLとARIAの正しい組み合わせ
          </li>
        </ul>

        <h3 className={subHeadingStyle}>3. コミュニティ主導</h3>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            GitHub: <a href="https://github.com/w3c/aria-practices" className={linkStyle} target="_blank" rel="noopener noreferrer">w3c/aria-practices</a>
          </li>
          <li className={listItemStyle}>オープンな議論とコントリビューション</li>
          <li className={listItemStyle}>2025年現在も活発にミーティングを開催</li>
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>提供されるデザインパターン例</h2>
        <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' })}>
          <div className={css({ padding: '1rem', backgroundColor: 'bg.secondary', borderRadius: 'md', borderWidth: 'thin', borderStyle: 'solid', borderColor: 'border.default' })}>
            <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>基本的なコンポーネント</p>
            <ul className={listStyle}>
              <li className={listItemStyle}>Accordion（アコーディオン）</li>
              <li className={listItemStyle}>Alert（アラート）</li>
              <li className={listItemStyle}>Button（ボタン）</li>
              <li className={listItemStyle}>Checkbox（チェックボックス）</li>
              <li className={listItemStyle}>Radio Group（ラジオグループ）</li>
            </ul>
          </div>
          <div className={css({ padding: '1rem', backgroundColor: 'bg.secondary', borderRadius: 'md', borderWidth: 'thin', borderStyle: 'solid', borderColor: 'border.default' })}>
            <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>複雑なコンポーネント</p>
            <ul className={listStyle}>
              <li className={listItemStyle}>Combobox（コンボボックス）</li>
              <li className={listItemStyle}>Dialog（モーダル）</li>
              <li className={listItemStyle}>Menu（メニュー）</li>
              <li className={listItemStyle}>Tabs（タブ）</li>
              <li className={listItemStyle}>Treegrid（ツリーグリッド）</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>APGとESLint・Axeの関係</h2>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem' })}>
          APGは「正しい実装パターン」を提供し、ESLintとAxeはそのパターンに従っているかを検証します:
        </p>
        <div className={codeBlockStyle}>
          <pre>{`APG (ガイド)
  ↓ 実装パターンを参照
開発者がコードを書く
  ↓
eslint-plugin-jsx-a11y
  ↓ コードレベルで検証
ブラウザで実行
  ↓
@axe-core/react
  ↓ 実行時に検証
アクセシブルなコンポーネント完成`}</pre>
        </div>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>このプロジェクトでの活用</h2>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem' })}>
          以下の実装はAPGのパターンに基づいています:
        </p>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            <a href="/aria/form-labeling" className={linkStyle}>
              Radio Group with aria-labelledby, aria-describedby, aria-invalid
            </a>
          </li>
          <li className={listItemStyle}>
            <a href="/aria/form-labeling" className={linkStyle}>
              Form labeling patterns
            </a>
          </li>
          <li className={listItemStyle}>
            <a href="/aria/role-presentation" className={linkStyle}>
              Landmark roles and regions
            </a>
          </li>
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>参考資料</h2>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            <strong>公式サイト</strong>:{' '}
            <a href="https://www.w3.org/WAI/ARIA/apg/" className={linkStyle} target="_blank" rel="noopener noreferrer">
              https://www.w3.org/WAI/ARIA/apg/
            </a>
          </li>
          <li className={listItemStyle}>
            <strong>GitHub</strong>:{' '}
            <a href="https://github.com/w3c/aria-practices" className={linkStyle} target="_blank" rel="noopener noreferrer">
              https://github.com/w3c/aria-practices
            </a>
          </li>
          <li className={listItemStyle}>
            <strong>Task Force</strong>:{' '}
            <a href="https://www.w3.org/WAI/about/groups/task-forces/practices/" className={linkStyle} target="_blank" rel="noopener noreferrer">
              https://www.w3.org/WAI/about/groups/task-forces/practices/
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
