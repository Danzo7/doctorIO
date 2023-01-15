import { ReactNode } from 'react';
import './style/index.scss';
import { RenderElementProps } from 'slate-react';
import BoltIcon from 'toSvg/bolt.svg?icon';
interface DynamicElementProps {
  children: ReactNode;
}
export default function DynamicElement({
  children,
  attributes,
}: DynamicElementProps & RenderElementProps) {
  return (
    <div className="dynamic-element" {...attributes} contentEditable={false}>
      {children}
      <BoltIcon />
      content
    </div>
  );
}
