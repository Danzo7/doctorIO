import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import PreviewWithControls from '@components/preview_with_controls';
import AddMedicalHistoryModal from '@containers/modals/add_medical_history_modal';
import { useOverlay } from '@libs/overlay/useOverlay';

interface MedicalHistoryProps {
  medicalHistoryList: any[];
}
export default function MedicalHistory({
  medicalHistoryList = [],
}: MedicalHistoryProps) {
  const { open } = useOverlay();
  return (
    <PreviewList
      maxHeight={300}
      title="Medical history"
      buttonNode={
        <DarkLightCornerButton
          title="Add"
          blend
          onPress={() => {
            open(<AddMedicalHistoryModal />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              closeBtn: 'inner',
              width: '30%',
            });
          }}
        />
      }
      notScrollable
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
