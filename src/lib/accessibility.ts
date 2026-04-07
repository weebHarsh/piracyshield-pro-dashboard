import { useEffect, useRef } from 'react';

export function useFocusTrap<T extends HTMLElement>(isActive: boolean) {
  const containerRef = useRef<T>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    focusableElements[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTab);
    return () => {
      container.removeEventListener('keydown', handleTab);
      previousFocusRef.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}

export function useEscapeKey(callback: () => void, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback, isActive]);
}

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '';
    };
  }, [isLocked]);
}

export function announceToScreenReader(message: string, politeness: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', politeness);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.style.position = 'absolute';
  announcement.style.left = '-9999px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';

  document.body.appendChild(announcement);
  announcement.textContent = message;

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export const iconButtonAriaProps = {
  'aria-hidden': true,
  focusable: false,
};

export const modalAriaProps = {
  role: 'dialog',
  'aria-modal': true,
};

export const menuAriaProps = {
  role: 'menu',
  'aria-orientation': 'vertical' as const,
};

export const menuItemAriaProps = {
  role: 'menuitem',
};

export const listboxAriaProps = {
  role: 'listbox',
  'aria-expanded': false,
};

export const optionAriaProps = {
  role: 'option',
};

export const tabPanelAriaProps = (tabId: string, isSelected: boolean) => ({
  role: 'tabpanel' as const,
  'aria-labelledby': tabId,
  'aria-hidden': !isSelected,
});

export const tabAriaProps = (panelId: string, isSelected: boolean, disabled?: boolean) => ({
  role: 'tab' as const,
  'aria-selected': isSelected,
  'aria-controls': panelId,
  'aria-disabled': disabled,
});

export const buttonAriaProps = (pressed?: boolean, expanded?: boolean, haspopup?: boolean) => ({
  'aria-pressed': pressed,
  'aria-expanded': expanded,
  'aria-haspopup': haspopup,
});