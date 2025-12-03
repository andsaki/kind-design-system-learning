import { useState } from 'react';
import { css } from '@/styled-system/css';
import { HueWheel } from '../components/HueWheel';
import { icons } from '../design-system/tokens/icons';

export const HueWheelDemo = () => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  // コントラスト計算用の前景色・背景色
  const [foregroundHue, setForegroundHue] = useState(210);
  const [backgroundHue, setBackgroundHue] = useState(45);
  const [foregroundLightness, setForegroundLightness] = useState(15);
  const [backgroundLightness, setBackgroundLightness] = useState(95);

  const currentColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  // 色相から色名を推定
  const getColorName = (h: number) => {
    if (h >= 0 && h < 30) return '赤';
    if (h >= 30 && h < 60) return 'オレンジ';
    if (h >= 60 && h < 90) return '黄色';
    if (h >= 90 && h < 150) return '黄緑';
    if (h >= 150 && h < 210) return '緑';
    if (h >= 210 && h < 270) return '青';
    if (h >= 270 && h < 300) return '紫';
    if (h >= 300 && h < 330) return 'ピンク';
    return '赤';
  };

  // 色相の補色を計算
  const complementaryHue = (hue + 180) % 360;
  const complementaryColor = `hsl(${complementaryHue}, ${saturation}%, ${lightness}%)`;

  // 類似色を計算
  const analogous1 = (hue + 30) % 360;
  const analogous2 = (hue - 30 + 360) % 360;

  // 三分割配色
  const triadic1 = (hue + 120) % 360;
  const triadic2 = (hue + 240) % 360;

  return (
    <div className={css({ maxWidth: '80rem', margin: '0 auto', padding: '2rem' })}>
      <h1
        className={css({
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: 'contents.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        })}
      >
        <icons.concept.theme.light size={40} strokeWidth={2} />
        色相環インタラクティブデモ
      </h1>

      <section className={css({ marginBottom: '3rem' })}>
        <h2 className={css({ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'contents.primary' })}>
          色相環
        </h2>
        <p className={css({ lineHeight: '1.75', marginBottom: '2rem', color: 'contents.primary' })}>
          色相環をクリックまたはドラッグして、色相を選択してください。
        </p>

        <div className={css({ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' })}>
          <div>
            <HueWheel size={350} initialHue={hue} onChange={setHue} />
          </div>

          <div className={css({ flex: 1, minWidth: '300px' })}>
            <div
              className={css({
                width: '100%',
                height: '200px',
                borderRadius: 'lg',
                marginBottom: '1rem',
                borderWidth: 'thin',
                borderStyle: 'solid',
                borderColor: 'border.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: lightness > 50 ? '#000' : '#fff',
                fontSize: '2rem',
                fontWeight: 'bold',
              })}
              style={{ backgroundColor: currentColor }}
            >
              {getColorName(hue)}
            </div>

            <div className={css({ marginBottom: '1.5rem' })}>
              <label htmlFor="saturation" className={css({ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'contents.primary' })}>
                彩度: {saturation}%
              </label>
              <input
                type="range"
                id="saturation"
                min="0"
                max="100"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className={css({ width: '100%' })}
              />
            </div>

            <div className={css({ marginBottom: '1.5rem' })}>
              <label htmlFor="lightness" className={css({ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'contents.primary' })}>
                明度: {lightness}%
              </label>
              <input
                type="range"
                id="lightness"
                min="0"
                max="100"
                value={lightness}
                onChange={(e) => setLightness(Number(e.target.value))}
                className={css({ width: '100%' })}
              />
            </div>

            <div
              className={css({
                padding: '1rem',
                backgroundColor: 'bg.secondary',
                borderRadius: 'md',
                fontFamily: 'monospace',
                color: 'contents.primary',
              })}
            >
              <div>HSL: hsl({hue}, {saturation}%, {lightness}%)</div>
              <div>RGB: {hslToRgb(hue, saturation, lightness)}</div>
              <div>HEX: {hslToHex(hue, saturation, lightness)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className={css({ marginBottom: '3rem' })}>
        <h2 className={css({ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'contents.primary' })}>
          配色パターン
        </h2>

        <div className={css({ marginBottom: '2rem' })}>
          <h3 className={css({ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>
            補色（Complementary）
          </h3>
          <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.secondary' })}>
            色相環の正反対にある色。コントラストが強く、目を引く配色になります。
          </p>
          <div className={css({ display: 'flex', gap: '1rem' })}>
            <ColorSwatch color={currentColor} label="ベース" hue={hue} />
            <ColorSwatch color={complementaryColor} label="補色" hue={complementaryHue} />
          </div>
        </div>

        <div className={css({ marginBottom: '2rem' })}>
          <h3 className={css({ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>
            類似色（Analogous）
          </h3>
          <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.secondary' })}>
            色相環で隣接する色。調和が取れた穏やかな配色になります。
          </p>
          <div className={css({ display: 'flex', gap: '1rem' })}>
            <ColorSwatch color={`hsl(${analogous2}, ${saturation}%, ${lightness}%)`} label="-30°" hue={analogous2} />
            <ColorSwatch color={currentColor} label="ベース" hue={hue} />
            <ColorSwatch color={`hsl(${analogous1}, ${saturation}%, ${lightness}%)`} label="+30°" hue={analogous1} />
          </div>
        </div>

        <div className={css({ marginBottom: '2rem' })}>
          <h3 className={css({ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'contents.primary' })}>
            三分割配色（Triadic）
          </h3>
          <p className={css({ lineHeight: '1.75', marginBottom: '1rem', color: 'contents.secondary' })}>
            色相環を3等分した位置にある色。バランスの取れた活気ある配色になります。
          </p>
          <div className={css({ display: 'flex', gap: '1rem' })}>
            <ColorSwatch color={currentColor} label="ベース" hue={hue} />
            <ColorSwatch color={`hsl(${triadic1}, ${saturation}%, ${lightness}%)`} label="+120°" hue={triadic1} />
            <ColorSwatch color={`hsl(${triadic2}, ${saturation}%, ${lightness}%)`} label="+240°" hue={triadic2} />
          </div>
        </div>
      </section>

      <section className={css({ marginBottom: '3rem' })}>
        <h2 className={css({ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'contents.primary' })}>
          アクセシビリティへの応用
        </h2>
        <ul className={css({ marginLeft: '1.5rem', listStyleType: 'disc', color: 'contents.primary', lineHeight: '1.75' })}>
          <li>補色を使って十分なコントラストを確保する</li>
          <li>類似色を使って視覚的な階層を作る</li>
          <li>色だけでなく、明度の差も考慮する（WCAG 4.5:1以上）</li>
          <li>色覚特性を考慮し、赤と緑の組み合わせは避ける</li>
        </ul>
      </section>

      {/* コントラスト計算ツール */}
      <section className={css({ marginBottom: '3rem', padding: '2rem', backgroundColor: 'bg.secondary', borderRadius: 'lg', borderWidth: 'thin', borderStyle: 'solid', borderColor: 'border.default' })}>
        <h2 className={css({ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'contents.primary' })}>
          コントラスト計算ツール
        </h2>
        <p className={css({ fontSize: '0.875rem', color: 'contents.secondary', marginBottom: '1.5rem', lineHeight: '1.75' })}>
          前景色と背景色の色相と明度を調整して、コントラスト比を計算できます。WCAG基準に適合しているか確認してみましょう。
        </p>

        <div className={css({ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' })}>
          {/* 色相環 */}
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '2rem' })}>
            <div>
              <h4 className={css({ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'contents.primary' })}>
                前景色の色相を選択
              </h4>
              <HueWheel
                size={250}
                initialHue={foregroundHue}
                onChange={setForegroundHue}
              />
            </div>

            <div>
              <h4 className={css({ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'contents.primary' })}>
                背景色の色相を選択
              </h4>
              <HueWheel
                size={250}
                initialHue={backgroundHue}
                onChange={setBackgroundHue}
              />
            </div>

            <div className={css({ fontSize: '0.75rem', color: 'contents.secondary', lineHeight: 1.5, maxWidth: '250px' })}>
              ℹ️ コントラスト比は「どれだけ明るさが離れているか」で決まります。色相の違いは視覚的な印象に影響します。
            </div>
          </div>

          {/* コントラスト表示 */}
          <div className={css({ flex: 1, minWidth: '300px' })}>
            {ContrastDisplay(foregroundHue, backgroundHue, foregroundLightness, backgroundLightness, saturation, setForegroundLightness, setBackgroundLightness)}
          </div>
        </div>
      </section>
    </div>
  );
};

interface ColorSwatchProps {
  color: string;
  label: string;
  hue: number;
}

const ColorSwatch = ({ color, label, hue }: ColorSwatchProps) => {
  return (
    <div className={css({ textAlign: 'center' })}>
      <div
        className={css({
          width: '100px',
          height: '100px',
          borderRadius: 'md',
          marginBottom: '0.5rem',
          borderWidth: 'thin',
          borderStyle: 'solid',
          borderColor: 'border.default',
        })}
        style={{ backgroundColor: color }}
      />
      <div className={css({ fontSize: '0.875rem', fontWeight: 'bold', color: 'contents.primary' })}>
        {label}
      </div>
      <div className={css({ fontSize: '0.75rem', color: 'contents.secondary' })}>
        {Math.round(hue)}°
      </div>
    </div>
  );
};

// HSLをRGBに変換
function hslToRgb(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

// HSLをHEXに変換
function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  const match = rgb.match(/\d+/g);
  if (!match) return '#000000';

  const r = parseInt(match[0]);
  const g = parseInt(match[1]);
  const b = parseInt(match[2]);

  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// HSL文字列からHEXに変換
function hslStringToHex(hslString: string): string {
  const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return '#000000';

  const h = parseInt(match[1]);
  const s = parseInt(match[2]);
  const l = parseInt(match[3]);

  return hslToHex(h, s, l);
}

// HSL文字列から相対輝度を計算
function relativeLuminanceFromHsl(hslString: string): number {
  const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return 0;

  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;

  // HSLをRGBに変換
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  // ガンマ補正を適用
  const linearize = (c: number) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  // 相対輝度を計算
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

// コントラスト比を計算
function calculateContrastRatio(fg: string, bg: string): number {
  const fgLum = relativeLuminanceFromHsl(fg);
  const bgLum = relativeLuminanceFromHsl(bg);
  const [max, min] = fgLum > bgLum ? [fgLum, bgLum] : [bgLum, fgLum];
  return (max + 0.05) / (min + 0.05);
}

// コントラスト表示コンポーネント
function ContrastDisplay(
  foregroundHue: number,
  backgroundHue: number,
  foregroundLightness: number,
  backgroundLightness: number,
  saturation: number,
  setForegroundLightness: (value: number) => void,
  setBackgroundLightness: (value: number) => void
) {
  const foregroundColor = `hsl(${foregroundHue}, ${saturation}%, ${foregroundLightness}%)`;
  const backgroundColor = `hsl(${backgroundHue}, ${saturation}%, ${backgroundLightness}%)`;
  const contrastRatio = calculateContrastRatio(foregroundColor, backgroundColor);

  return (
    <>
      {/* カラーピッカー */}
      <div className={css({ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' })}>
        <div className={css({ flex: 1, minWidth: '150px' })}>
          <label htmlFor="fg-color" className={css({ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'contents.primary' })}>
            前景色（テキスト）
          </label>
          <div className={css({ display: 'flex', gap: '0.5rem', alignItems: 'center' })}>
            <input
              type="color"
              id="fg-color"
              value={hslStringToHex(foregroundColor)}
              onChange={(e) => {
                const hex = e.target.value;
                const r = parseInt(hex.slice(1, 3), 16) / 255;
                const g = parseInt(hex.slice(3, 5), 16) / 255;
                const b = parseInt(hex.slice(5, 7), 16) / 255;
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                const l = (max + min) / 2;
                setForegroundLightness(Math.round(l * 100));
              }}
              className={css({ width: '100%', height: '50px', cursor: 'pointer', borderRadius: 'md' })}
            />
            <span className={css({ fontFamily: 'monospace', fontSize: '0.875rem', color: 'contents.secondary', minWidth: '80px' })}>
              {hslStringToHex(foregroundColor).toUpperCase()}
            </span>
          </div>
        </div>

        <div className={css({ flex: 1, minWidth: '150px' })}>
          <label htmlFor="bg-color" className={css({ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'contents.primary' })}>
            背景色
          </label>
          <div className={css({ display: 'flex', gap: '0.5rem', alignItems: 'center' })}>
            <input
              type="color"
              id="bg-color"
              value={hslStringToHex(backgroundColor)}
              onChange={(e) => {
                const hex = e.target.value;
                const r = parseInt(hex.slice(1, 3), 16) / 255;
                const g = parseInt(hex.slice(3, 5), 16) / 255;
                const b = parseInt(hex.slice(5, 7), 16) / 255;
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                const l = (max + min) / 2;
                setBackgroundLightness(Math.round(l * 100));
              }}
              className={css({ width: '100%', height: '50px', cursor: 'pointer', borderRadius: 'md' })}
            />
            <span className={css({ fontFamily: 'monospace', fontSize: '0.875rem', color: 'contents.secondary', minWidth: '80px' })}>
              {hslStringToHex(backgroundColor).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* サンプルテキスト表示 */}
      <div
        className={css({
          width: '100%',
          padding: '2rem',
          borderRadius: 'lg',
          marginBottom: '1.5rem',
          borderWidth: 'thin',
          borderStyle: 'solid',
          borderColor: 'border.default',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        })}
        style={{ backgroundColor: backgroundColor }}
      >
        <div style={{ color: foregroundColor }} className={css({ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' })}>
          CONTRAST
        </div>
        <div style={{ color: foregroundColor }} className={css({ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center' })}>
          {contrastRatio.toFixed(2)}:1
        </div>
      </div>

      {/* WCAG準拠レベル表示 */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' })}>
        <div className={css({ display: 'flex', alignItems: 'center', gap: '0.5rem' })}>
          <span className={css({ fontSize: '1.25rem', color: contrastRatio >= 7 ? 'green.500' : 'contents.secondary' })}>
            {contrastRatio >= 7 ? '✓' : '✗'}
          </span>
          <span className={css({ fontWeight: 'bold', color: 'contents.primary' })}>
            AAA（通常テキスト）（7:1以上）
          </span>
        </div>
        <div className={css({ display: 'flex', alignItems: 'center', gap: '0.5rem' })}>
          <span className={css({ fontSize: '1.25rem', color: contrastRatio >= 4.5 ? 'green.500' : 'contents.secondary' })}>
            {contrastRatio >= 4.5 ? '✓' : '✗'}
          </span>
          <span className={css({ fontWeight: 'bold', color: 'contents.primary' })}>
            AA（通常テキスト）（4.5:1以上）
          </span>
        </div>
        <div className={css({ display: 'flex', alignItems: 'center', gap: '0.5rem' })}>
          <span className={css({ fontSize: '1.25rem', color: contrastRatio >= 3 ? 'green.500' : 'contents.secondary' })}>
            {contrastRatio >= 3 ? '✓' : '✗'}
          </span>
          <span className={css({ fontWeight: 'bold', color: 'contents.primary' })}>
            AA（大きい文字 / UI）（3:1以上）
          </span>
        </div>
      </div>

      {/* スライダー */}
      <div className={css({ marginBottom: '1rem' })}>
        <label htmlFor="fg-lightness" className={css({ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'contents.primary' })}>
          前景色の明度: {foregroundLightness}%
        </label>
        <input
          type="range"
          id="fg-lightness"
          min="0"
          max="100"
          value={foregroundLightness}
          onChange={(e) => setForegroundLightness(Number(e.target.value))}
          className={css({ width: '100%' })}
        />
      </div>

      <div className={css({ marginBottom: '1rem' })}>
        <label htmlFor="bg-lightness" className={css({ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'contents.primary' })}>
          背景色の明度: {backgroundLightness}%
        </label>
        <input
          type="range"
          id="bg-lightness"
          min="0"
          max="100"
          value={backgroundLightness}
          onChange={(e) => setBackgroundLightness(Number(e.target.value))}
          className={css({ width: '100%' })}
        />
      </div>

      {/* 説明文 */}
      <div className={css({ marginTop: '2rem', padding: '1rem', backgroundColor: 'bg.primary', borderRadius: 'md', fontSize: '0.875rem', color: 'contents.primary', lineHeight: 1.75 })}>
        <div className={css({ marginBottom: '0.5rem', fontWeight: 'bold' })}>
          コントラスト比の計算式
        </div>
        <div className={css({ marginBottom: '0.5rem' })}>
          (L<sub>max</sub> + 0.05) / (L<sub>min</sub> + 0.05)
        </div>
        <div className={css({ fontSize: '0.75rem', color: 'contents.secondary' })}>
          例: 黒 (#000000, L=0) と白 (#ffffff, L=1) なら (1.05 / 0.05) = 21:1
        </div>
      </div>
    </>
  );
}
