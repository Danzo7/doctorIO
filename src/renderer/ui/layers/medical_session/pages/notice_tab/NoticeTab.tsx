import TextArea from '@components/inputs/text_area';
import { updateNotice } from '@redux/local/session/sessionSlice';
import { useAppDispatch, useAppSelector } from '@store';
import { SubmitHandler, useForm } from 'react-hook-form';
import './style/index.scss';

type Data = {
  diagnosis: string;
};
export default function NoticeTab() {
  const notice = useAppSelector((state) => state.session.diagnosis);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({ mode: 'onChange', defaultValues: { diagnosis: notice } });

  const onSubmit: SubmitHandler<Data> = (data) => {
    dispatch(updateNotice(data.diagnosis));
  };

  return (
    <div className="notice-tab">
      {
        <TextArea
          fillContainer
          onSubmit={handleSubmit(onSubmit)}
          errorMessage={errors.diagnosis?.message}
          {...register('diagnosis', {
            required: { value: true, message: 'try again' },
          })}
        />
      }
    </div>
  );
}
export function TimelineNotice({ diagnosis: notice }: Data) {
  return (
    <div className="notice-tab">
      {<TextArea disabled fillContainer defaultValue={notice} />}
    </div>
  );
}
