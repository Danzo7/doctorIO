import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
import { useOverlay } from '@libs/overlay/useOverlay';
import DiagnosisModal from '@containers/modals/diagnosis_modal';
import { AppointmentQueueItem, Patient } from '@models/instance.model';
import { DEFAULT_MODAL, Overlay } from '@libs/overlay';
import { useAppDispatch, useAppSelector } from '@store';
import { addToQueue } from '@redux/instance/appointmentQueue/appointmentQueueSlice';

export default function RecentAppsItem({
  firstName,
  lastName,
  patId,
}: Pick<Patient, 'firstName' | 'lastName' | 'patId'>) {
  const { appointments } = useAppSelector((state) => state.appointmentQueue);
  const dispatch = useAppDispatch();
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
          //REDUX fetch patient info instead
          const newApp: AppointmentQueueItem = {
            patientId: patId,
            patientName: firstName + ' ' + lastName,
            date: new Date(),
            position: appointments[appointments.length - 1].position + 1,
          };
          dispatch(addToQueue(newApp));
          Overlay.close();
        }}
      />
    </PresentationItem>
  );
}
