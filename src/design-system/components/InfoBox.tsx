import React from 'react';
import { infoBox as infoBoxRecipe } from '../../../styled-system/recipes';
import { cx } from '@/styled-system/css';

export type InfoBoxVariant = 'info' | 'warning' | 'success' | 'tip';
export type WCAGLevel = 'A' | 'AA' | 'AAA';

export interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  icon?: string;
  children: React.ReactNode;
  leftBorder?: boolean;
  wcagLevel?: WCAGLevel;
  style?: React.CSSProperties;
  className?: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({
  variant = 'info',
  title,
  icon,
  children,
  leftBorder = false,
  wcagLevel = 'AA',
  style,
  className,
}) => {
  const slots = infoBoxRecipe({
    variant,
    wcagLevel,
    leftBorder: leftBorder ? true : undefined,
  });

  return (
    <div className={cx(slots.root, className)} style={style}>
      {(title || icon) && (
        <div className={slots.title}>
          {icon && <span className={slots.icon}>{icon}</span>}
          {title}
        </div>
      )}
      <div className={slots.content}>{children}</div>
    </div>
  );
};
