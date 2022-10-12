import './style/index.scss';
import ClinicIcon from 'toSvg/clinic.svg?icon';
import MedicalAssistant from 'toSvg/nurse_icon.svg';
import Patient from 'toSvg/patient.svg';
import ServerState from 'toSvg/server_state.svg';
import { color } from '@colors';
import TextButton from '@components/buttons/text_button';

import { LocalClinicData } from '@models/local.models';

interface ClinicItemProps {
  name: string;
  selected: boolean;
  onClick?: () => void;
  isHost?: boolean;
}
export default function ClinicItem({
  selected,
  isHost = false,
  onClick,
  name,
}: ClinicItemProps) {
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
        <span>{name}</span>
      </div>
      <div className="stats-container">
        {isHost && (
          <ServerState css={{ '>path': { fill: color.good_green } }} />
        )}
      </div>
    </div>
  );
}
