import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import PresentationItem from '@components/presentation_item';
import { PatientBrief } from '@models/instance.model';
import './style/index.scss';
interface RecordInfoItemProps {
  onViewRecord?: () => void;
}
export default function RecordInfoItem({
  name,
  id,
  onViewRecord,
}: PatientBrief & RecordInfoItemProps) {
  return (
    <PresentationItem primaryText={name} secondaryText={`#${id}`}>
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
