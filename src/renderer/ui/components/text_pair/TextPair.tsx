import { color } from '@assets/styles/color';
type TextType = {
  text: string | number;
  fontSize: number;
  fontColor?: string;
  fontWeight?: string | number;
};
interface TextPairProps {
  first: string | TextType;
  second: string | (TextType & { border?: boolean });
  reversed?: true;
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  flexGrow?: true;
  flexible?: true;
  gap?: number;
  width?: number | string;
}
export default function TextPair({
  first,
  second,
  reversed,
  alignItems,
  flexGrow,
  flexible,
  gap = 5,
  width,
}: TextPairProps) {
  return (
    <div
      css={{
        display: 'flex',
        gap: gap,
        flexDirection: reversed ? 'column-reverse' : 'column',
        alignItems: alignItems,
        flexGrow: flexGrow ? 1 : 0,
        flex: flexible && '1 0 0',
        width: flexible ? 0 : width,
        overflow: 'hidden',
      }}
    >
      <span
        css={{
          fontSize: typeof first != 'string' ? first?.fontSize : 17,
          fontWeight: typeof first != 'string' ? first?.fontWeight : 400,
          color: typeof first != 'string' ? first?.fontColor : color.white,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          overflowWrap: 'anywhere',
        }}
      >
        {typeof first == 'string' ? first : first.text}
      </span>
      <span
        css={{
          fontSize: typeof second != 'string' ? second?.fontSize : 12,
          fontWeight: typeof second != 'string' ? second?.fontWeight : 400,
          color:
            typeof second != 'string'
              ? second?.fontColor ?? color.text_gray
              : color.text_gray,
          border:
            typeof second != 'string' && second.border
              ? `1px solid ${color.border_color}`
              : undefined,
          padding:
            typeof second != 'string' && second.border ? '5px 10px' : undefined,
          borderRadius:
            typeof second != 'string' && second.border ? 7 : undefined,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {typeof second == 'string' ? second : second.text}
      </span>
    </div>
  );
}
