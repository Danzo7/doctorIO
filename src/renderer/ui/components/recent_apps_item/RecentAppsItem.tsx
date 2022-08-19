import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
import { useOverlay } from '@libs/overlay/useOverlay';
import MedicalTestModal from '@containers/modals/Medical_Test_Modal';
import { PatientBrief } from '@models/instance.model';
import { DEFAULT_MODAL, Overlay } from '@libs/overlay';
import { useAddAppointmentMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';

export default function RecentAppsItem({ id, name }: PatientBrief) {
  const [AddAppointment] = useAddAppointmentMutation();
  // const { isSuccess, data, isFetching, error } = useGetPatientDetailQuery(id);
  // console.log('error', error);

  const { open } = useOverlay();
  return (
    <PresentationItem primaryText={name} secondaryText={`# ${id}`}>
      <TextButton
        text={'Run diagnosis...'} //REDUX change it to dynamic text
        backgroundColor={color.cold_blue}
        radius={7}
        onPress={() => {
          open(<MedicalTestModal patientId={id} />, DEFAULT_MODAL);
        }}
      />
      <TextButton
        text="Add"
        backgroundColor={color.good_green}
        radius={7}
        onPress={() => {
          //REDUX get the right roleId
          AddAppointment({ roleId: 1, body: { patientId: id } });
          Overlay.close();
        }}
      />
    </PresentationItem>
  );
}
