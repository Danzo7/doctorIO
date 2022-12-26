import Can from '@ability/index';
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
import { useQueueSelectionStore } from '@stores/queueSelectionStore';
import './style/index.scss';
import { useAbility } from '@stores/abilityStore';
interface SmallClinicStatusProps {
  hasViewClinic?: true;
}

export default function SmallClinicStatus({
  hasViewClinic,
}: SmallClinicStatusProps) {
  const abilities = useAbility();

  const selectedQueue = useQueueSelectionStore.getState().selectedQueue;
  const { data, isSuccess } = useGetQueueStateQuery(selectedQueue, {
    skip: !(abilities.can('have', 'queue') || abilities.can('manage', 'queue')),
  });
  const [ResumeQueue] = useResumeQueueMutation();
  const [PauseQueue] = usePauseQueueMutation();
  const { navigate } = useNavigation();
  const ownershipData = useGetIsQueueOwnerQuery(selectedQueue, {
    skip: !(abilities.can('have', 'queue') || abilities.can('manage', 'queue')),
  });
  const appointmentsQuery = useGetQueueAppointmentsQuery(selectedQueue, {
    skip: !(abilities.can('have', 'queue') || abilities.can('manage', 'queue')),
  });
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
            <Can I="manage" a="clinic">
              <DarkLightCornerButton
                text=" View clinic..."
                onPress={() => {
                  navigate('clinic/TimingAndSchedule');
                }}
              />
            </Can>
          }
        />
      )}
      {
        <div className="content">
          <Timer
            active={isSuccess ? data.state != 'PAUSED' : true}
            pCount={count}
          />
          {isSuccess && isOwner && (
            <div className="switch">
              <Can I="manage" a="queue">
                {(isAllowed) => (
                  <ToggleButton
                    disabled={!(isAllowed || isOwner)}
                    isChecked={data.state != 'PAUSED'}
                    onChange={() => {
                      if (data.state == 'PAUSED') ResumeQueue(selectedQueue);
                      else PauseQueue(selectedQueue);
                    }}
                  />
                )}
              </Can>
              <span>
                {data.state != 'PAUSED'
                  ? 'Accept more Patients'
                  : 'Do not accept patients'}
              </span>
            </div>
          )}
        </div>
      }
    </div>
  );
}
