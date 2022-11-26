import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import SimpleInfoContainer from '@components/simple_info_container';
import AddDrugModal from '@containers/modals/add_drug_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import {
  useMedicalSessionStore,
  usePrescription,
} from '@stores/medicalSessionStore';
import { modal } from '@stores/overlayStore';
import MedicamentTable from './medicament_table';
import './style/index.scss';

interface PrescriptionTabProps {}
export default function PrescriptionTab({}: PrescriptionTabProps) {
  const drugs = usePrescription();
  return (
    <div className="prescription-tab">
      <Header
        title="Drug list"
        buttonNode={
          <DarkLightCornerButton
            text="Add..."
            onPress={() => {
              modal(
                ({ close }) => (
                  <AddDrugModal
                    onSubmit={(data) => {
                      useMedicalSessionStore.getState().addDrug(data);
                      close();
                    }}
                  />
                ),
                DEFAULT_MODAL,
              ).open();
            }}
          />
        }
      />
      <MedicamentTable editable drugList={drugs} />
      {drugs.length == 0 && (
        <SimpleInfoContainer text="No drug are added yet" alignSelf="stretch" />
      )}
    </div>
  );
}
