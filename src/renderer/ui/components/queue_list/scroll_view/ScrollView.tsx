import { Children } from 'react';
import * as React from 'react';
import ScrollController from './ScrollController';
import './style/index.scss';
interface ScrollViewProps {
  children: React.ReactNode[];
  gap?: number;
  controller: ScrollController;
}
export const ScrollView = ({
  children,
  controller,
  gap = controller.gap,
}: ScrollViewProps) => {
  controller.gap = gap;
  return (
    <div
      className="scroll-view"
      css={{ gap: gap }}
      ref={controller.ref}
      onWheel={(e) => {
        const direction = e.deltaY > 0 ? -1 < 0 : 0;
        e.currentTarget.scrollTo(
          e.currentTarget.scrollLeft + (direction ? 50 : -50),
          0,
        );
        e.stopPropagation();
      }}
    >
      {Children.map(children, (child) => {
        return <>{child}</>;
      })}
      <div css={{ paddingLeft: 90 }}></div>
    </div>
  );
};
