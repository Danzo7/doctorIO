import React, { createRef, useCallback, useEffect, useRef } from 'react';
import Clinic from 'toSvg/clinic.svg?icon';
import { RenderTimer } from './render_timer_canvas';
import './style/index.scss';
interface TimerProps {
  pNum: number;
  ratio: number;
}

export default function Timer({ ratio = 0, pNum = 0 }: TimerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>();

  const TimeRef = useRef({ ratio: 1 });

  const renderFrame = useCallback(() => {
    if (TimeRef.current.ratio > 100) TimeRef.current.ratio = 0;
    TimeRef.current.ratio += 1;
    RenderTimer.call(canvasRef?.current?.getContext('2d'), {});
  }, [canvasRef]);
  const tick = useCallback(() => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(tick);
  }, [canvasRef, renderFrame]);

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(requestIdRef.current ?? 0);
    };
  }, [tick]);

  return (
    <div className="timer">
      <canvas ref={canvasRef} height={250} width={260}></canvas>
      <div>
        <Clinic></Clinic>
        <span>Time to close</span>
        <span className="count-down">10h:50m</span>
      </div>
    </div>
  );
}
