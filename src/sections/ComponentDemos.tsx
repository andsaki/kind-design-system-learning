import { Button, Input, Select, Form, Accordion, AccordionSummary, AccordionContent, Modal, Breadcrumbs, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, formSchemas, Dropdown } from "../design-system/components";
import { Text } from "../design-system/components/Text";
import { TextArea } from "../design-system/components/TextArea";
import { Checkbox } from "../design-system/components/Checkbox";
import { Radio, RadioGroup } from "../design-system/components/Radio";
import { Loading, InlineLoading } from "../design-system/components/Loading";
import { InfoBox } from "../design-system/components/InfoBox";
import { icons } from "../design-system/tokens/icons";
import { SectionHeading } from "../components/SectionHeading";
import { z } from "zod";
import { useState } from "react";
import { css, cx } from "@/styled-system/css";

interface ComponentDemosProps {
  count: number;
  isLoading: boolean;
  handleClick: () => void;
  formData: {
    name: string;
    email: string;
    password: string;
  };
  errors: {
    name: string;
    email: string;
    password: string;
  };
  setFormData: (data: { name: string; email: string; password: string }) => void;
  setErrors: (errors: { name: string; email: string; password: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

// 共通スタイル定義
const sectionStyle = css({
  mb: 12,
  p: 6,
  bg: "bg.primary",
  rounded: "lg",
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "border.default",
  maxW: "full",
  overflowX: "hidden",
  boxSizing: "border-box",
});

const sectionHeading = css({
  mt: 0,
  color: "contents.primary",
  fontSize: "2xl",
  fontWeight: "bold",
  borderBottomWidth: "thick",
  borderBottomStyle: "solid",
  borderBottomColor: "blue.500",
  pb: 2,
  mb: 4,
  display: "flex",
  alignItems: "center",
  gap: 2,
});

const sectionDescription = css({
  color: "contents.primary",
  mt: 0,
});

const flexWrap = css({
  display: "flex",
  gap: 4,
  flexWrap: "wrap",
  mt: 4,
});

const flexColumn = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export function ComponentDemos({
  count,
  isLoading,
  handleClick,
  formData,
  errors,
  setFormData,
  setErrors,
  handleSubmit,
  success,
  error,
  warning,
  info,
  isModalOpen,
  setIsModalOpen,
}: ComponentDemosProps) {
  const [selectedFruit, setSelectedFruit] = useState("apple");
  const [selectedPlan, setSelectedPlan] = useState("");
  const dropdownOptions = [
    { value: "apple", label: "りんご" },
    { value: "banana", label: "バナナ" },
    { value: "orange", label: "オレンジ" },
    { value: "grape", label: "ぶどう" },
  ];
  const planOptions = [
    { value: "basic", label: "Basicプラン" },
    { value: "pro", label: "Proプラン" },
    { value: "enterprise", label: "Enterpriseプラン" },
  ];

  return (
    <>
      <section
        id="button-component"
        className={sectionStyle}
      >
        <h2 className={sectionHeading}>
          <icons.component.button size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Button コンポーネント
        </h2>
        <p className={sectionDescription}>WCAG準拠のアクセシブルなボタンコンポーネントです。</p>

        <div className={flexWrap}>
          <Button
            variant="primary"
            onClick={handleClick}
            isLoading={isLoading}
          >
            カウント: {count}
          </Button>

          <Button
            variant="secondary"
            onClick={() => alert("クリックされました！")}
          >
            セカンダリ
          </Button>

          <Button variant="outline" onClick={() => alert("アウトライン")}>
            アウトライン
          </Button>

          <Button variant="danger" onClick={() => alert("削除しますか？")}>
            削除
          </Button>
        </div>

        <div className={flexWrap}>
          <Button size="sm" variant="primary">
            小サイズ
          </Button>
          <Button size="md" variant="primary">
            中サイズ
          </Button>
          <Button size="lg" variant="primary">
            大サイズ
          </Button>
        </div>

        <div className={flexWrap}>
          <Button disabled>無効化</Button>
          <Button isLoading>読み込み中</Button>
          <Button icon={<icons.component.button size={16} />}>アイコン付き</Button>
        </div>
      </section>

      <section
        id="input-component"
        className={sectionStyle}
      >
        <h2 className={sectionHeading}>
          <icons.component.input size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Input コンポーネント
        </h2>
        <p className={sectionDescription}>
          ラベル、エラー表示、ヘルプテキストを備えたアクセシブルな入力フィールドです。
        </p>

        <form onSubmit={handleSubmit} className={css({ mt: 6 })}>
          <Input
            label="お名前"
            placeholder="山田太郎"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            error={errors.name}
            required
          />

          <Input
            label="メールアドレス"
            type="email"
            placeholder="example@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
            helperText="ログイン時に使用します"
            required
          />

          <Input
            label="パスワード"
            type="password"
            placeholder="8文字以上で入力"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
            helperText="8文字以上の英数字を入力してください"
            required
          />

          <div className={flexWrap}>
            <Button type="submit" variant="primary">
              送信
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFormData({ name: "", email: "", password: "" });
                setErrors({ name: "", email: "", password: "" });
              }}
            >
              クリア
            </Button>
          </div>
        </form>

        <div className={css({ mt: 8 })}>
          <SectionHeading>サイズバリエーション</SectionHeading>
          <Input label="小サイズ" size="sm" placeholder="小さい入力欄" />
          <Input label="中サイズ" size="md" placeholder="標準の入力欄" />
          <Input label="大サイズ" size="lg" placeholder="大きい入力欄" />
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>無効化状態</SectionHeading>
          <Input
            label="無効な入力欄"
            value="編集できません"
            disabled
            helperText="この項目は編集できません"
          />
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>数値入力（スピンボタン付き）</SectionHeading>
          <Input
            label="数量"
            type="number"
            placeholder="0"
            min={0}
            max={100}
            step={1}
            helperText="0〜100の範囲で入力してください"
          />
        </div>
      </section>

      <section
        id="select-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.input size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Select コンポーネント
        </h2>
        <p className={sectionDescription}>
          セレクトボックス（ドロップダウンメニュー）コンポーネントです。
          ユーザーが選択肢の中から1つを選ぶインターフェースを提供します。
        </p>

        <div className={css({ mt: 6 })}>
          <SectionHeading>基本的な使い方</SectionHeading>
          <div className={css({ maxW: "400px" })}>
            <Select
              label="国を選択"
              options={[
                { value: 'jp', label: '日本' },
                { value: 'us', label: 'アメリカ' },
                { value: 'uk', label: 'イギリス' },
                { value: 'fr', label: 'フランス' },
                { value: 'de', label: 'ドイツ' },
              ]}
              placeholder="選択してください"
            />
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>ヘルプテキスト付き</SectionHeading>
          <div className={css({ maxW: "400px" })}>
            <Select
              label="配送先の国"
              options={[
                { value: 'jp', label: '日本' },
                { value: 'us', label: 'アメリカ' },
                { value: 'uk', label: 'イギリス' },
              ]}
              placeholder="選択してください"
              helperText="お住まいの国を選択してください"
            />
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>エラー状態</SectionHeading>
          <div className={css({ maxW: "400px" })}>
            <Select
              label="国を選択"
              options={[
                { value: 'jp', label: '日本' },
                { value: 'us', label: 'アメリカ' },
                { value: 'uk', label: 'イギリス' },
              ]}
              placeholder="選択してください"
              error="国の選択は必須です"
            />
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>必須項目</SectionHeading>
          <div className={css({ maxW: "400px" })}>
            <Select
              label="国を選択"
              options={[
                { value: 'jp', label: '日本' },
                { value: 'us', label: 'アメリカ' },
                { value: 'uk', label: 'イギリス' },
              ]}
              placeholder="選択してください"
              required
            />
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>無効化状態</SectionHeading>
          <div className={css({ maxW: "400px" })}>
            <Select
              label="国を選択"
              options={[
                { value: 'jp', label: '日本' },
                { value: 'us', label: 'アメリカ' },
                { value: 'uk', label: 'イギリス' },
              ]}
              placeholder="選択してください"
              disabled
            />
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>サイズバリエーション</SectionHeading>
          <div className={cx(flexColumn, css({ maxW: "400px" }))}>
            <Select
              label="小（sm）"
              options={[
                { value: 'jp', label: '日本' },
                { value: 'us', label: 'アメリカ' },
              ]}
              placeholder="選択してください"
              size="sm"
            />
            <Select
              label="中（md）- デフォルト"
              options={[
                { value: 'jp', label: '日本' },
                { value: 'us', label: 'アメリカ' },
              ]}
              placeholder="選択してください"
              size="md"
            />
            <Select
              label="大（lg）"
              options={[
                { value: 'jp', label: '日本' },
                { value: 'us', label: 'アメリカ' },
              ]}
              placeholder="選択してください"
              size="lg"
            />
          </div>
        </div>

        <InfoBox variant="info" icon="💡" title="Selectの特徴" className={css({ mt: 8 })}>
          <ul className={css({ lineHeight: "relaxed", margin: 0, pl: 6 })}>
            <li><strong>ラベル関連付け</strong>: for/id属性で自動関連付け</li>
            <li><strong>エラー表示</strong>: aria-invalid, aria-describedby, role="alert"</li>
            <li><strong>必須項目</strong>: aria-required属性でスクリーンリーダーに通知</li>
            <li><strong>WCAGレベル対応</strong>: A/AA/AAAの3段階</li>
            <li><strong>キーボードフォーカス</strong>: Tabキー操作時のみフォーカススタイル表示</li>
            <li><strong>ネイティブselect要素</strong>: アクセシビリティとユーザビリティを両立</li>
          </ul>
        </InfoBox>
      </section>

      <section
        id="textarea-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.input size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          TextArea コンポーネント
        </h2>
        <p className={sectionDescription}>
          テキストエリアコンポーネントです。
          複数行のテキスト入力が必要な場面で使用します。
        </p>

        <TextAreaSection />

        <InfoBox variant="info" icon="💡" title="TextAreaの特徴" className={css({ mt: 8 })}>
          <ul className={css({ lineHeight: "relaxed", margin: 0, pl: 6 })}>
            <li><strong>ラベル関連付け</strong>: for/id属性で自動関連付け</li>
            <li><strong>エラー表示</strong>: aria-invalid, aria-describedby, role="alert"</li>
            <li><strong>文字数カウント</strong>: maxLengthとshowCountで制限と表示</li>
            <li><strong>リサイズ可能</strong>: 縦方向にユーザーがサイズ変更可能</li>
            <li><strong>キーボードフォーカス</strong>: Tabキー操作時のみフォーカススタイル表示</li>
            <li><strong>WCAGレベル対応</strong>: A/AA/AAAの3段階</li>
          </ul>
        </InfoBox>
      </section>

      <section
        id="checkbox-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.input size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Checkbox コンポーネント
        </h2>
        <p className={sectionDescription}>
          チェックボックスコンポーネントです。
          複数の選択肢から複数を選択できるインターフェースを提供します。
        </p>

        <CheckboxSection />

        <InfoBox variant="info" icon="💡" title="Checkboxの特徴" className={css({ mt: 8 })}>
          <ul className={css({ lineHeight: "relaxed", margin: 0, pl: 6 })}>
            <li><strong>ラベル関連付け</strong>: for/id属性で自動関連付け</li>
            <li><strong>エラー表示</strong>: aria-invalid, aria-describedby, role="alert"</li>
            <li><strong>不確定状態</strong>: indeterminate属性で一部選択状態を表現</li>
            <li><strong>キーボード操作</strong>: Spaceキーでチェック切り替え</li>
            <li><strong>フォーカス表示</strong>: Tabキー操作時のみフォーカススタイル表示</li>
          </ul>
        </InfoBox>
      </section>

      <section
        id="radio-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.input size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Radio コンポーネント
        </h2>
        <p className={sectionDescription}>
          ラジオボタンコンポーネントです。
          複数の選択肢から1つだけを選択できるインターフェースを提供します。
        </p>

        <RadioSection />

        <InfoBox variant="info" icon="💡" title="Radioの特徴" className={css({ mt: 8 })}>
          <ul className={css({ lineHeight: "relaxed", margin: 0, pl: 6 })}>
            <li><strong>RadioGroup</strong>: fieldset/legendで グループ化</li>
            <li><strong>エラー表示</strong>: aria-invalid, aria-describedby, role="alert"</li>
            <li><strong>キーボード操作</strong>: 矢印キーで選択変更、Spaceキーで選択</li>
            <li><strong>排他的選択</strong>: name属性で同じグループ内は1つのみ選択可能</li>
            <li><strong>フォーカス表示</strong>: Tabキー操作時のみフォーカススタイル表示</li>
          </ul>
        </InfoBox>
      </section>

      <section
        id="loading-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.button size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Loading コンポーネント
        </h2>
        <p className={sectionDescription}>
          ローディングスピナーコンポーネントです。
          データの読み込み中やAPI通信中などの処理待ち状態を表示します。
        </p>

        <LoadingSection />

        <InfoBox variant="info" icon="💡" title="Loadingの特徴" className={css({ mt: 8 })}>
          <ul className={css({ lineHeight: "relaxed", margin: 0, pl: 6 })}>
            <li><strong>スクリーンリーダー対応</strong>: role="status", aria-label, aria-live</li>
            <li><strong>サイズバリエーション</strong>: sm/md/lg/xlの4サイズ</li>
            <li><strong>カラーバリエーション</strong>: primary/secondary/whiteの3色</li>
            <li><strong>フルスクリーン表示</strong>: オーバーレイでモーダル風に表示可能</li>
            <li><strong>インラインローディング</strong>: ボタン内やテキスト内での使用に最適</li>
            <li><strong>SVGアニメーション</strong>: 滑らかな回転アニメーション</li>
          </ul>
        </InfoBox>
      </section>

      <section
        id="form-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.form size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Form コンポーネント
        </h2>
        <p className={sectionDescription}>
          react-hook-formとZodを統合したアクセシブルなフォームコンポーネントです。
          バリデーション、エラー表示、型安全性が統合されています。
        </p>

        <div className={css({ mt: 6 })}>
          <SectionHeading>基本的な使い方</SectionHeading>
          <Form
            schema={z.object({
              email: formSchemas.email,
              password: formSchemas.required('パスワード'),
            })}
            fields={[
              {
                name: 'email',
                label: 'メールアドレス',
                type: 'email',
                placeholder: 'example@example.com',
                required: true,
              },
              {
                name: 'password',
                label: 'パスワード',
                type: 'password',
                placeholder: '••••••••',
                required: true,
              },
            ]}
            onSubmit={(data) => {
              alert(`ログイン成功!\nEmail: ${data.email}`);
              console.log('Login data:', data);
            }}
            submitText="ログイン"
            submitVariant="primary"
            wcagLevel="AA"
          />
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>複雑なバリデーション</SectionHeading>
          <p className={css({ color: "contents.primary", mb: 4 })}>
            パスワード確認フィールドの一致検証など、複雑なバリデーションルールを簡単に実装できます。
          </p>
          <Form
            schema={z.object({
              username: formSchemas.minLength(3, 'ユーザー名'),
              email: formSchemas.email,
              password: formSchemas.password,
              confirmPassword: formSchemas.required('パスワード（確認）'),
            }).refine((data) => data.password === data.confirmPassword, {
              message: 'パスワードが一致しません',
              path: ['confirmPassword'],
            })}
            fields={[
              {
                name: 'username',
                label: 'ユーザー名',
                placeholder: 'yamada_taro',
                helperText: '3文字以上で入力してください',
                required: true,
              },
              {
                name: 'email',
                label: 'メールアドレス',
                type: 'email',
                placeholder: 'example@example.com',
                required: true,
              },
              {
                name: 'password',
                label: 'パスワード',
                type: 'password',
                helperText: '8文字以上、大文字・小文字・数字を含む',
                required: true,
              },
              {
                name: 'confirmPassword',
                label: 'パスワード（確認）',
                type: 'password',
                required: true,
              },
            ]}
            onSubmit={(data) => {
              alert(`会員登録成功!\nユーザー名: ${data.username}\nEmail: ${data.email}`);
              console.log('Signup data:', data);
            }}
            submitText="会員登録"
            wcagLevel="AA"
          />
        </div>

        <div className={css({
          mt: 8,
          p: 4,
          bg: "bg.secondary",
          rounded: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
        })}>
          <h4 className={css({ color: "contents.primary", mt: 0 })}>
            💡 Formコンポーネントの特徴
          </h4>
          <ul className={css({ color: "contents.primary", lineHeight: "relaxed" })}>
            <li><strong>Zodスキーマ統合</strong>: 型安全なバリデーション</li>
            <li><strong>react-hook-form</strong>: 高パフォーマンスなフォーム管理</li>
            <li><strong>アクセシブルなエラー表示</strong>: aria-invalid, aria-describedby, role="alert"</li>
            <li><strong>WCAGレベル対応</strong>: A/AA/AAA のフォーカススタイル</li>
            <li><strong>ヘルパースキーマ</strong>: よく使うバリデーションを簡単に利用</li>
            <li><strong>再利用可能</strong>: fields配列でフォームを簡単に定義</li>
          </ul>
        </div>
      </section>

      <section
        id="dropdown-component"
        className={sectionStyle}
      >
        <h2 className={sectionHeading}>
          <icons.component.dropdown size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Dropdown コンポーネント
        </h2>
        <p className={sectionDescription}>
          カスタム UI として実装したアクセシブルなドロップダウン。キーボード操作、aria属性、WCAG レベル別フォーカスが揃っています。
        </p>

        <div className={flexColumn}>
          <Dropdown
            label="好きなフルーツ"
            options={dropdownOptions}
            value={selectedFruit}
            onChange={setSelectedFruit}
            helperText="選択すると現在値がラベルに表示されます"
            placeholder="フルーツを選択"
          />

          <Dropdown
            label="ご希望のプラン"
            options={planOptions}
            value={selectedPlan}
            onChange={setSelectedPlan}
            error={selectedPlan ? undefined : "プランを選択してください"}
            placeholder="プランを選択"
            required
          />
        </div>
      </section>

      <section
        id="accordion-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.accordion size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Accordion コンポーネント
        </h2>
        <p className={sectionDescription}>
          ネイティブの&lt;details&gt;/&lt;summary&gt;要素を使用したアクセシブルなアコーディオンです。
          キーボード操作とスクリーンリーダーに完全対応しています。
        </p>

        <div className={css({ mt: 6 })}>
          <SectionHeading>基本的な使い方</SectionHeading>
          <div className={flexColumn}>
            <Accordion>
              <AccordionSummary>アクセシビリティとは？</AccordionSummary>
              <AccordionContent>
                <p className={css({ mb: 2 })}>
                  アクセシビリティ（Accessibility、a11y）とは、障害の有無に関わらず、すべての人がWebサイトやアプリケーションを利用できるようにすることです。
                </p>
                <p>
                  視覚障害、聴覚障害、運動障害、認知障害など、さまざまな障害を持つ人々が情報にアクセスできるようにする必要があります。
                </p>
              </AccordionContent>
            </Accordion>

            <Accordion defaultOpen>
              <AccordionSummary>WCAGとは？</AccordionSummary>
              <AccordionContent>
                <p className={css({ mb: 2 })}>
                  WCAG（Web Content Accessibility Guidelines）は、Webコンテンツをよりアクセシブルにするための国際的なガイドラインです。
                </p>
                <ul className={css({ pl: 5 })}>
                  <li>レベルA: 最低限のアクセシビリティ</li>
                  <li>レベルAA: 推奨される標準（ほとんどのサイトで目指すべき）</li>
                  <li>レベルAAA: 最高レベルのアクセシビリティ</li>
                </ul>
              </AccordionContent>
            </Accordion>

            <Accordion>
              <AccordionSummary>デザイントークンとは？</AccordionSummary>
              <AccordionContent>
                <p className={css({ mb: 2 })}>
                  デザイントークンは、色、サイズ、間隔などのデザイン要素を変数として定義したものです。
                </p>
                <p>
                  一貫性のあるデザインシステムを構築し、保守性を高めるために使用されます。
                  このプロジェクトでは3層構造（Primitive → Semantic → Component）を採用しています。
                </p>
              </AccordionContent>
            </Accordion>
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>WCAGレベル別フォーカススタイル</SectionHeading>
          <p className={css({ color: "contents.primary", mb: 4 })}>
            <strong>Tabキー</strong>でアコーディオンにフォーカスを当てて、各レベルの違いを確認してください。
          </p>

          <div className={flexColumn}>
            <Accordion wcagLevel="A">
              <AccordionSummary>Level A（最低限）</AccordionSummary>
              <AccordionContent>
                薄い青色のアウトライン（2px）。プロトタイプやMVP向け。
              </AccordionContent>
            </Accordion>

            <Accordion wcagLevel="AA" defaultOpen>
              <AccordionSummary>Level AA（推奨）★</AccordionSummary>
              <AccordionContent>
                薄い青背景＋濃い青アウトライン（3px）。ほとんどのWebサイトで推奨（デフォルト）。
              </AccordionContent>
            </Accordion>

            <Accordion wcagLevel="AAA">
              <AccordionSummary>Level AAA（最高）</AccordionSummary>
              <AccordionContent>
                黄色背景＋黒アウトライン（4px）。公共機関、医療、金融など。
              </AccordionContent>
            </Accordion>
          </div>

          <p className={css({ mt: 4, fontSize: "sm", color: "contents.primary" })}>
            💡 WCAGレベルとコントラスト比の詳細は<a href="#wcag-levels" className={css({ color: "contents.link" })}>こちらのセクション</a>をご覧ください
          </p>
        </div>

        <div className={css({
          mt: 8,
          p: 4,
          bg: "bg.secondary",
          rounded: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
        })}>
          <h4 className={css({ color: "contents.primary", mt: 0 })}>
            💡 アコーディオンの特徴
          </h4>
          <ul className={css({ color: "contents.primary", lineHeight: "relaxed" })}>
            <li><strong>セマンティックHTML</strong>: ネイティブの&lt;details&gt;/&lt;summary&gt;要素を使用</li>
            <li><strong>キーボード操作</strong>: Tab、Enter、Spaceキーで完全に操作可能</li>
            <li><strong>スクリーンリーダー対応</strong>: 自動的に適切なARIA属性が付与される</li>
            <li><strong>フォーカス表示</strong>: キーボード操作時のみ視覚的に表示</li>
            <li><strong>スムーズアニメーション</strong>: アイコンの回転アニメーション</li>
            <li><strong>デザイントークン</strong>: すべてのスタイルはトークンから取得</li>
          </ul>
        </div>
      </section>

      <section
        id="toast-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.toast size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Toast コンポーネント
        </h2>
          <p className={css({ lineHeight: "normal", color: "contents.primary" })}>
          トースト通知は、ユーザーの操作に対する一時的なフィードバックを提供します。
        </p>

        <div className={css({ mt: 6, display: "flex", gap: 3, flexWrap: "wrap" })}>
          <Button
            variant="primary"
            onClick={() => success('操作が完了しました', '成功')}
          >
            Success Toast
          </Button>

          <Button
            variant="primary"
            onClick={() => error('エラーが発生しました', 'エラー')}
          >
            Error Toast
          </Button>

          <Button
            variant="primary"
            onClick={() => warning('この操作は取り消せません', '警告')}
          >
            Warning Toast
          </Button>

          <Button
            variant="primary"
            onClick={() => info('新しいお知らせがあります', 'お知らせ')}
          >
            Info Toast
          </Button>
        </div>

        <div className={css({
          mt: 8,
          p: 4,
          bg: "bg.secondary",
          rounded: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
        })}>
          <h4 className={css({ color: "contents.primary", mt: 0 })}>
            💡 Toastの特徴
          </h4>
          <ul className={css({ color: "contents.primary", lineHeight: "relaxed" })}>
            <li><strong>4種類のタイプ</strong>: success、error、warning、info</li>
            <li><strong>自動消去</strong>: デフォルト5秒で自動的に閉じる</li>
            <li><strong>スライドアニメーション</strong>: 画面右上からスムーズに表示</li>
            <li><strong>アクセシブル</strong>: role="alert"とaria-live="polite"で支援技術に対応</li>
            <li><strong>複数表示対応</strong>: 複数のトーストを同時に表示可能</li>
            <li><strong>手動クローズ</strong>: ×ボタンでいつでも閉じられる</li>
          </ul>
        </div>
      </section>

      <section
        id="modal-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.modal size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Modal コンポーネント
        </h2>
          <p className={css({ lineHeight: "normal", color: "contents.primary" })}>
          モーダルダイアログは、ユーザーの注意を特定のタスクに集中させるために使用します。
        </p>

        <div className={css({ mt: 6, display: "flex", gap: 3, flexWrap: "wrap" })}>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            モーダルを開く
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="モーダルの例"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                キャンセル
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  success('保存しました');
                  setIsModalOpen(false);
                }}
              >
                保存
              </Button>
            </>
          }
        >
          <p>これはモーダルダイアログの例です。</p>
          <p>
            <strong>試してみてください:</strong>
          </p>
          <ul className={css({ lineHeight: "relaxed" })}>
            <li>Tab キーでフォーカスを移動（モーダル内を循環）</li>
            <li>Esc キーでモーダルを閉じる</li>
            <li>背景をクリックしてモーダルを閉じる</li>
          </ul>
        </Modal>

        <div className={css({
          mt: 8,
          p: 4,
          bg: "bg.secondary",
          rounded: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
        })}>
          <h4 className={css({ color: "contents.primary", mt: 0 })}>
            💡 Modalの特徴
          </h4>
          <ul className={css({ color: "contents.primary", lineHeight: "relaxed" })}>
            <li><strong>role="dialog"</strong>: ダイアログであることを支援技術に伝える</li>
            <li><strong>aria-modal="true"</strong>: モーダルであることを明示</li>
            <li><strong>aria-labelledby</strong>: タイトルとの関連付け</li>
            <li><strong>フォーカストラップ</strong>: Tab キーでモーダル内を循環</li>
            <li><strong>Esc キーで閉じる</strong>: キーボード操作に対応</li>
            <li><strong>背景スクロール防止</strong>: モーダル表示中は背景をスクロールできない</li>
            <li><strong>フォーカス管理</strong>: 開いた時に最初の要素へ、閉じた時に元の場所へフォーカス</li>
          </ul>
        </div>
      </section>

      <section
        id="text-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.text size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Text コンポーネント
        </h2>
        <p className={sectionDescription}>
          タイポグラフィトークンを使用したテキスト表示コンポーネントです。
          セマンティックなHTML要素の選択と柔軟なスタイリングが可能です。
        </p>

        <div className={css({ mt: 6 })}>
          <SectionHeading>見出しレベル</SectionHeading>
          <div className={css({
            p: 4,
            bg: "bg.tertiary",
            rounded: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            maxW: "full",
            overflowX: "hidden",
            boxSizing: "border-box",
          })}>
            <div className={cx(flexColumn, css({ gap: 3 }))}>
              <Text variant="h1">見出し1 - ページタイトル</Text>
              <Text variant="h2">見出し2 - セクションタイトル</Text>
              <Text variant="h3">見出し3 - サブセクション</Text>
              <Text variant="h4">見出し4 - 小見出し</Text>
              <Text variant="h5">見出し5 - より小さい見出し</Text>
              <Text variant="h6">見出し6 - 最小の見出し</Text>
            </div>
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>本文バリエーション</SectionHeading>
          <div className={css({
            p: 4,
            bg: "bg.tertiary",
            rounded: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            maxW: "full",
            overflowX: "hidden",
            boxSizing: "border-box",
          })}>
            <div className={cx(flexColumn, css({ gap: 3 }))}>
              <Text variant="body-large">大きめの本文テキスト - 重要な説明文などに使用</Text>
              <Text variant="body">標準の本文テキスト - 最も一般的に使用されるサイズ</Text>
              <Text variant="body-small">小さめの本文テキスト - 補足情報などに使用</Text>
              <Text variant="caption">キャプションテキスト - 画像の説明などに使用</Text>
              <Text variant="overline">OVERLINE TEXT - ラベルやカテゴリに使用</Text>
            </div>
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>テキスト装飾</SectionHeading>
          <div className={css({
            p: 4,
            bg: "bg.tertiary",
            rounded: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            maxW: "full",
            overflowX: "hidden",
            boxSizing: "border-box",
          })}>
            <div className={cx(flexColumn, css({ gap: 2 }))}>
              <Text>通常のテキスト</Text>
              <Text bold>太字のテキスト</Text>
              <Text italic>イタリック体のテキスト</Text>
              <Text underline>下線付きテキスト</Text>
              <Text strikethrough>打ち消し線付きテキスト</Text>
            </div>
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>カラーバリエーション</SectionHeading>
          <div className={css({
            p: 4,
            bg: "bg.tertiary",
            rounded: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            maxW: "full",
            overflowX: "hidden",
            boxSizing: "border-box",
          })}>
            <div className={cx(flexColumn, css({ gap: 2 }))}>
              <Text className={css({ color: "blue.600" })}>青色のテキスト</Text>
              <Text className={css({ color: "red.600" })}>赤色のテキスト</Text>
              <Text className={css({ color: "green.600" })}>緑色のテキスト</Text>
              <Text className={css({ color: "pink.600" })}>ピンク色のテキスト</Text>
            </div>
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>WCAGレベルの違い（A / AA / AAA）</SectionHeading>

          <div className={css({
            p: 4,
            bg: "bg.secondary",
            rounded: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            mb: 4,
          })}>
            <Text variant="body" className={css({ color: "contents.primary" })}>
              <strong>WCAG（Web Content Accessibility Guidelines）</strong>は、Webコンテンツをアクセシブルにするための国際的なガイドラインです。
              3つの適合レベル（A、AA、AAA）があり、レベルが上がるほど厳格な基準となります。
            </Text>
          </div>

          <div className={css({
            p: 4,
            bg: "bg.tertiary",
            rounded: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            maxW: "full",
            overflowX: "hidden",
            boxSizing: "border-box",
          })}>
            <div className={cx(flexColumn, css({ gap: 5 }))}>
              <div className={css({
                p: 4,
                bg: "bg.primary",
                rounded: "md",
                borderWidth: "base",
                borderStyle: "solid",
                borderColor: "border.default",
              })}>
                <Text variant="h6" className={css({ color: "contents.primary", mb: 2 })}>
                  レベルA（最低限）
                </Text>
                <Text variant="body-small" className={css({ color: "contents.secondary", mb: 2 })}>
                  コントラスト比: <strong>3:1</strong>（大きいテキストのみ）
                </Text>
                <Text variant="body-small" className={css({ color: "contents.secondary", mb: 2 })}>
                  最も基本的なアクセシビリティ要件。これを満たさないと多くのユーザーがコンテンツにアクセスできない。
                </Text>
                <div className={css({
                  mt: 3,
                  pt: 3,
                  borderTopWidth: "thin",
                  borderTopStyle: "solid",
                  borderTopColor: "border.default",
                })}>
                  <Text variant="body-small" bold className={css({ color: "contents.primary", mb: 1 })}>
                    主な要件例：
                  </Text>
                  <ul className={css({
                    margin: 0,
                    pl: 5,
                    fontSize: "sm",
                    lineHeight: "relaxed",
                    color: "contents.secondary",
                  })}>
                    <li>キーボードで操作可能</li>
                    <li>画像に代替テキスト（alt属性）を提供</li>
                    <li>動画に字幕を提供</li>
                    <li>十分な時間を提供（自動更新の制御）</li>
                  </ul>
                </div>
              </div>

              <div className={css({
                p: 4,
                bg: "bg.primary",
                rounded: "md",
                borderWidth: "base",
                borderStyle: "solid",
                borderColor: "blue.400",
              })}>
                <Text variant="h6" className={css({ color: "blue.700", mb: 2 })}>
                  レベルAA（推奨）⭐
                </Text>
                <Text variant="body-small" className={css({ color: "contents.secondary", mb: 2 })}>
                  コントラスト比: <strong>4.5:1</strong>（通常テキスト）、<strong>3:1</strong>（大きいテキスト18px以上）
                </Text>
                <Text variant="body-small" className={css({ color: "contents.secondary", mb: 2 })}>
                  ほとんどのWebサイトが目指すべき標準レベル。法律や規制で要求されることが多い（米国のADA、欧州のEAA、日本のJIS X 8341-3など）。
                </Text>
                <div className={css({
                  mt: 3,
                  pt: 3,
                  borderTopWidth: "thin",
                  borderTopStyle: "solid",
                  borderTopColor: "border.default",
                })}>
                  <Text variant="body-small" bold className={css({ color: "blue.800", mb: 1 })}>
                    レベルAに加えて：
                  </Text>
                  <ul className={css({
                    margin: 0,
                    pl: 5,
                    fontSize: "sm",
                    lineHeight: "relaxed",
                    color: "contents.secondary",
                  })}>
                    <li>十分なカラーコントラスト（4.5:1以上）</li>
                    <li>テキストのリサイズ（200%まで拡大可能）</li>
                    <li>キーボードフォーカスの視覚的表示</li>
                    <li>明確な見出し構造（h1-h6）</li>
                    <li>フォームのエラー識別と説明</li>
                  </ul>
                </div>
              </div>

              <div className={css({
                p: 4,
                bg: "bg.primary",
                rounded: "md",
                borderWidth: "base",
                borderStyle: "solid",
                borderColor: "green.400",
              })}>
                <Text variant="h6" className={css({ color: "green.700", mb: 2 })}>
                  レベルAAA（最高）
                </Text>
                <Text variant="body-small" className={css({ color: "contents.secondary", mb: 2 })}>
                  コントラスト比: <strong>7:1</strong>（通常テキスト）、<strong>4.5:1</strong>（大きいテキスト18px以上）
                </Text>
                <Text variant="body-small" className={css({ color: "contents.secondary", mb: 2 })}>
                  最も厳格なアクセシビリティ基準。公共機関、医療、金融、教育機関などで推奨。
                  <strong>すべてのコンテンツでAAA達成は現実的でない場合が多い</strong>ため、重要な部分に適用することが推奨される。
                </Text>
                <div className={css({
                  mt: 3,
                  pt: 3,
                  borderTopWidth: "thin",
                  borderTopStyle: "solid",
                  borderTopColor: "border.default",
                })}>
                  <Text variant="body-small" bold className={css({ color: "green.800", mb: 1 })}>
                    レベルAAに加えて：
                  </Text>
                  <ul className={css({
                    margin: 0,
                    pl: 5,
                    fontSize: "sm",
                    lineHeight: "relaxed",
                    color: "contents.secondary",
                  })}>
                    <li>非常に高いコントラスト比（7:1以上）</li>
                    <li>音声のみのコンテンツに代替テキストを提供</li>
                    <li>手話動画の提供</li>
                    <li>より広い行間隔（1.5倍以上）</li>
                    <li>専門用語の説明や読み方の提供</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        <div className={css({
          mt: 4,
          p: 3,
          bg: "bg.secondary",
          rounded: "md",
          borderWidth: "base",
          borderStyle: "solid",
          borderColor: "border.warning",
        })}>
            <Text variant="body-small" bold className={css({ color: "contents.primary" })}>
              💡 実用的な選び方
            </Text>
            <ul className={css({ margin: "0.5rem 0 0 0", pl: 5, fontSize: "sm", lineHeight: "relaxed", color: "contents.primary" })}>
              <li><strong>一般的なWebサイト</strong>: AA を目指す</li>
              <li><strong>公共サービス、医療、金融</strong>: AAA を検討</li>
              <li><strong>最低限</strong>: A は避け、少なくとも AA を満たす</li>
            </ul>
          </div>
        </div>

        <div className={css({
          mt: 8,
          p: 4,
          bg: "bg.secondary",
          rounded: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
        })}>
          <h4 className={css({ color: "contents.primary", mt: 0 })}>
            💡 Textコンポーネントの特徴
          </h4>
          <ul className={css({ color: "contents.primary", lineHeight: "relaxed" })}>
            <li><strong>タイポグラフィトークン</strong>: デザインシステムの一貫性を保つ</li>
            <li><strong>セマンティックHTML</strong>: variantに応じて適切なHTML要素を自動選択</li>
            <li><strong>柔軟なカスタマイズ</strong>: as propでHTML要素を上書き可能</li>
            <li><strong>アクセシブルな色</strong>: デフォルトで適切なコントラスト比を提供</li>
            <li><strong>レスポンシブ対応</strong>: rem単位でユーザーの設定を尊重</li>
          </ul>
        </div>
      </section>

      <section
        id="breadcrumbs-component"
        className={sectionStyle}
      >
        <h2         className={sectionHeading}>
          <icons.component.navigation size={28} className={css({ color: "blue.600" })} strokeWidth={2} />
          Breadcrumbs コンポーネント
        </h2>
        <p className={sectionDescription}>
          パンくずリスト（Breadcrumbs）は、ユーザーが現在いる場所を示すナビゲーション要素です。
          Webサイトの階層構造を視覚的に表示し、ユーザーが簡単に上位階層へ戻ることができます。
        </p>

        <div className={css({ mt: 6 })}>
          <SectionHeading>基本的な使い方</SectionHeading>
          <div className={css({
            p: 4,
            bg: "bg.tertiary",
            rounded: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            maxW: "full",
            overflowX: "hidden",
            boxSizing: "border-box",
          })}>
            <Breadcrumbs>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/category">カテゴリ</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrent>現在のページ</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumbs>
          </div>
        </div>

        <div className={css({ mt: 8 })}>
          <SectionHeading>階層の深いナビゲーション</SectionHeading>
          <div className={css({
            p: 4,
            bg: "bg.tertiary",
            rounded: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
            maxW: "full",
            overflowX: "hidden",
            boxSizing: "border-box",
          })}>
            <Breadcrumbs>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">商品一覧</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products/electronics">電化製品</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products/electronics/computers">コンピューター</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrent>ノートパソコン</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumbs>
          </div>
        </div>

        <div className={css({
          mt: 8,
          p: 4,
          bg: "bg.secondary",
          rounded: "md",
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border.default",
        })}>
          <h4 className={css({ color: "contents.primary", mt: 0 })}>
            💡 Breadcrumbsの特徴
          </h4>
          <ul className={css({ color: "contents.primary", lineHeight: "relaxed" })}>
            <li><strong>セマンティックHTML</strong>: &lt;nav aria-label="パンくずリスト"&gt;でアクセシブル</li>
            <li><strong>構造化マークアップ</strong>: &lt;ol&gt;と&lt;li&gt;でリスト構造を明示</li>
            <li><strong>aria-current="page"</strong>: 現在のページを支援技術に明示</li>
            <li><strong>視覚的セパレーター</strong>: SVGアイコンでリンク間を区切り</li>
            <li><strong>キーボード操作対応</strong>: Tabキーでフォーカス移動可能</li>
            <li><strong>フォーカススタイル</strong>: キーボード操作時にわかりやすいフォーカス表示</li>
            <li><strong>ホバースタイル</strong>: マウス操作時の視覚的フィードバック</li>
          </ul>
        </div>
      </section>
    </>
  );
}

// Checkbox Section Component
function CheckboxSection() {
  const [agree, setAgree] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [parent, setParent] = useState(false);
  const [children, setChildren] = useState({ child1: false, child2: false, child3: false });

  const allChecked = children.child1 && children.child2 && children.child3;
  const someChecked = (children.child1 || children.child2 || children.child3) && !allChecked;

  const handleParentChange = (checked: boolean) => {
    setParent(checked);
    setChildren({ child1: checked, child2: checked, child3: checked });
  };

  const handleChildChange = (key: keyof typeof children, checked: boolean) => {
    const newChildren = { ...children, [key]: checked };
    setChildren(newChildren);
    setParent(newChildren.child1 && newChildren.child2 && newChildren.child3);
  };

  return (
    <>
      <div className={css({ mt: 6 })}>
        <SectionHeading>基本的な使い方</SectionHeading>
        <Checkbox
          label="利用規約に同意する"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
      </div>

      <div className={css({ mt: 8 })}>
        <SectionHeading>ヘルプテキスト付き</SectionHeading>
        <Checkbox
          label="ニュースレターを購読する"
          helpText="最新情報やお得な情報をお届けします"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
      </div>

      <div className={css({ mt: 8 })}>
        <SectionHeading>親子チェックボックス</SectionHeading>
        <div className={cx(flexColumn, css({ gap: 3 }))}>
          <Checkbox
            label="すべて選択"
            checked={parent}
            indeterminate={someChecked}
            onChange={(e) => handleParentChange(e.target.checked)}
          />
          <div className={cx(flexColumn, css({ ml: 8, gap: 2 }))}>
            <Checkbox
              label="項目1"
              checked={children.child1}
              onChange={(e) => handleChildChange("child1", e.target.checked)}
            />
            <Checkbox
              label="項目2"
              checked={children.child2}
              onChange={(e) => handleChildChange("child2", e.target.checked)}
            />
            <Checkbox
              label="項目3"
              checked={children.child3}
              onChange={(e) => handleChildChange("child3", e.target.checked)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Radio Section Component
function RadioSection() {
  const [color, setColor] = useState("red");
  const [shipping, setShipping] = useState("standard");

  return (
    <>
      <div className={css({ mt: 6 })}>
        <SectionHeading>基本的な使い方</SectionHeading>
        <RadioGroup label="お好きな色を選択してください">
          <Radio
            label="赤"
            name="color"
            value="red"
            checked={color === "red"}
            onChange={(e) => setColor(e.target.value)}
          />
          <Radio
            label="青"
            name="color"
            value="blue"
            checked={color === "blue"}
            onChange={(e) => setColor(e.target.value)}
          />
          <Radio
            label="緑"
            name="color"
            value="green"
            checked={color === "green"}
            onChange={(e) => setColor(e.target.value)}
          />
        </RadioGroup>
      </div>

      <div className={css({ mt: 8 })}>
        <SectionHeading>ヘルプテキスト付き</SectionHeading>
        <RadioGroup
          label="配送方法を選択してください"
          helpText="配送料金は配送方法によって異なります"
        >
          <Radio
            label="通常配送（3-5営業日）"
            name="shipping"
            value="standard"
            helpText="送料無料"
            checked={shipping === "standard"}
            onChange={(e) => setShipping(e.target.value)}
          />
          <Radio
            label="速達配送（1-2営業日）"
            name="shipping"
            value="express"
            helpText="送料 500円"
            checked={shipping === "express"}
            onChange={(e) => setShipping(e.target.value)}
          />
        </RadioGroup>
      </div>
    </>
  );
}

// TextArea Section Component
function TextAreaSection() {
  const [comment, setComment] = useState("");
  const [review, setReview] = useState("");
  const [tweet, setTweet] = useState("");

  return (
    <>
      <div className={css({ mt: 6 })}>
        <SectionHeading>基本的な使い方</SectionHeading>
        <div className={css({ maxW: "600px" })}>
          <TextArea
            label="コメント"
            placeholder="コメントを入力してください"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>

      <div className={css({ mt: 8 })}>
        <SectionHeading>ヘルプテキスト付き</SectionHeading>
        <div className={css({ maxW: "600px" })}>
          <TextArea
            label="レビュー"
            helpText="商品の感想をお聞かせください"
            placeholder="レビューを入力してください"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
      </div>

      <div className={css({ mt: 8 })}>
        <SectionHeading>文字数カウント付き</SectionHeading>
        <div className={css({ maxW: "600px" })}>
          <TextArea
            label="ツイート"
            showCount
            maxLength={280}
            placeholder="いまどうしてる？"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

// Loading Section Component
function LoadingSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  return (
    <>
      <div className={css({ mt: 6 })}>
        <SectionHeading>サイズバリエーション</SectionHeading>
        <div className={css({ display: "flex", alignItems: "center", gap: 8 })}>
          <Loading size="sm" label="Small" />
          <Loading size="md" label="Medium" />
          <Loading size="lg" label="Large" />
          <Loading size="xl" label="XLarge" />
        </div>
      </div>

      <div className={css({ mt: 8 })}>
        <SectionHeading>インラインローディング</SectionHeading>
        <div className={cx(flexColumn, css({ gap: 3 }))}>
          <div className={css({ fontSize: "sm", display: "flex", alignItems: "center", gap: 2 })}>
            <InlineLoading size="sm" color="primary" />
            <span>データを読み込んでいます...</span>
          </div>
          <div className={css({ fontSize: "base", display: "flex", alignItems: "center", gap: 2 })}>
            <InlineLoading size="md" color="primary" />
            <span>処理中です...</span>
          </div>
        </div>
      </div>

      <div className={css({ mt: 8 })}>
        <SectionHeading>ボタン内でのローディング</SectionHeading>
        <Button
          onClick={() => {
            setIsButtonLoading(true);
            setTimeout(() => setIsButtonLoading(false), 2000);
          }}
          disabled={isButtonLoading}
        >
          {isButtonLoading ? (
            <span className={css({ display: "flex", alignItems: "center", gap: 2 })}>
              <InlineLoading size="sm" color="primary" />
              送信中...
            </span>
          ) : (
            "送信"
          )}
        </Button>
      </div>

      <div className={css({ mt: 8 })}>
        <SectionHeading>フルスクリーンオーバーレイ</SectionHeading>
        <Button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 3000);
          }}
        >
          ローディングを表示（3秒間）
        </Button>
        {isLoading && <Loading fullscreen label="データを読み込んでいます..." />}
      </div>
    </>
  );
}
