import colors from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import './style/index.scss';

interface Inputs {
  [label: string]: [type: string];
}
interface DiagnosisModalProps {
  inputArray: any[];
}
export default function DiagnosisModal({ inputArray }: DiagnosisModalProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => console.log(formData);
  return (
    <div className="diagnosis-modal">
      <Header title="Diagnosis" buttonNode={<SquareIconButton />} />
      <div className="diagnosis-inputs-container">
        {inputArray.map(({ label, type }, index) => (
          <div className="input-width" key={index}>
            <Input
              type={type}
              label={label}
              {...register(label, {
                required: { value: true, message: `${label} is required` },
              })}
            />
          </div>
        ))}
      </div>
      <TextButton
        text="Add to queue"
        backgroundColor={colors.good_green}
        radius={7}
        fontSize={12}
        width={'60%'}
        padding={'15px 0px'}
        onPress={() => {
          handleSubmit(onSubmit)();
        }}
      />
    </div>
  );
}
