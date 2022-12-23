import { forwardRef } from 'react';
import { ControllerProps } from '../input';
import './style/index.scss';
interface CheckboxProps extends ControllerProps {
  label?: string;
  disabled?: boolean;
}
export default forwardRef(function Checkbox(
  { label, field, disabled, onChanged }: CheckboxProps,
  ref,
) {
  return (
    <div className={'checkbox' + (disabled ? ' disabled' : '')}>
      <input
        type={'checkbox'}
        {...field}
        ref={ref as any}
        checked={field.value}
        onChange={(e) => {
          field.onChange(e.target.checked);
          onChanged?.(e.target.checked);
        }}
      />
      <span>{label}</span>
    </div>
  );
});
