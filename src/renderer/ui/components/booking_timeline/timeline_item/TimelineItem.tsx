import WideCard from '@components/wide_card';
import './style/index.scss';
import TextPair from '@components/text_pair';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import View from 'toSvg/view_test.svg?icon';
import { color } from '@assets/styles/color';
type TimeLineData = {
  done?: true;
  date: string;
  subject: string;
  doctor: string; //{doctorId}
  assistant: string;
};
interface TimelineItemProps {
  type: 'Missed' | 'Upcoming' | TimeLineData;
}

export default function TimelineItem({ type }: TimelineItemProps) {
  const selectedColor =
    typeof type == 'string'
      ? type == 'Upcoming'
        ? color.warm_orange
        : color.cold_red
      : (type as TimeLineData).done
      ? color.good_green
      : color.cold_blue;
  return (
    <div className="timeline-item">
      <div
        className="dot"
        css={{
          backgroundColor: selectedColor,
          boxShadow: `0 0px 1px ${selectedColor} inset, 0 0 3px`,
        }}
      />
      <div className="event">
        {(type as TimeLineData)?.doctor && (
          <WideCard borderColor={selectedColor}>
            <TextPair first="28 Feb 2021" second="09:30 - 09:56" />
            <TextPair
              first={(type as TimeLineData)?.subject}
              second="Subject"
              reversed
            />
            <TextPair
              first={(type as TimeLineData).doctor}
              second="Doctor"
              reversed
            />
            <TextPair
              first={(type as TimeLineData).assistant}
              second="Assistance"
              reversed
            />
            <SquareIconButton svg={View} />
          </WideCard>
        )}

        {(type as TimeLineData)?.done && (
          <div
            css={{
              borderLeft: `3px solid ${selectedColor}`,
              height: 5,
              marginLeft: 10,
            }}
          />
        )}
        {(typeof type == 'string' || (type as TimeLineData)?.done) && (
          <WideCard borderColor={selectedColor}>
            <TextPair first="Booked appointment" second="28 Feb 2021" />
            <TextPair
              second="status"
              first={typeof type == 'string' ? type : 'Done'}
              reversed
            />
          </WideCard>
        )}
      </div>
    </div>
  );
}
