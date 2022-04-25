import React, { useState } from 'react';
import './style/index.scss';
import Arrow from 'toSvg/arrow.svg?icon';
interface DropdownProps {}
const items: string[] = ['option1', 'option2', 'else'];

export default function Dropdown({}: DropdownProps) {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState('...');
  return (
    <div
      className={`dropdown-input${isOpen ? ' open' : ''}`}
      onClick={() => setOpen(!isOpen)}
    >
      <div className="dropdown">
        <span> {selected}</span>
        <Arrow width={10} />
      </div>
      <div className="options">
        {items.map((e) => (
          <a onClick={() => setSelected(e)}>{e}</a>
        ))}
      </div>
    </div>
  );
}
