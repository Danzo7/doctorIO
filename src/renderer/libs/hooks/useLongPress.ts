import { useCallback, useRef } from 'react';

export default function useLongPress(
  {
    onEndHold,
    onCancel,
    onStartHold,
    ms,
  }: {
    onEndHold?: () => any;

    onCancel?: () => any;
    onStartHold?: () => any;
    ms: number;
  } = {
    ms: 300,
  },
) {
  // used to persist the timer state
  // non zero values means the value has never been fired before
  const timerRef = useRef<number>(0);

  // clear timed callback
  const endTimer = useCallback(() => {
    if (onEndHold != undefined) {
      clearTimeout(timerRef.current || 0);
      timerRef.current = 0;
    }
  }, [onEndHold]);

  const cancelHold = useCallback(() => {
    if (timerRef.current && onEndHold != undefined) {
      endTimer();
      onCancel?.();
    }
  }, [onEndHold, endTimer, onCancel]);

  // init timer
  const startHold = useCallback(() => {
    if (onEndHold != undefined) {
      // stop any previously set timers
      endTimer();
      onStartHold?.();
      // set new timeout
      timerRef.current = window.setTimeout(() => {
        onEndHold();
        endTimer();
      }, ms);
    }
  }, [onEndHold, endTimer, onStartHold, ms]);

  // determine to end timer early and invoke the callback or do nothing
  const endHold = useCallback(() => {
    // run the callback fn the timer hasn't gone off yet (non zero)
    if (timerRef.current && onEndHold != undefined) {
      endTimer();
      onEndHold();
    }
  }, [onEndHold, endTimer]);

  return [
    onEndHold ? startHold : undefined,
    onEndHold ? cancelHold : undefined,
    onEndHold ? endHold : undefined,
  ];
}
