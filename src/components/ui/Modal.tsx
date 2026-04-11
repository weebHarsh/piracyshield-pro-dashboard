'use client';

import { useEffect, useRef, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusTrap, useEscapeKey, useScrollLock } from '@/lib/accessibility';
import Button from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: ReactNode;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const sizeStyles = {
  sm:   'max-w-md',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  '2xl':'max-w-6xl',
  full: 'max-w-full mx-4',
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: ModalProps) {
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);
  const titleId = useRef(`modal-title-${Math.random().toString(36).substr(2, 9)}`);
  const descriptionId = useRef(`modal-desc-${Math.random().toString(36).substr(2, 9)}`);

  useEscapeKey(onClose, isOpen);
  useScrollLock(isOpen);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
    },
    [closeOnOverlayClick, onClose]
  );

  useEffect(() => {
    document.body.classList.toggle('modal-open', isOpen);
    return () => { document.body.classList.remove('modal-open'); };
  }, [isOpen]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy || titleId.current}
          aria-describedby={ariaDescribedBy || (description ? descriptionId.current : undefined)}
        >
          {/* Backdrop — no blur, solid dark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-[oklch(0_0_0_/_0.6)]"
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Panel — scale from 0.96, center-anchored */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: 'center' }}
            className={[
              'relative w-full z-10',
              sizeStyles[size],
              'bg-[var(--surface)] border border-[var(--border)]',
              'rounded-xl shadow-[0_32px_64px_-16px_oklch(0_0_0_/_0.5)]',
              'max-h-[90vh] overflow-hidden flex flex-col',
            ].join(' ')}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2
                  id={ariaLabelledBy || titleId.current}
                  className="text-lg font-medium text-[var(--text)] leading-snug"
                >
                  {title}
                </h2>
                {description && (
                  <p
                    id={ariaDescribedBy || descriptionId.current}
                    className="mt-1 text-sm text-[var(--text-muted)]"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="shrink-0 -mr-1 -mt-0.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-5 py-3 border-t border-[var(--border)] bg-[var(--surface-2)]">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
