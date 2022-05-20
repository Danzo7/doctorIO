import './style/index.scss';
import Clinic from 'toSvg/clinic.svg?icon';
import MedicalAssistant from 'toSvg/nurse_icon.svg';
import Patient from 'toSvg/patient.svg';
import ServerState from 'toSvg/server_state.svg';
import { color } from '@colors';
import TextButton from '@components/buttons/text_button';

interface ClinicItemProps {
  selected: boolean;
  timeToClose: string;
  numOfAssistants: number;
  numOfPatients: number;
  onClick?: () => void;
  isHost?: boolean;
}
export default function ClinicItem({
  selected,
  timeToClose,
  numOfAssistants,
  numOfPatients,
  isHost = false,
  onClick,
}: ClinicItemProps) {
  return (
    <div className="clinic-item">
      {selected && <span>Current</span>}
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
        <Clinic />
        <span>Time to close</span>
        <span>{timeToClose}</span>
      </div>
      <div className="stats-container">
        <div className="info-container">
          <MedicalAssistant />
          <span>{numOfAssistants}</span>
          <span>Online</span>
        </div>
        {isHost && (
          <ServerState css={{ '>path': { fill: color.good_green } }} />
        )}
        <div className="info-container">
          <Patient />
          <span>{numOfPatients}</span>
          <span>In queue</span>
        </div>
      </div>
    </div>
  );
}
