import { useEffect, type RefObject } from 'react';

import { useLatest } from './useLatest';

type TargetLike<Target extends EventTarget> =
  | Target
  | null
  | undefined
  | RefObject<Target | null>
  | (() => Target | null | undefined);

function isRefObject<Target extends EventTarget>(value: TargetLike<Target>): value is RefObject<Target | null> {
  return typeof value === 'object' && value !== null && 'current' in value;
}

function resolveTarget<Target extends EventTarget>(targetLike: TargetLike<Target>): Target | null {
  if (typeof targetLike === 'function') {
    return targetLike() ?? null;
  }

  if (isRefObject(targetLike)) {
    return targetLike.current ?? null;
  }

  return targetLike ?? null;
}

type ListenerOptions<Target extends EventTarget> = Parameters<Target['addEventListener']>[2];

export function useEventListener<Target extends EventTarget, EventType extends Event = Event>(
  targetLike: TargetLike<Target>,
  type: string,
  listener: (event: EventType) => void,
  options?: ListenerOptions<Target>,
  enabled = true
) {
  const handlerRef = useLatest(listener);
  const target = resolveTarget(targetLike);

  useEffect(() => {
    if (!enabled || !target) {
      return undefined;
    }

    const eventListener = (event: Event) => {
      handlerRef.current(event as EventType);
    };

    target.addEventListener(type, eventListener, options);
    return () => {
      target.removeEventListener(type, eventListener, options);
    };
  }, [enabled, handlerRef, options, target, type]);
}

export default useEventListener;
