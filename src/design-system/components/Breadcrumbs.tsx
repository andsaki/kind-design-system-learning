import React from 'react';
import { breadcrumbs as breadcrumbsRecipe } from '../../../styled-system/recipes';
import { cx } from '@/styled-system/css';
import type { WCAGLevel } from '../constants/accessibility';

// Context for passing WCAG level to child components
const BreadcrumbsContext = React.createContext<WCAGLevel>('AA');

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  label?: string;
  wcagLevel?: WCAGLevel;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  children,
  className = '',
  label = 'パンくずリスト',
  wcagLevel = 'AA',
  ...props
}) => {
  // WCAGレベルに応じたセマンティック属性を追加
  const navProps = {
    'aria-label': label,
    'data-wcag-level': wcagLevel,
  };

  return (
    <BreadcrumbsContext.Provider value={wcagLevel}>
      <nav className={cx(breadcrumbsRecipe({ wcagLevel }).root, className)} {...navProps} {...props}>
        {children}
      </nav>
    </BreadcrumbsContext.Provider>
  );
};

export interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
  className?: string;
}

export const BreadcrumbList: React.FC<BreadcrumbListProps> = ({
  children,
  className = '',
  ...props
}) => {
  const wcagLevel = React.useContext(BreadcrumbsContext);
  return (
    <ol className={cx(breadcrumbsRecipe({ wcagLevel }).list, className)} {...props}>
      {children}
    </ol>
  );
};

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  className?: string;
  isCurrent?: boolean;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  className = '',
  isCurrent = false,
  ...props
}) => {
  const wcagLevel = React.useContext(BreadcrumbsContext);
  const slots = breadcrumbsRecipe({ wcagLevel });

  return (
    <li
      aria-current={isCurrent ? 'page' : undefined}
      className={cx(slots.item, className)}
      data-current={isCurrent ? 'true' : 'false'}
      {...props}
    >
      {children}
    </li>
  );
};

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  children,
  className = '',
  href,
  ...props
}) => {
  const wcagLevel = React.useContext(BreadcrumbsContext);
  const slots = breadcrumbsRecipe({ wcagLevel });

  return (
    <>
      <a
        href={href}
        className={cx(slots.link, className)}
        {...props}
      >
        {children}
      </a>
      <BreadcrumbSeparator />
    </>
  );
};

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  className = '',
  ...props
}) => {
  const wcagLevel = React.useContext(BreadcrumbsContext);
  const slots = breadcrumbsRecipe({ wcagLevel });

  return (
    <span className={cx(slots.separator, className)} {...props}>
      <svg
        aria-hidden={true}
        className={slots.icon}
        fill="none"
        height="12"
        viewBox="0 0 12 12"
        width="12"
      >
        <path
          d="M4.5 2.25L8.25 6L4.5 9.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
