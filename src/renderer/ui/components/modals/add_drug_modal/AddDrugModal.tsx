import { color } from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import Input from '@components/inputs/input';
import InputContainer from '@components/inputs/input_container';
import NumberInput from '@components/inputs/number_input';
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
    <div className="add-drug-modal">
      <Header
        title="Add drug"
        buttonNode={<SquareIconButton />}
        titleFontSize={20}
      />
      <Input label="Drug name" type={'text'} />
      <div className="pick-container">
        <InputContainer label="Duration" fillContainer>
          <NumberInput inputAlignment="center" unit="Day" /* step={1} */ />
        </InputContainer>
        <InputContainer label="Qts" fillContainer>
          <NumberInput inputAlignment="center" unit={''} /* step={1} */ />
        </InputContainer>
      </div>
      <Input label="Comment" type={'text'} />
      <TextButton
        text="Add"
        backgroundColor={color.good_green}
        width="100%"
        fontColor={color.white}
        fontSize={13}
        fontWeight={700}
        onPress={onAdd}
      />
    </div>
  );
}
