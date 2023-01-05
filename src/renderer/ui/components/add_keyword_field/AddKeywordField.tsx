import Input from '@components/inputs/input';
import './style/index.scss';
import IconicButton from '@components/buttons/iconic_button';
import { color } from '@assets/styles/color';
import Mark from 'toSvg/good_mark.svg?icon';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';

const schema = z.object({
  name: z.string().min(3),
});
type Inputs = z.infer<typeof schema>;
interface AddKeywordFieldProps {
  onSave?: () => void;
}
export default function AddKeywordField({ onSave }: AddKeywordFieldProps) {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    //TODO submit to Api
    onSave?.();
  };
  return (
    <form
      className="add-keyword-field"
      onSubmit={handleSubmit(onSubmit)}
      ref={(e) => {
        e?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <Input
        name="name"
        label="Name"
        direction="horizontal"
        type={'text'}
        control={control}
      />

      <IconicButton
        tip="save"
        blank
        width={25}
        radius={7}
        backgroundColor={color.cold_blue}
        Icon={<Mark width={10} height={10} />}
      />
    </form>
  );
}
