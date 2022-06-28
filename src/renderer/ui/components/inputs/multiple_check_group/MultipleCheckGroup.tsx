import { forwardRef, useState } from 'react';
import CheckGroupItem from './check_group_item';
import './style/index.scss';
interface MultipleCheckGroupProps {
  items: string[];
  value?: number[];
}
export default forwardRef(function MultipleCheckGroup(
  { items, value }: MultipleCheckGroupProps,
  ref,
) {
  const [checkedItems, setCheckedItems] = useState<number[]>(value ?? []);
  const isChecked = (index: number) => {
    return checkedItems.find((item) => item === index) == undefined
      ? false
      : true;
  };
  const handleSelect = (index: number) => {
    if (isChecked(index)) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => index != checkedItem),
      );
    } else {
      setCheckedItems([...checkedItems, index]);
    }
  };
  return (
    <div className="multiple-check-group">
      <input
        type={'hidden'}
        value={checkedItems.toString()}
        onChange={() => {}}
        ref={ref as any}
      />

      {items.map((text, index) => (
        <CheckGroupItem
          label={text}
          checked={
            checkedItems.find((item) => item === index) == undefined
              ? false
              : true
          }
          onSelect={() => {
            handleSelect(index);
          }}
          key={index}
        />
      ))}
    </div>
  );
});
