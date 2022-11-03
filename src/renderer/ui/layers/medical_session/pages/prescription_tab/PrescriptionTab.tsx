import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import AddDrugModal from '@containers/modals/add_drug_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import {
  useMedicalSessionStore,
  usePrescription,
} from '@stores/medicalSessionStore';
import MedicamentTable from './medicament_table';
import './style/index.scss';

interface PrescriptionTabProps {}
export default function PrescriptionTab({}: PrescriptionTabProps) {
  const { open, close } = useOverlay();
  const drugs = usePrescription();
  return (
    <div className="prescription-tab">
      <Header
        title="Drug list"
        buttonNode={
          <DarkLightCornerButton
            text="Add..."
            onPress={() => {
              open(
                <AddDrugModal
                  onSubmit={(data) => {
                    useMedicalSessionStore.getState().addDrug(data);
                    close();
                  }}
                />,
                DEFAULT_MODAL,
              );
            }}
          />
        }
      />
      <MedicamentTable editable drugList={drugs} />
    </div>
  );
}
