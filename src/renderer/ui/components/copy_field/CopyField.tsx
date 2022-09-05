import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import InputContainer from '@components/inputs/input_container';
import InputWrapper from '@components/inputs/input_wrapper';

interface CopyFieldProps {
  text: string;
  hint?: string;
}
export default function CopyField({ text, hint }: CopyFieldProps) {
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
              navigator.clipboard.writeText(text);
            }}
          />
        }
      >
        <span css={{ userSelect: 'all', cursor: 'pointer' }}>{text}</span>
      </InputWrapper>
    </InputContainer>
  );
}
