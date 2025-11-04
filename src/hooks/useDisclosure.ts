import { useCallback, useMemo, useState } from 'react';

export interface UseDisclosureProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface UseDisclosureResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export function useDisclosure({
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpen,
  onClose,
}: UseDisclosureProps = {}): UseDisclosureResult {
  const isControlled = isOpenProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen = isControlled ? Boolean(isOpenProp) : uncontrolled;

  const setOpen = useCallback(
    (nextOpen: boolean | ((prev: boolean) => boolean)) => {
      const evaluate = (prev: boolean): boolean => {
        const nextValue = typeof nextOpen === 'function' ? nextOpen(prev) : nextOpen;
        if (nextValue === prev) {
          return prev;
        }

        if (nextValue) {
          onOpen?.();
        } else {
          onClose?.();
        }

        return nextValue;
      };

      if (isControlled) {
        const prev = Boolean(isOpenProp);
        const nextValue = evaluate(prev);
        if (nextValue !== prev && isOpenProp === undefined) {
          setUncontrolled(nextValue);
        }
        return;
      }

      setUncontrolled(prev => evaluate(prev));
    },
    [isControlled, isOpenProp, onClose, onOpen]
  );

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(prev => !prev), [setOpen]);

  return useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      setOpen,
    }),
    [close, isOpen, open, setOpen, toggle]
  );
}

export default useDisclosure;
