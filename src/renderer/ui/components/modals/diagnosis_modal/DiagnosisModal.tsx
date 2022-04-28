import color from '@assets/styles/color';
import BackButton from '@components/buttons/back_button';
import TextButton from '@components/buttons/text_button';
import InputField from '@components/inputs/input_field';
import React from 'react';
import './style/index.scss';
interface DiagnosisModalProps {
  inputArray: any[];
}
export default function DiagnosisModal({ inputArray }: DiagnosisModalProps) {
  return (
    <div className="diagnosis-modal">
      <div className="diagnosis-header">
        <span>Diagnosis</span>
        <BackButton />
      </div>
      <div className="diagnosis-inputs-container">
        {inputArray.map((label) => (
          <div className="input-width">
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
