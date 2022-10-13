import { forwardRef } from 'react';

import { ControllerProps } from '../input';
import './style/index.scss';
interface TextAreaProps extends ControllerProps {
  defaultValue?: string;
  onSubmit?: () => void;
  placeholder?: string;
}
export default forwardRef(function TextArea(
  { defaultValue, fieldState, field, placeholder }: TextAreaProps,
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
          // setChanged(true);
        }}
        {...others}
        ref={ref as any}
      />

      {/* {changed && (
        <div className="save-btn-wrapper">
          <TextButton
            text="Save"
            backgroundColor={color.secondary_color}
            fontSize={14}
            disabled={fieldState?.error}
          />
        </div>
      )} */}
    </div>
  );
});
