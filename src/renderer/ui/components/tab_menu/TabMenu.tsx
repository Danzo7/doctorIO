import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import React, { useState } from 'react';
import './style/index.scss';
interface TabMenuProps {
  textList: Array<string>;
  defaultSelected?: number;
}
export default function TabMenu({
  textList = [],
  defaultSelected = 0,
}: TabMenuProps) {
  const [selected, setSelected] = useState(defaultSelected);
  return (
    <div className="tab-menu">
      {textList.map((text, index) => (
        <DarkLightCornerButton
          title={text}
          isActive={selected == index}
          onPress={() => {
            setSelected(index);
          }}
        />
      ))}
    </div>
  );
}
