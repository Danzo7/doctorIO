import './style/index.scss';
import PregnantState from 'toSvg/pregnant.svg';
import WaitingFigure from 'toSvg/waiting_figure.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button';
import colors from '@colors';
import invite from 'toSvg/enter.svg?icon';
import view from 'toSvg/view_test.svg?icon';
import TextIconButton from '@components/buttons/text_icon_button';
import DiagnosisPreview from '@containers/modals/diagnosis_preview';
import { useOverlay } from '@libs/overlay/useOverlay';
import NextPatient from '@containers/modals/next_patient';
import { formatDistance } from 'date-fns';
interface QueueItemWideProps {
  name: string;
  timeAgo: Date;
  number: number;
  state?: string;
  width?: number;
  onClose?: () => void;
}

function QueueItemWide({
  name,
  timeAgo,
  number,
  onClose,
  state,
  width,
}: QueueItemWideProps) {
  const { open } = useOverlay();
  const Svg = state === 'urgent' ? PregnantState : WaitingFigure;
  return (
    <div className="queue-item-wide" css={{ width: width }} onClick={onClose}>
      <div className="back-container">
        <div className="back">
          <SquareIconButton svg={threeDots} />
        </div>
      </div>
      <div className="content">
        <div className="pat-info">
          <span>{name}</span>
          <span>{formatDistance(timeAgo, new Date())} ago</span>
        </div>
        <div className="buttons-hover-lock">
          <TextIconButton
            //onMouseOver={setActive}
            Icon={invite}
            text="invite in"
            color={colors.good_green}
            onPress={() => {
              open(
                <NextPatient
                  patientName={name}
                  position={number}
                  arrivalTime={timeAgo}
                />,
                {
                  width: '30%',
                  closeOnClickOutside: true,
                  isDimmed: true,
                  clickThrough: false,
                  closeBtn: 'inner',
                },
              );
            }}
          />
          <TextIconButton
            //onMouseOver={setActive}
            Icon={view}
            text="View tests"
            color={colors.cold_blue}
            onPress={() => {
              open(
                <DiagnosisPreview
                  data={{
                    height: 175,
                    weight: 107,
                    bloodPressure: 1,
                    bloodType: 'A',
                  }}
                />,
                {
                  closeOnClickOutside: true,
                  isDimmed: true,
                  clickThrough: false,
                  width: '30%',
                  closeBtn: 'inner',
                },
              );
            }}
          />
        </div>
      </div>
      <div
        className={`preview ${state ?? ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <Svg />
        </div>
        <div className="number">
          <span>Number</span>
          <span>{number}</span>
        </div>
      </div>
    </div>
  );
}

export default QueueItemWide;
