import color from '@assets/styles/color';
import DarkAddButton from '@components/buttons/dark_add_button';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { Overlay_u } from '@stores/overlayStore';
import { ReactNode, useRef, useState } from 'react';
import './style/index.scss';

interface TabType {
  label: string;
  content: ReactNode;
}

interface TabComponentProps {
  items: TabType[];
  defaultSelected?: number;
  onChanged?: ({ item, index }: { item: string; index: number }) => void;
  menuItemsAlignment?: 'flex-start' | 'flex-end' | 'center';
  borderBottom?: boolean;
  onAdd?: (newTab: TabType) => void;
  foldedItems?: TabType[];
}
export default function TabComponent({
  items,
  borderBottom = true,
  menuItemsAlignment = 'flex-start',
  defaultSelected = 0,
  foldedItems,
}: TabComponentProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultSelected);
  const [allTabs, setAllTabs] = useState(items);
  const foldRef = useRef(foldedItems);
  return (
    <div className="tab-component">
      <div
        className="tab-menu-bar"
        css={{
          borderBottom: borderBottom
            ? `1px solid ${color.border_color}`
            : 'none',
          paddingBottom: borderBottom ? 10 : 0,
        }}
      >
        <div
          css={{ justifyContent: menuItemsAlignment }}
          className="menu-labels"
        >
          {allTabs.length > 0 &&
            allTabs.map(({ label }, index) => (
              <DarkLightCornerButton
                key={index}
                text={label}
                isActive={activeTabIndex == index}
                onPress={() => {
                  if (index != activeTabIndex) setActiveTabIndex(index);
                }}
              />
            ))}
          {foldRef.current && foldRef.current.length > 0 && (
            <DarkAddButton
              onPress={(e) => {
                //TODO add onAdd function prop instead of this static way
                if (e)
                  Overlay_u.openTooltip(
                    () =>
                      foldRef?.current?.map((item) => ({
                        text: item.label,
                        onPress: () => {
                          foldRef.current = foldRef.current?.filter(
                            (foldItem) => foldItem != item,
                          );
                          setAllTabs([...allTabs, item]);
                        },
                      })),
                    e.currentTarget,
                    true,
                  );
              }}
            />
          )}
        </div>
      </div>
      {allTabs.length > 0 && (
        <div className="menu-content">{allTabs[activeTabIndex].content} </div>
      )}
    </div>
  );
}
