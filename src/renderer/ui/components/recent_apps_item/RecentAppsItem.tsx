import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
import { useOverlay } from '@libs/overlay/useOverlay';
import DiagnosisModal from '@containers/modals/diagnosis_modal';
import { Patient } from '@models/instance.model';

export default function RecentAppsItem({
  firstName,
  lastName,
  patId,
}: Pick<Patient, 'firstName' | 'lastName' | 'patId'>) {
  const { open } = useOverlay();
  return (
    <PresentationItem
      primaryText={firstName + '' + lastName}
      secondaryText={`# ${patId}`}
    >
      <TextButton
        text="Run diagnosis..."
        backgroundColor={color.cold_blue}
        radius={7}
        onPress={() =>
          open(<DiagnosisModal />, {
            closeOnClickOutside: true,
            isDimmed: true,
            clickThrough: false,
            width: '30%',
            closeBtn: 'inner',
          })
        }
      />
      <TextButton text="Add" backgroundColor={color.good_green} radius={7} />
    </PresentationItem>
    //REDUX add patient to Queue
  );
}
