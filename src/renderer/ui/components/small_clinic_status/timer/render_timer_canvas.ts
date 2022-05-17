import { color } from '@assets/styles/color';
type Params = {
  size: number;
  radius?: number;
  pNum?: number;
  timeRatio?: number;
  state?: 'stopped' | 'end' | 'moving';
  renderText: boolean;
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
    size,
    radius,
    pNum = 10,
    timeRatio = 10,
    state = 'moving',
    renderText,
  }: Params,
) {
  radius = radius ?? size / 3;
  if (this) {
    this.clearRect(0, 0, size, size);
    let deg: number;
    deg = (deg = map(timeRatio, 0, 100, -225, 45)) > 45 ? -225 : deg;
    const x = size / 2 + Math.cos(radians(deg)) * radius;
    const y = size / 2 + Math.sin(radians(deg)) * radius;
    let smallDSize: number;
    smallDSize =
      (smallDSize = map(pNum, 0, 20, 15, size / 10)) > size / 10
        ? size / 10
        : smallDSize;
    this.globalCompositeOperation = 'source-out';
    this.beginPath();
    this.arc(x, y, smallDSize + size / 30, 0, 2 * Math.PI);
    this.fillStyle = color.background;
    this.fill();
    this.closePath();

    this.beginPath();
    this.arc(size / 2, size / 2, radius, 0.75 * Math.PI, 0.25 * Math.PI);
    this.lineCap = 'round';
    this.lineWidth = size / 10;
    this.strokeStyle = color.hot_purple;
    this.stroke();
    this.closePath();
    this.globalCompositeOperation = 'source-over';
    this.beginPath();
    this.arc(x, y, smallDSize, 0, 2 * Math.PI);
    this.fillStyle = state == 'moving' ? color.cold_blue : color.hot_red;

    this.fill();
    this.closePath();

    if (renderText) {
      this.fillStyle = color.white;
      this.font = (14 / 300) * size + 'px sarabun';
      this.fillText(pNum + " patient's", x - smallDSize, y - smallDSize);
    }
  }
}
