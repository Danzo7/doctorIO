import Input from '@components/inputs/input';
import { updateNotice } from '@redux/local/session/sessionSlice';
import { useAppDispatch, useAppSelector } from '@store';
import { useForm } from 'react-hook-form';
import './style/index.scss';

type Data = {
  diagnosis: string;
};
export default function NoticeTab() {
  const notice = useAppSelector((state) => state.session.diagnosis);
  const dispatch = useAppDispatch();
  const { control, watch } = useForm<Data>({
    mode: 'onChange',
    defaultValues: { diagnosis: notice },
  });

  dispatch(updateNotice(watch('diagnosis')));

  return (
    <div className="notice-tab">
      {<Input type="textarea" name="diagnosis" control={control} />}
    </div>
  );
}
export function TimelineNotice({ diagnosis: notice }: Data) {
  //FIXME

  return (
    <div className="notice-tab">
      {<Input type="textarea" disabled defaultValue={notice} name="field" />}
    </div>
  );
}
