import { forwardRef } from 'react';

import { ControllerProps } from '../input';
import './style/index.scss';
interface TextAreaProps extends ControllerProps {
  defaultValue?: string;
  onSubmit?: () => void;
  placeholder?: string;
}
export default forwardRef(function TextArea(
  { defaultValue, field, placeholder, onChanged }: TextAreaProps,
  ref,
) {
  //const [changed, setChanged] = useState(false);
  const { onChange, ...others } = field;

  return (
    <div className="text-area">
      <textarea
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => {
          onChange?.(e);
          onChanged?.(e.target.value);
        }}
        {...others}
        ref={ref as any}
      />
    </div>
  );
});
