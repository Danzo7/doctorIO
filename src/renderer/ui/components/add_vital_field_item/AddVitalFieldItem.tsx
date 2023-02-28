import Input from '@components/inputs/input';
import './style/index.scss';
import { color } from '@assets/styles/color';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import IconicButton from '@components/buttons/iconic_button';
import Mark from 'toSvg/good_mark.svg?icon';
import { useCreateFieldMutation } from '@redux/clinic/vitalFields/vitalFieldsApi';
import { camelCase } from '@shipengine/capitalization';

const schema = z.object({
  name: z.string().min(3),
  unit: z.string().min(1),
});

interface AddVitalFieldItemProps {
  onSave?: () => void;
}
type Inputs = z.infer<typeof schema>;
export default function AddVitalFieldItem({ onSave }: AddVitalFieldItemProps) {
  const [createFieldMutation] = useCreateFieldMutation();
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: '',
      unit: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    createFieldMutation({
      name: camelCase(formData.name),
      unit: formData.unit,
    }).then(() => {
      onSave?.();
    });
  };
  return (
    <form
      className="add-vital-field-item"
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
      <Input
        name="unit"
        label="Unit"
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
