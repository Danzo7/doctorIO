import color from '@assets/styles/color';
type Params = {
  width?: number;
  height?: number;
  radius?: number;
  pNum?: number;
  timeRatio?: number;
};
const radians = (degrees: number) => degrees * (Math.PI / 180);
const map = (
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number,
) => low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);

export function RenderTimer(
  this: CanvasRenderingContext2D | null | undefined,
  {
    width = 260,
    height = 290,
    radius = 100,
    pNum = 10,
    timeRatio = 10,
  }: Params,
) {
  if (this) {
    let deg: number;
    deg = (deg = map(timeRatio, 0, 100, -225, 45)) > 45 ? -225 : deg;
    const x = width / 2 + Math.cos(radians(deg)) * 100;
    const y = height / 2 + Math.sin(radians(deg)) * 100;
    let smallDSize: number;
    smallDSize = (smallDSize = map(pNum, 0, 20, 15, 30)) > 30 ? 30 : smallDSize;
    this.globalCompositeOperation = 'source-out';
    this.beginPath();
    this.arc(x, y, smallDSize + 5, 0, 2 * Math.PI);
    this.fillStyle = color.background;
    this.fill();
    this.closePath();

    this.beginPath();
    this.arc(width / 2, height / 2, radius, 0.75 * Math.PI, 0.25 * Math.PI);
    this.lineCap = 'round';
    this.lineWidth = 30;
    this.strokeStyle = color.hot_purple;
    this.stroke();
    this.closePath();
    this.globalCompositeOperation = 'source-over';
    this.beginPath();
    this.arc(x, y, smallDSize, 0, 2 * Math.PI);
    this.fillStyle = color.hot_red;

    this.fill();
    this.closePath();
    this.fillStyle = color.white;

    this.font = '14px sarabun';
    this.fillText(pNum + " patient's", x - smallDSize, y - smallDSize - 5);
  }
}
