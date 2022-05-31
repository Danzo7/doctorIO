import minus from 'toSvg/minus.svg?icon';
import add from 'toSvg/add.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import InputWrapper from '../input_wrapper/InputWrapper';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import AutoSizeInput from '../auto_size_input';
import { color } from '@assets/styles/color';

interface NumberInputProps {
  placeholder?: string;
  padding?: number;
  flexGrow?: number;
  inputAlignment?: string;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
  width?: string | number;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
}
export default function NumberInput({
  errorMessage,
  padding,
  flexGrow,
  inputAlignment,
  placeholder,
  register,
  step = 0.1,
  max = 100000,
  min = 0,
  unit = 'kg',
  width = 'fit-content',
}: NumberInputProps) {
  const [value, changeValue] = useState(min.toString());
  const setValue = (v: string, external?: boolean) => {
    if (Number(v) <= max && (external || Number(v) >= min)) changeValue(v);
    else if (Number(v) > max) changeValue(max.toString());
    else if (Number(v) < min) changeValue(min.toString());
  };
  const increase = () => {
    setValue(
      (Number(value) + step).toFixed(
        step.toString().split('.')[1]?.length ?? 0,
      ),
    );
  };
  const decrease = () => {
    setValue(
      (Number(value) - step).toFixed(
        step.toString().split('.')[1]?.length ?? 0,
      ),
    );
  };
  return (
    <InputWrapper
      maxWidth={width}
      errorMessage={errorMessage}
      padding={padding}
      flexGrow={flexGrow}
      inputAlignment={inputAlignment}
      onClick={(e) => {
        e.preventDefault();
        const input = e.currentTarget?.children[1]
          .children[0] as HTMLInputElement;

        const end = input?.value?.length ?? 0;
        input.setSelectionRange(end, end);
      }}
      onWheel={(e) => {
        const direction = e.deltaY > 0 ? -1 < 0 : 0;
        (e.currentTarget?.children[1].children[0] as HTMLInputElement)?.focus();
        if (direction > 0) decrease();
        else increase();
        e.stopPropagation();
      }}
      leading={<SquareIconButton svg={minus} onPress={decrease} />}
      trailing={<SquareIconButton svg={add} onPress={increase} />}
    >
      <AutoSizeInput
        onKeyDown={(e) => {
          if (e.key == 'ArrowUp') increase();
          if (e.key == 'ArrowDown') decrease();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        type="text"
        value={value}
        onWheel={(e) => {
          e.preventDefault();
          const direction = e.deltaY > 0 ? -1 < 0 : 0;
          if (direction > 0) decrease();
          else increase();
          e.stopPropagation();
        }}
        onChange={(event) => {
          let v = event.target.value;
          v = v.startsWith('.')
            ? '0.' + v
            : v.length == 2 && v.charAt(0) === '0' && v.charAt(1) !== '.'
            ? [v.slice(0, 1), '.', v.slice(1)].join('')
            : v;
          v = v.startsWith('.') ? '0.' + v : v;
          const floatRegex = new RegExp(
            '(^([0-9])+(' + step.toString().includes('.')
              ? '.'
              : '' + '[0-9]{0,' + step.toString().split('.')[1]?.length ??
                '' + '})?)',
            'g',
          );
          const res = v?.match(floatRegex)?.join('') ?? '';
          if (!Number.isNaN(Number(res))) setValue(res, true);
        }}
        {...register}
        placeholder={placeholder}
      />
      {unit && (
        <span css={{ fontSize: 14, color: color.text_gray }}>{unit}</span>
      )}
    </InputWrapper>
  );
}
