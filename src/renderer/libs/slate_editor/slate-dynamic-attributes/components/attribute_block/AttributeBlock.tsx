import {
  AttributeElement,
  FormattedText,
} from '@libs/slate_editor/slate.types';
import { ReactNode } from 'react';
import NotAButton from '@components/not_a_button';
import TagIcon from 'toSvg/tag.svg?icon';
import { useSelected } from 'slate-react';
import { color } from '@assets/styles/color';

interface AttributeBlockProps {
  text: FormattedText[];
  children: ReactNode;
  element: AttributeElement;
}
export default function AttributeBlock({
  text: [text],
  element,
  children,
}: AttributeBlockProps) {
  const selected = useSelected();
  const tree = (
    val: 'bold' | 'italic' | 'underline' | false | undefined,
    el: ReactNode,
  ) =>
    val == 'bold' ? (
      <b>{el}</b>
    ) : val == 'italic' ? (
      <i>{el}</i>
    ) : val == 'underline' ? (
      <u>{el}</u>
    ) : (
      el
    );
  return (
    <NotAButton
      css={{
        outline: '2px solid ' + element?.color ?? color.warm_orange,
        outlineOffset: 1,
        overflow: 'visible',
      }}
      padding={0}
      radius={2}
      tip={'refer to: ' + element.reference}
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
                background: selected ? color.darker : undefined,
                alignItems: 'center',
                display: 'flex',
                gap: 5,
                color: text.color ?? color.coldBlack,
                fontSize: text.fontSize + 'pt',
                '> svg>path': {
                  fill: element?.color ?? color.warm_orange,
                },
              }}
            >
              <TagIcon fill={text.color ?? color.coldBlack} />
              {text.text}
            </span>,
          ),
        ),
      )}
    </NotAButton>
  );
}
