import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import AppointmentHistoryItem from './appointment_history_item';
import './style/index.scss';
interface AppointmentHistoryPanelProps {
  historyList: any[];
  onViewAll: () => void;
}
export default function AppointmentHistoryPanel({
  historyList = [],
  onViewAll,
}: AppointmentHistoryPanelProps) {
  return (
    <PreviewList
      title="Post appointment"
      buttonNode={
        <DarkLightCornerButton title="View all" onPress={onViewAll} blend />
      }
    >
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
