import { Fragment, MouseEvent, useState } from 'react';
import './style/index.scss';
interface MultiOptionSwitcherProps {
  textList: string[];
  defaultSelected?: number;
  growOnselection?: boolean;
  onChange?: (selected: number, event?: MouseEvent<HTMLElement>) => void;
}
function MultiOptionSwitcher({
  textList,
  defaultSelected = 0,
  growOnselection = false,
  onChange,
}: MultiOptionSwitcherProps) {
  const [selected, setSelected] = useState(defaultSelected);
  const changeSelected = (index: number, e: MouseEvent<HTMLElement>) => {
    setSelected(index);
    onChange?.(index, e);
  };
  return (
    <div className="multi-option-switcher">
      {textList.map((text, index) => (
        <Fragment key={index}>
          <div
            className={`text${selected === index ? ' selected' : ''}${
              growOnselection ? ' grow' : ''
            }`}
            onClick={(e) => changeSelected(index, e)}
          >
            {text}
          </div>
          {index !== textList.length - 1 && <div className="separator" />}
        </Fragment>
      ))}
    </div>
  );
}

export default MultiOptionSwitcher;
