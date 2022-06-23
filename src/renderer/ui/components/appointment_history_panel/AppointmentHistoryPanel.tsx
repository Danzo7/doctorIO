import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import { ComponentProps } from 'react';
import AppointmentHistoryItem from './appointment_history_item';
import './style/index.scss';
export type AppointmentHistoryList = ComponentProps<
  typeof AppointmentHistoryItem
>[];
interface AppointmentHistoryPanelProps {
  list: AppointmentHistoryList;
}
export default function AppointmentHistoryPanel({
  list,
}: AppointmentHistoryPanelProps) {
  return (
    <PreviewList
      title="Post appointment"
      buttonNode={<DarkLightCornerButton title="View all" blend />} //TODO implement View All function
      notScrollable
    >
      {list.map(({ date, subject, id }, index) => (
        <AppointmentHistoryItem
          date={date}
          subject={subject}
          id={id}
          key={id + index}
        />
      ))}
    </PreviewList>
  );
}
