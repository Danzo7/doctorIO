import { color } from '@assets/styles/color';
import PreviewList from '@components/preview_list';
import { AppointmentBrief } from '@models/instance.model';
import './style/index.scss';
import TimelineItem from './timeline_item';
import VerticalPanel from '@components/vertical_panel';
import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import IconicButton from '@components/buttons/iconic_button';
import AddIcon from 'toSvg/add.svg?icon';
import { useState } from 'react';

interface BookingTimelineProps {
  patientId: number;
  appointments: AppointmentBrief[];
  onPress?: () => void;
}

export default function BookingTimeline({
  appointments,
  patientId,
  onPress,
}: BookingTimelineProps) {
  //FEATURE handle filter of the appointments in backend for pagination
  const [selectedState, setSelectedState] = useState(0);
  const appointmentsFiltered = appointments.filter((app) => {
    switch (selectedState) {
      case 0:
        return app.state.phase === 'upcoming';
      case 1:
        return app.state.phase === 'done';
      case 2:
        return app.state.phase === 'canceled';
      case 3:
        return true;
      default:
        return true;
    }
  });
  return (
    <div className="booking-timeline">
      <div
        css={{
          borderLeft:
            appointments.length > 0
              ? `2px solid ${color.cold_blue}`
              : undefined,
          height: '100%',
          position: 'absolute',
          left: 2.5,
          zIndex: 0,
          top: 48,
        }}
      />

      <PreviewList
        title="Appointment"
        buttonNode={
          <div css={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <IconicButton
              tip="Book appointment"
              Icon={AddIcon}
              backgroundColor={color.cold_blue}
              width={25}
              radius={5}
              iconSize={11}
              onPress={onPress}
            />
            <MultiOptionSwitcher //TODO add an actual input
              textList={['Upcoming', 'Done', 'Canceled', 'All']}
              defaultSelected={selectedState}
              onChange={setSelectedState}
            />
          </div>
        }
        gap={10}
        noBorder
      >
        {appointmentsFiltered.length > 0 ? (
          appointmentsFiltered.map((app, index) => (
            <TimelineItem key={index} {...app} patientId={patientId} />
          ))
        ) : (
          <VerticalPanel title="No appointments" backgroundColor="none" /> //TODO add the correct icon to the vertical panel
        )}
      </PreviewList>
    </div>
  );
}
