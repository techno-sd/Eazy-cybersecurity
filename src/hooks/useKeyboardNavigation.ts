import { useEffect, useCallback, RefObject } from 'react';

interface UseKeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  isEnabled?: boolean;
  trapFocus?: boolean;
  containerRef?: RefObject<HTMLElement>;
}

/**
 * Hook for handling keyboard navigation in modals and dialogs
 * - Escape key to close
 * - Focus trapping within container
 * - Enter key handler
 */
export const useKeyboardNavigation = ({
  onEscape,
  onEnter,
  isEnabled = true,
  trapFocus = false,
  containerRef,
}: UseKeyboardNavigationOptions) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isEnabled) return;

    switch (event.key) {
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          event.stopPropagation();
          onEscape();
        }
        break;

      case 'Enter':
        if (onEnter) {
          // Only trigger if not in a form element that handles Enter itself
          const target = event.target as HTMLElement;
          const isFormElement = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName);
          if (!isFormElement || target.tagName === 'BUTTON') {
            event.preventDefault();
            onEnter();
          }
        }
        break;

      case 'Tab':
        if (trapFocus && containerRef?.current) {
          const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            // Shift + Tab: if on first element, go to last
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            // Tab: if on last element, go to first
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
        break;
    }
  }, [isEnabled, onEscape, onEnter, trapFocus, containerRef]);

  useEffect(() => {
    if (!isEnabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled, handleKeyDown]);
};

/**
 * Hook for modal-specific behavior
 * - Prevents body scroll when open
 * - Handles Escape key
 * - Restores focus on close
 */
export const useModalAccessibility = (
  isOpen: boolean,
  onClose: () => void,
  initialFocusRef?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    if (!isOpen) return;

    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus initial element
    if (initialFocusRef?.current) {
      setTimeout(() => {
        initialFocusRef.current?.focus();
      }, 50);
    }

    // Cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
      // Restore focus
      previouslyFocused?.focus?.();
    };
  }, [isOpen, initialFocusRef]);

  // Handle Escape key
  useKeyboardNavigation({
    onEscape: onClose,
    isEnabled: isOpen,
  });
};

export default useKeyboardNavigation;
