import { forwardRef } from 'react';
import { ControllerProps } from '../input';
import './style/index.scss';
interface CheckboxProps extends ControllerProps {
  label?: string;
}
export default forwardRef(function Checkbox(
  { label, field }: CheckboxProps,
  ref,
) {
  return (
    <div className="checkbox">
      <input type={'checkbox'} {...field} ref={ref as any} />
      <span>{label}</span>
    </div>
  );
});
