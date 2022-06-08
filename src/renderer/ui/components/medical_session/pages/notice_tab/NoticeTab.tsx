import TextArea from '@components/inputs/text_area';
import { SubmitHandler, useForm } from 'react-hook-form';
import './style/index.scss';
interface NoticeTabProps {}
type Data = {
  notice: string;
};
export default function NoticeTab({}: NoticeTabProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<Data> = (data) => console.log(data);

  return (
    <div className="notice-tab">
      <TextArea
        fillContainer
        onSubmit={handleSubmit(onSubmit)}
        errorMessage={errors.notice?.message}
        {...register('notice', {
          required: { value: true, message: 'dam Ass' },
        })}
      />
    </div>
  );
}
