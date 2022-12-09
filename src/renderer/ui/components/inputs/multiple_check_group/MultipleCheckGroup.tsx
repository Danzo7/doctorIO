import ThemePreferenceItem from '@components/theme_preference_item';
import { FunctionComponent, SVGProps, useState } from 'react';
import { ControllerProps } from '../input';
import CheckGroupItem from './check_group_item';
import './style/index.scss';
interface MultipleCheckGroupProps extends ControllerProps {
  value?: number[];
  disabled?: boolean;
  onlyOne?: boolean;
  type:
    | {
        name: 'TextButton';
        options: string[];
      }
    | {
        name: 'ThemePreferenceItem';
        options: {
          label: string;
          preview: FunctionComponent<SVGProps<SVGSVGElement>>;
        }[];
      };
}
export default function MultipleCheckGroup({
  value,
  onChanged,
  field,
  disabled,
  onlyOne,
  type,
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
      onChanged?.(itms.map((inx) => type.options[inx]));
      field.onChange?.(itms.map((inx) => type.options[inx]));
    } else {
      if (onlyOne) {
        setCheckedItems([index]);
        onChanged?.(type.options[index]);
        field.onChange?.(type.options[index]);
      } else {
        setCheckedItems([...checkedItems, index]);
        onChanged?.([...checkedItems, index].map((inx) => type.options[inx]));
        field.onChange?.(
          [...checkedItems, index].map((inx) => type.options[inx]),
        );
      }
    }
  };
  return (
    <div className="multiple-check-group">
      {type.name == 'TextButton' &&
        type.options.map((text, index) => (
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
      {type.name == 'ThemePreferenceItem' &&
        type.options.map(({ label, preview }, index) => (
          <ThemePreferenceItem
            key={index}
            label={label}
            Preview={preview}
            checked={
              checkedItems.find((item) => item === index) == undefined
                ? false
                : true
            }
            onSelect={() => {
              handleSelect(index);
            }}
          />
        ))}
    </div>
  );
}
