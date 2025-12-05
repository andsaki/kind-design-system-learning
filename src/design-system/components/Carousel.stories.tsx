import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { css } from '@/styled-system/css';

/**
 * アクセシブルなカルーセルコンポーネント
 *
 * WCAG 2.1 AA準拠のカルーセルコンポーネントです。
 * キーボード操作、スクリーンリーダー対応、自動再生制御を備えています。
 */
const meta = {
  title: 'Design System/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'button-name',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    slides: {
      description: 'カルーセルに表示するスライドの配列',
    },
    autoPlay: {
      control: 'boolean',
      description: '自動再生を有効にするか',
    },
    autoPlayInterval: {
      control: 'number',
      description: '自動再生の間隔（ミリ秒）',
    },
    showIndicators: {
      control: 'boolean',
      description: 'インジケーターを表示するか',
    },
    showControls: {
      control: 'boolean',
      description: 'ナビゲーションボタンを表示するか',
    },
    slideHeight: {
      control: 'number',
      description: 'スライドの高さ（px）',
    },
    aspectRatio: {
      control: 'text',
      description: 'スライドのアスペクト比（例: "16/9"）',
    },
    ariaLabel: {
      control: 'text',
      description: 'カルーセルのアクセシブルな名前',
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSlides = [
  {
    id: 1,
    title: 'スライド 1',
    content: (
      <div className={css({ textAlign: 'center', width: '100%' })}>
        <div className={css({ fontSize: '6xl', marginBottom: 4 })}>🏔️</div>
        <h3 className={css({ margin: 0, fontSize: 'xl', fontWeight: 'semibold', color: 'contents.primary' })}>
          美しい山々
        </h3>
        <p className={css({ margin: 0, fontSize: 'sm', color: 'contents.secondary', marginTop: 2 })}>
          雄大な自然の風景
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: 'スライド 2',
    content: (
      <div className={css({ textAlign: 'center', width: '100%' })}>
        <div className={css({ fontSize: '6xl', marginBottom: 4 })}>🌃</div>
        <h3 className={css({ margin: 0, fontSize: 'xl', fontWeight: 'semibold', color: 'contents.primary' })}>
          都市の夜景
        </h3>
        <p className={css({ margin: 0, fontSize: 'sm', color: 'contents.secondary', marginTop: 2 })}>
          きらめく街の光
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: 'スライド 3',
    content: (
      <div className={css({ textAlign: 'center', width: '100%' })}>
        <div className={css({ fontSize: '6xl', marginBottom: 4 })}>🌲</div>
        <h3 className={css({ margin: 0, fontSize: 'xl', fontWeight: 'semibold', color: 'contents.primary' })}>
          森の小道
        </h3>
        <p className={css({ margin: 0, fontSize: 'sm', color: 'contents.secondary', marginTop: 2 })}>
          静寂な自然の中
        </p>
      </div>
    ),
  },
  {
    id: 4,
    title: 'スライド 4',
    content: (
      <div className={css({ textAlign: 'center', width: '100%' })}>
        <div className={css({ fontSize: '6xl', marginBottom: 4 })}>🌅</div>
        <h3 className={css({ margin: 0, fontSize: 'xl', fontWeight: 'semibold', color: 'contents.primary' })}>
          夕焼けのビーチ
        </h3>
        <p className={css({ margin: 0, fontSize: 'sm', color: 'contents.secondary', marginTop: 2 })}>
          美しい夕日の景色
        </p>
      </div>
    ),
  },
];

/**
 * 基本的なカルーセル
 *
 * デフォルト設定のカルーセルです。
 */
export const Default: Story = {
  args: {
    slides: sampleSlides,
    ariaLabel: '画像カルーセル',
  },
};

/**
 * 自動再生
 *
 * スライドが自動的に切り替わります。
 * 再生/一時停止ボタンでコントロールできます。
 */
export const AutoPlay: Story = {
  args: {
    slides: sampleSlides,
    autoPlay: true,
    autoPlayInterval: 3000,
    ariaLabel: '自動再生カルーセル',
  },
};

/**
 * コントロール非表示
 *
 * ナビゲーションボタンを非表示にします。
 * キーボード操作は引き続き使用できます。
 */
export const WithoutControls: Story = {
  args: {
    slides: sampleSlides,
    showControls: false,
    ariaLabel: 'シンプルなカルーセル',
  },
};

/**
 * インジケーター非表示
 *
 * スライドインジケーターを非表示にします。
 */
export const WithoutIndicators: Story = {
  args: {
    slides: sampleSlides,
    showIndicators: false,
    ariaLabel: 'インジケーターなしカルーセル',
  },
};

/**
 * 高さ指定
 *
 * スライドの高さを固定します。
 * 画像などを使用する場合に推奨です。
 */
export const WithHeight: Story = {
  args: {
    slides: sampleSlides,
    slideHeight: 400,
    ariaLabel: '高さ固定カルーセル',
  },
};

/**
 * アスペクト比指定
 *
 * スライドのアスペクト比を指定します。
 */
export const WithAspectRatio: Story = {
  args: {
    slides: sampleSlides,
    aspectRatio: '16/9',
    ariaLabel: 'アスペクト比指定カルーセル',
  },
};

/**
 * 2枚のスライド
 *
 * スライドが2枚だけの場合の動作を確認できます。
 */
export const TwoSlides: Story = {
  args: {
    slides: sampleSlides.slice(0, 2),
    ariaLabel: '2枚スライドカルーセル',
  },
};

/**
 * キーボード操作ガイド
 *
 * カルーセルのキーボード操作方法を示します。
 *
 * ## 操作方法
 * - **←/→**: 前後のスライドへ移動
 * - **Home**: 最初のスライドへ
 * - **End**: 最後のスライドへ
 * - **Tab**: インジケーターやボタンへフォーカス移動
 * - **スワイプ**: タッチデバイスでスライドを切り替え
 */
export const KeyboardInteraction: Story = {
  args: {
    slides: sampleSlides,
    ariaLabel: 'キーボード操作デモ',
  },
  render: (args) => (
    <div>
      <div style={{
        padding: '1rem',
        backgroundColor: '#eff6ff',
        borderRadius: '8px',
        marginBottom: '1rem',
        borderLeft: '4px solid #3b82f6'
      }}>
        <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: 'bold' }}>
          ⌨️ キーボード操作
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '14px', lineHeight: '1.8' }}>
          <li><strong>←/→</strong>: 前後のスライドへ移動</li>
          <li><strong>Home</strong>: 最初のスライドへ</li>
          <li><strong>End</strong>: 最後のスライドへ</li>
          <li><strong>Tab</strong>: インジケーターやボタンへフォーカス移動</li>
          <li><strong>スワイプ</strong>: タッチデバイスでスライドを切り替え</li>
        </ul>
      </div>
      <Carousel {...args} />
    </div>
  ),
};

/**
 * アクセシビリティ機能
 *
 * カルーセルに実装されているアクセシビリティ機能の一覧です。
 */
export const AccessibilityFeatures: Story = {
  args: {
    slides: sampleSlides,
    ariaLabel: 'アクセシビリティデモ',
  },
  render: (args) => (
    <div>
      <div style={{
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: 'bold' }}>
          ✅ アクセシビリティ機能
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '14px', lineHeight: '1.8' }}>
          <li><code>role="region"</code> + <code>aria-roledescription="carousel"</code>: カルーセル領域を明示</li>
          <li><code>aria-label</code>: カルーセルの目的を説明</li>
          <li><code>role="group"</code> + <code>aria-roledescription="slide"</code>: 各スライドを識別</li>
          <li><code>aria-hidden="true"</code> + <code>tabindex="-1"</code>: 非表示スライドをスクリーンリーダーとTab順序から除外</li>
          <li><code>aria-current="true"</code>: 現在のインジケーターを示す</li>
          <li><code>aria-live="polite"</code>: スライド変更を通知</li>
          <li><strong>キーボード操作対応</strong>: 矢印キー、Home/Endキー</li>
          <li><strong>タッチ操作対応</strong>: スワイプジェスチャー</li>
          <li><strong>自動再生制御</strong>: ユーザーが制御できる再生/一時停止ボタン</li>
        </ul>
      </div>
      <Carousel {...args} />
    </div>
  ),
};

/**
 * ベストプラクティス
 *
 * カルーセル実装時の推奨事項です。
 */
export const BestPractices: Story = {
  args: {
    slides: sampleSlides,
    ariaLabel: 'ベストプラクティスデモ',
  },
  render: (args) => (
    <div>
      <div style={{
        padding: '1rem',
        backgroundColor: '#fef9c3',
        borderRadius: '8px',
        marginBottom: '1rem',
        border: '1px solid #facc15'
      }}>
        <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: 'bold', color: '#713f12' }}>
          💡 ベストプラクティス
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '14px', lineHeight: '1.8', color: '#713f12' }}>
          <li>自動再生はデフォルトでオフにし、ユーザーが制御できるようにする</li>
          <li>自動再生中でもキーボード操作で即座に停止できるようにする</li>
          <li>非表示のスライドには <code>aria-hidden="true"</code> と <code>tabindex="-1"</code> を付ける</li>
          <li>各スライドに意味のある <code>aria-label</code> を付ける</li>
          <li>ナビゲーションボタンには明確なラベルを付ける</li>
          <li>画像を使用する場合は <code>slideHeight</code> や <code>aspectRatio</code> を指定する</li>
          <li>画像には必ず適切な <code>alt</code> 属性を提供する</li>
        </ul>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#d1fae5',
        borderRadius: '8px',
        marginBottom: '1rem',
        border: '1px solid #10b981'
      }}>
        <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: 'bold', color: '#065f46' }}>
          ✨ tabindex="-1" が嬉しい理由
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '14px', lineHeight: '1.8', color: '#065f46' }}>
          <li><strong>キーボードユーザー体験向上</strong>: 非表示スライド内のボタン・リンクにTabで到達しない</li>
          <li><strong>フォーカストラップ回避</strong>: 無駄なTab移動を削減（例: 4スライド × 2ボタン = 8個 → 2個だけ）</li>
          <li><strong>論理的なTab順序</strong>: 表示中の要素だけにフォーカスが当たる</li>
          <li><strong>aria-hidden補完</strong>: スクリーンリーダーとキーボード操作の一貫性</li>
        </ul>
        <div style={{
          marginTop: '0.75rem',
          padding: '0.75rem',
          backgroundColor: 'white',
          borderRadius: '4px',
          fontSize: '13px',
          color: '#065f46'
        }}>
          <strong>具体例:</strong> 各スライドに「詳細」「購入」「お気に入り」の3つのボタンがある場合
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.5rem' }}>
            <li>❌ <code>tabindex="-1"</code> なし: 12個のボタン全てにTab可能（4スライド × 3ボタン）</li>
            <li>✅ <code>tabindex="-1"</code> あり: 3個のボタンだけにTab可能（表示中のスライドのみ）</li>
          </ul>
        </div>
      </div>

      <Carousel {...args} />
    </div>
  ),
};
