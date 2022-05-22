import { Fragment, useState } from 'react';
import './style/index.scss';
interface MultiOptionSwitcherProps {
  textList: string[];
  defaultSelected?: number;
  growOnselection?: boolean;
}
function MultiOptionSwitcher({
  textList,
  defaultSelected = 0,
  growOnselection = false,
}: MultiOptionSwitcherProps) {
  const [selected, setSelected] = useState(defaultSelected);
  return (
    <div className="multi-option-switcher">
      {textList.map((text, index) => (
        <Fragment key={index}>
          <div
            className={`text${selected === index ? ' selected' : ''}${
              growOnselection ? ' grow' : ''
            }`}
            onClick={() => setSelected(index)}
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
