import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import Timer from '@components/small_clinic_status/timer';
import useNavigation from '@libs/hooks/useNavigation';
import { useState } from 'react';
import './style/index.scss';
interface SmallClinicStatusProps {
  hasViewClinic?: true;
}

export default function SmallClinicStatus({
  hasViewClinic,
}: SmallClinicStatusProps) {
  const [isAccept, setIsAccept] = useState(true);
  const { navigate } = useNavigation();
  return (
    <div
      css={{ padding: !hasViewClinic ? '20px 0' : '' }}
      className="small-clinic-status"
    >
      {hasViewClinic && (
        <Header
          buttonNode={
            <DarkLightCornerButton
              text=" View clinic..."
              onPress={() => {
                navigate('clinic/TimingAndSchedule');
              }}
            />
          }
        />
      )}
      <div className="content">
        <Timer isActive={isAccept} />
        <div className="switch">
          <ToggleButton
            isChecked={isAccept}
            onChange={setIsAccept}
          ></ToggleButton>
          <span>
            {isAccept ? 'Accept more Patients' : 'Do not accept patients'}
          </span>
        </div>
      </div>
    </div>
  );
}
