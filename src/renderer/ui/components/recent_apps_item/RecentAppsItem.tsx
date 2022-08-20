import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
import { useOverlay } from '@libs/overlay/useOverlay';
import MedicalTestModal from '@containers/modals/Medical_Test_Modal';
import { PatientBrief } from '@models/instance.model';
import { DEFAULT_MODAL, Overlay } from '@libs/overlay';

interface RecentAppsItemProps {
  onAdd: () => void;
  appointmentId?: number;
}
export default function RecentAppsItem({
  id,
  name,
  appointmentId,
  onAdd,
}: PatientBrief & RecentAppsItemProps) {
  const { open } = useOverlay();
  return (
    <PresentationItem primaryText={name} secondaryText={`# ${id}`}>
      <TextButton
        text={'Run Test...'} //REDUX change it to dynamic text
        backgroundColor={color.cold_blue}
        radius={7}
        onPress={() => {
          open(
            <MedicalTestModal patientId={id} appointmentId={appointmentId} />,
            DEFAULT_MODAL,
          );
        }}
      />
      <TextButton
        text="Add"
        backgroundColor={color.good_green}
        radius={7}
        onPress={() => {
          onAdd();
          Overlay.close();
        }}
      />
    </PresentationItem>
  );
}
