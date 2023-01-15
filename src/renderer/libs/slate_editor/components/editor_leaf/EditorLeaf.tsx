import { RenderLeafProps } from 'slate-react';
import './style/index.scss';
import { color } from '@assets/styles/color';
import { Interpolation, Theme } from '@emotion/react';
export default function EditorLeaf({
  attributes,
  children,
  leaf,
}: RenderLeafProps) {
  const style: Interpolation<Theme> = {
    span: {
      fontSize: (leaf.fontSize ?? 12) + 'pt',
      listStyleType: 'auto',
      fontFamily: "'Roboto', sans-serif",
      color: leaf.color ?? color.coldBlack,
    },
  };
  if (leaf.bold) {
    children = <strong css={style}>{children}</strong>;
  }

  if (leaf.code) {
    children = <code css={style}>{children}</code>;
  }

  if (leaf.italic) {
    children = <em css={style}>{children}</em>;
  }

  if (leaf.underline) {
    children = (
      <u css={{ ...style, textDecorationColor: leaf.color ?? color.coldBlack }}>
        {children}
      </u>
    );
  }

  return (
    <span css={style} {...attributes}>
      {children}
    </span>
  );
}
