import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
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
    <PreviewList
      title="Post appointment"
      buttonNode={<DarkLightCornerButton title="View all" blend />} //TODO implement View All function
      notScrollable
    >
      {historyList.map(({ appointmentDate, appointmentDescription }) => (
        <AppointmentHistoryItem
          appointmentDate={appointmentDate}
          appointmentDescription={appointmentDescription}
          key={Math.random() * 10}
        />
      ))}
    </PreviewList>
  );
}
