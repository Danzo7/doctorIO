import { css } from '@emotion/css';
import React, { Children } from 'react';
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
      className={`scroll-view ${css`
        gap: ${gap}px;
      `}`}
      ref={controller.ref}
    >
      {Children.map(children, (child) => {
        return <>{child}</>;
      })}
      <div
        className={css`
          padding-left: 90px;
        `}
      ></div>
    </div>
  );
};
