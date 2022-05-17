import './style/index.scss';
import threeDots from 'toSvg/threedots.svg?icon';
import Clinic from 'toSvg/clinic.svg?icon';
import MedicalAssistant from 'toSvg/nurse_icon.svg';
import Patient from 'toSvg/patient.svg';
import Union from 'toSvg/server_state.svg';
import colors from '@colors';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
interface TimeToClose {
  hour: number;
  min: number;
}
interface ClinicItemProps {
  selected: boolean;
  timeToClose: TimeToClose;
  numOfAssistants: number;
  numOfPatients: number;
  onClick: () => void;
}
export default function ClinicItem({
  selected,
  timeToClose,
  numOfAssistants,
  numOfPatients,
  onClick,
}: ClinicItemProps) {
  return (
    <div
      onClick={onClick}
      className="clinic-item"
      css={{
        backgroundColor: !selected ? colors.secondary_color : undefined,
        '&:hover': {
          backgroundColor: !selected ? 'unset' : undefined,
        },
      }}
    >
      <div className="header">
        <span>{selected ? 'Selected' : ''}</span>
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="option-menu"
        >
          <SquareIconButton svg={threeDots} />
        </div>
      </div>
      <div className="time-container">
        <Clinic />
        <span>Time to close</span>
        <span>
          {timeToClose.hour == 0 && '00'}
          {timeToClose.hour > 0 && timeToClose.hour < 24
            ? timeToClose.hour
            : ''}
          h:
          {timeToClose.min >= 0 &&
            timeToClose.min < 10 &&
            `0${timeToClose.min}`}
          {timeToClose.min >= 10 && timeToClose.min < 60 ? timeToClose.min : ''}
          m
        </span>
      </div>
      <div className="stats-container">
        <div className="info-container">
          <MedicalAssistant />
          <span>{numOfAssistants}</span>
          <span>Online</span>
        </div>
        <Union />
        <div className="info-container">
          <Patient />
          <span>{numOfPatients}</span>
          <span>In queue</span>
        </div>
      </div>
    </div>
  );
}
