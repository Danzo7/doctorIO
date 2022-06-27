import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import PresentationItem from '@components/presentation_item';
import { Patient } from '@models/instance.model';
import './style/index.scss';
interface RecordInfoItemProps {
  onViewRecord?: () => void;
}
export default function RecordInfoItem({
  firstName,
  lastName,
  patId,
  onViewRecord,
}: Pick<Patient, 'patId' | 'firstName' | 'lastName'> & RecordInfoItemProps) {
  return (
    <PresentationItem
      primaryText={firstName + ' ' + lastName}
      secondaryText={`#${patId}`}
    >
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
