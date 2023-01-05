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
export default function EditorElement({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const selected = useSelected();
  const editor = useSlate();
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
                  Transforms.removeNodes(editor, {
                    at: [],
                    match: (n) => n === element,
                  });
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
            {children}
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
