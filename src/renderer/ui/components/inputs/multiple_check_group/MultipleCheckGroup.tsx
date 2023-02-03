import { useState } from 'react';
import { ControllerProps } from '../input';
import CheckGroupItem from './check_group_item';
import './style/index.scss';
interface MultipleCheckGroupProps extends ControllerProps {
  options: string[];
  selected?: number[];
  disabled?: boolean;
  onlyOne?: boolean;
  mustOne?: boolean;
}
export default function MultipleCheckGroup({
  options,
  selected,
  onChanged,
  field,
  disabled,
  onlyOne,
  mustOne,
}: MultipleCheckGroupProps) {
  //FIXME: Find why there is undefined in options
  const defIndex = options.indexOf(field.value);
  const [checkedItems, setCheckedItems] = useState<number[]>(
    (defIndex ? [defIndex] : undefined) ?? selected ?? (mustOne ? [0] : []),
  );
  const isChecked = (index: number) => {
    return checkedItems.find((item) => item === index) == undefined
      ? false
      : true;
  };
  const handleSelect = (index: number) => {
    if (isChecked(index)) {
      const items = checkedItems.filter((checkedItem) => index != checkedItem);
      if (mustOne && items.length == 0) return;

      setCheckedItems(items);
      onChanged?.(items.map((inx) => options[inx]));
      field.onChange?.(items.map((inx) => options[inx]));
    } else {
      if (onlyOne) {
        setCheckedItems([index]);
        onChanged?.(options[index]);
        field.onChange?.(options[index]);
      } else {
        setCheckedItems([...checkedItems, index]);
        onChanged?.([...checkedItems, index].map((inx) => options[inx]));
        field.onChange?.([...checkedItems, index].map((inx) => options[inx]));
      }
    }
  };
  return (
    <div className="multiple-check-group">
      {options.map((text, index) => (
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
