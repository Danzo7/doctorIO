import WideCard from '@components/wide_card';
import './style/index.scss';
import TextPair from '@components/text_pair';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import View from 'toSvg/view_test.svg?icon';
import { color } from '@assets/styles/color';
import { useOverlay } from '@libs/overlay/useOverlay';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { format } from 'date-fns';
import { DATE_ONLY, TIME_ONLY } from '@constants/data_format';
type TimeLineData = {
  booked?: true;
  subject: string;
};
interface TimelineItemProps {
  sessionId?: number;
  doctorName: string;
  assistantName: string;
  doctorId: number;
  assistantId: number;
  type: 'missed' | 'upcoming' | TimeLineData;
  date: Date;
}

export default function TimelineItem({
  type,
  date,
  doctorName,
  assistantName,
  assistantId,
  doctorId,
  sessionId,
}: TimelineItemProps) {
  const selectedColor =
    typeof type == 'string'
      ? type == 'upcoming'
        ? color.warm_orange
        : color.cold_red
      : (type as TimeLineData).booked
      ? color.good_green
      : color.cold_blue;
  const { open } = useOverlay();
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
        {(type as TimeLineData)?.subject && (
          <WideCard borderColor={selectedColor}>
            <TextPair
              first={format(date, DATE_ONLY)}
              second={format(date, TIME_ONLY)}
            />
            <TextPair
              first={(type as TimeLineData)?.subject}
              second="Subject"
              reversed
            />
            <TextPair first={doctorName} second="Doctor" reversed />
            <TextPair first={assistantName} second="Assistance" reversed />
            <SquareIconButton
              svg={View}
              onPress={() => {
                open(<SessionPreviewModal />, {
                  closeOnClickOutside: true,
                  isDimmed: true,
                  clickThrough: false,
                  closeBtn: 'inner',
                  width: '50%',
                });
              }}
            />
          </WideCard>
        )}

        {(type as TimeLineData)?.booked && (
          <div
            css={{
              borderLeft: `3px solid ${selectedColor}`,
              height: 5,
              marginLeft: 10,
            }}
          />
        )}
        {(typeof type == 'string' || (type as TimeLineData)?.booked) && (
          <WideCard borderColor={selectedColor}>
            <TextPair
              first="Booked appointment"
              second={format(date, DATE_ONLY)}
            />
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
