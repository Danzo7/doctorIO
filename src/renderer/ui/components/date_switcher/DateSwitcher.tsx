import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';

import Arrow from 'toSvg/arrow.svg?icon';
import './style/index.scss';
import { useForm } from 'react-hook-form';
import Input from '@components/inputs/input';
import { addDays } from 'date-fns';
interface DateSwitcherProps {
  date: Date;
  alignSelf?:
    | 'center'
    | 'baseline'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'start'
    | 'stretch';
  onChange?: (date: Date) => void;
}
export default function DateSwitcher({
  date,
  alignSelf,
  onChange,
}: DateSwitcherProps) {
  const { control, setValue, getValues, watch } = useForm({
    defaultValues: {
      date: date,
    },
  });
  watch('date');
  onChange?.(getValues('date'));
  return (
    <div className="date-switcher" css={{ alignSelf: alignSelf }}>
      <TextButton
        borderColor={color.border_color}
        padding="10px"
        afterBgColor={color.darkersec_color}
        onPress={() => setValue('date', addDays(getValues('date'), -1))}
        Icon={<Arrow css={{ transform: 'rotate(90deg)' }} />}
      />
      <Input type={'date'} control={control} name="date" background="none" />
      <TextButton
        borderColor={color.border_color}
        padding="10px"
        afterBgColor={color.darkersec_color}
        onPress={() => setValue('date', addDays(getValues('date'), 1))}
        Icon={<Arrow css={{ transform: 'rotate(-90deg)' }} />}
      />
    </div>
  );
}
