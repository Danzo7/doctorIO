import { forwardRef, useState, ComponentProps } from 'react';
import './style/index.scss';
import EyePassword from '@components/buttons/eye_password';
import InputWrapper from '../input_wrapper';
import { ControllerProps } from '../input';
interface PasswordInputProps
  extends ControllerProps,
    Pick<
      ComponentProps<typeof InputWrapper>,
      'disabled' | 'background' | 'radius' | 'touchFirst' | 'leading'
    > {
  placeholder?: string;
}
export default forwardRef(function PasswordInput(
  {
    field,
    fieldState,
    onChanged,
    placeholder,
    disabled,
    background,
    leading,
    radius,
    touchFirst,
  }: PasswordInputProps,
  ref: any,
) {
  const [show, setShow] = useState(false);
  const { onChange, ...others } = field;

  return (
    <InputWrapper
      errorMessage={fieldState?.error?.message}
      leading={leading}
      trailing={<EyePassword value={show} onPress={() => setShow(!show)} />}
      fillContainer
      disabled={disabled}
      background={background}
      radius={radius}
      touchFirst={touchFirst}
    >
      <input
        placeholder={placeholder}
        type={show ? 'text' : 'password'}
        disabled={disabled}
        onChange={(e) => {
          onChanged?.(e.target.value);
          onChange?.(e.target.value);
        }}
        ref={ref}
        {...others}
      />
    </InputWrapper>
  );
});
