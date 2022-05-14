import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { useState } from 'react';
import './style/index.scss';
interface TabMenuProps {
  textList: Array<string>;
  defaultSelected?: number;
  onChanged?: (selected: number) => void;
  borderBottom?: boolean;
}
export default function TabMenu({
  textList = [],
  defaultSelected = 0,
  onChanged,
  borderBottom = true,
}: TabMenuProps) {
  const [selected, setSelected] = useState(defaultSelected);
  function setTab(index: number) {
    setSelected(index);
    onChanged?.(index);
  }
  return (
    <div className={`tab-menu ${borderBottom ? 'border-bottom' : ''} `}>
      {textList.map((text, index) => (
        <DarkLightCornerButton
          key={index}
          title={text}
          isActive={selected == index}
          onPress={() => setTab(index)}
        />
      ))}
    </div>
  );
}
