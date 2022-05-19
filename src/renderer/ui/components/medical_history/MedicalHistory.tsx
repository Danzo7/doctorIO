import PreviewList from '@components/preview_list';
import PreviewWithControls from '@components/preview_with_controls';

interface MedicalHistoryProps {
  MedicalHistoryList: any[];
}
export default function MedicalHistory({
  MedicalHistoryList = [],
}: MedicalHistoryProps) {
  return (
    <PreviewList title="Medical history" buttonText="Add">
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
