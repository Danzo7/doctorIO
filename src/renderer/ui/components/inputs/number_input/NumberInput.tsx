import minus from 'toSvg/minus.svg?icon';
import add from 'toSvg/add.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import InputWrapper from '../input_wrapper/InputWrapper';
import { forwardRef } from 'react';
import AutoSizeInput from '../auto_size_input';
import { color } from '@assets/styles/color';
import { ControllerProps } from '../input';

interface NumberInputProps extends ControllerProps {
  placeholder?: string;
  padding?: number;
  fillContainer?: true;
  inputAlignment?: string;
  errorMessage?: string;
  width?: string | number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  isOptional?: boolean;
  touchFirst?: true;
}
export default forwardRef(function NumberInput(
  {
    padding,
    fillContainer,
    inputAlignment,
    placeholder,
    step = 0.1,
    unit = '',
    width = 'fit-content',
    field,
    fieldState,
    disabled,
    isOptional = false,
    touchFirst,
    rules = { max: 100, min: 0, maxLength: 1000 },
  }: NumberInputProps,
  ref: any,
) {
  const { onChange, value, onBlur, ...others } = field;
  const checkValue = (v: string, external?: boolean) => {
    if (
      Number(v) <= (rules?.max ?? Infinity) &&
      (external || Number(v) >= (rules?.min ?? 0))
    ) {
      return v;
    } else if (rules.max && Number(v) > rules.max) return rules.max.toString();
    else if (rules.min && Number(v) < rules.min) return rules.min.toString();
  };
  const setValue = (vs: string, external?: boolean, cast?: boolean) =>
    onChange(
      cast ? Number(checkValue(vs, external)) : checkValue(vs, external),
    );

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
  const parseValue = (v: string) => {
    const parsed = Number.parseFloat(v);
    setValue(
      isNaN(parsed)
        ? isOptional
          ? ''
          : '0'
        : parsed.toFixed(step.toString().split('.')[1]?.length ?? 0),
      undefined,
      !isOptional,
    );
  };
  return (
    <InputWrapper
      maxWidth={width}
      errorMessage={fieldState?.error?.message}
      padding={padding}
      fillContainer={fillContainer}
      inputAlignment={inputAlignment}
      disabled={disabled}
      touchFirst={touchFirst}
      onClick={(e) => {
        e.preventDefault();
        const input = e.currentTarget?.querySelector('input');

        const end = input?.value?.length ?? 0;
        input?.setSelectionRange(end, end);
      }}
      onWheel={(e) => {
        const direction = e.deltaY > 0 ? 1 : 0;
        (e.currentTarget?.children[1].children[0] as HTMLInputElement)?.focus();
        if (direction > 0) decrease();
        else increase();
        e.stopPropagation();
      }}
      leading={
        <SquareIconButton
          tip="Decrease"
          Icon={minus}
          onPress={decrease}
          unFocusable
          blank
        />
      }
      trailing={
        <SquareIconButton
          tip="Increase"
          Icon={add}
          onPress={increase}
          blank
          unFocusable
        />
      }
    >
      <AutoSizeInput
        css={{ textAlign: 'end' }}
        onKeyDown={(e) => {
          if (e.key == 'ArrowUp') increase();
          if (e.key == 'ArrowDown') decrease();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        type="text"
        onBlur={() => {
          parseValue(value);
          onBlur();
        }}
        onChange={(event) => {
          let v = event.target.value;
          if (step.toString().includes('.')) {
            v = v.startsWith('.')
              ? '0.' + v
              : v.length == 2 && v.charAt(0) === '0' && v.charAt(1) !== '.'
              ? [v.slice(0, 1), '.', v.slice(1)].join('')
              : v;
            v = v.startsWith('.') ? '0.' + v : v;
          } else {
            v = v.startsWith('0') && v.length > 1 ? v.slice(1) : v;
          }
          const floatRegex = new RegExp(
            '(^([0-9])' +
              (step.toString().includes('.')
                ? '+(.' +
                  '[0-9]{0,' +
                  step.toString().split('.')[1]?.length +
                  '})?'
                : '*') +
              ')',
            'g',
          );
          const res = v?.match(floatRegex)?.join('') ?? '';
          if (!Number.isNaN(Number(res))) setValue(res, true);
        }}
        {...others}
        value={value}
        ref={ref}
        maxLength={rules?.maxLength as number}
        placeholder={placeholder}
      />
      {unit && (
        <span css={{ fontSize: 14, color: color.text_gray }}>{unit}</span>
      )}
    </InputWrapper>
  );
});
