import './style/index.scss';
import ClinicIcon from 'toSvg/clinic.svg?icon';
import MedicalAssistant from 'toSvg/nurse_icon.svg';
import Patient from 'toSvg/patient.svg';
import ServerState from 'toSvg/server_state.svg';
import { color } from '@colors';
import TextButton from '@components/buttons/text_button';
import { format } from 'date-fns/esm';
import { TIME_ONLY } from '@constants/data_format';
import { Clinic } from '@models/server.models';

interface ClinicItemProps {
  clinicInfo: Clinic;
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
  const { timeToClose, memberCount, patientCount } = clinicInfo;
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
        <span>Time to close</span>
        <span>{format(timeToClose, TIME_ONLY)}</span>
      </div>
      <div className="stats-container">
        <div className="info-container">
          <MedicalAssistant />
          <span>{memberCount}</span>
          <span>Online</span>
        </div>
        {isHost && (
          <ServerState css={{ '>path': { fill: color.good_green } }} />
        )}
        <div className="info-container">
          <Patient />
          <span>{patientCount}</span>
          <span>In queue</span>
        </div>
      </div>
    </div>
  );
}
