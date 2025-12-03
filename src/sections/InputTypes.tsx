import { useState } from 'react';
import { css } from '../../styled-system/css';
import { icons } from '../design-system/tokens/icons';
import { CodeBlock } from '../components/CodeBlock';
import { Input, Button } from '../design-system/components';
import { ScreenReaderDemo } from '../components/ScreenReaderDemo';

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

const exampleBoxStyle = css({
  padding: '1rem',
  backgroundColor: 'bg.secondary',
  borderRadius: 'md',
  marginTop: '1rem',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
});

const InputTypeDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    age: '',
    search: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/.test(phone);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'お名前は必須です';
    }

    if (!formData.email) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'ハイフンを含めた形式で入力してください（例: 090-1234-5678）';
    }

    if (formData.website && !validateUrl(formData.website)) {
      newErrors.website = '有効なURLを入力してください（例: https://example.com）';
    }

    if (!formData.age) {
      newErrors.age = '年齢は必須です';
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = '18歳以上である必要があります';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`検索キーワード: ${formData.search}`);
  };

  return (
    <>
      <section className={sectionStyle}>
        <h2 className={headingStyle}>実践例：会員登録フォームデモ</h2>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          各type属性を組み合わせたアクセシブルな会員登録フォーム:
        </p>

        <div className={css({
          backgroundColor: 'bg.secondary',
          padding: '2rem',
          borderRadius: '8px',
          borderWidth: 'thin',
          borderStyle: 'solid',
          borderColor: 'border.default',
          marginTop: '1rem',
          marginBottom: '2rem',
        })}>
          {submitted && (
            <div
              role="alert"
              aria-live="polite"
              className={css({
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: 'green.100',
                color: 'green.800',
                borderRadius: '4px',
                borderWidth: 'thin',
                borderStyle: 'solid',
                borderColor: 'green.300',
              })}
            >
              ✓ 登録が完了しました！
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <fieldset className={css({ border: 'none', padding: 0, margin: 0 })}>
              <legend className={css({ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'contents.primary' })}>
                会員登録フォーム
              </legend>

              <div className={css({ marginBottom: '1.5rem' })}>
                <Input
                  type="text"
                  id="demo-name"
                  name="name"
                  label="お名前"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'demo-name-error' : undefined}
                  maxLength={50}
                />
                {errors.name && (
                  <div
                    id="demo-name-error"
                    role="alert"
                    aria-live="polite"
                    className={css({ marginTop: '0.5rem', color: 'red.600', fontSize: '0.875rem' })}
                  >
                    ⚠️ {errors.name}
                  </div>
                )}
              </div>

              <div className={css({ marginBottom: '1.5rem' })}>
                <Input
                  type="email"
                  id="demo-email"
                  name="email"
                  label="メールアドレス"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'demo-email-error' : 'demo-email-help'}
                />
                {!errors.email && (
                  <span id="demo-email-help" className={css({ display: 'block', marginTop: '0.5rem', fontSize: '0.875rem', color: 'contents.secondary' })}>
                    example@domain.com の形式で入力してください
                  </span>
                )}
                {errors.email && (
                  <div
                    id="demo-email-error"
                    role="alert"
                    aria-live="polite"
                    className={css({ marginTop: '0.5rem', color: 'red.600', fontSize: '0.875rem' })}
                  >
                    ⚠️ {errors.email}
                  </div>
                )}
              </div>

              <div className={css({ marginBottom: '1.5rem' })}>
                <Input
                  type="tel"
                  id="demo-phone"
                  name="phone"
                  label="電話番号"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  autoComplete="tel"
                  placeholder="090-1234-5678"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'demo-phone-error' : 'demo-phone-format'}
                />
                {!errors.phone && (
                  <span id="demo-phone-format" className={css({ display: 'block', marginTop: '0.5rem', fontSize: '0.875rem', color: 'contents.secondary' })}>
                    ハイフン（-）を含めて入力してください（任意）
                  </span>
                )}
                {errors.phone && (
                  <div
                    id="demo-phone-error"
                    role="alert"
                    aria-live="polite"
                    className={css({ marginTop: '0.5rem', color: 'red.600', fontSize: '0.875rem' })}
                  >
                    ⚠️ {errors.phone}
                  </div>
                )}
              </div>

              <div className={css({ marginBottom: '1.5rem' })}>
                <Input
                  type="url"
                  id="demo-website"
                  name="website"
                  label="ウェブサイト"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  autoComplete="url"
                  placeholder="https://example.com"
                  aria-invalid={!!errors.website}
                  aria-describedby={errors.website ? 'demo-website-error' : undefined}
                />
                {errors.website && (
                  <div
                    id="demo-website-error"
                    role="alert"
                    aria-live="polite"
                    className={css({ marginTop: '0.5rem', color: 'red.600', fontSize: '0.875rem' })}
                  >
                    ⚠️ {errors.website}
                  </div>
                )}
              </div>

              <div className={css({ marginBottom: '1.5rem' })}>
                <Input
                  type="number"
                  id="demo-age"
                  name="age"
                  label="年齢"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  min={18}
                  max={120}
                  step={1}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.age}
                  aria-describedby={errors.age ? 'demo-age-error' : 'demo-age-help'}
                />
                {!errors.age && (
                  <span id="demo-age-help" className={css({ display: 'block', marginTop: '0.5rem', fontSize: '0.875rem', color: 'contents.secondary' })}>
                    18歳以上の方のみ登録できます
                  </span>
                )}
                {errors.age && (
                  <div
                    id="demo-age-error"
                    role="alert"
                    aria-live="polite"
                    className={css({ marginTop: '0.5rem', color: 'red.600', fontSize: '0.875rem' })}
                  >
                    ⚠️ {errors.age}
                  </div>
                )}
              </div>

              <Button type="submit" variant="primary">
                登録する
              </Button>
            </fieldset>
          </form>
        </div>

        <h3 className={subHeadingStyle}>スクリーンリーダーでの読み上げ</h3>
        <ScreenReaderDemo description="フォームの各フィールドがどのように読み上げられるかを確認できます。required属性、aria-describedby、placeholderなどがスクリーンリーダーでどう扱われるかに注目してください。">
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset style={{ border: 'none', padding: 0 }}>
              <legend>会員登録フォーム</legend>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="sr-demo-name">お名前 <span aria-hidden="true">*</span></label>
                <input
                  type="text"
                  id="sr-demo-name"
                  name="name"
                  autoComplete="name"
                  required
                  aria-required="true"
                  style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="sr-demo-email">メールアドレス <span aria-hidden="true">*</span></label>
                <input
                  type="email"
                  id="sr-demo-email"
                  name="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-describedby="sr-demo-email-help"
                  style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
                <span id="sr-demo-email-help" style={{ fontSize: '0.875rem', color: '#666' }}>
                  example@domain.com の形式で入力してください
                </span>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="sr-demo-phone">電話番号</label>
                <input
                  type="tel"
                  id="sr-demo-phone"
                  name="phone"
                  autoComplete="tel"
                  placeholder="090-1234-5678"
                  aria-describedby="sr-demo-phone-help"
                  style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
                <span id="sr-demo-phone-help" style={{ fontSize: '0.875rem', color: '#666' }}>
                  ハイフン（-）を含めて入力してください（任意）
                </span>
              </div>
              <button type="submit" style={{ padding: '0.5rem 1rem' }}>登録する</button>
            </fieldset>
          </form>
        </ScreenReaderDemo>

        <h3 className={subHeadingStyle}>実装コード</h3>
        <CodeBlock
          language="tsx"
          code={`const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  website: '',
  age: '',
});

const [errors, setErrors] = useState<Record<string, string>>({});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const newErrors: Record<string, string> = {};

  if (!formData.name) {
    newErrors.name = 'お名前は必須です';
  }

  if (!formData.email) {
    newErrors.email = 'メールアドレスは必須です';
  } else if (!validateEmail(formData.email)) {
    newErrors.email = '有効なメールアドレスを入力してください';
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    // フォーム送信処理
  }
};

return (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="demo-email">
        メールアドレス <span aria-hidden="true">*</span>
      </label>
      <Input
        type="email"
        id="demo-email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        autoComplete="email"
        required
        aria-required="true"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'demo-email-error' : 'demo-email-help'}
      />
      {errors.email && (
        <div
          id="demo-email-error"
          role="alert"
          aria-live="polite"
        >
          ⚠️ {errors.email}
        </div>
      )}
    </div>
    <Button type="submit">登録する</Button>
  </form>
);`}
        />
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>実践例：検索フォームデモ</h2>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          type="search"を使用したシンプルな検索フォーム:
        </p>

        <div className={css({
          backgroundColor: 'bg.secondary',
          padding: '2rem',
          borderRadius: '8px',
          borderWidth: 'thin',
          borderStyle: 'solid',
          borderColor: 'border.default',
          marginTop: '1rem',
          marginBottom: '2rem',
        })}>
          <form role="search" onSubmit={handleSearchSubmit}>
            <div className={css({ display: 'flex', gap: '1rem', alignItems: 'flex-end' })}>
              <div className={css({ flex: 1 })}>
                <Input
                  type="search"
                  id="demo-search"
                  name="q"
                  label="サイト内検索"
                  value={formData.search}
                  onChange={(e) => setFormData({ ...formData, search: e.target.value })}
                  placeholder="キーワードを入力"
                  aria-label="サイト内を検索"
                  autoComplete="off"
                />
              </div>
              <Button type="submit" variant="primary">
                検索
              </Button>
            </div>
          </form>
        </div>

        <h3 className={subHeadingStyle}>実装コード</h3>
        <CodeBlock
          language="tsx"
          code={`const [searchQuery, setSearchQuery] = useState('');

const handleSearchSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // 検索処理
  console.log('検索キーワード:', searchQuery);
};

return (
  <form role="search" onSubmit={handleSearchSubmit}>
    <label htmlFor="demo-search">サイト内検索</label>
    <Input
      type="search"
      id="demo-search"
      name="q"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="キーワードを入力"
      aria-label="サイト内を検索"
      autoComplete="off"
    />
    <Button type="submit">検索</Button>
  </form>
);`}
        />
      </section>
    </>
  );
};

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

export function InputTypes() {
  const InputIcon = icons.component.input;

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
        <InputIcon className={iconStyle} size={40} color="currentColor" strokeWidth={2} />
        HTML Input要素のtype属性
      </h1>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>概要</h2>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          HTML5の<code className={codeStyle}>&lt;input&gt;</code>要素には様々な<code className={codeStyle}>type</code>属性があり、
          それぞれ異なる入力形式と検証ルールを提供します。適切なtype属性を使用することで、ユーザビリティとアクセシビリティが向上します。
        </p>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>テキスト入力系</h2>

        <h3 className={subHeadingStyle}>type="text"</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          最も基本的なテキスト入力フィールド。単一行のテキストを入力できます。
        </p>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>実演</h4>
        <ScreenReaderDemo description="基本的なテキスト入力がどのように読み上げられるかを確認できます。">
          <label htmlFor="demo-text-username">ユーザー名</label>
          <input
            type="text"
            id="demo-text-username"
            name="username"
            placeholder="山田太郎"
            maxLength={50}
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </ScreenReaderDemo>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>コード例</h4>
        <CodeBlock
          language="html"
          code={`<label for="username">ユーザー名</label>
<input
  type="text"
  id="username"
  name="username"
  placeholder="yamada_taro"
  maxlength="50"
/>`}
        />
        <ul className={listStyle}>
          <li className={listItemStyle}><strong>用途</strong>: 名前、ユーザー名、任意のテキスト</li>
          <li className={listItemStyle}><strong>主な属性</strong>: <code className={codeStyle}>maxlength</code>, <code className={codeStyle}>minlength</code>, <code className={codeStyle}>pattern</code></li>
          <li className={listItemStyle}><strong>モバイルキーボード</strong>: 標準キーボード</li>
          <li className={listItemStyle}><strong>検証</strong>: なし（patternで独自の検証可能）</li>
        </ul>

        <h3 className={subHeadingStyle}>type="email"</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          メールアドレス専用の入力フィールド。メールアドレス形式の検証が自動的に行われます。
        </p>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>実演</h4>
        <ScreenReaderDemo description="メールアドレス入力がどのように読み上げられるかを確認できます。aria-describedbyでヘルプテキストも読み上げられます。">
          <label htmlFor="demo-email-field">メールアドレス</label>
          <input
            type="email"
            id="demo-email-field"
            name="email"
            placeholder="user@example.com"
            required
            aria-describedby="demo-email-help"
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
          <span id="demo-email-help" style={{ fontSize: '0.875rem', color: '#666', display: 'block', marginTop: '0.25rem' }}>
            example@domain.com の形式で入力してください
          </span>
        </ScreenReaderDemo>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>コード例</h4>
        <CodeBlock
          language="html"
          code={`<label for="email">メールアドレス</label>
<input
  type="email"
  id="email"
  name="email"
  placeholder="user@example.com"
  required
  aria-describedby="email-help"
/>
<span id="email-help">
  example@domain.com の形式で入力してください
</span>`}
        />
        <ul className={listStyle}>
          <li className={listItemStyle}><strong>用途</strong>: メールアドレス</li>
          <li className={listItemStyle}><strong>主な属性</strong>: <code className={codeStyle}>multiple</code> (複数のメールアドレスを許可)</li>
          <li className={listItemStyle}><strong>モバイルキーボード</strong>: @キーを含むキーボード</li>
          <li className={listItemStyle}><strong>検証</strong>: メールアドレス形式（name@domain）</li>
          <li className={listItemStyle}><strong>検証パターン</strong>: <code className={codeStyle}>user@domain.com</code></li>
        </ul>

        <h3 className={subHeadingStyle}>type="search"</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          検索用の入力フィールド。一部のブラウザで検索用のUIが表示されます（クリアボタンなど）。
        </p>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>実演</h4>
        <ScreenReaderDemo description="検索入力フィールドがどのように読み上げられるかを確認できます。">
          <label htmlFor="demo-search-field">サイト内検索</label>
          <input
            type="search"
            id="demo-search-field"
            name="q"
            placeholder="キーワードを入力"
            aria-label="サイト内を検索"
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </ScreenReaderDemo>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>コード例</h4>
        <CodeBlock
          language="html"
          code={`<label for="search">サイト内検索</label>
<input
  type="search"
  id="search"
  name="q"
  placeholder="キーワードを入力"
  aria-label="サイト内を検索"
/>`}
        />
        <ul className={listStyle}>
          <li className={listItemStyle}><strong>用途</strong>: 検索クエリ</li>
          <li className={listItemStyle}><strong>主な属性</strong>: textと同じ</li>
          <li className={listItemStyle}><strong>モバイルキーボード</strong>: 検索ボタン付きキーボード</li>
          <li className={listItemStyle}><strong>特徴</strong>: ブラウザによってはクリアボタン（×）が表示される</li>
          <li className={listItemStyle}><strong>検証</strong>: なし</li>
        </ul>

        <h3 className={subHeadingStyle}>type="tel"</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          電話番号専用の入力フィールド。モバイルで数字キーボードが表示されます。
        </p>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>実演</h4>
        <ScreenReaderDemo description="電話番号入力がどのように読み上げられるかを確認できます。pattern属性とヘルプテキストの使用例です。">
          <label htmlFor="demo-tel-field">電話番号</label>
          <input
            type="tel"
            id="demo-tel-field"
            name="phone"
            placeholder="090-1234-5678"
            pattern="[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}"
            aria-describedby="demo-tel-format"
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
          <span id="demo-tel-format" style={{ fontSize: '0.875rem', color: '#666', display: 'block', marginTop: '0.25rem' }}>
            ハイフン（-）を含めて入力してください
          </span>
        </ScreenReaderDemo>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>コード例</h4>
        <CodeBlock
          language="html"
          code={`<label for="phone">電話番号</label>
<input
  type="tel"
  id="phone"
  name="phone"
  placeholder="090-1234-5678"
  pattern="[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}"
  aria-describedby="phone-format"
/>
<span id="phone-format">
  ハイフン（-）を含めて入力してください
</span>`}
        />
        <ul className={listStyle}>
          <li className={listItemStyle}><strong>用途</strong>: 電話番号</li>
          <li className={listItemStyle}><strong>主な属性</strong>: <code className={codeStyle}>pattern</code> (形式を指定)</li>
          <li className={listItemStyle}><strong>モバイルキーボード</strong>: 数字キーボード</li>
          <li className={listItemStyle}><strong>検証</strong>: なし（patternで形式を指定可能）</li>
          <li className={listItemStyle}><strong>注意</strong>: 国や地域で形式が異なるため、柔軟なpatternを設定</li>
        </ul>

        <h3 className={subHeadingStyle}>type="url"</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          URL専用の入力フィールド。URL形式の検証が自動的に行われます。
        </p>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>実演</h4>
        <ScreenReaderDemo description="URL入力フィールドがどのように読み上げられるかを確認できます。">
          <label htmlFor="demo-url-field">ウェブサイト</label>
          <input
            type="url"
            id="demo-url-field"
            name="website"
            placeholder="https://example.com"
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </ScreenReaderDemo>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>コード例</h4>
        <CodeBlock
          language="html"
          code={`<label for="website">ウェブサイト</label>
<input
  type="url"
  id="website"
  name="website"
  placeholder="https://example.com"
  pattern="https?://.+"
/>

<!-- 複数のプロトコルを許可 -->
<input
  type="url"
  id="profile"
  name="profile"
  placeholder="https://... または ftp://..."
/>`}
        />
        <ul className={listStyle}>
          <li className={listItemStyle}><strong>用途</strong>: URL、ウェブサイトアドレス</li>
          <li className={listItemStyle}><strong>主な属性</strong>: <code className={codeStyle}>pattern</code></li>
          <li className={listItemStyle}><strong>モバイルキーボード</strong>: スラッシュ（/）や.comキーを含むキーボード</li>
          <li className={listItemStyle}><strong>検証</strong>: URL形式（http://やhttps://を含む）</li>
          <li className={listItemStyle}><strong>検証パターン</strong>: <code className={codeStyle}>https://example.com</code></li>
        </ul>

        <h3 className={subHeadingStyle}>type="number"</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          数値専用の入力フィールド。数値の範囲や増減ボタンが表示されます。
        </p>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>実演</h4>
        <ScreenReaderDemo description="数値入力フィールドがどのように読み上げられるかを確認できます。min/max/step属性の効果も確認してください。">
          <label htmlFor="demo-number-field">年齢</label>
          <input
            type="number"
            id="demo-number-field"
            name="age"
            min={0}
            max={120}
            step={1}
            placeholder="20"
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </ScreenReaderDemo>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>コード例</h4>
        <CodeBlock
          language="html"
          code={`<label for="age">年齢</label>
<input
  type="number"
  id="age"
  name="age"
  min="0"
  max="120"
  step="1"
  placeholder="20"
/>

<label for="price">価格（円）</label>
<input
  type="number"
  id="price"
  name="price"
  min="0"
  step="100"
  placeholder="1000"
/>`}
        />
        <ul className={listStyle}>
          <li className={listItemStyle}><strong>用途</strong>: 年齢、数量、価格など</li>
          <li className={listItemStyle}><strong>主な属性</strong>: <code className={codeStyle}>min</code>, <code className={codeStyle}>max</code>, <code className={codeStyle}>step</code></li>
          <li className={listItemStyle}><strong>モバイルキーボード</strong>: 数字キーボード</li>
          <li className={listItemStyle}><strong>検証</strong>: 数値のみ、min/maxの範囲チェック</li>
          <li className={listItemStyle}><strong>特徴</strong>: 増減ボタン（スピナー）が表示される</li>
          <li className={listItemStyle}><strong>注意</strong>: 大きな数値や小数点以下の桁数に注意</li>
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>inputmode属性</h2>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          <code className={codeStyle}>inputmode</code>属性は、モバイルデバイスで表示される仮想キーボードの種類を制御します。
          type属性とは独立して動作し、より細かいキーボード制御が可能です。
        </p>

        <h3 className={subHeadingStyle}>主なinputmode値</h3>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            <code className={codeStyle}>none</code> - キーボードを表示しない（カスタムキーボードを実装する場合）
          </li>
          <li className={listItemStyle}>
            <code className={codeStyle}>text</code> - 標準テキストキーボード（デフォルト）
          </li>
          <li className={listItemStyle}>
            <code className={codeStyle}>decimal</code> - 小数点を含む数値キーボード
          </li>
          <li className={listItemStyle}>
            <code className={codeStyle}>numeric</code> - 整数のみの数値キーボード
          </li>
          <li className={listItemStyle}>
            <code className={codeStyle}>tel</code> - 電話番号キーボード（*, #を含む）
          </li>
          <li className={listItemStyle}>
            <code className={codeStyle}>search</code> - 検索に最適化されたキーボード
          </li>
          <li className={listItemStyle}>
            <code className={codeStyle}>email</code> - メールアドレス入力用キーボード（@を含む）
          </li>
          <li className={listItemStyle}>
            <code className={codeStyle}>url</code> - URL入力用キーボード（/, .を含む）
          </li>
        </ul>

        <h3 className={subHeadingStyle}>type属性との違い</h3>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          <code className={codeStyle}>type</code>属性は検証やセマンティクスも含みますが、
          <code className={codeStyle}>inputmode</code>は純粋にキーボード表示のみを制御します。
        </p>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>実演：郵便番号入力</h4>
        <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.primary' })}>
          郵便番号はテキストとして扱いたいが、数字キーボードを表示したい場合に有効です。
        </p>
        <ScreenReaderDemo description="type=textでもinputmode=numericで数字キーボードを表示できます。">
          <label htmlFor="demo-postal-code">郵便番号（ハイフンなし）</label>
          <input
            type="text"
            inputMode="numeric"
            id="demo-postal-code"
            name="postal"
            placeholder="1234567"
            pattern="[0-9]{7}"
            maxLength={7}
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </ScreenReaderDemo>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>コード例</h4>
        <CodeBlock
          language="html"
          code={`<!-- 郵便番号：テキストとして扱うが数字キーボードを表示 -->
<input
  type="text"
  inputmode="numeric"
  pattern="[0-9]{7}"
  placeholder="1234567"
/>

<!-- 価格入力：小数点を含む数値キーボード -->
<input
  type="text"
  inputmode="decimal"
  placeholder="1234.56"
/>

<!-- クレジットカード番号：スペースを許可しつつ数字キーボード -->
<input
  type="text"
  inputmode="numeric"
  pattern="[0-9 ]{13,19}"
  placeholder="1234 5678 9012 3456"
/>`}
        />

        <h3 className={subHeadingStyle}>使い分けのポイント</h3>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            <strong>type="number"よりinputmode="numeric"が適切なケース：</strong>
            <br />
            郵便番号、クレジットカード番号など、数値だが数学的な値ではない場合
          </li>
          <li className={listItemStyle}>
            <strong>理由：</strong> type="number"はスピナー（増減ボタン）が表示され、先頭のゼロが削除される
          </li>
          <li className={listItemStyle}>
            <strong>inputmodeの利点：</strong> 検証は行わず、キーボード表示のみを制御できる
          </li>
        </ul>

        <h4 className={css({ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: 'contents.primary' })}>比較デモ</h4>
        <div className={css({ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' })}>
          <div>
            <h5 className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>type="number"</h5>
            <ScreenReaderDemo description="スピナーが表示され、先頭のゼロは削除されます">
              <label htmlFor="demo-number-postal">郵便番号</label>
              <input
                type="number"
                id="demo-number-postal"
                placeholder="1234567"
                style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </ScreenReaderDemo>
          </div>
          <div>
            <h5 className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>type="text" + inputmode="numeric"</h5>
            <ScreenReaderDemo description="スピナーなし、先頭のゼロも保持されます">
              <label htmlFor="demo-inputmode-postal">郵便番号</label>
              <input
                type="text"
                inputMode="numeric"
                id="demo-inputmode-postal"
                placeholder="1234567"
                pattern="[0-9]{7}"
                style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </ScreenReaderDemo>
          </div>
        </div>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>比較表</h2>
        <table className={tableStyle}>
          <thead>
            <tr>
              <th className={thStyle}>type</th>
              <th className={thStyle}>用途</th>
              <th className={thStyle}>モバイルキーボード</th>
              <th className={thStyle}>自動検証</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>text</code></td>
              <td className={tdStyle}>一般的なテキスト</td>
              <td className={tdStyle}>標準キーボード</td>
              <td className={tdStyle}>なし</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>email</code></td>
              <td className={tdStyle}>メールアドレス</td>
              <td className={tdStyle}>@キー付き</td>
              <td className={tdStyle}>メール形式</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>search</code></td>
              <td className={tdStyle}>検索クエリ</td>
              <td className={tdStyle}>検索ボタン付き</td>
              <td className={tdStyle}>なし</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>tel</code></td>
              <td className={tdStyle}>電話番号</td>
              <td className={tdStyle}>数字キーボード</td>
              <td className={tdStyle}>なし</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>url</code></td>
              <td className={tdStyle}>URL</td>
              <td className={tdStyle}>/ と .com キー付き</td>
              <td className={tdStyle}>URL形式</td>
            </tr>
            <tr>
              <td className={tdStyle}><code className={codeStyle}>number</code></td>
              <td className={tdStyle}>数値</td>
              <td className={tdStyle}>数字キーボード</td>
              <td className={tdStyle}>数値・範囲</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>アクセシビリティのベストプラクティス</h2>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            <strong>適切なtype属性を使用</strong>: ユーザーの入力を容易にし、モバイルで適切なキーボードを表示
          </li>
          <li className={listItemStyle}>
            <strong>label要素を必ず使用</strong>: すべてのinput要素に対応するlabelを設定
          </li>
          <li className={listItemStyle}>
            <strong>placeholderは補助的に</strong>: placeholderだけでなくlabelも必須
          </li>
          <li className={listItemStyle}>
            <strong>エラーメッセージの関連付け</strong>: <code className={codeStyle}>aria-describedby</code>でエラーメッセージを関連付け
          </li>
          <li className={listItemStyle}>
            <strong>検証エラーの通知</strong>: <code className={codeStyle}>aria-invalid="true"</code>と<code className={codeStyle}>role="alert"</code>を使用
          </li>
          <li className={listItemStyle}>
            <strong>入力形式の説明</strong>: 期待される形式を<code className={codeStyle}>aria-describedby</code>で説明
          </li>
          <li className={listItemStyle}>
            <strong>autocomplete属性の使用</strong>: ブラウザの自動入力機能を活用（name, email, tel, urlなど）
          </li>
        </ul>
      </section>

      <section className={sectionStyle}>
        <h2 className={headingStyle}>検証とエラーハンドリング</h2>
        <div className={exampleBoxStyle}>
          <p className={css({ fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>アクセシブルなエラー表示</p>
          <pre className={css({ fontFamily: 'monospace', fontSize: '0.9rem', overflow: 'auto', color: 'contents.primary' })}>
{`<label for="email-validation">メールアドレス</label>
<input
  type="email"
  id="email-validation"
  name="email"
  aria-invalid="true"
  aria-describedby="email-error"
  required
/>
<div
  id="email-error"
  role="alert"
  aria-live="polite"
  style="color: red;"
>
  ⚠️ 有効なメールアドレスを入力してください
</div>`}
          </pre>
        </div>
      </section>

      <InputTypeDemo />

      <section className={sectionStyle}>
        <h2 className={headingStyle}>このプロジェクトでの実装例</h2>
        <ul className={listStyle}>
          <li className={listItemStyle}>
            <a href="/components" className={css({ color: 'contents.link', textDecoration: 'underline', _hover: { opacity: 0.8 } })}>
              コンポーネント一覧 - Input コンポーネントの実装
            </a>
          </li>
          <li className={listItemStyle}>
            <a href="/aria/form-labeling" className={css({ color: 'contents.link', textDecoration: 'underline', _hover: { opacity: 0.8 } })}>
              フォームラベリング - アクセシブルなフォームの実装例
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
