import { css } from '@emotion/css';
import React, { Children, useRef } from 'react';
import './style/index.scss';
interface ScrollViewProps {
  children: React.ReactNode[];
  gap?: number;
}
export const ScrollView = ({ children, gap = 5 }: ScrollViewProps) => {
  const scrollRef = useRef(null);

  const scrollTo = (index: number) => {
    const scroll = scrollRef.current as unknown as HTMLDivElement;
    let scrollX = 0;
    if (index == scroll.children.length - 1) scrollX = scroll.scrollWidth;
    else
      for (let i = 0; i < index; i++)
        scrollX += scroll.children[i].clientWidth + gap;

    scroll.scrollTo(scrollX, 0);
  };

  return (
    <div className="scroll-view" ref={scrollRef}>
      {Children.map(children, (child, index) => {
        return (
          <div
            className="items"
            onClick={() => {
              scrollTo(index);
            }}
          >
            {child}
          </div>
        );
      })}
      <div
        className={css`
          padding-left: 80px;
        `}
      ></div>
    </div>
  );
};
