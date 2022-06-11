import { color } from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import './style/index.scss';

type Inputs = {
  drugName: string;
  duration: number;
  qts: number;
  comment: string;
};
interface AddDrugModalProps {
  onAdd: () => void;
}
export default function AddDrugModal({ onAdd }: AddDrugModalProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => console.log(formData);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-drug-modal">
      <Header
        title="Add drug"
        buttonNode={<SquareIconButton />}
        titleFontSize={20}
      />
      <Input
        {...register('drugName', {
          required: { value: true, message: 'Drug name is required' },
        })}
        label="Drug name"
        type={'text'}
      />
      <div className="pick-container">
        <Input
          {...register('duration')}
          label="Duration"
          fillContainer
          type={{ type: 'numeric', min: 1, step: 1, unit: 'Day' }}
        />
        <Input
          {...register('qts')}
          label="Qts"
          fillContainer
          type={{ type: 'numeric', min: 1, step: 1, unit: '' }}
        />
      </div>
      <Input {...register('comment', {})} label="Comment" type={'text'} />
      <TextButton
        text="Add"
        backgroundColor={color.good_green}
        width="100%"
        fontColor={color.white}
        fontSize={13}
        fontWeight={700}
        onPress={() => {
          handleSubmit(onSubmit)();
        }}
      />
    </form>
  );
}
