import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import LoadingSpinner from '@components/loading_spinner';
import PreviewList from '@components/preview_list';
import PreviewWithControls from '@components/preview_with_controls';
import RefetchPanel from '@components/refetch_panel';
import VerticalPanel from '@components/vertical_panel';
import { DATE_ONLY } from '@constants/data_format';
import AddMedicalHistoryModal from '@containers/modals/add_medical_history_modal';
import { useGetMedicalHistoryQuery } from '@redux/instance/record/medical_history_api';
import { modal } from '@stores/overlayStore';
import { format } from 'date-fns';
import Schedule from 'toSvg/schedule.svg?icon';
interface MedicalHistoryProps {
  patientId: number;
}
export default function MedicalHistory({ patientId }: MedicalHistoryProps) {
  const { isLoading, isSuccess, data, refetch } =
    useGetMedicalHistoryQuery(patientId);
  const openAddMedicalHistoryModal = () => {
    modal(() => <AddMedicalHistoryModal patientId={patientId} />, {
      closeOnClickOutside: true,
      isDimmed: true,
      clickThrough: false,
      closeBtn: 'inner',
      width: '30%',
    }).open();
  };

  return (
    <PreviewList
      maxHeight={300}
      title="Medical history"
      overflow="visible"
      buttonNode={
        <DarkLightCornerButton
          text="Add"
          blend
          onPress={openAddMedicalHistoryModal}
        />
      }
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.length > 0 ? (
          data.map((med, index) => (
            <PreviewWithControls
              primaryText={med.description}
              secondaryText={format(med.date, DATE_ONLY)}
              key={index}
            />
          ))
        ) : (
          <VerticalPanel
            title="No medical history available"
            description="Start by add a medical history. "
            Icon={<Schedule width={'80%'} height="50%" />} //UI change the Icon to medical history icon
            backgroundColor={'none'}
            padding={'15px 0px 0 0px'}
            action={{
              text: 'add medical history',
              onClick: openAddMedicalHistoryModal,
            }}
          />
        )
      ) : (
        <RefetchPanel action={refetch} />
      )}
    </PreviewList>
  );
}
