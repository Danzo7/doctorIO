import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
import { useOverlay } from '@libs/overlay/useOverlay';
import DiagnosisModal from '@containers/modals/diagnosis_modal';
interface RecentAppsItemProps {
  fullName: string;
  age: number;
}
export default function RecentAppsItem({ fullName, age }: RecentAppsItemProps) {
  const { open } = useOverlay();
  return (
    <PresentationItem primaryText={fullName} secondaryText={`Age ${age}`}>
      <TextButton
        text="Run diagnosis..."
        backgroundColor={color.cold_blue}
        radius={7}
        onPress={() => open(<DiagnosisModal />, {})}
      />
      <TextButton text="Add" backgroundColor={color.good_green} radius={7} />
    </PresentationItem>
  );
}
