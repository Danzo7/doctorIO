import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { forwardRef, useState } from 'react';
import { FormHookProps } from '../input';
import InputContainer from '../input_container';
import InputWrapper from '../input_wrapper';
import './style/index.scss';
interface TextAreaProps {
  label?: string;
  errorMessage?: string;
  hint?: string;
  fillContainer?: true;
  onSubmit?: any;
}
export default forwardRef(function TextArea(
  {
    label,
    errorMessage,
    hint,
    fillContainer,
    onChange,
    onSubmit,
    ...others
  }: TextAreaProps & FormHookProps,
  ref,
) {
  const [changed, setChanged] = useState(false);
  return (
    <InputContainer
      label={label}
      errorMessage={errorMessage}
      hint={hint}
      fillContainer={fillContainer}
    >
      <InputWrapper
        height={'fit-content'}
        errorMessage={errorMessage}
        fillContainer={fillContainer}
      >
        <div className="text-area">
          <textarea
            placeholder="write something..."
            {...others}
            onChange={(e) => {
              onChange?.(e);
              setChanged(true);
            }}
            ref={ref as any}
          />

          {changed && (
            <div className="save-btn-wrapper">
              <TextButton
                text="Save"
                backgroundColor={color.secondary_color}
                fontSize={14}
                disabled={!!errorMessage}
                onPress={() => {
                  onSubmit?.();
                  if (!errorMessage) setChanged(false);
                }}
              />
            </div>
          )}
        </div>
      </InputWrapper>
    </InputContainer>
  );
});
