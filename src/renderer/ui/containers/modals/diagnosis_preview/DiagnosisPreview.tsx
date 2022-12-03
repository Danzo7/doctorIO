import ModalContainer from '@components/modal_container';
import VitalItem from '@components/vital_item';
import { sentenceCase } from '@helpers/string.helper';
import { BiometricScreening } from '@models/instance.model';
import { ComponentProps } from 'react';
import './style/index.scss';

interface DiagnosisPreviewProps {
  data: BiometricScreening;
  patId?: number;
}
export default function DiagnosisPreview({ data }: DiagnosisPreviewProps) {
  const transformData = Object.entries(data)
    .map(([key, value]) => {
      let unit = undefined;
      let tValue = value;
      if (key == 'Rh') return false;
      if (key == 'bloodType') tValue += data.Rh ? '+' : '-';
      switch (key as keyof BiometricScreening) {
        case 'weight':
          unit = 'kg';
          break;
        case 'height':
          unit = 'cm';
          break;
        case 'bloodPressure':
          unit = 'mmhg';
          break;

        default:
          break;
      }
      return { name: sentenceCase(key), value: tValue, unit };
    })
    .filter(Boolean) as ComponentProps<typeof VitalItem>[];
  return (
    <ModalContainer title="Diagnosis preview">
      <div className="info-wrapper">
        {transformData.map((vitalData, index) => (
          <VitalItem {...vitalData} key={index} />
        ))}
      </div>
    </ModalContainer>
  );
}
//  <TextPair
//       key={index}
//       first={{
//         text: key,
//         fontSize: 15,
//         fontColor: color.text_gray,
//       }}
//       second={{
//         text:
//           key == 'Rh'
//             ? value == true
//               ? 'Positive'
//               : 'Negative'
//             : value.toString(),
//         fontSize: 15,
//         fontColor: color.text_gray,
//         border: true,
//       }}
//     />
