import { ComponentProps, useRef, useCallback, useEffect } from 'react';
import TextButton from '../text_button';
import './style/index.scss';
interface DraggableButtonProps {
  onDrag: ({ x, y }: { x: number; y: number }) => void;
}
export default function DraggableButton({
  onDrag,
  ...others
}: ComponentProps<typeof TextButton> & DraggableButtonProps) {
  const ref = useRef({ x: 0, y: 0 });

  const drag = useCallback(
    (e: MouseEvent) => {
      const x = e.clientX - ref.current.x;
      const y = e.clientY - ref.current.y;
      onDrag({ x, y });
    },
    [onDrag],
  );

  const draging = useCallback(
    (e: MouseEvent) => {
      if (ref.current.x || ref.current.y) drag(e);
    },
    [drag],
  );
  useEffect(() => {
    return () => {
      ref.current = { x: 0, y: 0 };
      document.removeEventListener('mousemove', draging);
    };
  }, []);

  return (
    <TextButton
      {...others}
      onMouseUp={(e) => {
        others.onMouseUp?.(e);
        ref.current = { x: 0, y: 0 };
        document.removeEventListener('mousemove', draging);
      }}
      onMouseDown={(e) => {
        document.addEventListener(
          'mouseup',
          () => {
            ref.current = { x: 0, y: 0 };
            document.removeEventListener('mousemove', draging);
          },
          { once: true },
        );
        others.onMouseDown?.(e);
        ref.current = { x: e?.clientX ?? 0, y: e?.clientY ?? 0 };
        document.addEventListener('mousemove', draging);
      }}
    />
  );
}
