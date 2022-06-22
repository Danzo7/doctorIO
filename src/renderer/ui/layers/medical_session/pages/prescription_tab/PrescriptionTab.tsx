import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import AddDrugModal from '@containers/modals/add_drug_modal';
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
    duration: 5,
    comment: 'dont die',
    id: 2,
  },
  {
    drugName: 'aymen',
    qts: 5,
    dose: 3,
    duration: 5,
    comment: 'dont die',
    id: 3,
  },
  {
    drugName: 'aymen',
    qts: 5,
    dose: 3,
    duration: 5,
    comment: 'dont die',
    id: 3,
  },
  {
    drugName: 'aymen',
    qts: 5,
    dose: 3,
    duration: 5,
    comment: 'dont die',
    id: 3,
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
            title="Add..."
            onPress={() => {
              open(
                <AddDrugModal
                  onAdd={(formData) => {
                    console.log(formData);
                    setData((prev) => {
                      return [
                        ...prev,
                        {
                          drugName: formData.drugName,
                          qts: formData.qts,
                          dose: 1, //TODO  we need to add input field to Add Drug for dose value
                          comment: formData.comment,
                          duration: formData.duration,
                          id: Math.random() * 10,
                        },
                      ];
                    });
                    console.log(data);
                  }}
                />,
                {
                  closeOnClickOutside: true,
                  isDimmed: true,
                  clickThrough: false,
                  position: { top: '30%' },
                  width: '30%',
                  closeBtn: 'inner',
                },
              );
            }}
          />
        }
      />
      <MedicamentTable editable dataList={data} />
    </div>
  );
}
