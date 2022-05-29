import { color } from '@assets/styles/color';
import Header from '@components/header';
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
      <Header title={title} buttonNode={buttonNode} />
      <div className="preview-list-wrapper">{children}</div>
    </div>
  );
}
