import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import LoadingSpinner from '@components/loading_spinner';
import PreviewList from '@components/preview_list';
import PreviewWithControls from '@components/preview_with_controls';
import { DATE_ONLY } from '@constants/data_format';
import AddMedicalHistoryModal from '@containers/modals/add_medical_history_modal';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useGetMedicalHistoryQuery } from '@redux/instance/record/recordApi';
import { format } from 'date-fns';

interface MedicalHistoryProps {
  patientId: number;
}
export default function MedicalHistory({ patientId }: MedicalHistoryProps) {
  const { isLoading, isSuccess, error, data, isFetching } =
    useGetMedicalHistoryQuery(patientId);
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
            open(<AddMedicalHistoryModal patientId={patientId} />, {
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        isSuccess &&
        !isFetching &&
        data.map(({ date, description, id }, index) => (
          <PreviewWithControls
            primaryText={description}
            secondaryText={format(date, DATE_ONLY)}
            key={id.toString() + index}
          />
        ))
      )}
    </PreviewList>
  );
}
