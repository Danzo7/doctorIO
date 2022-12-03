import DateSwitcher from '@components/date_switcher';
import Header from '@components/header';
import VitalItem from '@components/vital_item';
import { sentenceCase } from '@helpers/string.helper';
import { BiometricScreening } from '@models/instance.model';
import { ComponentProps } from 'react';
import './style/index.scss';
interface VitalsPanelProps {
  data: BiometricScreening;
}
export default function VitalsPanel({ data }: VitalsPanelProps) {
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
    <div className="vitals-panel">
      <Header title="Vitals" />
      <div className="vital-items-div">
        {transformData.map((vital, index) => (
          <VitalItem {...vital} key={index} />
        ))}
      </div>

      <DateSwitcher date={new Date()} alignSelf="center" />
    </div>
  );
}
