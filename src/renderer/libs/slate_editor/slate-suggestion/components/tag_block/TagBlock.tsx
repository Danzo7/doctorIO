import { FormattedText, TagElement } from '@libs/slate_editor/slate.types';
import './style/index.scss';
import { ReactNode } from 'react';
import NotAButton from '@components/not_a_button';
import { color } from '@assets/styles/color';
import TagIcon from 'toSvg/tag.svg?icon';
import { useSelected } from 'slate-react';

interface TagBlockProps {
  text: FormattedText[];
  behavior: Pick<TagElement, 'behavior'>['behavior'];
  children: ReactNode;
}
export default function TagBlock({
  text: [text],
  behavior,
  children,
}: TagBlockProps) {
  const selected = useSelected();
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
  return behavior == 'attribute' ? (
    <NotAButton
      css={{
        border: '3px solid ' + color.warm_orange,
      }}
      padding={2}
      radius={2}
    >
      {children}
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
              {text.text}
            </span>,
          ),
        ),
      )}
    </NotAButton>
  ) : (
    <> {children}</>
  );
}
