import color from '@assets/styles/color';
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
      if (key == 'Rh') return false; //FIXME Clean this later
      if (key == 'bloodType') return false; //FIXME Clean this later
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
      return { name: sentenceCase(key), value, unit };
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
