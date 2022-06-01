import { forwardRef, ReactNode, useRef, useState } from 'react';
import './style/index.scss';
import Arrow from 'toSvg/arrow.svg?icon';
import { FormHookProps } from '../input';

interface SelectProps {
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
    ...others
  }: SelectProps & FormHookProps,
  ref: any,
) {
  const field = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  function changeSelected(index: number) {
    setSelected(index);
    setOpen(false);
    field.current?.blur();
  }
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
        selected != -1 ? ' select' : ''
      }`}
      tabIndex={0}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      ref={field}
      onClick={(e) => {
        e.stopPropagation();
      }}
      css={{ width: width }}
    >
      <div className="select">
        {paddedLeading}
        <span> {selected < 0 ? placeholder : options[selected]}</span>{' '}
        {paddedTrailing}
      </div>
      <div className="options">
        {options &&
          options.map((e, index) => (
            <span key={e + index} onClick={() => changeSelected(index)}>
              {e}
            </span>
          ))}
      </div>
      <input
        ref={ref}
        {...others}
        value={options ? options[selected] : undefined}
        type="hidden"
      />
    </div>
  );
});
