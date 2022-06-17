import { color } from '@assets/styles/color';
interface TextPairProps {
  first: string | { text: string; fontSize: number; fontColor?: string };
  second:
    | string
    | { text: string; fontSize: number; fontColor?: string; border?: string };
  reversed?: true;
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  flexGrow?: true;
  minWidth?: number | string;
}
export default function TextPair({
  first,
  second,
  reversed,
  alignItems,
  flexGrow,
  minWidth,
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
      }}
    >
      <span
        css={{
          fontSize: typeof first != 'string' ? first?.fontSize : 17,
          fontWeight: 500,
          color: typeof first != 'string' ? first?.fontColor : color.white,
        }}
      >
        {typeof first == 'string' ? first : first.text}
      </span>
      <span
        css={{
          fontSize: typeof second != 'string' ? second?.fontSize : 12,
          fontWeight: 500,
          color:
            typeof second != 'string' ? second?.fontColor : color.text_gray,
          border:
            typeof second != 'string'
              ? `1px solid ${color.border_color}`
              : undefined,
          padding: typeof second != 'string' ? '5px 10px' : undefined,
          borderRadius: typeof second != 'string' ? 7 : undefined,
        }}
      >
        {typeof second == 'string' ? second : second.text}
      </span>
    </div>
  );
}
