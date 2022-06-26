import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import AddSearchToBooked from '@containers/modals/add_search_to_booked';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { ComponentProps } from 'react';
import BookedAppointmentItem from './booked_appointment_item';
export type BookedAppointmentList = ComponentProps<
  typeof BookedAppointmentItem
>[];

interface BookedAppointmentPanelProps {
  list: BookedAppointmentList;
}
export default function BookedAppointmentPanel({
  list,
}: BookedAppointmentPanelProps) {
  const { open } = useOverlay();
  return (
    <PreviewList
      title="Booked Appointment"
      buttonNode={
        <DarkLightCornerButton
          text="Add"
          onPress={() => {
            open(<AddSearchToBooked />, DEFAULT_MODAL);
          }}
        />
      }
      noBorder
      maxHeight={400}
    >
      {list.map((props, index) => (
        <BookedAppointmentItem {...props} key={index} />
      ))}
    </PreviewList>
  );
}
