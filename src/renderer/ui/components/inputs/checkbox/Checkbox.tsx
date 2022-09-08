import { forwardRef } from 'react';
import { ControllerProps } from '../input';
import './style/index.scss';
interface CheckboxProps extends ControllerProps {
  label?: string;
  disabled?: boolean;
}
export default forwardRef(function Checkbox(
  { label, field, disabled }: CheckboxProps,
  ref,
) {
  return (
    <div className={'checkbox' + (disabled ? ' disabled' : '')}>
      <input type={'checkbox'} {...field} ref={ref as any} />
      <span>{label}</span>
    </div>
  );
});
