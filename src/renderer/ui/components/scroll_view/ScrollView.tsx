import { ReactNode, RefObject } from 'react';
import './style/index.scss';
interface ScrollViewProps {
  children: ReactNode;
  gap?: number;
  refs: RefObject<HTMLDivElement>;
}
export const ScrollView = ({ children, refs, gap }: ScrollViewProps) => {
  return (
    <div
      className="scroll-view"
      css={{ gap: gap }}
      ref={refs}
      onWheel={(e) => {
        const direction = e.deltaY > 0 ? -1 < 0 : 0;
        e.currentTarget.scrollTo({
          left: e.currentTarget.scrollLeft + (direction ? 50 : -50),
        });
        e.stopPropagation();
      }}
    >
      {children}
      {Array.isArray(children) && children.length > 1 && (
        <div css={{ paddingLeft: 90 }}></div>
      )}
    </div>
  );
};
