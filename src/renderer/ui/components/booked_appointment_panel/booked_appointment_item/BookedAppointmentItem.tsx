import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TextButton from '@components/buttons/text_button';
import NotAButton from '@components/not_a_button';
import TextPair from '@components/text_pair/TextPair';
import { SETTINGS } from '@stores/appSettingsStore';

import AddSelectedToQueueModal from '@containers/modals/add_selected_to_queue_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { BookedAppointment } from '@models/instance.model';
import { modal } from '@stores/overlayStore';
import XMark from 'toSvg/x_mark.svg?icon';

import { format } from 'date-fns';
import './style/index.scss';
import { useCancelAppointmentMutation } from '@redux/instance/Appointment/AppointmentApi';
import AlertModal from '@containers/modals/dialog_modal';

export default function BookedAppointmentItem({
  patientName,
  bookedFor,
  id,
  bookedBy,
  patientId,
  state,
}: BookedAppointment) {
  const [CancelAppointment] = useCancelAppointmentMutation();
  return (
    <div className="booked-appointment-item">
      <TextPair
        gap={2}
        second="Patient"
        first={{ text: patientName, fontSize: 14 }}
        reversed
      />

      <BorderSeparator direction="vertical" />
      <TextPair
        gap={2}
        second="Booked in"
        first={{ text: format(bookedFor, SETTINGS.dayFormat), fontSize: 14 }}
        reversed
      />
      <BorderSeparator direction="vertical" />
      {bookedBy && (
        <TextPair
          gap={2}
          second="Booked by"
          first={{ text: bookedBy.memberName, fontSize: 14 }}
          reversed
        />
      )}
      <BorderSeparator direction="vertical" />
      {state == 'PANDING' ? (
        <>
          <TextButton
            text="Assign to queue"
            backgroundColor={color.cold_blue}
            fontColor={color.white}
            fontSize={12}
            padding="5px 10px"
            onPress={() => {
              modal(
                () => (
                  <AddSelectedToQueueModal
                    id={patientId}
                    name={patientName}
                    appointmentId={id}
                  />
                ),
                DEFAULT_MODAL,
              ).open();
            }}
          />
          <SquareIconButton
            Icon={XMark}
            backgroundColor={color.hot_red}
            onPress={() => {
              modal(
                ({ close }) => (
                  <AlertModal
                    title="Are you sure you want to cancel this appointment ?"
                    description="After confirming appointment will no longer booked"
                    status="warning"
                    controls={
                      <>
                        <TextButton
                          text="Cancel"
                          backgroundColor={color.cold_blue}
                          onPress={() => {
                            close();
                          }}
                        />
                        <TextButton
                          text="Confirm"
                          backgroundColor={color.hot_red}
                          onPress={() => {
                            CancelAppointment(id);
                            close();
                          }}
                        />
                      </>
                    }
                  ></AlertModal>
                ),
                {
                  closeOnClickOutside: true,
                  isDimmed: true,
                  clickThrough: false,
                },
              ).open();
            }}
          />
        </>
      ) : (
        <NotAButton text={'In queue'} color={color.warm_orange} />
      )}
    </div>
  );
}
