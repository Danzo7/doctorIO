import { color } from '@assets/styles/color';
interface TextPairProps {
  first: string | { text: string; fontSize: number; fontColor?: string };
  second: string | { text: string; fontSize: number; fontColor?: string };
  reversed?: true;
}
export default function TextPair({ first, second, reversed }: TextPairProps) {
  return (
    <div
      css={{
        display: 'flex',
        gap: 5,
        flexDirection: reversed ? 'column-reverse' : 'column',
      }}
    >
      <span
        css={{
          fontSize: typeof first != 'string' ? first.fontSize : 15,
          color: typeof first != 'string' ? first?.fontColor : color.white,
        }}
      >
        {typeof first == 'string' ? first : first.text}
      </span>
      <span
        css={{
          fontSize: typeof second != 'string' ? second.fontSize : 12,
          color:
            typeof second != 'string' ? second?.fontColor : color.text_gray,
        }}
      >
        {typeof second == 'string' ? second : second.text}
      </span>
    </div>
  );
}
