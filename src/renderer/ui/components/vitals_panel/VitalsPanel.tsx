import color from '@assets/styles/color';
import DateSwitcher from '@components/date_switcher';
import Header from '@components/header';
import VitalItem from '@components/vital_item';
import { titleCase } from '@helpers/string.helper';
import { BiometricScreening } from '@models/instance.model';
import { ComponentProps } from 'react';
import './style/index.scss';
import { useVitalFieldsStore } from '@stores/vitalFieldsStore';
interface VitalsPanelProps {
  data: BiometricScreening;
}
export default function VitalsPanel({ data }: VitalsPanelProps) {
  const transformData = Object.entries(data)
    .map(([key, value]) => {
      const unit = useVitalFieldsStore
        .getState()
        .vitalFields.find((vital) => vital.name == key)?.unit;
      return { name: titleCase(key), value, unit };
    })
    .filter(Boolean) as ComponentProps<typeof VitalItem>[];
  return (
    <div className="vitals-panel">
      <Header title="Vitals" />
      <div className="vital-items-div">
        {transformData.map((vital, index) => (
          <VitalItem
            backgroundColor={color.border_color}
            {...vital}
            key={index}
          />
        ))}
      </div>

      <DateSwitcher date={new Date()} alignSelf="center" />
    </div>
  );
}
