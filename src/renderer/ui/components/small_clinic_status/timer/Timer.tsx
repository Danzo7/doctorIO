import { clinic } from '@api/fake';
import { timeToDate } from '@helpers/date.helper';
import { differenceInSeconds } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import Clinic from 'toSvg/clinic.svg?icon';
import { RenderTimer } from './render_timer_canvas';
import './style/index.scss';
interface TimerProps {
  active?: boolean;
  pCount: number;
}

export default function Timer({ active, pCount }: TimerProps) {
  const size = 500;
  const hoverRef = useRef(false);
  const [isActive, setIsActive] = useState(active);
  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>();
  const closeTimeRef = useRef(timeToDate(clinic.timing.timeToClose));
  const openTimeRef = useRef(timeToDate(clinic.timing.timeToOpen));
  const TimeRef = useRef({ ratio: 1 });

  const renderFrame = useCallback(() => {
    if (differenceInSeconds(new Date(), openTimeRef.current) < 0) {
      TimeRef.current.ratio = 0; //early
    } else if (TimeRef.current.ratio < 100)
      TimeRef.current.ratio = Number.parseInt(
        (
          100 -
          (differenceInSeconds(closeTimeRef.current, new Date()) /
            differenceInSeconds(closeTimeRef.current, openTimeRef.current)) *
            100
        ).toPrecision(),
      );
    else {
      TimeRef.current.ratio = 100; //late
      setIsActive(false);
    }
    RenderTimer.call(canvasRef?.current?.getContext('2d'), {
      timeRatio: TimeRef.current.ratio,
      size,
      renderText: hoverRef.current,
      pNum: pCount,
    });
  }, [pCount]);
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
        pNum: pCount,

        size,
      });
    }

    return () => {
      cancelAnimationFrame(requestIdRef.current ?? 0);
    };
  }, [isActive, pCount, size, tick]);
  //REDUX fetch Time To Close from clinic
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
            onComplete={() => {
              setIsActive(false);
            }}
          />
        </span>
      </div>
    </div>
  );
}
