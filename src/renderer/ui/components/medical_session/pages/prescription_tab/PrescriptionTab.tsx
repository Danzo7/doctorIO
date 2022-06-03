import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';

import './style/index.scss';
interface PrescriptionTabProps {}
export default function PrescriptionTab({}: PrescriptionTabProps) {
  return (
    <div className="prescription-tab">
      <Header
        title="Drug list"
        buttonNode={<DarkLightCornerButton title="Add..." />}
      />
      {/* table comp */}
    </div>
  );
}
