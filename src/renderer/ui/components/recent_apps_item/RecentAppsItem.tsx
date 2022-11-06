import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
import { useOverlay } from '@libs/overlay/useOverlay';
import { PatientBrief } from '@models/instance.model';
import { DEFAULT_MODAL, Overlay } from '@libs/overlay';
import AddMedicalTestModal from '@containers/modals/add_medical_test_modal';
import { useAddQueueAppointmentMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useAssignAppointmentToQueueMutation } from '@redux/instance/Appointment/AppointmentApi';

interface RecentAppsItemProps {
  appointmentId?: number;
}
export default function RecentAppsItem({
  id,
  name,
  appointmentId,
}: PatientBrief & RecentAppsItemProps) {
  const { open } = useOverlay();
  const [addAppointment] = useAddQueueAppointmentMutation();
  const [AssignAppointmentToQueue] = useAssignAppointmentToQueueMutation();

  return (
    <PresentationItem primaryText={name} secondaryText={`# ${id}`}>
      <TextButton
        text={'Run Test...'} //REDUX change it to dynamic text
        backgroundColor={color.cold_blue}
        radius={7}
        onPress={() => {
          open(
            <AddMedicalTestModal
              onSubmit={(data) => {
                if (appointmentId)
                  AssignAppointmentToQueue({
                    appointmentId: appointmentId,
                    test: data,
                  });
                else
                  addAppointment({
                    patientId: id,
                    test: data,
                  });

                Overlay.close();
              }}
            />,
            DEFAULT_MODAL,
          );
        }}
      />
      <TextButton
        text="Add"
        backgroundColor={color.good_green}
        radius={7}
        onPress={() => {
          if (appointmentId)
            AssignAppointmentToQueue({
              appointmentId: appointmentId,
            });
          else
            addAppointment({
              patientId: id,
            });

          Overlay.close();
        }}
      />
    </PresentationItem>
  );
}
