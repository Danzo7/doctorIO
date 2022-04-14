import color from '@assets/styles/color';
import React, { createRef, useEffect } from 'react';
import Clinic from 'toSvg/clinic.svg?icon';
import './style/index.scss';
interface TimerProps {
  pNum: number;
  ratio: number;
}

function draw(
  { width, height, radius, pNum, timeRatio }: Params,
  canvas?: HTMLCanvasElement | null,
) {
  const radians = (degrees: number) => degrees * (Math.PI / 180);
  const map = (
    value: number,
    low1: number,
    high1: number,
    low2: number,
    high2: number,
  ) => low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);

  const ctx = canvas?.getContext('2d');

  if (ctx) {
    const deg = map(timeRatio, 0, 100, -225, 45);
    const x = width / 2 + Math.cos(radians(deg)) * 100;
    const y = height / 2 + Math.sin(radians(deg)) * 100;
    const smallDSize =
      map(pNum, 0, 20, 15, 30) > 30 ? 30 : map(pNum, 0, 20, 15, 30);
    ctx.globalCompositeOperation = 'source-out';
    ctx.beginPath();
    ctx.arc(x, y, smallDSize + 5, 0, 2 * Math.PI);
    ctx.fillStyle = color.background;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius, 0.75 * Math.PI, 0.25 * Math.PI);
    ctx.lineCap = 'round';
    ctx.lineWidth = 30;
    ctx.strokeStyle = color.hot_purple;
    ctx.stroke();
    ctx.closePath();
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.arc(x, y, smallDSize, 0, 2 * Math.PI);
    ctx.fillStyle = color.hot_red;

    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = color.white;

    ctx.font = '14px sarabun';
    ctx.fillText(pNum + " patient's", x - smallDSize, y - smallDSize - 5);
  }
}
export default function Timer({ ratio = 0, pNum = 0 }: TimerProps) {
  const canvasRef = createRef<HTMLCanvasElement>();
  useEffect(() => {
    draw(
      { width: 260, height: 290, radius: 100, pNum: pNum, timeRatio: ratio },
      canvasRef.current,
    );
  }, [canvasRef, pNum, ratio]);

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
type Params = {
  width: number;
  height: number;
  radius: number;
  pNum: number;
  timeRatio: number;
};
