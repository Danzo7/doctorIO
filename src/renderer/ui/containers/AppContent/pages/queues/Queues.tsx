import AppointmentsQueue from '@components/appointments_queue';
import BookedAppointmentPanel from '@components/booked_appointment_panel';
import ErrorPanel from '@components/error_panel';
import PaymentQueue from '@components/payment_queue';
import TabMenu from '@components/tab_menu';
import { useAbility } from '@stores/abilityStore';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';
import './style/index.scss';
import AssistantsPanel from '@components/assistants_panel';

interface QueuesProps {}
export default function Queues({}: QueuesProps) {
  const ability = useAbility();
  const { selectedQueue, setSelectedQueue, queues } = useQueueSelectionStore();

  return ability.can('have', 'queue') || ability.can('manage', 'queue') ? (
    <div className="queues">
      <span>Appointment Queue</span>
      <div className="queues-header">
        <TabMenu
          onChanged={({ index }) => {
            setSelectedQueue(index);
          }}
          items={queues.map(({ name }) => name)}
          defaultSelected={selectedQueue}
        />

        <AppointmentsQueue />
        <PaymentQueue />
      </div>
      <div className="queues-footer">
        <BookedAppointmentPanel />
        <AssistantsPanel />
        {/* <SmallClinicStatus /> */}
      </div>
    </div>
  ) : (
    <ErrorPanel />
  );
}
