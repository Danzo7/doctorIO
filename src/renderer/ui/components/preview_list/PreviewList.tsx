import { color } from '@assets/styles/color';
import Header from '@components/header';
import { ReactNode } from 'react';
import './style/index.scss';
interface PreviewListProps {
  title: string;
  buttonNode?: ReactNode;
  children?: ReactNode;
  noBorder?: true;
  gap?: number;
  maxHeight?: number;
}
export default function PreviewList({
  title,
  buttonNode,
  children,
  noBorder,
  gap = 5,
  maxHeight,
}: PreviewListProps) {
  return (
    <div
      className="preview-list"
      css={{
        border: !noBorder ? `1px solid ${color.border_color}` : undefined,
        padding: !noBorder ? '15px 10px' : undefined,
        borderRadius: noBorder ? 0 : 15,

        maxHeight: maxHeight ? maxHeight : undefined,
      }}
    >
      <Header title={title} buttonNode={buttonNode} flexGrow={1} />
      <div className="preview-list-wrapper" css={{ gap: gap }}>
        {children}
      </div>
    </div>
  );
}
