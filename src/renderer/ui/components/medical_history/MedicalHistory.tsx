import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import LoadingSpinner from '@components/loading_spinner';
import PreviewList from '@components/preview_list';
import PreviewWithControls from '@components/preview_with_controls';
import RefetchPanel from '@components/refetch_panel';
import { DATE_ONLY } from '@constants/data_format';
import AddMedicalHistoryModal from '@containers/modals/add_medical_history_modal';
import { useGetMedicalHistoryQuery } from '@redux/instance/record/medical_history_api';
import { modal } from '@stores/overlayStore';
import { format } from 'date-fns';

interface MedicalHistoryProps {
  patientId: number;
}
export default function MedicalHistory({ patientId }: MedicalHistoryProps) {
  const { isLoading, isSuccess, data, refetch } =
    useGetMedicalHistoryQuery(patientId);

  return (
    <PreviewList
      maxHeight={300}
      title="Medical history"
      overflow="visible"
      buttonNode={
        <DarkLightCornerButton
          text="Add"
          blend
          onPress={() => {
            modal(() => <AddMedicalHistoryModal patientId={patientId} />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              closeBtn: 'inner',
              width: '30%',
            }).open();
          }}
        />
      }
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.map((med, index) => (
          <PreviewWithControls
            primaryText={med.description}
            secondaryText={format(med.date, DATE_ONLY)}
            key={index}
          />
        ))
      ) : (
        <RefetchPanel action={refetch} />
      )}
    </PreviewList>
  );
}
