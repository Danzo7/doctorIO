import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
import { useOverlay } from '@libs/overlay/useOverlay';
import DiagnosisModal from '@containers/modals/diagnosis_modal';
import { PatientBrief } from '@models/instance.model';
import { DEFAULT_MODAL, Overlay } from '@libs/overlay';
import { useAddAppointmentMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';

export default function RecentAppsItem({ id, name }: PatientBrief) {
  const [AddAppointment] = useAddAppointmentMutation();

  const { open } = useOverlay();
  return (
    <PresentationItem primaryText={name} secondaryText={`# ${id}`}>
      <TextButton
        text="Run diagnosis..."
        backgroundColor={color.cold_blue}
        radius={7}
        onPress={() => {
          //REDUX change position by getting the value
          open(<DiagnosisModal position={1} />, DEFAULT_MODAL);
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
