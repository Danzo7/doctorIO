import ModalContainer from '@components/modal_container';
import VitalItem from '@components/vital_item';
import { titleCase } from '@helpers/string.helper';
import { BiometricScreening } from '@models/instance.model';
import { ComponentProps } from 'react';
import './style/index.scss';
import { useGetFieldsQuery } from '@redux/clinic/clinicApi';

interface DiagnosisPreviewProps {
  data: BiometricScreening;
  patId?: number;
}
export default function DiagnosisPreview({ data }: DiagnosisPreviewProps) {
  const { isLoading, data: clinicFields, isSuccess } = useGetFieldsQuery();
  let transformData;
  if (isSuccess)
    transformData = Object.entries(data)
      .map(([key, value]) => {
        const unit = clinicFields.find((vital) => vital.name == key)?.unit;

        return { name: titleCase(key), value, unit };
      })
      .filter(Boolean) as ComponentProps<typeof VitalItem>[];
  return (
    <ModalContainer title="Diagnosis preview" isLoading={isLoading}>
      <div className="info-wrapper">
        {isSuccess ? (
          transformData?.map((vitalData, index) => (
            <VitalItem {...vitalData} key={index} />
          ))
        ) : (
          <div>Error</div>
        )}
      </div>
    </ModalContainer>
  );
}
