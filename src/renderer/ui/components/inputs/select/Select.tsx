import { ReactNode, useRef, useState } from 'react';
import './style/index.scss';
import Arrow from 'toSvg/arrow.svg?icon';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps {
  options: string[];
  placeholder?: string;
  icon?: ReactNode;
  onChange?: (value: string) => void;
  padding?: number;
  register?: UseFormRegisterReturn;
  width?: number | string;
}

export default function Select({
  options,
  placeholder = '',
  icon,
  onChange,
  register,
  padding = 10,
  width,
}: SelectProps) {
  const field = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  function changeSelected(index: number) {
    setSelected(index);
    setOpen(false);
    field.current?.blur();
    onChange?.(options[index]);
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
        {...register}
        value={options ? options[selected] : undefined}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        type="hidden"
      />
    </div>
  );
}
