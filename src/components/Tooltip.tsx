import { useState, useRef, cloneElement, isValidElement } from 'react';
import type { ReactNode, ReactElement, HTMLAttributes } from 'react';
import { css, cx } from '@/styled-system/css';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

// コンテナスタイル
const containerStyle = css({
  position: 'relative',
  display: 'inline-block',
});

// ツールチップベーススタイル
const tooltipBase = css({
  position: 'absolute',
  bg: 'gray.900',
  color: 'white',
  py: 2,
  px: 3,
  rounded: 'sm',
  fontSize: 'sm',
  whiteSpace: 'nowrap',
  zIndex: 1000,
  pointerEvents: 'none',
  boxShadow: 'md',
});

// 位置ごとのスタイル
const positionStyles = {
  top: css({
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    mb: 2,
  }),
  bottom: css({
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    mt: 2,
  }),
  left: css({
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    mr: 2,
  }),
  right: css({
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    ml: 2,
  }),
};

// 矢印ベーススタイル
const arrowBase = css({
  position: 'absolute',
  width: 0,
  height: 0,
});

// 矢印の位置ごとのスタイル
const arrowPositionStyles = {
  top: css({
    bottom: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid',
    borderTopColor: 'gray.900',
  }),
  bottom: css({
    top: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: '6px solid',
    borderBottomColor: 'gray.900',
  }),
  left: css({
    right: '-6px',
    top: '50%',
    transform: 'translateY(-50%)',
    borderTop: '6px solid transparent',
    borderBottom: '6px solid transparent',
    borderLeft: '6px solid',
    borderLeftColor: 'gray.900',
  }),
  right: css({
    left: '-6px',
    top: '50%',
    transform: 'translateY(-50%)',
    borderTop: '6px solid transparent',
    borderBottom: '6px solid transparent',
    borderRight: '6px solid',
    borderRightColor: 'gray.900',
  }),
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const tooltipId = useRef<string>(`tooltip-${Math.random().toString(36).substring(2, 11)}`);

  const showTooltip = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<HTMLAttributes<HTMLElement>>, {
        'aria-describedby': isVisible ? tooltipId.current : undefined,
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        onFocus: showTooltip,
        onBlur: hideTooltip,
      })
    : children;

  return (
    <span className={containerStyle}>
      {child}
      {isVisible && (
        <span
          role="tooltip"
          id={tooltipId.current}
          className={cx(tooltipBase, positionStyles[position])}
        >
          {content}
          <span className={cx(arrowBase, arrowPositionStyles[position])} />
        </span>
      )}
    </span>
  );
};
