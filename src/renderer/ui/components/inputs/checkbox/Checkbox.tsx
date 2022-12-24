import { forwardRef } from 'react';
import { ControllerProps } from '../input';
import './style/index.scss';
import { color } from '@assets/styles/color';
interface CheckboxProps extends ControllerProps {
  label?: string;
  disabled?: boolean;
  border?: boolean;
}
export default forwardRef(function Checkbox(
  { label, field, disabled, onChanged, border }: CheckboxProps,
  ref,
) {
  return (
    <div
      className={'checkbox' + (disabled ? ' disabled' : '')}
      css={{
        border: border ? `1px solid ${color.border_color} ` : undefined,
        padding: border ? 5 : 0,
        borderRadius: border ? 7 : 0,
      }}
    >
      <input
        type={'checkbox'}
        {...field}
        ref={ref as any}
        checked={field.value}
        onChange={(e) => {
          field.onChange(e.target.checked);
          onChanged?.(e.target.checked);
        }}
        id={field.name}
      />
      <label htmlFor={field.name}>{label}</label>
    </div>
  );
});
