import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import LoadingSpinner from '@components/loading_spinner';
import PreviewList from '@components/preview_list';
import { useGetPatientAppointmentsQuery } from '@redux/instance/Appointment/AppointmentApi';
import AppointmentHistoryItem from './appointment_history_item';
import './style/index.scss';

interface AppointmentHistoryPanelProps {
  patientId: number;
}

export default function AppointmentHistoryPanel({
  patientId,
}: AppointmentHistoryPanelProps) {
  const { isSuccess, data, isLoading, isFetching } =
    useGetPatientAppointmentsQuery(patientId);

  return (
    <PreviewList
      title="Post appointment"
      buttonNode={<DarkLightCornerButton text="View all" blend />} //FEATURE  implement View All function
      overflow="visible"
    >
      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : (
        isSuccess &&
        data
          .filter((app) => app.state.phase == 'done') //TODO implement filter function in server
          .slice(-3)
          .map(({ date, subject, id }, index) => (
            <AppointmentHistoryItem
              date={date}
              subject={subject}
              id={id}
              key={patientId + index}
            />
          ))
      )}
    </PreviewList>
  );
}
