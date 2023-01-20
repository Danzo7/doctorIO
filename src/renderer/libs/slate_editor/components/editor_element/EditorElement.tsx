import { Interpolation, Theme } from '@emotion/react';
import { RenderElementProps, useSelected, useSlateStatic } from 'slate-react';
import './style/index.scss';
import { color } from '@assets/styles/color';
import DynamicElement from '../../dynamic_block/components/dynamic_element';
import ImageBlockElement from '@libs/slate_editor/slate-image/components/image_block_element';
import TagBlock from '@libs/slate_editor/slate-suggestion/components/tag_block';
import TableControl from '@libs/slate_editor/slate-tables/components/table_control';
import AttributeBlock from '@libs/slate_editor/slate-dynamic-attributes/components/attribute_block';

const letterSpacing = 6;
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
          {selected && <TableControl />}
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
        <td
          colSpan={element.colspan}
          rowSpan={element.rowspan}
          css={{ ...style, position: 'relative' }}
          {...attributes}
          valign="top"
        >
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
          {children?.map((child: any, index: number) => (
            <li
              css={{
                listStyleType: 'decimal',
                color: element.children[index]?.color ?? color.coldBlack,
              }}
              key={index}
            >
              {child}
            </li>
          ))}
        </ol>
      );
    case 'dynamic':
      return element.replace ? (
        <div
          css={{ ...style, height: element.height, border: '1px solid black' }}
          {...attributes}
        >
          {children}
        </div>
      ) : (
        <DynamicElement {...{ element, attributes, editor }}>
          {children}
        </DynamicElement>
      );
    case 'autofill':
      return (
        <>
          <span css={style} {...attributes}>
            <TagBlock text={element.children} behavior={element.behavior}>
              {children}
            </TagBlock>
          </span>
        </>
      );
    case 'attribute':
      return (
        <span css={style} {...attributes}>
          <AttributeBlock text={element.children} element={element}>
            {children}
          </AttributeBlock>
        </span>
      );
    case 'image':
      return (
        <span {...attributes} css={{ padding: '0 10px' }}>
          <ImageBlockElement
            element={element}
            show={selected}
            editor={editor}
          />
          {children}
        </span>
      );
    case 'react':
      return (
        <>
          {children}
          {element.node}
        </>
      );
    case 'span':
      return (
        <span css={style} {...attributes}>
          {children}
        </span>
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
