import { Children } from 'react';
import * as React from 'react';
import ScrollController from './ScrollController';
import './style/index.scss';
interface ScrollViewProps {
  children: (controller: ScrollController) => React.ReactNode;
  gap?: number;
  controller?: ScrollController;
}
export const ScrollView = ({
  children,
  controller = new ScrollController(),
  gap = controller?.gap,
}: ScrollViewProps) => {
  if (controller) controller.gap = gap ?? controller.gap;
  return (
    <div
      className="scroll-view"
      css={{ gap: gap }}
      ref={controller?.ref}
      onWheel={(e) => {
        const direction = e.deltaY > 0 ? -1 < 0 : 0;
        e.currentTarget.scrollTo(
          e.currentTarget.scrollLeft + (direction ? 50 : -50),
          0,
        );
        e.stopPropagation();
      }}
    >
      {children(controller)};<div css={{ paddingLeft: 90 }}></div>
    </div>
  );
};
