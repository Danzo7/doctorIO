import { color } from '@assets/styles/color';
import { Fragment, MouseEvent, useState } from 'react';
import './style/index.scss';
interface MultiOptionSwitcherProps {
  textList: string[];
  defaultSelected?: number;
  growOnselection?: boolean;
  noBorder?: boolean;
  noSep?: boolean;
  backgroundColor?: string;
  onChange?: (selected: number, event?: MouseEvent<HTMLElement>) => void;
}
function MultiOptionSwitcher({
  textList,
  defaultSelected = 0,
  growOnselection = false,
  noBorder = false,
  noSep = false,
  backgroundColor,
  onChange,
}: MultiOptionSwitcherProps) {
  const [selected, setSelected] = useState(defaultSelected);
  const changeSelected = (index: number, e: MouseEvent<HTMLElement>) => {
    setSelected(index);
    onChange?.(index, e);
  };
  return (
    <div
      className="multi-option-switcher"
      css={{
        border: !noBorder ? `1px solid ${color.border_color}` : undefined,
        backgroundColor: backgroundColor ? backgroundColor : undefined,
      }}
    >
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
          {index !== textList.length - 1 &&
            (!noSep ? <div className="separator" /> : undefined)}
        </Fragment>
      ))}
    </div>
  );
}

export default MultiOptionSwitcher;
