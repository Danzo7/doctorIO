import { Interpolation, Theme } from '@emotion/react';
import {
  RenderElementProps,
  useFocused,
  useSelected,
  useSlate,
} from 'slate-react';
import './style/index.scss';
import { color } from '@assets/styles/color';
import { elementIsEmpty } from '@components/text_editor/helper';
import TextButton from '@components/buttons/text_button';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import trashCan from 'toSvg/trash_can.svg?icon';
import { Transforms } from 'slate';
import { TablesEditor } from '@components/text_editor/slate-tables';
import { ComponentProps, useCallback, useEffect, useRef } from 'react';
import { ImageEditor } from '@components/text_editor/slate-image/ImageEditor';
const Tag = ({ text }: { text: string }) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <TextButton
      text={text}
      backgroundColor={color.warm_orange}
      borderColor={
        selected ? color.coldBlack : focused ? color.hot_red : undefined
      }
      padding={2}
      radius={4}
      fontWeight={400}
      fontColor={color.white}
    />
  );
};
//TODO move to btns
const DraggableButton = ({
  onDrag,
  ...others
}: {
  onDrag: ({ x, y }: { x: number; y: number }) => void;
} & ComponentProps<typeof TextButton>) => {
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
};

//TODO split to multiple components and determine type using "is" (like slate-table)
export default function EditorElement({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const selected = useSelected();
  const editor = useSlate();
  const ref = useRef<HTMLElement>(document.querySelector('.editable-content'));

  const style: Interpolation<Theme> = {
    textAlign: (element as any)?.align,
    ...(elementIsEmpty(element) &&
    selected &&
    element.type !== 'li' &&
    element.type !== 'nl' &&
    element.type !== 'tag'
      ? {
          position: 'relative',
          '&:after': {
            position: 'absolute',
            top: 0,
            right: element.align == 'right' ? 0 : undefined,
            content: '"Write something here..."',
            color: color.text_gray,
          },
        }
      : {}),
  };

  switch (element.type) {
    case 'table':
      return (
        <div css={{ position: 'relative' }}>
          {selected && (
            <span
              contentEditable={false}
              css={{ position: 'absolute', top: 0, left: '50%' }}
            >
              <SquareIconButton
                borderColor={color.cold_red}
                iconColor={color.cold_red}
                afterBgColor={color.cold_red}
                Icon={trashCan}
                iconAfterColor={color.white}
                unFocusable
                onPress={() => {
                  TablesEditor.removeTable(editor);
                }}
              />
            </span>
          )}
          <table
            css={{
              ...style,
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
              textAlign: 'left',
              width: '100%',
              td: {
                outline: selected ? `1px dashed ${color.cold_blue}` : undefined,
              },
            }}
            {...attributes}
          >
            <tbody>{children}</tbody>
          </table>
        </div>
      );
    case 'tr':
      return (
        <tr css={{ ...style }} {...attributes}>
          {children}
        </tr>
      );
    case 'td':
      return (
        <td colSpan={1} css={{ ...style }} {...attributes}>
          {children}
        </td>
      );
    case 'empty': {
      return children;
    }
    case 'bq':
      return (
        <blockquote css={{ style }} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bl':
      return (
        <ul css={style} {...attributes}>
          {children}
        </ul>
      );
    case 'h1':
      return (
        <h1 css={style} {...attributes}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 css={style} {...attributes}>
          {children}
        </h2>
      );
    case 'li':
      return (
        <li css={style} {...attributes}>
          {children}
        </li>
      );
    case 'nl':
      return (
        <ol css={{ ...style, listStyleType: 'decimal' }} {...attributes}>
          {children}
        </ol>
      );
    case 'tag':
      return (
        <>
          <span css={style} {...attributes}>
            {children} <Tag text={element.tag} />
          </span>
        </>
      );
    case 'image':
      return (
        <span {...attributes} css={{ padding: '0 10px' }}>
          {children}
          <div
            css={{
              display: 'inline-block',
              position: 'relative',
            }}
          >
            {selected && ref.current && (
              <div
                css={{
                  display: 'inline-block',
                }}
              >
                <DraggableButton
                  backgroundColor={color.hot_red}
                  padding={5}
                  css={{ position: 'absolute', top: -5, left: -5 }}
                  onDrag={(client) => {
                    ImageEditor.setImageSize(editor, element, {
                      width: element.width - client.y,
                      height: element.height - client.y,
                    });
                  }}
                />
                <DraggableButton
                  backgroundColor={color.hot_red}
                  padding={5}
                  css={{ position: 'absolute', bottom: 0, left: -5 }}
                  onDrag={(client) => {
                    ImageEditor.setImageSize(editor, element, {
                      width: element.width + client.y,
                      height: element.height + client.y,
                    });
                  }}
                />
                <DraggableButton
                  backgroundColor={color.hot_red}
                  padding={5}
                  css={{ position: 'absolute', top: -5, right: -5 }}
                  onDrag={(client) => {
                    ImageEditor.setImageSize(editor, element, {
                      width: element.width + client.x,
                      height: element.height + client.x,
                    });
                  }}
                />
                <DraggableButton
                  backgroundColor={color.hot_red}
                  padding={5}
                  css={{ position: 'absolute', bottom: '50%', right: -5 }}
                  onDrag={(client) => {
                    ImageEditor.setImageSize(editor, element, {
                      width: element.width + client.x,
                      height: element.height,
                    });
                  }}
                />
                <DraggableButton
                  backgroundColor={color.hot_red}
                  padding={5}
                  css={{ position: 'absolute', bottom: 0, right: '50%' }}
                  onDrag={(client) => {
                    ImageEditor.setImageSize(editor, element, {
                      width: element.width,
                      height: element.height + client.y,
                    });
                  }}
                />
                <DraggableButton
                  backgroundColor={color.hot_red}
                  padding={5}
                  css={{ position: 'absolute', top: -5, right: '50%' }}
                  onDrag={(client) => {
                    ImageEditor.setImageSize(editor, element, {
                      width: element.width,
                      height: element.height - client.y,
                    });
                  }}
                />
                <DraggableButton
                  backgroundColor={color.hot_red}
                  padding={5}
                  css={{ position: 'absolute', bottom: '50%', left: -5 }}
                  onDrag={(client) => {
                    ImageEditor.setImageSize(editor, element, {
                      width: element.width - client.x,
                      height: element.height,
                    });
                  }}
                />
                <DraggableButton
                  backgroundColor={color.hot_red}
                  padding={5}
                  css={{ position: 'absolute', bottom: 0, right: -5 }}
                  onDrag={(client) => {
                    ImageEditor.setImageSize(editor, element, {
                      width: element.width + client.x,
                      height: element.height + client.y,
                    });
                  }}
                />
              </div>
            )}
            <img
              width={element.width}
              height={element.height}
              src={element.url}
              css={{ filter: selected ? 'brightness(0.5)' : 'none' }}
            ></img>
            {selected && (
              <div
                css={{
                  display: 'flex',
                  gap: 5,
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: color.coldBlack,
                  borderRadius: 7,
                  padding: '5px 10px',
                }}
              >
                <SquareIconButton
                  borderColor={color.cold_red}
                  iconColor={color.cold_red}
                  afterBgColor={color.cold_red}
                  Icon={trashCan}
                  iconAfterColor={color.white}
                  unFocusable
                  onPress={() => {
                    Transforms.removeNodes(editor, {
                      at: [],
                      match: (n) => n === element,
                    });
                  }}
                />
                {/* TODO:Change with icons */}
                <TextButton text="x1" borderColor={color.cold_blue} />
                <TextButton text="x2" borderColor={color.cold_blue} />
                <TextButton text="x3" borderColor={color.cold_blue} />
                <TextButton text="Origin" borderColor={color.cold_blue} />
              </div>
            )}
          </div>
        </span>
      );
    case 'react':
      return (
        <>
          {children}
          {element.node}
        </>
      );
    default:
      return (
        <p css={style} {...attributes}>
          {children}
        </p>
      );
  }
}
