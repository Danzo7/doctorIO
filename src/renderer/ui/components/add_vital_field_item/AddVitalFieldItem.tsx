import Input from '@components/inputs/input';
import './style/index.scss';
import { color } from '@assets/styles/color';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import IconicButton from '@components/buttons/iconic_button';
import Mark from 'toSvg/good_mark.svg?icon';

const schema = z.object({
  name: z.string().min(3),
  unit: z.string().min(1),
});
type Inputs = {
  name: string;
  unit: string;
};
interface AddVitalFieldItemProps {
  onSave?: () => void;
}
export default function AddVitalFieldItem({ onSave }: AddVitalFieldItemProps) {
  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: '',
      unit: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log({ formData });
    onSave?.();
  };
  return (
    <form className="add-vital-field-item" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        label="Name"
        direction="horizontal"
        type={'text'}
        control={control}
      />
      <Input
        name="unit"
        label="Unit"
        direction="horizontal"
        type={'text'}
        control={control}
      />
      <IconicButton
        tip="Edit"
        blank
        width={25}
        radius={7}
        backgroundColor={color.cold_blue}
        Icon={<Mark width={10} height={10} />}
      />
    </form>
  );
}
