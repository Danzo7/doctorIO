import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import ToggleButton from '@components/buttons/toggle_button';
import QueueAddSearchModal from '@components/modals/queue_add_search_modal';
import Timer from '@components/small_clinic_status/timer';
import { Overlay } from '@components/overlay';
import { useState } from 'react';
import './style/index.scss';
interface SmallClinicStatusProps {}

export default function SmallClinicStatus({}: SmallClinicStatusProps) {
  const [isAccept, setIsAccept] = useState(true);
  return (
    <div className="small-clinic-status">
      <DarkLightCornerButton
        title=" View clinic..."
        onPress={() =>
          Overlay.showModal(<QueueAddSearchModal />, {
            clickThrough: false,
            isDimmed: true,
          })
        }
      />
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
