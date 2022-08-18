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
  defaultSelected?: string;
}

export default forwardRef(function Select(
  {
    options,
    placeholder = '',
    icon,
    padding = 10,
    width,
    defaultSelected,
    ...others
  }: SelectProps & FormHookProps,
  ref: any,
) {
  const field = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState({
    selected: defaultSelected ? defaultSelected : '',
  });
  function changeSelected(index: number) {
    setSelected({ selected: options[index] });
    others.onChange?.(options[index] as any);

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
        selected.selected != '' ? ' select' : ''
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
        <span>
          {' '}
          {selected.selected == '' ? placeholder : selected.selected}
        </span>{' '}
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
      <input ref={ref} {...others} value={selected.selected} type="hidden" />
    </div>
  );
});
