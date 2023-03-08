import { color } from '@assets/styles/color';
import { isValidElement, ReactNode } from 'react';
type TextType = {
  text: string | number;
  fontSize: number;
  fontColor?: string;
  fontWeight?: string | number;
  maxWidth?: number | string;
};
interface TextPairProps {
  first: string | TextType | ReactNode;
  second: string | (TextType & { border?: boolean }) | ReactNode;
  reversed?: true;
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  flexGrow?: true;
  flexible?: true;
  gap?: number;
  width?: number | string;
  flexDirection?: 'row' | 'column';
}
export default function TextPair({
  first: fir,
  second: sec,
  reversed,
  alignItems,
  flexGrow,
  flexible,
  gap = 5,
  width,
  flexDirection = 'column',
}: TextPairProps) {
  const secEl = isValidElement(sec) ? sec : undefined;
  const second = sec as string | (TextType & { border?: boolean });
  const firEl = isValidElement(fir) ? fir : undefined;
  const first = fir as string | TextType;
  return (
    <div
      css={{
        display: 'flex',
        gap: gap,
        flexDirection:
          flexDirection == 'column'
            ? reversed
              ? 'column-reverse'
              : 'column'
            : reversed
            ? 'row-reverse'
            : 'row',
        alignItems: alignItems,
        flexGrow: flexGrow ? 1 : 0,
        flex: flexible && '1 0 0',
        width: flexible ? 0 : width,
        overflow: 'hidden',
      }}
    >
      {firEl ? (
        <>{firEl}</>
      ) : (
        <span
          css={{
            fontSize: typeof first != 'string' ? first?.fontSize : 17,
            fontWeight: typeof first != 'string' ? first?.fontWeight : 400,
            color: typeof first != 'string' ? first?.fontColor : color.white,
            maxWidth: typeof first != 'string' ? first?.maxWidth : undefined,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            overflowWrap: 'anywhere',
          }}
        >
          {typeof first == 'string' ? first : first.text}
        </span>
      )}
      {secEl ? (
        <>{secEl}</>
      ) : (
        <span
          css={{
            fontSize: typeof second != 'string' ? second?.fontSize : 12,
            fontWeight: typeof second != 'string' ? second?.fontWeight : 400,
            maxWidth: typeof second != 'string' ? second?.maxWidth : undefined,
            color:
              typeof second != 'string'
                ? second?.fontColor ?? color.text_gray
                : color.text_gray,
            border:
              typeof second != 'string' && second.border
                ? `1px solid ${color.border_color}`
                : undefined,
            padding:
              typeof second != 'string' && second.border
                ? '5px 10px'
                : undefined,
            borderRadius:
              typeof second != 'string' && second.border ? 7 : undefined,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {typeof second == 'string' ? second : second.text}
        </span>
      )}
    </div>
  );
}
