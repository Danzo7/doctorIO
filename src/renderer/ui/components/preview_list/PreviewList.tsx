import { color } from '@assets/styles/color';
import Header from '@components/header';
import { ReactNode, useRef } from 'react';
import './style/index.scss';
import { ViewportList } from 'react-viewport-list';
import Shimmer from '@components/shimmers/shimmer';
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
  isLoading?: boolean;
  isFetching?: boolean;
  shimmer?: ReactNode;
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
  isFetching,
  isLoading,
  shimmer,
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
        pointerEvents: isFetching || isLoading ? 'none' : undefined,
        cursor: isFetching || isLoading ? 'not-allowed' : undefined,
        '>.header':
          isFetching || isLoading
            ? {
                button: isFetching
                  ? { opacity: 0.3 }
                  : {
                      background: `linear-gradient(90deg,${color.silver_gray}, ${color.light},${color.border_color})`,
                      backgroundSize: '400% 400%',
                      animation: 'shimmer 2s ease infinite',
                      '*': {
                        visibility: 'hidden',
                      },
                    },
              }
            : {},
      }}
    >
      <Header title={title} buttonNode={buttonNode} />
      <div
        className="preview-list-wrapper"
        css={{
          gap: gap,
          ...(isFetching && !isLoading
            ? { filter: 'blur(2px) brightness(0.8)' }
            : {}),
        }}
        ref={containerRef}
      >
        {isLoading ? (
          shimmer ?? (
            <Shimmer
              height={30}
              borderRadius={5}
              length={3}
              direction="column"
            />
          )
        ) : (
          <ViewportList ref={listRef} viewportRef={containerRef} items={items}>
            {(item) => item}
          </ViewportList>
        )}
      </div>
    </div>
  );
}
