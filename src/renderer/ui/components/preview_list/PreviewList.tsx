import { color } from '@assets/styles/color';
import { ReactNode } from 'react';
import './style/index.scss';
interface PreviewListProps {
  title: string;
  buttonNode?: ReactNode;
  children?: ReactNode;
  border?: boolean;
}
export default function PreviewList({
  title,
  buttonNode,
  children,
  border = true,
}: PreviewListProps) {
  return (
    <div
      className="preview-list"
      css={{ border: border ? `1px solid ${color.border_color}` : undefined }}
    >
      <div className="preview-list-header">
        <span>{title}</span>
        {buttonNode}
      </div>
      <div className="preview-list-wrapper">{children}</div>
    </div>
  );
}
