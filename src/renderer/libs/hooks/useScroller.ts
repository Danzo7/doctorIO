import { createRef, useCallback } from 'react';

export function useScroller(gap: number) {
  const ref = createRef<HTMLDivElement>();
  const gotoFrom = useCallback(
    (index: number, currentSelected: number) => {
      const scroll = ref?.current as unknown as HTMLDivElement;
      if (!scroll) throw new Error('Invalid ref');
      let scrollX: any = 0;
      for (let i = 0; i < index; i++) {
        scrollX += scroll.children[i].clientWidth + gap;
      }

      scroll.scrollTo({
        top: 0,
        left:
          scrollX -
          gap -
          (index != 0 ? scroll.children[index].clientWidth / 2 : 0) -
          (currentSelected < index && currentSelected != -1 && index != 0
            ? scroll.children[currentSelected].clientWidth -
              scroll.children[index].clientWidth
            : 0),
        behavior: 'smooth',
      });
    },
    [gap, ref],
  );
  const next = useCallback(() => {
    const scroll = ref?.current as unknown as HTMLDivElement;
    if (!scroll) throw new Error('Invalid ref');

    let scrollX: any = 0;
    for (let i = 0; i < scroll.children.length; i++) {
      scrollX += (scroll.children[i] as HTMLElement).offsetWidth + gap;
      if (scrollX > scroll.scrollLeft) {
        scroll.scrollTo({ left: scrollX, top: 0, behavior: 'smooth' });

        break;
      }
    }
  }, [gap, ref]);
  const previous = useCallback(() => {
    const scroll = ref?.current as unknown as HTMLDivElement;
    if (!scroll) throw new Error('Invalid ref');

    let scrollX: any = 0;
    for (let i = 0; i < scroll.children.length; i++) {
      scrollX += scroll.children[i].clientWidth + gap;
      if (scrollX >= scroll.scrollLeft) {
        scroll.scrollTo({
          left: scrollX - (scroll.children[i].clientWidth + gap),
          top: 0,
          behavior: 'smooth',
        });

        break;
      }
    }
  }, [gap, ref]);
  const gotoFirst = useCallback(() => {
    const scroll = ref?.current as unknown as HTMLDivElement;
    if (!scroll) throw new Error('Invalid ref');

    (scroll.firstChild as Element)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [ref]);
  const gotoLast = useCallback(() => {
    const scroll = ref?.current as unknown as HTMLDivElement;
    if (!scroll) throw new Error('Invalid ref');

    (scroll.lastChild as Element)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [ref]);
  return { ref, gotoFirst, gotoFrom, gotoLast, next, previous };
}
