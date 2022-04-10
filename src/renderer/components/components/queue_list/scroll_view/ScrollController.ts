import { MutableRefObject, createRef } from 'react';

export default class ScrollController {
  ref: MutableRefObject<null>;

  gap: number;

  scrollTo: (index: number, firstTime: number) => void;

  constructor(gap = 5) {
    this.gap = gap;
    this.ref = createRef();
    this.scrollTo = (index, currentSelected) => {
      const scroll = this.ref?.current as unknown as HTMLDivElement;
      let scrollX: any = 0;
      for (let i = 0; i < index; i++) {
        scrollX += scroll.children[i].clientWidth + this.gap;
      }
      scroll.scrollTo({
        top: 0,
        left:
          scrollX -
          this.gap -
          (index != 0 ? scroll.children[index].clientWidth / 2 : 0) -
          (currentSelected < index && currentSelected != -1 && index != 0
            ? scroll.children[currentSelected].clientWidth -
              scroll.children[index].clientWidth
            : 0),
        behavior: 'smooth',
      });
    };
  }
}
