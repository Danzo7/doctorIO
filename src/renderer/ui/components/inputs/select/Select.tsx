import { forwardRef, ReactNode, useState } from 'react';
import './style/index.scss';
import Arrow from 'toSvg/arrow.svg?icon';
import { ControllerProps } from '../input';

interface SelectProps extends ControllerProps {
  options: string[];
  placeholder?: string;
  icon?: ReactNode;
  padding?: number;
  width?: number | string;
}

export default forwardRef(function Select(
  {
    options,
    placeholder = '',
    icon,
    padding = 10,
    width,
    field,
    onChanged,
  }: SelectProps,
  ref: any,
) {
  const [isOpen, setOpen] = useState(false);

  const paddedLeading = (
    <div
      css={{
        paddingLeft: icon ? padding : undefined,
      }}
    >
      {icon}
    </div>
  );
  const paddedTrailing = (
    <div
      css={{
        paddingRight: padding,
      }}
    >
      {<Arrow width={10} className="arrow" />}
    </div>
  );
  return (
    <div
      className={`select-input${isOpen ? ' open' : ''}${
        field.value != '' ? ' select' : ''
      }`}
      tabIndex={0}
      onBlur={() => setOpen(false)}
      ref={ref}
      onClick={(e) => {
        setOpen(!isOpen);
        e.stopPropagation();
      }}
      css={{ width: width }}
    >
      <div className="select">
        {paddedLeading}
        <span>{field.value == '' ? placeholder : field.value}</span>
        {paddedTrailing}
      </div>
      <div className="options">
        {options &&
          options.map((e, index) => (
            <span
              key={e + index}
              onClick={() => {
                field.onChange?.(options[index]);
                onChanged?.(options[index]);
                setOpen(false);
              }}
            >
              {e}
            </span>
          ))}
      </div>
      <input {...field} type="hidden" />
    </div>
  );
});
