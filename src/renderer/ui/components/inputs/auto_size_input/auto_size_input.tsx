import { ClassAttributes, InputHTMLAttributes, useEffect, useRef } from 'react';
interface AutoSizeInputProps {
  inputSize?: boolean | number;
}
export default function AutoSizeInput({
  inputSize = true,

  ...others
}: ClassAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement> &
  AutoSizeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputSize == true)
      inputRef.current?.setAttribute(
        'style',
        `width:${
          (inputSize === true ? 3 : inputSize) +
          (inputRef.current?.value.toString().length - 1 ?? 0)
        }ch`,
      );
  });
  return <input className="auto-size-input" ref={inputRef} {...others} />;
}
