import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import Timer from '@components/small_clinic_status/timer';
import useNavigation from '@libs/hooks/useNavigation';
import {
  useGetQueueAppointmentsQuery,
  useGetIsQueueOwnerQuery,
  useResumeQueueMutation,
  usePauseQueueMutation,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useEffect, useState } from 'react';
import './style/index.scss';
interface SmallClinicStatusProps {
  hasViewClinic?: true;
}

export default function SmallClinicStatus({
  hasViewClinic,
}: SmallClinicStatusProps) {
  const [isAccept, setIsAccept] = useState(true);
  const [ResumeQueue] = useResumeQueueMutation();
  const [PauseQueue] = usePauseQueueMutation();
  const { navigate } = useNavigation();
  const ownershipData = useGetIsQueueOwnerQuery(1);
  const appointmentsQuery = useGetQueueAppointmentsQuery(1);
  const count = appointmentsQuery.isSuccess ? appointmentsQuery.data.length : 0;
  const isOwner = ownershipData.isSuccess ? ownershipData.data : undefined;
  useEffect(() => {
    if (isAccept) ResumeQueue(1);
    else PauseQueue(1);
  }, [isAccept]);

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
        <Timer active={isAccept} pCount={count} />
        {isOwner && (
          <div className="switch">
            <ToggleButton isChecked={isAccept} onChange={setIsAccept} />
            <span>
              {isAccept ? 'Accept more Patients' : 'Do not accept patients'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
