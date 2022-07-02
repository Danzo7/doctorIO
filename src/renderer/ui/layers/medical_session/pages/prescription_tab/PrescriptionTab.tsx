import { drugList } from '@api/fake';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import AddDrugModal from '@containers/modals/add_drug_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Drug } from '@models/instance.model';
import { useState } from 'react';
import MedicamentTable from './medicament_table';
import './style/index.scss';

interface PrescriptionTabProps {}
export default function PrescriptionTab({}: PrescriptionTabProps) {
  const { open } = useOverlay();
  const [data, setData] = useState<Drug[]>(drugList);

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
                  onSubmitPress={(formData) => {
                    console.log(formData);
                    setData((prev) => {
                      return [
                        ...prev,
                        {
                          name: formData.name,
                          qts: formData.qts,
                          dosage: formData.dose,
                          description: formData.description,
                          duration: formData.duration,
                          id: Math.random() * 10,
                        },
                      ];
                    });
                    console.log(data);
                  }}
                />,
                DEFAULT_MODAL,
              );
            }}
          />
        }
      />
      <MedicamentTable editable drugList={data} />
    </div>
  );
}
