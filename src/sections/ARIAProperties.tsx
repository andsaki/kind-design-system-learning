import { Button, Accordion, AccordionSummary, AccordionContent } from "../design-system/components";
import { CodeBlock } from "../components/CodeBlock";
import { spacing, typography, radii, icons, borders } from "../design-system/tokens";
import { primitive } from "../design-system/tokens/colors";

export const ARIAProperties = () => {

  return (
    <section
      id="aria-properties"
      style={{
        marginBottom: spacing.scale[12],
        padding: spacing.scale[6],
        backgroundColor: primitive.white,
        borderRadius: radii.borderRadius.lg,
        border: borders.default,
        maxWidth: '100%',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <h2 style={{
        marginTop: 0,
        color: primitive.gray[900],
        fontSize: typography.fontSize['2xl'],
        fontWeight: 'bold',
        borderBottom: `${borders.width.thick} solid ${primitive.pink[500]}`,
        paddingBottom: spacing.scale[2],
        marginBottom: spacing.scale[6],
        display: 'flex',
        alignItems: 'center',
        gap: spacing.scale[2]
      }}>
        <icons.concept.wcag size={28} color={primitive.pink[600]} strokeWidth={2} />
        WAI-ARIA 主要プロパティ
      </h2>

      <p style={{
        color: primitive.gray[700],
        marginBottom: spacing.scale[6],
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.relaxed
      }}>
        WAI-ARIAの4つの主要プロパティ（Name、Role、Description、Expanded）について、実装例とともに解説します。
      </p>

      {/* Name プロパティ */}
      <div style={{
        marginBottom: spacing.scale[8],
        padding: spacing.scale[6],
        backgroundColor: primitive.pink[50],
        borderRadius: radii.borderRadius.lg,
        border: `${borders.width.base} solid ${primitive.pink[200]}`,
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: spacing.scale[4],
          color: primitive.pink[900],
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale[2]
        }}>
          <span style={{ fontSize: typography.fontSize['2xl'] }}>🏷️</span>
          1. Name（名前）プロパティ
        </h3>

        <p style={{
          color: primitive.gray[700],
          marginBottom: spacing.scale[4],
          lineHeight: typography.lineHeight.relaxed
        }}>
          要素に読み上げられる名前を付与し、要素の目的を明確に伝えます。
        </p>

        <div style={{ display: 'grid', gap: spacing.scale[4] }}>
          {/* aria-label */}
          <div style={{
            padding: spacing.scale[4],
            backgroundColor: primitive.white,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.thin} solid ${primitive.pink[200]}`,
          }}>
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.pink[900],
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
            }}>
              aria-label
            </h4>
            <p style={{ color: primitive.gray[700], marginBottom: spacing.scale[3] }}>
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

            <div style={{
              marginTop: spacing.scale[4],
              display: 'flex',
              gap: spacing.scale[3],
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <Button
                aria-label="設定を開く"
                icon={<icons.component.button size={16} />}
                variant="outline"
                size="sm"
              />
              <span style={{ fontSize: typography.fontSize.sm, color: primitive.gray[600] }}>
                ← aria-label="設定を開く" を使用
              </span>
            </div>
          </div>

          {/* aria-labelledby */}
          <div style={{
            padding: spacing.scale[4],
            backgroundColor: primitive.white,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.thin} solid ${primitive.pink[200]}`,
          }}>
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.pink[900],
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
            }}>
              aria-labelledby
            </h4>
            <p style={{ color: primitive.gray[700], marginBottom: spacing.scale[3] }}>
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

          <div style={{
            padding: spacing.scale[3],
            backgroundColor: primitive.yellow,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.base} solid ${primitive.black}`,
            fontSize: typography.fontSize.sm,
            color: primitive.gray[900],
          }}>
            <strong>💡 使用場面:</strong> アイコンのみのボタン、モーダルのタイトル参照、セクション見出しとの関連付け
          </div>
        </div>
      </div>

      {/* Role プロパティ */}
      <div style={{
        marginBottom: spacing.scale[8],
        padding: spacing.scale[6],
        backgroundColor: primitive.blue[50],
        borderRadius: radii.borderRadius.lg,
        border: `${borders.width.base} solid ${primitive.blue[200]}`,
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: spacing.scale[4],
          color: primitive.blue[900],
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale[2]
        }}>
          <span style={{ fontSize: typography.fontSize['2xl'] }}>🎭</span>
          2. Role（役割）プロパティ
        </h3>

        <p style={{
          color: primitive.gray[700],
          marginBottom: spacing.scale[4],
          lineHeight: typography.lineHeight.relaxed
        }}>
          要素が何であるかを支援技術に伝えます。
        </p>

        <div style={{ display: 'grid', gap: spacing.scale[4] }}>
          {/* 主要なロール一覧 */}
          <div style={{
            padding: spacing.scale[4],
            backgroundColor: primitive.white,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.thin} solid ${primitive.blue[200]}`,
          }}>
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.blue[900],
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
            }}>
              主要なロール
            </h4>

            <div style={{ display: 'grid', gap: spacing.scale[3] }}>
              <div style={{
                padding: spacing.scale[3],
                backgroundColor: primitive.blue[50],
                borderRadius: radii.borderRadius.sm,
              }}>
                <code style={{
                  color: primitive.blue[800],
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.base
                }}>
                  role="button"
                </code>
                <p style={{ margin: `${spacing.scale[2]} 0 0 0`, color: primitive.gray[700], fontSize: typography.fontSize.sm }}>
                  ボタンとして機能（可能な限り &lt;button&gt; を使用）
                </p>
              </div>

              <div style={{
                padding: spacing.scale[3],
                backgroundColor: primitive.blue[50],
                borderRadius: radii.borderRadius.sm,
              }}>
                <code style={{
                  color: primitive.blue[800],
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.base
                }}>
                  role="dialog"
                </code>
                <p style={{ margin: `${spacing.scale[2]} 0 0 0`, color: primitive.gray[700], fontSize: typography.fontSize.sm }}>
                  モーダルダイアログ（aria-modal="true" と組み合わせる）
                </p>
              </div>

              <div style={{
                padding: spacing.scale[3],
                backgroundColor: primitive.blue[50],
                borderRadius: radii.borderRadius.sm,
              }}>
                <code style={{
                  color: primitive.blue[800],
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.base
                }}>
                  role="navigation"
                </code>
                <p style={{ margin: `${spacing.scale[2]} 0 0 0`, color: primitive.gray[700], fontSize: typography.fontSize.sm }}>
                  ナビゲーション領域（&lt;nav&gt; は暗黙的にこのroleを持つ）
                </p>
              </div>

              <div style={{
                padding: spacing.scale[3],
                backgroundColor: primitive.blue[50],
                borderRadius: radii.borderRadius.sm,
              }}>
                <code style={{
                  color: primitive.blue[800],
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.base
                }}>
                  role="alert"
                </code>
                <p style={{ margin: `${spacing.scale[2]} 0 0 0`, color: primitive.gray[700], fontSize: typography.fontSize.sm }}>
                  重要な即時通知（エラーメッセージ、警告）
                </p>
              </div>

              <div style={{
                padding: spacing.scale[3],
                backgroundColor: primitive.blue[50],
                borderRadius: radii.borderRadius.sm,
              }}>
                <code style={{
                  color: primitive.blue[800],
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.base
                }}>
                  role="tooltip"
                </code>
                <p style={{ margin: `${spacing.scale[2]} 0 0 0`, color: primitive.gray[700], fontSize: typography.fontSize.sm }}>
                  ツールチップ（aria-describedby で参照）
                </p>
              </div>
            </div>
          </div>

          {/* 実装例 */}
          <div style={{
            padding: spacing.scale[4],
            backgroundColor: primitive.white,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.thin} solid ${primitive.blue[200]}`,
          }}>
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.blue[900],
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
            }}>
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

          <div style={{
            padding: spacing.scale[3],
            backgroundColor: primitive.yellow,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.base} solid ${primitive.black}`,
            fontSize: typography.fontSize.sm,
            color: primitive.gray[900],
          }}>
            <strong>💡 ARIAの第一原則:</strong> まずは<strong>セマンティックHTML</strong>（&lt;button&gt;、&lt;nav&gt;、&lt;main&gt;）を使いましょう。ARIAはHTMLで実現できない場合の補完として使用します。
          </div>
        </div>
      </div>

      {/* Description プロパティ */}
      <div style={{
        marginBottom: spacing.scale[8],
        padding: spacing.scale[6],
        backgroundColor: primitive.green[50],
        borderRadius: radii.borderRadius.lg,
        border: `${borders.width.base} solid ${primitive.green[200]}`,
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: spacing.scale[4],
          color: primitive.green[900],
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale[2]
        }}>
          <span style={{ fontSize: typography.fontSize['2xl'] }}>📝</span>
          3. Description（説明）プロパティ
        </h3>

        <p style={{
          color: primitive.gray[700],
          marginBottom: spacing.scale[4],
          lineHeight: typography.lineHeight.relaxed
        }}>
          要素の補足情報を提供します。
        </p>

        <div style={{ display: 'grid', gap: spacing.scale[4] }}>
          {/* aria-describedby */}
          <div style={{
            padding: spacing.scale[4],
            backgroundColor: primitive.white,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.thin} solid ${primitive.green[200]}`,
          }}>
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.green[900],
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
            }}>
              aria-describedby
            </h4>
            <p style={{ color: primitive.gray[700], marginBottom: spacing.scale[3] }}>
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
          <div style={{
            padding: spacing.scale[4],
            backgroundColor: primitive.white,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.thin} solid ${primitive.green[200]}`,
          }}>
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.green[900],
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
            }}>
              スクリーンリーダーの読み上げ比較
            </h4>

            <div style={{
              padding: spacing.scale[3],
              backgroundColor: primitive.red[50],
              borderRadius: radii.borderRadius.sm,
              marginBottom: spacing.scale[3],
              border: `${borders.width.thin} solid ${primitive.red[200]}`,
            }}>
              <strong style={{ color: primitive.red[900] }}>❌ aria-describedby なし:</strong>
              <p style={{
                margin: `${spacing.scale[2]} 0 0 0`,
                color: primitive.gray[700],
                fontStyle: 'italic',
                fontSize: typography.fontSize.sm
              }}>
                "メールアドレス 編集可能"
              </p>
            </div>

            <div style={{
              padding: spacing.scale[3],
              backgroundColor: primitive.green[50],
              borderRadius: radii.borderRadius.sm,
              border: `${borders.width.thin} solid ${primitive.green[300]}`,
            }}>
              <strong style={{ color: primitive.green[900] }}>✅ aria-describedby あり:</strong>
              <p style={{
                margin: `${spacing.scale[2]} 0 0 0`,
                color: primitive.gray[700],
                fontStyle: 'italic',
                fontSize: typography.fontSize.sm
              }}>
                "メールアドレス 無効 編集可能 無効なメールアドレス"
              </p>
            </div>
          </div>

          <div style={{
            padding: spacing.scale[3],
            backgroundColor: primitive.yellow,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.base} solid ${primitive.black}`,
            fontSize: typography.fontSize.sm,
            color: primitive.gray[900],
          }}>
            <strong>💡 使用場面:</strong> フォームのヘルプテキスト、エラーメッセージ、ツールチップの参照、補足説明が必要な要素
          </div>
        </div>
      </div>

      {/* Expanded プロパティ */}
      <div style={{
        marginBottom: spacing.scale[6],
        padding: spacing.scale[6],
        backgroundColor: primitive.orange[50],
        borderRadius: radii.borderRadius.lg,
        border: `${borders.width.base} solid ${primitive.orange[200]}`,
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: spacing.scale[4],
          color: primitive.orange[900],
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale[2]
        }}>
          <span style={{ fontSize: typography.fontSize['2xl'] }}>📊</span>
          4. Expanded（展開状態）プロパティ
        </h3>

        <p style={{
          color: primitive.gray[700],
          marginBottom: spacing.scale[4],
          lineHeight: typography.lineHeight.relaxed
        }}>
          要素の展開/折りたたみ状態を動的に伝えます。
        </p>

        <div style={{ display: 'grid', gap: spacing.scale[4] }}>
          {/* aria-expanded */}
          <div style={{
            padding: spacing.scale[4],
            backgroundColor: primitive.white,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.thin} solid ${primitive.orange[200]}`,
          }}>
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.orange[900],
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
            }}>
              aria-expanded
            </h4>
            <p style={{ color: primitive.gray[700], marginBottom: spacing.scale[3] }}>
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

            <div style={{
              marginTop: spacing.scale[4],
              padding: spacing.scale[3],
              backgroundColor: primitive.orange[50],
              borderRadius: radii.borderRadius.sm,
              fontSize: typography.fontSize.sm,
            }}>
              <strong style={{ color: primitive.orange[900] }}>値の種類:</strong>
              <ul style={{ marginTop: spacing.scale[2], marginBottom: 0, color: primitive.gray[700] }}>
                <li><code>aria-expanded="true"</code>: 展開中</li>
                <li><code>aria-expanded="false"</code>: 折りたたみ中</li>
                <li>未指定: 展開/折りたたみ機能なし</li>
              </ul>
            </div>
          </div>

          {/* 実装例（アコーディオン） */}
          <div style={{
            padding: spacing.scale[4],
            backgroundColor: primitive.white,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.thin} solid ${primitive.orange[200]}`,
          }}>
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.orange[900],
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
            }}>
              実装例（アコーディオン）
            </h4>

            <Accordion>
              <AccordionSummary>
                クリックして展開/折りたたみ（aria-expandedが自動で切り替わります）
              </AccordionSummary>
              <AccordionContent>
                <p style={{ margin: 0, color: primitive.gray[700] }}>
                  このコンテンツの表示状態が aria-expanded で伝えられます。
                  スクリーンリーダーは「展開されています」または「折りたたまれています」と読み上げます。
                </p>
              </AccordionContent>
            </Accordion>

            <div style={{
              marginTop: spacing.scale[4],
              padding: spacing.scale[3],
              backgroundColor: primitive.blue[50],
              borderRadius: radii.borderRadius.sm,
              fontSize: typography.fontSize.sm,
            }}>
              <strong style={{ color: primitive.blue[900] }}>スクリーンリーダーの読み上げ:</strong>
              <ul style={{ marginTop: spacing.scale[2], marginBottom: 0, color: primitive.gray[700] }}>
                <li>折りたたみ時: "セクションタイトル ボタン 折りたたまれています"</li>
                <li>展開時: "セクションタイトル ボタン 展開されています"</li>
              </ul>
            </div>
          </div>

          <div style={{
            padding: spacing.scale[3],
            backgroundColor: primitive.yellow,
            borderRadius: radii.borderRadius.md,
            border: `${borders.width.base} solid ${primitive.black}`,
            fontSize: typography.fontSize.sm,
            color: primitive.gray[900],
          }}>
            <strong>💡 使用場面:</strong> アコーディオン、ドロップダウンメニュー、展開可能なナビゲーション、ツリービュー、コンボボックス
          </div>
        </div>
      </div>

      {/* まとめ */}
      <div style={{
        padding: spacing.scale[6],
        backgroundColor: primitive.blue[50],
        borderRadius: radii.borderRadius.lg,
        border: `${borders.width.base} solid ${primitive.blue[200]}`,
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: spacing.scale[4],
          color: primitive.blue[900],
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.scale[2]
        }}>
          <span style={{ fontSize: typography.fontSize['2xl'] }}>📚</span>
          プロパティの組み合わせ例
        </h3>

        <div style={{ display: 'grid', gap: spacing.scale[4] }}>
          {/* モーダルダイアログ */}
          <div>
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.blue[900],
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
            }}>
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
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.blue[900],
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
            }}>
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
            <h4 style={{
              marginTop: 0,
              marginBottom: spacing.scale[3],
              color: primitive.blue[900],
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
            }}>
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
