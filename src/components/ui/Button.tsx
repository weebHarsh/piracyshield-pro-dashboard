'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
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
  primary: 'bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 text-white shadow-md hover:shadow-lg hover:shadow-teal-500/25 active:from-teal-900 active:to-teal-700',
  secondary: 'bg-slate-600 hover:bg-slate-700 text-white shadow-md hover:shadow-lg active:bg-slate-800',
  outline: 'border-2 border-teal-700 text-teal-700 hover:bg-teal-50 active:bg-teal-100',
  ghost: 'text-slate-600 hover:bg-slate-100 active:bg-slate-200',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg active:bg-red-800',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm font-medium rounded',
  md: 'px-4 py-2 text-base font-medium rounded-md',
  lg: 'px-6 py-3 text-lg font-semibold rounded-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
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
  }, ref) => {
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
        className={`
          inline-flex items-center justify-center gap-2
          font-sans font-medium
          transition-all duration-200 ease-out
          transform active:scale-[0.98]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          rounded-md
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex transition-transform duration-200 hover:scale-110" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="inline-flex transition-transform duration-200 hover:scale-110" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export interface AnimatedButtonProps extends ButtonProps {
  motionProps?: Omit<HTMLMotionProps<'button'>, 'children' | 'ref'>;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ motionProps, variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, disabled, className = '', children, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedby, 'aria-labelledby': ariaLabelledby, ...props }, ref) => {
    const isDisabled = disabled || isLoading;
    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-labelledby={ariaLabelledby}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`
          inline-flex items-center justify-center gap-2
          font-sans font-medium
          transition-all duration-200 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          rounded-md
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...motionProps}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex" aria-hidden="true">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="inline-flex" aria-hidden="true">{rightIcon}</span>}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { Button, AnimatedButton };
export default Button;