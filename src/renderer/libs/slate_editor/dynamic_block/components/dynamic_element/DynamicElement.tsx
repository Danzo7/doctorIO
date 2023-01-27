import { ReactNode, useEffect, useRef, useState } from 'react';
import './style/index.scss';
import { ReactEditor, RenderElementProps } from 'slate-react';
import BoltIcon from 'toSvg/bolt.svg?icon';
import LineArrow from 'toSvg/arrow.svg?icon';
import { Editor, Transforms } from 'slate';
import { pxToCm } from '@helpers/math.helper';
interface DynamicElementProps {
  children: ReactNode;
  editor: Editor;
}
export default function DynamicElement({
  children,
  attributes,
  element,
  editor,
}: DynamicElementProps & RenderElementProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      Transforms.setNodes(
        editor,
        { height: entries[0].borderBoxSize[0].blockSize },
        {
          hanging: true,
          at: ReactEditor.findPath(editor, element),
          mode: 'all',
        },
      );
      return setHeight(entries[0].borderBoxSize[0].blockSize);
    });
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  //get element location

  return (
    <div
      className="dynamic-element"
      {...attributes}
      ref={(e) => {
        attributes.ref(e);
        ref.current = e;
      }}
      contentEditable={false}
    >
      <div className="height-ruler">
        <span>{pxToCm(height) + 'px'}</span>
        <div className="ruler-line">
          <LineArrow />
          <div className="line" /> <LineArrow />
        </div>
      </div>
      {children}
      <BoltIcon />
      content
    </div>
  );
}
