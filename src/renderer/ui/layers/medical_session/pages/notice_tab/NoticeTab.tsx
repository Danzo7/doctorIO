import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { updateNotice } from '@redux/local/session/sessionSlice';
import { useAppDispatch, useAppSelector } from '@store';
import { useForm } from 'react-hook-form';
import './style/index.scss';

type Data = {
  diagnosis: string;
};
export default function NoticeTab() {
  const diagnosis = useAppSelector(
    (state) => state.session.sessionInfo.diagnosis,
  );
  const dispatch = useAppDispatch();
  const { control, getValues } = useForm<Data>({
    mode: 'onChange',
    defaultValues: { diagnosis: diagnosis },
  });

  return (
    <div className="notice-tab">
      <Input
        type="textarea"
        name="diagnosis"
        control={control}
        placeholder="write something..."
      />
      <div className="save-btn-wrapper">
        <TextButton
          text="Save"
          backgroundColor={color.secondary_color}
          fontSize={14}
          onPress={() => {
            dispatch(updateNotice(getValues('diagnosis')));
          }}
        />
      </div>
    </div>
  );
}
export function TimelineNotice({ diagnosis }: Data) {
  //FIXME control
  const { control } = useForm<Data>({
    mode: 'onChange',
    defaultValues: { diagnosis: diagnosis },
  });
  return (
    <div className="notice-tab">
      <div className="span-wrapper">
        <span>{diagnosis}</span>
      </div>
    </div>
  );
}
