import { ControllerProps } from '@components/inputs/input';
import { forwardRef } from 'react';

import './style/index.scss';
interface RoundedCheckboxProps extends ControllerProps {
  label?: string;
}
export default forwardRef(function RoundedCheckbox(
  { label, field }: RoundedCheckboxProps,
  ref,
) {
  return (
    <div className="rounded-checkbox">
      <div className="rounded-div">
        <input type={'checkbox'} {...field} ref={ref as any} />
      </div>
      <span>{label}</span>
    </div>
  );
});
