import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import PreviewWithControls from '@components/preview_with_controls';
import RefetchPanel from '@components/refetch_panel';
import VerticalPanel from '@components/vertical_panel';
import { SETTINGS } from '@stores/appSettingsStore';

import AddMedicalHistoryModal from '@containers/modals/add_medical_history_modal';
import { useGetMedicalHistoryQuery } from '@redux/instance/record/medical_history_api';
import { modal } from '@libs/overlay';

import { format } from 'date-fns';
import NoHistory from 'toSvg/no_history.svg?icon';
interface MedicalHistoryProps {
  patientId: number;
}
export default function MedicalHistory({ patientId }: MedicalHistoryProps) {
  const {
    isLoading,
    isSuccess,
    data,
    refetch,
    isError,
    isUninitialized,
    isFetching,
  } = useGetMedicalHistoryQuery(patientId);
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
      isLoading={isLoading || isUninitialized}
      isFetching={isFetching}
      buttonNode={
        <DarkLightCornerButton
          text="Add"
          blend
          onPress={openAddMedicalHistoryModal}
        />
      }
    >
      {isSuccess ? (
        data.length > 0 ? (
          data.map((med, index) => (
            <PreviewWithControls
              primaryText={med.description}
              secondaryText={format(med.date, SETTINGS.dateFormat)}
              key={index}
            />
          ))
        ) : (
          <VerticalPanel
            title="No medical history available"
            description="Start by add a medical history. "
            Icon={<NoHistory width="40%" height="40%" />}
            padding={0}
            action={{
              text: 'add medical history',
              onClick: openAddMedicalHistoryModal,
            }}
          />
        )
      ) : (
        isError && <RefetchPanel action={refetch} />
      )}
    </PreviewList>
  );
}
