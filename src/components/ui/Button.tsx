'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--brand)] hover:bg-[var(--brand-strong)]',
    'text-[var(--bg)]',
    'border border-transparent',
    'shadow-[inset_0_1px_0_oklch(1_0_0_/_0.12)]',
  ].join(' '),
  secondary: [
    'bg-[var(--surface-2)] hover:bg-[var(--surface-3)]',
    'text-[var(--text)]',
    'border border-[var(--border)]',
  ].join(' '),
  outline: [
    'bg-transparent hover:bg-[var(--surface-2)]',
    'text-[var(--brand)] hover:text-[var(--brand-strong)]',
    'border border-[var(--brand)]',
  ].join(' '),
  ghost: [
    'bg-transparent hover:bg-[var(--surface-2)]',
    'text-[var(--text-muted)] hover:text-[var(--text)]',
    'border border-transparent',
  ].join(' '),
  danger: [
    'bg-[var(--status-critical)] hover:bg-[oklch(0.55_0.18_28)]',
    'text-[var(--bg)]',
    'border border-transparent',
    'shadow-[inset_0_1px_0_oklch(1_0_0_/_0.12)]',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
  md: 'px-4 py-2 text-md rounded-lg gap-2',
  lg: 'px-5 py-2.5 text-lg rounded-lg gap-2',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      children,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-labelledby={ariaLabelledby}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-sans font-medium',
          'btn-press',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
          'focus-visible:ring-offset-[var(--bg)]',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(' ')}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// AnimatedButton alias kept for backwards compat — same component, motion now via CSS
export const AnimatedButton = Button;

export { Button };
export default Button;
