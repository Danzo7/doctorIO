import TextArea from '@components/inputs/text_area';
import { updateNotice } from '@redux/local/session/sessionSlice';
import { useAppDispatch, useAppSelector } from '@store';
import { SubmitHandler, useForm } from 'react-hook-form';
import './style/index.scss';

type Data = {
  notice: string;
};
export default function NoticeTab() {
  const notice = useAppSelector((state) => state.session.notice);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({ mode: 'onChange', defaultValues: { notice: notice } });

  const onSubmit: SubmitHandler<Data> = (data) => {
    dispatch(updateNotice(data.notice));
  };

  return (
    <div className="notice-tab">
      {
        <TextArea
          fillContainer
          onSubmit={handleSubmit(onSubmit)}
          errorMessage={errors.notice?.message}
          {...register('notice', {
            required: { value: true, message: 'try again' },
          })}
        />
      }
    </div>
  );
}
