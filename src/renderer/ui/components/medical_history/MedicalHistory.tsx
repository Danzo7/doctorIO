import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import PreviewWithControls from '@components/preview_with_controls';
import { DATE_ONLY } from '@constants/data_format';
import AddMedicalHistoryModal from '@containers/modals/add_medical_history_modal';
import { useOverlay } from '@libs/overlay/useOverlay';
import { MedicalHistory as MedicalHistoryModel } from '@models/instance.model';
import { format } from 'date-fns';

interface MedicalHistoryProps {
  list: MedicalHistoryModel[];
}
export default function MedicalHistory({ list }: MedicalHistoryProps) {
  const { open } = useOverlay();
  return (
    <PreviewList
      maxHeight={300}
      title="Medical history"
      buttonNode={
        <DarkLightCornerButton
          text="Add"
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
      {list.map(({ date, description, id }, index) => (
        <PreviewWithControls
          primaryText={description}
          secondaryText={format(date, DATE_ONLY)}
          key={id.toString() + index}
        />
      ))}
    </PreviewList>
  );
}
