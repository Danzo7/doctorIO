import './style/index.scss';
import ClinicIcon from 'toSvg/clinic.svg?icon';
import MedicalAssistant from 'toSvg/nurse_icon.svg';
import Patient from 'toSvg/patient.svg';
import ServerState from 'toSvg/server_state.svg';
import { color } from '@colors';
import TextButton from '@components/buttons/text_button';

import { LocalClinicData } from '@models/local.models';

interface ClinicItemProps {
  clinicInfo: LocalClinicData;
  selected: boolean;
  onClick?: () => void;
  isHost?: boolean;
}
export default function ClinicItem({
  selected,
  clinicInfo,
  isHost = false,
  onClick,
}: ClinicItemProps) {
  const { memberCount, patientCount, name } = clinicInfo;
  //FEATURE show clinic server info if is connected
  return (
    <div className="clinic-item">
      <span css={{ visibility: selected ? 'visible' : 'hidden' }}>Current</span>
      <div className="backdrop">
        <TextButton
          text={selected ? 'Setting' : 'Join...'}
          fontSize={15}
          fontColor={selected ? color.white : color.hot_red}
          borderColor={color.border_color}
          radius={7}
          onPress={onClick}
          backgroundColor={color.darkersec_color}
        />
      </div>
      <div className="time-container">
        <ClinicIcon />
        <span>{clinicInfo.name}</span>
      </div>
      <div className="stats-container">
        {memberCount && (
          <div className="info-container">
            <MedicalAssistant />
            <span>{memberCount}</span>
            <span>Online</span>
          </div>
        )}
        {isHost && (
          <ServerState css={{ '>path': { fill: color.good_green } }} />
        )}
        {patientCount && (
          <div className="info-container">
            <Patient />
            <span>{patientCount}</span>
            <span>In queue</span>
          </div>
        )}
      </div>
    </div>
  );
}
