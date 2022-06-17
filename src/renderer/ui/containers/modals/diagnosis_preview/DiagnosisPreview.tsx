import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';

type textData = {
  firstText: string;
  secondText: string;
};
interface DiagnosisPreviewProps {
  data: textData[];
}
export default function DiagnosisPreview({ data }: DiagnosisPreviewProps) {
  return (
    <ModalContainer title="Diagnosis preview">
      <div className="info-wrapper">
        {data?.map(({ firstText, secondText }, index) => (
          <TextPair
            key={index}
            first={{
              text: firstText,
              fontSize: 15,
              fontColor: color.text_gray,
            }}
            second={{
              text: secondText,
              fontSize: 15,
              fontColor: color.text_gray,
            }}
            flexGrow
            minWidth={150}
          />
        ))}
      </div>
    </ModalContainer>
  );
}
