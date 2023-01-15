import { Interpolation, Theme } from '@emotion/react';
import {
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from 'slate-react';
import './style/index.scss';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import trashCan from 'toSvg/trash_can.svg?icon';
import { Transforms } from 'slate';
import { TablesEditor } from '@components/text_editor/slate-tables';
import {
  ComponentProps,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { ImageEditor } from '@components/text_editor/slate-image/ImageEditor';
import { FormattedText } from '@components/text_editor/slate.types';
import TagIcon from 'toSvg/tag.svg?icon';
import NotAButton from '@components/not_a_button';

const Tag = ({ text: [text] }: { text: FormattedText[] }) => {
  const selected = useSelected();
  const focused = useFocused();
  const tree = (
    val: 'bold' | 'italic' | 'underline' | false | undefined,
    element: ReactNode,
  ) =>
    val == 'bold' ? (
      <b>{element}</b>
    ) : val == 'italic' ? (
      <i>{element}</i>
    ) : val == 'underline' ? (
      <u>{element}</u>
    ) : (
      element
    );
  return (
    <NotAButton
      css={{
        border: '3px solid ' + color.warm_orange,
      }}
      padding={5}
      radius={5}
    >
      {tree(
        text.underline && 'underline',
        tree(
          text.italic && 'italic',
          tree(
            text.bold && 'bold',
            <span
              css={{
                background: selected ? color.cold_blue : undefined,
                alignItems: 'center',
                display: 'flex',
                gap: 5,
                color: color.coldBlack,
                fontSize: text.fontSize + 'pt',
                '> svg>path': {
                  fill: color.warm_orange,
                },
              }}
            >
              <TagIcon fill={color.good_black} />
              text.text
            </span>,
          ),
        ),
      )}
    </NotAButton>
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
const letterSpacing = 6;
//TODO split to multiple components and determine type using "is" (like slate-table)
export default function EditorElement({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const selected = useSelected();
  const editor = useSlateStatic();

  const style: Interpolation<Theme> = {
    textAlign: (element as any)?.align,
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
            {children} <Tag text={element.children} />
          </span>
        </>
      );
    case 'image':
      return (
        <span {...attributes} css={{ padding: '0 10px' }}>
          {children}
          <span
            css={{
              display: 'inline-block',
              position: 'relative',
            }}
          >
            <img
              width={element.width}
              height={element.height}
              src={element.url}
              css={{ filter: selected ? 'brightness(0.5)' : 'none' }}
            ></img>
            {selected && (
              <span
                css={{
                  display: 'inline-block',
                  zIndex: 10,
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
                      width: element.width + client.y,
                      height: element.height + client.y,
                    });
                  }}
                />
              </span>
            )}
            {selected && (
              <span
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
              </span>
            )}
          </span>
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
        <p
          css={{ ...style, margin: `0 0 ${letterSpacing}pt 0` }}
          {...attributes}
        >
          {children}
        </p>
      );
  }
}
