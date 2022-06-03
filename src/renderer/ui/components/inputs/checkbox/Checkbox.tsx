import { forwardRef } from 'react';
import { FormHookProps } from '../input';
import './style/index.scss';
interface CheckboxProps {
  label?: string;
}
export default forwardRef(function Checkbox(
  { label, ...other }: CheckboxProps & FormHookProps,
  ref: any,
) {
  return (
    <div className="checkbox">
      <input type={'checkbox'} ref={ref} {...other} />
      <span>{label}</span>
    </div>
  );
});
