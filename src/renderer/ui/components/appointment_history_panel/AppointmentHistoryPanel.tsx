import PreviewList from '@components/preview_list';
import AppointmentHistoryItem from './appointment_history_item';
import './style/index.scss';
interface AppointmentHistoryPanelProps {
  historyList: any[];
}
export default function AppointmentHistoryPanel({
  historyList = [],
}: AppointmentHistoryPanelProps) {
  return (
    <PreviewList title="Post appointment" buttonText="View all">
      {historyList.map(
        ({ appointmentDate, appointmentDescription, onPressHistory }) => (
          <AppointmentHistoryItem
            appointmentDate={appointmentDate}
            appointmentDescription={appointmentDescription}
            onPressHistory={onPressHistory}
            key={Math.random() * 10}
          />
        ),
      )}
    </PreviewList>
  );
}
