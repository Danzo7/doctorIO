import { color } from '@assets/styles/color';
import StatusIcon from '@components/status_icon';
import { useCallback, useEffect, useState } from 'react';
import './style/index.scss';

interface AlertToastProps {
  status: 'success' | 'warning' | 'error';
  text: string;
  timeout?: number;
  close?: () => void;
}
export default function AlertToast({
  status,
  text,
  timeout,
  close,
}: AlertToastProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const setTimerOut = useCallback(() => {
    if (timeout && timer == null) {
      const tim = setTimeout(() => {
        close?.();
      }, timeout + 1000);
      setTimer(tim);
      return tim;
    }
  }, [close, timeout, timer]);

  const clearTimerOut = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  }, [timer]);
  useEffect(() => {
    const time = setTimerOut();
    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="alert-toast"
      onMouseEnter={() => {
        clearTimerOut();
      }}
      onMouseLeave={() => {
        setTimerOut();
      }}
      css={{
        animation:
          'slideIn 0.2s ease' +
          (timer != null ? `,slideOut .5s ease-out ${timeout}ms forwards` : ''),

        border: `1px solid  ${
          status == 'success'
            ? color.good_green
            : status == 'warning'
            ? color.warm_orange
            : color.hot_red
        }`,
      }}
    >
      <StatusIcon status={status} borderRadius={7} size={42} />

      <span>{text}</span>
    </div>
  );
}
