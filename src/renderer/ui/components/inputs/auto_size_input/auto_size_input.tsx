import { ClassAttributes, forwardRef, InputHTMLAttributes } from 'react';
import { RefCallBack } from 'react-hook-form';
interface AutoSizeInputProps {
  inputSize?: boolean | number;
}
export default forwardRef(function AutoSizeInput(
  {
    inputSize = true,

    ...others
  }: ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement> &
    AutoSizeInputProps,
  ref: any,
) {
  const inputRef = ref as RefCallBack;

  return (
    <input
      autoComplete="off"
      className="auto-size-input"
      ref={(e) => {
        inputRef?.(e);
        if (inputSize == true)
          e?.setAttribute(
            'style',
            `width:${
              (inputSize === true ? 2 : inputSize) +
              (e.value.toString().length - 1)
            }ch`,
          );
      }}
      {...others}
    />
  );
});
