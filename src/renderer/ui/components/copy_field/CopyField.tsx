import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import InputContainer from '@components/inputs/input_container';
import InputWrapper from '@components/inputs/input_wrapper';
import { useRef } from 'react';

interface CopyFieldProps {
  text: string;
  hint?: string;
}
export default function CopyField({ text, hint }: CopyFieldProps) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <InputContainer hint={hint} grow={true}>
      <InputWrapper
        fillContainer={true}
        trailing={
          <TextButton
            text="Copy"
            backgroundColor={color.cold_blue}
            fontSize={13}
            fontWeight={700}
            alignSelf="center"
            padding={5}
            onPress={() => {
              if (ref.current && window.getSelection && document.createRange) {
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(ref.current);
                selection?.removeAllRanges();
                selection?.addRange(range);
              }
              navigator.clipboard.writeText(text);
            }}
          />
        }
      >
        <span ref={ref} css={{ userSelect: 'all', cursor: 'pointer' }}>
          {text}
        </span>
      </InputWrapper>
    </InputContainer>
  );
}
