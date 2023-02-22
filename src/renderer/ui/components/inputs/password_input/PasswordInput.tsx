import { forwardRef, useState, ComponentProps } from 'react';
import './style/index.scss';
import EyePassword from '@components/buttons/eye_password';
import InputWrapper from '../input_wrapper';
import { ControllerProps } from '../input';
interface PasswordInputProps
  extends ControllerProps,
    Omit<ComponentProps<typeof InputWrapper>, 'trailing' | 'children'> {
  placeholder?: string;
}
export default forwardRef(function PasswordInput(
  { field, onChanged, placeholder, disabled, ...rest }: PasswordInputProps,
  ref: any,
) {
  const [show, setShow] = useState(false);
  const { onChange, ...others } = field;
  return (
    <InputWrapper
      trailing={<EyePassword value={show} onPress={() => setShow(!show)} />}
      fillContainer
      disabled={disabled}
      {...rest}
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
