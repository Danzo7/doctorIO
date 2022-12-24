import { color } from '@assets/styles/color';
import DateSwitcher from '@components/date_switcher';
import Header from '@components/header';
import VitalItem from '@components/vital_item';
import { titleCase } from '@helpers/string.helper';
import { BiometricScreening } from '@models/instance.model';
import { ComponentProps } from 'react';
import './style/index.scss';
import LoadingSpinner from '@components/loading_spinner';
import { useGetFieldsQuery } from '@redux/clinic/clinicApi';
interface VitalsPanelProps {
  data: BiometricScreening;
}
export default function VitalsPanel({ data }: VitalsPanelProps) {
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
    <div className="vitals-panel">
      <Header title="Vitals" />
      <div className="vital-items-div">
        {isLoading ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          transformData?.map((vital, index) => (
            <VitalItem
              backgroundColor={color.border_color}
              {...vital}
              key={index}
            />
          ))
        ) : (
          <div>Error</div>
        )}
      </div>

      <DateSwitcher date={new Date()} alignSelf="center" />
    </div>
  );
}
