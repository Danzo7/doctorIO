import { ReactNode } from 'react';
import './style/index.scss';
interface PreviewListProps {
  title: string;
  buttonNode: ReactNode;
  children?: ReactNode;
}
export default function PreviewList({
  title,
  buttonNode,
  children,
}: PreviewListProps) {
  return (
    <div className="preview-list">
      <div className="preview-list-header">
        <span>{title}</span>
        {buttonNode}
      </div>
      <div className="preview-list-wrapper">{children}</div>
    </div>
  );
}
