'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, useId } from 'react';

export type InputVariant = 'default' | 'filled' | 'flushed';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: InputVariant;
  rows?: number;
}

const variantInputStyles: Record<InputVariant, string> = {
  default: 'border border-slate-300 bg-white focus:border-teal-500',
  filled: 'border-0 bg-slate-100 focus:bg-white focus:border-teal-500',
  flushed: 'border-0 border-b-2 border-slate-300 bg-transparent focus:border-teal-500 rounded-none',
};

const sizeInputStyles: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      variant = 'default',
      inputSize = 'md',
      leftElement,
      rightElement,
      className = '',
      id: providedId,
      required,
      disabled,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    const describedBy = [ariaDescribedBy, errorId, hintId].filter(Boolean).join(' ') || undefined;

    const hasLeftElement = Boolean(leftElement);
    const hasRightElement = Boolean(rightElement);

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`
              block mb-2 text-sm font-medium
              ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
              ${disabled ? 'text-slate-400' : 'text-slate-700'}
            `}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {hasLeftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftElement}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            aria-required={required}
            className={`
              w-full rounded-md font-sans text-slate-900 placeholder-slate-400
              ${variantInputStyles[variant]}
              ${sizeInputStyles[inputSize]}
              ${hasLeftElement ? 'pl-10' : ''}
              ${hasRightElement ? 'pr-10' : ''}
              ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              }
              ${
                disabled
                  ? 'opacity-50 cursor-not-allowed bg-slate-50'
                  : ''
              }
              focus:outline-none focus:ring-2 focus:ring-offset-1
              ${error ? 'focus:ring-red-500' : 'focus:ring-teal-500'}
              transition-all duration-200
              hover:border-slate-400
              disabled:hover:border-slate-300
            `}
            {...props}
          />

          {hasRightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            className="mt-1 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={hintId}
            className="mt-1 text-sm text-slate-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      hint,
      variant = 'default',
      rows = 4,
      className = '',
      id: providedId,
      required,
      disabled,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    const describedBy = [ariaDescribedBy, errorId, hintId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`
              block mb-2 text-sm font-medium
              ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
              ${disabled ? 'text-slate-400' : 'text-slate-700'}
            `}
          >
            {label}
          </label>
        )}

<textarea
            ref={ref}
            id={inputId}
            rows={rows}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            aria-required={required}
            className={`
            w-full rounded-md font-sans px-4 py-2 text-base text-slate-900 placeholder-slate-400
            ${variantInputStyles[variant]}
            ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : ''
            }
            ${
              disabled
                ? 'opacity-50 cursor-not-allowed bg-slate-50'
                : ''
            }
            focus:outline-none focus:ring-2 focus:ring-offset-1
            ${error ? 'focus:ring-red-500' : 'focus:ring-teal-500'}
            transition-all duration-200 resize-y
            hover:border-slate-400
            disabled:hover:border-slate-300
          `}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            className="mt-1 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={hintId}
            className="mt-1 text-sm text-slate-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { Input, TextArea };
export default Input;