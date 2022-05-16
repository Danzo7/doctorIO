import AppointmentHistoryItem from './appointment_history_item';
import './style/index.scss';
interface AppointmentHistoryPanelProps {
  historyList: any[];
  title: string;
}
export default function AppointmentHistoryPanel({
  historyList = [],
  title,
}: AppointmentHistoryPanelProps) {
  return (
    <div className="appointment-history-panel">
      <span>{title}</span>
      <div className="historyList-container">
        {historyList.map(
          ({ appointmentDate, appointmentDescription, onPress }) => (
            <AppointmentHistoryItem
              appointmentDate={appointmentDate}
              appointmentDescription={appointmentDescription}
              onPress={onPress}
              key={appointmentDate} //we need to change this
            />
          ),
        )}
      </div>
    </div>
  );
}
