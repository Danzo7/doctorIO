import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import AddDrugModal from '@containers/modals/add_drug_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useState } from 'react';
import MedicamentTable from './medicament_table';
import './style/index.scss';

const dataList = [
  {
    drugName: 'aymen',
    qts: 15,
    dose: 3,
    duration: 5,
    comment: 'dont die',
    id: 1,
  },
  {
    drugName: 'aymen',
    qts: 10,
    dose: 3,
    duration: 6,
    comment: 'dont die',
    id: 2,
  },
  {
    drugName: 'aymen',
    qts: 5,
    dose: 3,
    duration: 2,
    comment: 'dont die',
    id: 3,
  },
  {
    drugName: 'aymen',
    qts: 5,
    dose: 3,
    duration: 4,
    comment: 'dont die',
    id: 4,
  },
  {
    drugName: 'aymen',
    qts: 5,
    dose: 3,
    duration: 5,
    comment: 'dont die',
    id: 5,
  },
];

interface PrescriptionTabProps {}
export default function PrescriptionTab({}: PrescriptionTabProps) {
  const { open } = useOverlay();
  const [data, setData] = useState(dataList);

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
                          drugName: formData.drugName,
                          qts: formData.qts,
                          dose: formData.dose,
                          comment: formData.comment,
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
      <MedicamentTable editable dataList={data} />
    </div>
  );
}
