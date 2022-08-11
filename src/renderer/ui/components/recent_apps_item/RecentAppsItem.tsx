import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
import { useOverlay } from '@libs/overlay/useOverlay';
import DiagnosisModal from '@containers/modals/diagnosis_modal';
import { Patient } from '@models/instance.model';
import { DEFAULT_MODAL, Overlay } from '@libs/overlay';
import { useAddAppointmentMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';

export default function RecentAppsItem({
  firstName,
  lastName,
  patId,
}: Pick<Patient, 'firstName' | 'lastName' | 'patId'>) {
  const [AddAppointment] = useAddAppointmentMutation();

  const { open } = useOverlay();
  return (
    <PresentationItem
      primaryText={firstName + ' ' + lastName}
      secondaryText={`# ${patId}`}
    >
      <TextButton
        text="Run diagnosis..."
        backgroundColor={color.cold_blue}
        radius={7}
        onPress={() => open(<DiagnosisModal />, DEFAULT_MODAL)}
      />
      <TextButton
        text="Add"
        backgroundColor={color.good_green}
        radius={7}
        onPress={() => {
          //REDUX get the right roleId
          AddAppointment({ roleId: 1, body: patId });
          Overlay.close();
        }}
      />
    </PresentationItem>
  );
}
