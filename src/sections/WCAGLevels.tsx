import { accessibilityLevels } from "../design-system/constants/accessibility";
import { icons } from "../design-system/tokens/icons";
import { css, cx } from "@/styled-system/css";
import { token } from "@/styled-system/tokens";
import { SectionHeading } from "../components/SectionHeading";

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

const heroCardBase = css({
  p: 3,
  rounded: "md",
  borderWidth: "thin",
  borderStyle: "solid",
});

const heroCardWhite = css({ bg: "bg.primary" });
const heroCardBlue = css({ bg: "bg.secondary" });
const heroCardGrayBorder = css({ borderColor: "border.default" });
const heroCardBlueBorder = css({
  borderColor: "border.default",
  borderWidth: "base",
});
const heroCardOrangeBorder = css({ borderColor: "border.warning" });

const heroBannerClass = css({
  mt: 4,
  p: 3,
  bg: "bg.secondary",
  rounded: "md",
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "border.default",
});

const ratioListClass = css({
  margin: "0.5rem 0",
  pl: 6,
  lineHeight: "1.8",
  color: "contents.primary",
});

const ratioDemoClass = css({
  p: 2,
  mt: 2,
  rounded: "base",
  borderWidth: "base",
  borderStyle: "solid",
  borderColor: "border.default",
});

const ratioCardBase = css({
  p: 4,
  rounded: "base",
  borderWidth: "base",
  borderStyle: "solid",
});

const exampleStackClass = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  mt: 4,
});

const exampleCardClass = css({
  p: 4,
  rounded: "base",
});

const exampleLegendClass = css({
  fontSize: "sm",
});

const toolListClass = css({
  margin: "0.5rem 0",
  pl: 6,
  color: "contents.primary",
});

const linkClass = css({ color: "contents.link" });

export function WCAGLevels() {
  return (
    <section
      id="wcag-levels"
      className={cx("wcag-levels-section", sectionClass)}
    >
      <h2
        className={css({
          mt: 0,
          color: "contents.primary",
          fontSize: "2xl",
          fontWeight: "bold",
          borderBottomWidth: "thick",
          borderBottomStyle: "solid",
          borderBottomColor: "border.default",
          pb: 2,
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 2,
        })}
      >
        <icons.concept.wcag
          size={28}
          className={css({ color: "contents.primary" })}
          strokeWidth={2}
          aria-hidden="true"
        />
        WCAGレベルとコントラスト比について
      </h2>

      <div
        className={css({
          p: 6,
          bg: "bg.secondary",
          rounded: "lg",
          borderWidth: "thick",
          borderStyle: "solid",
          borderColor: "border.warning",
          mb: 8,
        })}
      >
        <h3
          className={css({
            mt: 0,
            mb: 3,
            color: "contents.primary",
            fontSize: "xl",
          })}
        >
          📚 WCAGレベル（A/AA/AAA）とは？
        </h3>
        <p
          className={css({
            lineHeight: "1.8",
            color: "contents.primary",
            mb: 4,
          })}
        >
          WCAG（Web Content Accessibility
          Guidelines）は、Webコンテンツをアクセシブルにするための国際的なガイドラインです。
          3つのレベル（A/AA/AAA）で、達成すべきアクセシビリティの基準を定めています。
        </p>

        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: 3,
          })}
        >
          <div className={cx(heroCardBase, heroCardWhite, heroCardGrayBorder)}>
            <h4
              className={css({
                m: 0,
                mb: 1,
                color: "contents.primary",
                fontSize: "base",
              })}
            >
              🔹 レベルA（最低限）
            </h4>
            <p
              className={css({
                m: 0,
                lineHeight: "1.6",
                color: "contents.secondary",
                fontSize: "sm",
              })}
            >
              Webコンテンツの最低限のアクセシビリティレベル。これを満たさないと、多くのユーザーがコンテンツにアクセスできません。
              <strong>しかし、Aだけでは不十分です。</strong>
            </p>
          </div>

          <div className={cx(heroCardBase, heroCardBlue, heroCardBlueBorder)}>
            <h4
              className={css({
                m: 0,
                mb: 1,
                color: "contents.primary",
                fontSize: "base",
              })}
            >
              ⭐ レベルAA（推奨）- 実用的な標準
            </h4>
            <p
              className={css({
                m: 0,
                lineHeight: "1.6",
                color: "contents.primary",
                fontSize: "sm",
              })}
            >
              <strong>ほとんどのWebサイトで目指すべき標準レベルです。</strong>
              多くの国や組織で法的要件として採用されています。日本の公的機関も原則AAレベルを求めています。
              このデザインシステムもAAレベルを標準としています。
            </p>
          </div>

          <div
            className={cx(heroCardBase, heroCardWhite, heroCardOrangeBorder)}
          >
            <h4
              className={css({
                m: 0,
                mb: 1,
                color: "contents.primary",
                fontSize: "base",
              })}
            >
              🏆 レベルAAA（最高）
            </h4>
            <p
              className={css({
                m: 0,
                lineHeight: "1.6",
                color: "contents.secondary",
                fontSize: "sm",
              })}
            >
              最高レベルのアクセシビリティ。全てのコンテンツでAAAを達成するのは現実的ではありませんが、
              重要なコンテンツ（医療情報、法的文書など）では目指す価値があります。
            </p>
          </div>
        </div>

        <div className={cx(heroBannerClass)}>
          <p
            className={css({
              m: 0,
              lineHeight: "1.6",
              color: "contents.primary",
              fontSize: "sm",
              fontWeight: 600,
            })}
          >
            💡 このデザインシステムでは、全てのコンポーネントで
            <strong>レベルAA</strong>をデフォルトにしています。
            必要に応じてA/AAAも選択可能です。
          </p>
        </div>
      </div>

      <div className={css({ mt: 6 })}>
        <SectionHeading>コントラスト比とは？</SectionHeading>
        <div
          className={css({
            mt: 3,
            p: 3,
            bg: "bg.secondary",
            rounded: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          <p className={css({ lineHeight: "1.8", color: "contents.primary", m: 0 })}>
            コントラスト比は、テキストと背景の明るさの差を数値で表したものです。
            数値が大きいほど見やすく、小さいほど見にくくなります。
            <br />
            例: 黒文字 ({token("colors.black")}) と白背景 ({token("colors.white")}
            ) のコントラスト比は <strong>21:1</strong>（最大値）
          </p>
        </div>

        <div
          className={css({
            mt: 4,
            p: 4,
            bg: "bg.secondary",
            rounded: "base",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.default",
          })}
        >
          <h4
            className={css({
              mt: 0,
              mb: 2,
              color: "contents.primary",
            })}
          >
            📐 コントラスト比の計算方法
          </h4>
          <p
            className={css({
              margin: "0.5rem 0",
              lineHeight: "1.8",
              color: "contents.primary",
            })}
          >
            コントラスト比 = (明るい方の輝度 + 0.05) ÷ (暗い方の輝度 + 0.05)
          </p>
          <p
            className={css({
              margin: "0.5rem 0",
              fontSize: "sm",
              color: "contents.secondary",
            })}
          >
            ※ 輝度は0.0（完全な黒）〜 1.0（完全な白）の値
          </p>
          <div className={css({ mt: 3 })}>
            <p
              className={css({
                margin: "0.25rem 0",
                fontSize: "sm",
                color: "contents.primary",
              })}
            >
              <strong>例1: 白背景 + グレー文字 = 3:1</strong>
              <br />
              <span
                className={css({
                  fontSize: "xs",
                  color: "contents.secondary",
                })}
              >
                白(輝度1.0) ÷ グレー(輝度0.4) = (1.0+0.05)÷(0.4+0.05) ≈ 3:1
              </span>
            </p>
            <p
              className={css({
                margin: "0.25rem 0",
                fontSize: "sm",
                color: "contents.primary",
              })}
            >
              <strong>例2: 白背景 + 黒文字 = 21:1</strong>
              <br />
              <span
                className={css({
                  fontSize: "xs",
                  color: "contents.secondary",
                })}
              >
                白(輝度1.0) ÷ 黒(輝度0.0) = (1.0+0.05)÷(0.0+0.05) = 21:1（最大）
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className={cx(css({ mt: 8 }))}>
        <SectionHeading>WCAGレベルとコントラスト比の基準</SectionHeading>

        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: 6,
            mt: 4,
          })}
        >
          <div
            className={cx(
              ratioCardBase,
              css({
                bg: "bg.tertiary",
                borderColor: "border.default",
              })
            )}
          >
            <h4
              className={css({
                mt: 0,
                mb: 2,
                color: "contents.primary",
              })}
            >
              レベルA（最低限）
            </h4>
            <ul className={cx(ratioListClass)}>
              <li>
                <strong>大きいテキスト:</strong> 3:1 以上
              </li>
              <li>18px以上の通常テキスト、または14px以上の太字</li>
              <li>
                <div
                  className={cx(
                    ratioDemoClass,
                    css({
                      fontSize: "lg",
                      color: accessibilityLevels.contrastDemos.ratio3to1.text,
                      backgroundColor:
                        accessibilityLevels.contrastDemos.ratio3to1.background,
                    })
                  )}
                >
                  これが
                  {accessibilityLevels.contrastDemos.ratio3to1.actualRatio}
                  のコントラスト（18px）-{" "}
                  {accessibilityLevels.contrastDemos.ratio3to1.label}
                </div>
              </li>
              <li>⚠️ 通常サイズのテキストには基準なし</li>
              <li className={css({ color: "contents.error", fontWeight: 600 })}>
                ❌ 実用的ではありません。AAレベル以上を推奨
              </li>
            </ul>
          </div>

          <div
            className={cx(
              ratioCardBase,
              css({
                bg: "bg.secondary",
                borderColor: "border.default",
              })
            )}
          >
            <h4
              className={css({
                mt: 0,
                mb: 2,
                color: "contents.primary",
              })}
            >
              レベルAA（推奨）★
            </h4>
            <ul className={cx(ratioListClass)}>
              <li>
                <strong>通常テキスト:</strong> 4.5:1 以上
              </li>
              <li>
                <div
                  className={cx(
                    ratioDemoClass,
                    css({
                      fontSize: "base",
                      color: accessibilityLevels.contrastDemos.ratio4_5to1.text,
                      backgroundColor:
                        accessibilityLevels.contrastDemos.ratio4_5to1
                          .background,
                    })
                  )}
                >
                  これが
                  {accessibilityLevels.contrastDemos.ratio4_5to1.actualRatio}
                  のコントラスト（16px）-{" "}
                  {accessibilityLevels.contrastDemos.ratio4_5to1.label}
                </div>
              </li>
              <li>
                <strong>大きいテキスト:</strong> 3:1 以上
              </li>
              <li>✅ ほとんどのWebサイトで推奨される標準</li>
            </ul>
          </div>

          <div
            className={cx(
              ratioCardBase,
              css({
                bg: "bg.secondary",
                borderColor: "border.warning",
              })
            )}
          >
            <h4
              className={css({
                mt: 0,
                mb: 2,
                color: "contents.primary",
              })}
            >
              レベルAAA（最高）
            </h4>
            <ul className={cx(ratioListClass)}>
              <li>
                <strong>通常テキスト:</strong> 7:1 以上
              </li>
              <li>
                <div
                  className={cx(
                    ratioDemoClass,
                    css({
                      fontSize: "base",
                      color: accessibilityLevels.contrastDemos.ratio7to1.text,
                      backgroundColor:
                        accessibilityLevels.contrastDemos.ratio7to1.background,
                    })
                  )}
                >
                  これが
                  {accessibilityLevels.contrastDemos.ratio7to1.actualRatio}
                  のコントラスト（16px）-{" "}
                  {accessibilityLevels.contrastDemos.ratio7to1.label} ✓✓
                </div>
              </li>
              <li>
                <strong>大きいテキスト:</strong> 4.5:1 以上
              </li>
              <li>✅ 公共機関・医療・金融などで推奨</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={cx(css({ mt: 8 }))}>
        <SectionHeading>実際の例</SectionHeading>
        <div className={cx(exampleStackClass)}>
          <div
            className={cx(
              exampleCardClass,
              css({
                backgroundColor: accessibilityLevels.button.AA.primary.bg,
                color: accessibilityLevels.button.AA.primary.text,
              })
            )}
          >
            <strong>コントラスト比 4.5:1</strong> - レベルAA Primary ボタン
            <br />
            <span className={cx(exampleLegendClass)}>
              背景: {accessibilityLevels.button.AA.primary.bg} / 文字:{" "}
              {accessibilityLevels.button.AA.primary.text}
            </span>
          </div>

          <div
            className={cx(
              exampleCardClass,
              css({
                backgroundColor: accessibilityLevels.button.AAA.primary.bg,
                color: accessibilityLevels.button.AAA.primary.text,
              })
            )}
          >
            <strong>コントラスト比 4.59:1</strong> - レベルAAA Primary ボタン
            <br />
            <span className={cx(exampleLegendClass)}>
              背景: {accessibilityLevels.button.AAA.primary.bg} / 文字:{" "}
              {accessibilityLevels.button.AAA.primary.text}
            </span>
          </div>

          <div
            className={cx(
              exampleCardClass,
              css({
                backgroundColor: accessibilityLevels.focus.AAA.background,
                color: accessibilityLevels.focus.AAA.text,
                borderWidth: "base",
                borderStyle: "solid",
                borderColor: "border.default",
              })
            )}
          >
            <strong>コントラスト比 19.56:1</strong> - レベルAAA フォーカス
            <br />
            <span className={cx(exampleLegendClass)}>
              背景: {accessibilityLevels.focus.AAA.background} / 文字:{" "}
              {accessibilityLevels.focus.AAA.text}
            </span>
          </div>

          <div
            className={cx(
              exampleCardClass,
              css({
                bg: "gray.900",
                color: "white",
              })
            )}
          >
            <strong>コントラスト比 16.1:1</strong> - 濃いグレー背景と白文字
            <br />
            <span className={cx(exampleLegendClass)}>
              背景: {token("colors.gray.900")} / 文字: {token("colors.white")}
            </span>
          </div>
        </div>
      </div>

      <div
        className={cx(
          ratioCardBase,
          css({
            mt: 8,
            bg: "bg.primary",
            borderColor: "border.success",
          })
        )}
      >
        <div
          className={css({
            mt: 0,
            mb: 2,
            p: 2,
            bg: "bg.secondary",
            borderRadius: "md",
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          <span className={css({ color: "contents.success", fontSize: "xl" })}>💡</span>
          <h4 className={css({ m: 0, color: "contents.primary" })}>
            コントラスト比の確認方法
          </h4>
        </div>
        <p
          className={css({
            margin: "0.5rem 0",
            lineHeight: "1.8",
            color: "contents.primary",
          })}
        >
          オンラインツールを使って簡単に確認できます：
        </p>
        <ul className={cx(toolListClass)}>
          <li>
            <a
              href="https://webaim.org/resources/contrastchecker/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx(linkClass)}
            >
              WebAIM Contrast Checker
            </a>
          </li>
          <li>
            <a
              href="https://contrast-ratio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cx(linkClass)}
            >
              Contrast Ratio
            </a>
          </li>
          <li>Chrome DevTools の Lighthouse（アクセシビリティ監査）</li>
        </ul>
      </div>
    </section>
  );
}
