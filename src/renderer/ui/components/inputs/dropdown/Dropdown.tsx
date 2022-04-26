import React, { ReactNode, useRef, useState } from 'react';
import './style/index.scss';
import Arrow from 'toSvg/arrow.svg?icon';
import { css } from '@emotion/css';

interface DropdownProps {
  name: string;
  options: string[];
  placeholder: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onChange?: (value: string) => void;
}

export default function Dropdown({
  name,
  options,
  placeholder = '',
  leading,
  trailing,
  onChange,
}: DropdownProps) {
  const field = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  function changeSelected(index: number) {
    setSelected(index);
    setOpen(false);
    field.current?.blur();
    onChange?.(options[index]);
  }

  return (
    <div
      className={`dropdown-input${isOpen ? ' open' : ''}${
        selected != -1 ? ' select' : ''
      }`}
      tabIndex={0}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      ref={field}
    >
      <div className="dropdown">
        {leading}
        <span> {selected < 0 ? placeholder : options[selected]}</span>
        <Arrow width={10} className="arrow" />
        {trailing}
      </div>
      <div className="options">
        {options.map((e, index) => (
          <a onClick={() => changeSelected(index)}>{e}</a>
        ))}
      </div>
      <input
        type="text"
        value={selected}
        name={name}
        className={css`
          display: none;
        `}
        style={{ display: 'none' }}
      />
    </div>
  );
}
