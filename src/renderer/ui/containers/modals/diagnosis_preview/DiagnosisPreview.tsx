import ModalContainer from '@components/modal_container';
import VitalItem from '@components/vital_item';
import { titleCase } from '@helpers/string.helper';
import { BiometricScreening } from '@models/instance.model';
import { ComponentProps } from 'react';
import './style/index.scss';
import { useVitalFieldsStore } from '@stores/vitalFieldsStore';

interface DiagnosisPreviewProps {
  data: BiometricScreening;
  patId?: number;
}
export default function DiagnosisPreview({ data }: DiagnosisPreviewProps) {
  const transformData = Object.entries(data)
    .map(([key, value]) => {
      const unit = useVitalFieldsStore
        .getState()
        .vitalFields.find((vital) => vital.name == key)?.unit;

      return { name: titleCase(key), value, unit };
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
