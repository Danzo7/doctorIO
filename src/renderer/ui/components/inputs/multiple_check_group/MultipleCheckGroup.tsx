import { useState } from 'react';
import { ControllerProps } from '../input';
import CheckGroupItem from './check_group_item';
import './style/index.scss';
interface MultipleCheckGroupProps extends ControllerProps {
  items: string[];
  value?: number[];
  disabled?: boolean;
}
export default function MultipleCheckGroup({
  items,
  value,
  onChanged,
  field,
  fieldState,
  disabled,
}: MultipleCheckGroupProps) {
  const [checkedItems, setCheckedItems] = useState<number[]>(value ?? []);
  const isChecked = (index: number) => {
    return checkedItems.find((item) => item === index) == undefined
      ? false
      : true;
  };
  const handleSelect = (index: number) => {
    if (isChecked(index)) {
      const itms = checkedItems.filter((checkedItem) => index != checkedItem);
      setCheckedItems(itms);
      onChanged?.(itms.map((inx) => items[inx]));
      field.onChange?.(itms.map((inx) => items[inx]));
    } else {
      setCheckedItems([...checkedItems, index]);
      onChanged?.([...checkedItems, index].map((inx) => items[inx]));
      field.onChange?.([...checkedItems, index].map((inx) => items[inx]));
    }
  };
  return (
    <div className="multiple-check-group">
      {items.map((text, index) => (
        <CheckGroupItem
          label={text}
          checked={
            checkedItems.find((item) => item === index) == undefined
              ? false
              : true
          }
          disabled={disabled}
          onSelect={() => {
            handleSelect(index);
          }}
          key={index}
        />
      ))}
    </div>
  );
}
