import { clinic, patients } from '@api/fake';
import { timeToDate } from '@helpers/date.helper';
import { differenceInSeconds } from 'date-fns';
import { useCallback, useEffect, useRef } from 'react';
import Countdown from 'react-countdown';
import Clinic from 'toSvg/clinic.svg?icon';
import { RenderTimer } from './render_timer_canvas';
import './style/index.scss';
interface TimerProps {
  isActive?: boolean;
}

export default function Timer({ isActive }: TimerProps) {
  const size = 500;
  const hoverRef = useRef(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>();
  const closeTimeRef = useRef(timeToDate(clinic.timing.timeToClose));
  const openTimeRef = useRef(timeToDate(clinic.timing.timeToOpen));
  const TimeRef = useRef({ ratio: 1 });

  const renderFrame = useCallback(() => {
    if (TimeRef.current.ratio < 100)
      TimeRef.current.ratio = Number.parseInt(
        (
          100 -
          (differenceInSeconds(closeTimeRef.current, new Date()) /
            differenceInSeconds(closeTimeRef.current, openTimeRef.current)) *
            100
        ).toPrecision(),
      );
    RenderTimer.call(canvasRef?.current?.getContext('2d'), {
      timeRatio: TimeRef.current.ratio,
      size,
      renderText: hoverRef.current,
      pNum: patients.length,
    });
  }, [size]);
  const tick = useCallback(() => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(tick);
  }, [canvasRef, renderFrame]);

  useEffect(() => {
    if (isActive) requestIdRef.current = requestAnimationFrame(tick);
    else {
      cancelAnimationFrame(requestIdRef.current ?? 0);
      RenderTimer.call(canvasRef?.current?.getContext('2d'), {
        timeRatio: TimeRef.current.ratio,
        state: 'stopped',
        renderText: true,

        size,
      });
    }

    return () => {
      cancelAnimationFrame(requestIdRef.current ?? 0);
    };
  }, [isActive, size, tick]);
  //TODO? fetch Time To Close prop
  return (
    <div
      className="timer"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <canvas ref={canvasRef} width={size} height={size}></canvas>
      <div className="time-to-close">
        <Clinic></Clinic> <span>Time to close</span>
        <span className="count-down">
          <Countdown
            date={timeToDate(clinic.timing.timeToClose)}
            daysInHours={true}
            //onComplete={()}end of the day
          />
        </span>
      </div>
    </div>
  );
}
