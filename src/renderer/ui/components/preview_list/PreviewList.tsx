import { color } from '@assets/styles/color';
import Header from '@components/header';
import { ReactNode, useRef } from 'react';
import './style/index.scss';
import ViewportList from 'react-viewport-list';
interface PreviewListProps {
  title: string;
  buttonNode?: ReactNode;
  children?: ReactNode;
  noBorder?: true;
  gap?: number;
  maxHeight?: number;
  overflow?: 'hidden' | 'visible' | 'auto' | 'scroll';
  flexGrow?: true;
  width?: number | string;
}
export default function PreviewList({
  title,
  buttonNode,
  children,
  noBorder,
  gap = 5,
  maxHeight,
  overflow = 'auto',
  width,
  flexGrow,
}: PreviewListProps) {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const items = Array.isArray(children) ? children : [children];
  return (
    <div
      className="preview-list"
      css={{
        border: !noBorder ? `1px solid ${color.border_color}` : undefined,
        padding: !noBorder ? '15px 10px' : undefined,
        borderRadius: noBorder ? 0 : 15,
        overflow: overflow,
        maxHeight: maxHeight ? maxHeight : undefined,
        flexGrow: flexGrow ? 1 : 0,
        width: width ? width : undefined,
      }}
    >
      <Header title={title} buttonNode={buttonNode} />
      <div
        className="preview-list-wrapper"
        css={{ gap: gap }}
        ref={containerRef}
      >
        <ViewportList ref={listRef} viewportRef={containerRef} items={items}>
          {(item) => item}
        </ViewportList>
      </div>
    </div>
  );
}
