import { ReactNode, useEffect, useRef, useState } from 'react';
import './style/index.scss';
import { RenderElementProps } from 'slate-react';
import BoltIcon from 'toSvg/bolt.svg?icon';
import LineArrow from 'toSvg/arrow.svg?icon';
import { pxToCm } from '@helpers/math.helper';
interface DynamicElementProps {
  children: ReactNode;
}
export default function DynamicElement({
  children,
  attributes,
}: DynamicElementProps & RenderElementProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver((entries) =>
      setHeight(entries[0].contentRect.height),
    );
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
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
        <span>{pxToCm(height) + 'cm'}</span>
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
