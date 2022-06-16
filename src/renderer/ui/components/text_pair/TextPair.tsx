import { color } from '@assets/styles/color';
interface TextPairProps {
  first: string | { text: string; fontSize: number; fontColor?: string };
  second: string | { text: string; fontSize: number; fontColor?: string };
  reversed?: true;
  alignItems?: 'flex-start' | 'flex-end' | 'center';
}
export default function TextPair({
  first,
  second,
  reversed,
  alignItems,
}: TextPairProps) {
  return (
    <div
      css={{
        display: 'flex',
        gap: 5,
        flexDirection: reversed ? 'column-reverse' : 'column',
        alignItems: alignItems,
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
        }}
      >
        {typeof second == 'string' ? second : second.text}
      </span>
    </div>
  );
}
