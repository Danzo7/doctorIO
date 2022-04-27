import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import React, { useState } from 'react';
import './style/index.scss';
interface TabMenuProps {
  textList: Array<string>;
  defaultSelected?: number;
  onChanged?: (selected: number) => void;
}
export default function TabMenu({
  textList = [],
  defaultSelected = 0,
  onChanged,
}: TabMenuProps) {
  const [selected, setSelected] = useState(defaultSelected);
  function setTab(index: number) {
    setSelected(index);
    onChanged?.(index);
  }
  return (
    <div className="tab-menu">
      {textList.map((text, index) => (
        <DarkLightCornerButton
          title={text}
          isActive={selected == index}
          onPress={() => setTab(index)}
        />
      ))}
    </div>
  );
}
