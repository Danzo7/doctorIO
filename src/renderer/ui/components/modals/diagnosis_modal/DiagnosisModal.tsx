import color from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button';
import TextButton from '@components/buttons/text_button';
import InputField from '@components/inputs/input_field';
import './style/index.scss';
interface DiagnosisModalProps {
  inputArray: any[];
}
export default function DiagnosisModal({ inputArray }: DiagnosisModalProps) {
  return (
    <div className="diagnosis-modal">
      <div className="diagnosis-header">
        <span>Diagnosis</span>
        <SquareIconButton />
      </div>
      <div className="diagnosis-inputs-container">
        {inputArray.map((label, index) => (
          <div className="input-width" key={index}>
            <InputField label={label} />
          </div>
        ))}
      </div>
      <TextButton
        text="Add to queue"
        backgroundColor={color.good_green}
        radius={7}
        fontSize={12}
        width={'60%'}
        padding={'15px 0px'}
      />
    </div>
  );
}
