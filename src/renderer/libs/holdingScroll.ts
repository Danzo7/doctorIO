interface HoldingScrollI {
  scrollLeft: number;
  selected: number;
  speed: number;
  currentEvent?: void;
  push: (element: HTMLDivElement) => void;
  startX: number;
  targets: HTMLDivElement[];
  mouseDownOnTarget: boolean | null;
}
const HoldingScroll = function (this: HoldingScrollI) {
  this.targets = [];
  this.mouseDownOnTarget = false;
  this.startX = 0;
  this.scrollLeft = 0;
  this.selected = -1;
  this.speed = 1;
  this.currentEvent = undefined;
  const trigger = (e: MouseEvent) => {
    if (!this.mouseDownOnTarget) return;
    e.preventDefault();
    this.targets[this.selected].scrollLeft =
      this.scrollLeft -
      (e.pageX - this.targets[this.selected].offsetLeft - this.startX) *
        this.speed;
    // this.startX=this.startX||e.pageX;
    //this.targets[this.selected].scrollBy((this.startX-e.pageX)*this.speed*0.01,0);
  };
  const kill = () => document.removeEventListener('mousemove', trigger);

  const revive = () =>
    (this.currentEvent = document.addEventListener('mousemove', trigger, true));

  this.push = (element: HTMLDivElement) => {
    this.targets.push(element);
    element.addEventListener('mousedown', (e) => {
      this.selected = this.targets.indexOf(element);
      this.mouseDownOnTarget = true;
      this.startX = e.pageX - element.offsetLeft;
      this.scrollLeft = element.scrollLeft;
      revive();
    });
  };

  document.addEventListener('mouseup', () => {
    this.mouseDownOnTarget = false;
    kill();
  });
} as any as { new (): HoldingScrollI };
export default HoldingScroll;
