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
  useGetQueueStateQuery,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import './style/index.scss';
interface SmallClinicStatusProps {
  hasViewClinic?: true;
}

export default function SmallClinicStatus({
  hasViewClinic,
}: SmallClinicStatusProps) {
  const { data, isSuccess } = useGetQueueStateQuery();
  const [ResumeQueue] = useResumeQueueMutation();
  const [PauseQueue] = usePauseQueueMutation();
  const { navigate } = useNavigation();
  const ownershipData = useGetIsQueueOwnerQuery();
  const appointmentsQuery = useGetQueueAppointmentsQuery();
  const count = appointmentsQuery.isSuccess ? appointmentsQuery.data.length : 0;
  const isOwner = ownershipData.isSuccess ? ownershipData.data : undefined;

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
      {isSuccess ? (
        <div className="content">
          <Timer active={data.state != 'PAUSED'} pCount={count} />
          {isOwner && (
            <div className="switch">
              <ToggleButton
                isChecked={data.state != 'PAUSED'}
                onChange={() => {
                  if (data.state == 'PAUSED') ResumeQueue();
                  else PauseQueue();
                }}
              />
              <span>
                {data.state != 'PAUSED'
                  ? 'Accept more Patients'
                  : 'Do not accept patients'}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div>error</div>
      )}
    </div>
  );
}
