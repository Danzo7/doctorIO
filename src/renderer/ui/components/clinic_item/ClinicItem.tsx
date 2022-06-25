import './style/index.scss';
import ClinicIcon from 'toSvg/clinic.svg?icon';
import MedicalAssistant from 'toSvg/nurse_icon.svg';
import Patient from 'toSvg/patient.svg';
import ServerState from 'toSvg/server_state.svg';
import { color } from '@colors';
import TextButton from '@components/buttons/text_button';
import { format } from 'date-fns/esm';
import { TIME_ONLY } from '@constants/data_format';
import { LocalClinicData } from '@models/local.models';
import { clinic } from '@api/fake';

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
  //todo useEffect fetch Clinic data if selected
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
        {<span>{format(clinic.timeToClose, TIME_ONLY)}</span>}
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
