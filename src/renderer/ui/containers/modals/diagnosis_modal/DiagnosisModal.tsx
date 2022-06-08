import colors from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import Input from '@components/inputs/input';
import './style/index.scss';
interface DiagnosisModalProps {
  inputArray: any[];
}
export default function DiagnosisModal({ inputArray }: DiagnosisModalProps) {
  return (
    <div className="diagnosis-modal">
      <Header title="Diagnosis" buttonNode={<SquareIconButton />} />
      <div className="diagnosis-inputs-container">
        {inputArray.map((label, index) => (
          <div className="input-width" key={index}>
            <Input type="text" label={label} />
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
      />
    </div>
  );
}
