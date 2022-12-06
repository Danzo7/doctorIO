import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import LoadingSpinner from '@components/loading_spinner';
import PreviewList from '@components/preview_list';
import { useGetPatientAppointmentsQuery } from '@redux/instance/Appointment/AppointmentApi';
import { useGetPatientDetailQuery } from '@redux/instance/record/patient_api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import AppointmentHistoryItem from './appointment_history_item';
import './style/index.scss';

interface AppointmentHistoryPanelProps {
  patientId: number;
}

export default function AppointmentHistoryPanel({
  patientId,
}: AppointmentHistoryPanelProps) {
  const GetPatientDetailQuery = useGetPatientDetailQuery(
    patientId ?? skipToken,
  );
  const { isSuccess, data, isLoading, isFetching } =
    useGetPatientAppointmentsQuery(patientId, {
      skip: !GetPatientDetailQuery.isSuccess,
    });

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
        GetPatientDetailQuery.isSuccess &&
        data
          .filter((app) => app.state == 'done' || app.state == 'done-booked')
          .slice(-3)
          .map(
            (
              {
                date,
                subject,
                session,
                assignedBy,
                bookedIn,
                bookedFor,
                member,
              },
              index,
            ) => (
              <AppointmentHistoryItem
                date={date}
                subject={subject}
                session={session}
                assignedBy={assignedBy}
                bookedIn={bookedIn}
                bookedFor={bookedFor}
                member={member}
                patientName={
                  GetPatientDetailQuery.data?.firstName +
                  '  ' +
                  GetPatientDetailQuery.data?.lastName
                }
                patientAge={GetPatientDetailQuery.data?.age}
                key={patientId + index}
              />
            ),
          )
      )}
    </PreviewList>
  );
}
