import { color } from '@assets/styles/color';
interface TextPairProps {
  first:
    | string
    | {
        text: string;
        fontSize: number;
        fontColor?: string;
        fontWeight?: string;
      };
  second:
    | string
    | {
        text: string;
        fontSize: number;
        fontColor?: string;
        fontWeight?: string;
        border?: boolean;
      };
  reversed?: true;
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  flexGrow?: true;
  minWidth?: number | string;
  maxWidth?: number | string;
}
export default function TextPair({
  first,
  second,
  reversed,
  alignItems,
  flexGrow,
  minWidth,
  maxWidth,
}: TextPairProps) {
  return (
    <div
      css={{
        display: 'flex',
        gap: 5,
        flexDirection: reversed ? 'column-reverse' : 'column',
        alignItems: alignItems,
        flexGrow: flexGrow ? 1 : 0,
        minWidth: minWidth,
        maxWidth: maxWidth,
      }}
    >
      <span
        css={{
          fontSize: typeof first != 'string' ? first?.fontSize : 17,
          fontWeight: typeof first != 'string' ? first?.fontWeight : 600,
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
          fontWeight: typeof first != 'string' ? first?.fontWeight : 600,
          color:
            typeof second != 'string' ? second?.fontColor : color.text_gray,
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
