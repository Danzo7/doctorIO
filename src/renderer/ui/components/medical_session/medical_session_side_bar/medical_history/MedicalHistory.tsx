import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import PreviewWithControls from '@components/preview_with_controls';

interface MedicalHistoryProps {
  medicalHistoryList: any[];
  onAdd: () => void;
}
export default function MedicalHistory({
  medicalHistoryList = [],
  onAdd,
}: MedicalHistoryProps) {
  return (
    <PreviewList
      title="Medical history"
      buttonNode={<DarkLightCornerButton title="Add" onPress={onAdd} blend />}
    >
      {medicalHistoryList.map(({ medicalDescription, descriptionDate }) => (
        <PreviewWithControls
          primaryText={medicalDescription}
          secondaryText={descriptionDate}
          key={descriptionDate}
        />
      ))}
    </PreviewList>
  );
}
