import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import AddDrugModal from '@containers/modals/add_drug_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useAppDispatch } from '@store';
import MedicamentTable from './medicament_table';
import './style/index.scss';

interface PrescriptionTabProps {}
export default function PrescriptionTab({}: PrescriptionTabProps) {
  const { open } = useOverlay();

  return (
    <div className="prescription-tab">
      <Header
        title="Drug list"
        buttonNode={
          <DarkLightCornerButton
            text="Add..."
            onPress={() => {
              open(<AddDrugModal />, DEFAULT_MODAL);
            }}
          />
        }
      />
      <MedicamentTable editable />
    </div>
  );
}
