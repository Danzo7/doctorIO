import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import PreviewWithControls from '@components/preview_with_controls';

interface MedicalHistoryProps {
  MedicalHistoryList: any[];
  onAdd: () => void;
}
export default function MedicalHistory({
  MedicalHistoryList = [],
  onAdd,
}: MedicalHistoryProps) {
  return (
    <PreviewList
      title="Medical history"
      buttonNode={
        <DarkLightCornerButton title="Add" isActive={true} onPress={onAdd} />
      }
    >
      {MedicalHistoryList.map(({ medicalDescription, descriptionDate }) => (
        <PreviewWithControls
          primaryText={medicalDescription}
          secondaryText={descriptionDate}
          key={descriptionDate}
        />
      ))}
    </PreviewList>
  );
}
