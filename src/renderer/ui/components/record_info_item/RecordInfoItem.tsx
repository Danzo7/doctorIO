import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import PresentationItem from '@components/presentation_item';
import './style/index.scss';
interface RecordInfoItemProps {
  fullName: string;
  patientId: string;
  onViewRecord?: () => void;
}
export default function RecordInfoItem({
  fullName,
  patientId: id,
  onViewRecord,
}: RecordInfoItemProps) {
  return (
    <PresentationItem primaryText={fullName} secondaryText={`#${id}`}>
      <TextButton
        text="View record"
        backgroundColor={color.cold_blue}
        fontSize={13}
        fontWeight={500}
        onPress={onViewRecord}
      />
    </PresentationItem>
  );
}
