import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import TextPair from '@components/text_pair/TextPair';
import { Test } from '@models/instance.model';
import './style/index.scss';

interface DiagnosisPreviewProps {
  data: Test;
  patId?: number;
}
export default function DiagnosisPreview({ data }: DiagnosisPreviewProps) {
  return (
    <ModalContainer title="Diagnosis preview">
      <div className="info-wrapper">
        {Object.entries(data).map(([key, value], index) => (
          <TextPair
            key={index}
            first={{
              text: key,
              fontSize: 15,
              fontColor: color.text_gray,
            }}
            second={{
              text:
                key == 'Rh'
                  ? value == true
                    ? 'Positive'
                    : 'Negative'
                  : value.toString(),
              fontSize: 15,
              fontColor: color.text_gray,
              border: true,
            }}
          />
        ))}
      </div>
    </ModalContainer>
  );
}
