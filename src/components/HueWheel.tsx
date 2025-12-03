import { useState, useRef, useEffect } from 'react';
import { css } from '@/styled-system/css';

interface HueWheelProps {
  /** 初期色相値（0-360） */
  initialHue?: number;
  /** サイズ（ピクセル） */
  size?: number;
  /** 色相が変更されたときのコールバック */
  onChange?: (hue: number) => void;
  /** コントラスト表示モード */
  contrastMode?: boolean;
  /** 前景色の明度（0-100） */
  foregroundLightness?: number;
  /** 背景色の明度（0-100） */
  backgroundLightness?: number;
  /** コントラスト比 */
  contrastRatio?: number;
}

export const HueWheel = ({
  initialHue = 0,
  size = 300,
  onChange,
  contrastMode = false,
  foregroundLightness = 15,
  backgroundLightness = 95,
  contrastRatio = 0
}: HueWheelProps) => {
  const [hue, setHue] = useState(initialHue);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 色相環を描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;

    // キャンバスをクリア
    ctx.clearRect(0, 0, size, size);

    // 色相環を描画
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = ((angle - 90) * Math.PI) / 180;
      const endAngle = ((angle + 1 - 90) * Math.PI) / 180;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.fill();
    }

    // 中央の円（白または薄いグレー）
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#f5f5f5';
    ctx.fill();
  }, [size]);

  // カーソル位置から色相を計算
  const calculateHue = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return hue;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;

    return Math.round(angle);
  };

  const handleMove = (clientX: number, clientY: number) => {
    const newHue = calculateHue(clientX, clientY);
    setHue(newHue);
    onChange?.(newHue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // グローバルなマウスイベントをリッスン
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // インジケーターの位置を計算
  const angle = ((hue - 90) * Math.PI) / 180;
  const radius = (size / 2 - 20) * 0.8;
  const indicatorX = size / 2 + radius * Math.cos(angle);
  const indicatorY = size / 2 + radius * Math.sin(angle);

  // コントラストモード用のマーカー位置を計算
  // 色相環の外側リング上に配置（内側の白円と外側の間）
  const getForegroundMarkerPosition = () => {
    const lightnessRatio = foregroundLightness / 100;
    // 暗いほど内側、明るいほど外側（0.65〜0.95の範囲）
    const r = (size / 2 - 20) * (0.65 + 0.3 * (1 - lightnessRatio));
    return {
      x: size / 2 + r * Math.cos(angle),
      y: size / 2 + r * Math.sin(angle)
    };
  };

  const getBackgroundMarkerPosition = () => {
    const lightnessRatio = backgroundLightness / 100;
    // 暗いほど内側、明るいほど外側（0.65〜0.95の範囲）
    const r = (size / 2 - 20) * (0.65 + 0.3 * (1 - lightnessRatio));
    return {
      x: size / 2 + r * Math.cos(angle),
      y: size / 2 + r * Math.sin(angle)
    };
  };

  const fgMarker = getForegroundMarkerPosition();
  const bgMarker = getBackgroundMarkerPosition();

  return (
    <div
      ref={containerRef}
      className={css({
        display: 'inline-block',
        position: 'relative',
        userSelect: 'none',
        touchAction: 'none',
      })}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={css({
          display: 'block',
          cursor: isDragging ? 'grabbing' : 'grab',
          borderRadius: '50%',
        })}
      />

      {contrastMode ? (
        <>
          {/* コントラストモード: 前景色と背景色のマーカー */}
          <div
            className={css({
              position: 'absolute',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: '3px solid white',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            })}
            style={{
              left: `${fgMarker.x}px`,
              top: `${fgMarker.y}px`,
              backgroundColor: `hsl(${hue}, 100%, ${foregroundLightness}%)`,
            }}
          />
          <div
            className={css({
              position: 'absolute',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: '3px solid white',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            })}
            style={{
              left: `${bgMarker.x}px`,
              top: `${bgMarker.y}px`,
              backgroundColor: `hsl(${hue}, 100%, ${backgroundLightness}%)`,
            }}
          />
          {/* 中央の説明テキスト */}
          <div
            className={css({
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              maxWidth: '65%',
              padding: '0.75rem',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 'md',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            })}
          >
            <div className={css({ fontSize: '0.7rem', fontWeight: 'normal', color: '#666', lineHeight: 1.3 })}>
              明度差が
            </div>
            <div className={css({ fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginTop: '0.25rem', lineHeight: 1.2 })}>
              コントラスト比
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 通常モード: 色相インジケーター */}
          <div
            className={css({
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '3px solid white',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            })}
            style={{
              left: `${indicatorX}px`,
              top: `${indicatorY}px`,
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
            }}
          />
          {/* 色相値表示 */}
          <div
            className={css({
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'contents.primary',
              textAlign: 'center',
              pointerEvents: 'none',
            })}
          >
            {hue}°
            <div className={css({ fontSize: '0.875rem', fontWeight: 'normal', marginTop: '0.25rem' })}>
              HSL({hue}, 100%, 50%)
            </div>
          </div>
        </>
      )}
    </div>
  );
};
