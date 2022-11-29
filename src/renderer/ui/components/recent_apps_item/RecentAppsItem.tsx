import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
import { PatientBrief } from '@models/instance.model';
import { DEFAULT_MODAL } from '@libs/overlay';
import AddMedicalTestModal from '@containers/modals/add_medical_test_modal';
import { useAddQueueAppointmentMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useAssignAppointmentToQueueMutation } from '@redux/instance/Appointment/AppointmentApi';
import { modal, Overlay_u } from '@stores/overlayStore';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';

interface RecentAppsItemProps {
  appointmentId?: number;
}
export default function RecentAppsItem({
  id,
  name,
  appointmentId,
}: PatientBrief & RecentAppsItemProps) {
  const selectedQueue = useQueueSelectionStore.getState().selectedQueue;
  const [addAppointment] = useAddQueueAppointmentMutation();
  const [AssignAppointmentToQueue] = useAssignAppointmentToQueueMutation();

  return (
    <PresentationItem primaryText={name} secondaryText={`# ${id}`}>
      <TextButton
        text={'Run Test...'} //REDUX change it to dynamic text
        backgroundColor={color.cold_blue}
        radius={7}
        onPress={() => {
          modal(
            () => (
              <AddMedicalTestModal
                onSubmit={(data) => {
                  if (appointmentId)
                    AssignAppointmentToQueue({
                      selectedQueue: selectedQueue,
                      id: appointmentId,
                      test: data,
                    }).then((res: any) => {
                      if (res?.data) Overlay_u.clear();
                    });
                  else
                    addAppointment({
                      selectedQueue: selectedQueue,
                      body: {
                        patientId: id,
                        test: data,
                      },
                    }).then((res: any) => {
                      if (res?.data) Overlay_u.clear();
                    });
                }}
              />
            ),
            DEFAULT_MODAL,
          ).open();
        }}
      />
      <TextButton
        text="Add"
        backgroundColor={color.good_green}
        radius={7}
        onPress={() => {
          if (appointmentId)
            AssignAppointmentToQueue({
              selectedQueue: selectedQueue,
              id: appointmentId,
            }).then((res: any) => {
              if (res?.data) Overlay_u.clear();
            });
          else
            addAppointment({
              selectedQueue: selectedQueue,
              body: {
                patientId: id,
              },
            }).then((res: any) => {
              if (res?.data) Overlay_u.clear();
            });
        }}
      />
    </PresentationItem>
  );
}
