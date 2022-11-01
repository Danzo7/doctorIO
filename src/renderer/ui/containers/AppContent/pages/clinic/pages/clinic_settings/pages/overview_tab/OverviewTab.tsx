import ClinicOverviewCard from '@components/clinic_overview_card';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import LoadingSpinner from '@components/loading_spinner';

interface OverviewTabProps {}
export default function OverviewTab({}: OverviewTabProps) {
  const { data, isSuccess, isLoading } = useGetClinicQuery();

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        isSuccess && (
          <div className="overview-tab">
            <ClinicOverviewCard
              name={data.name}
              address={data.address}
              avatar={data.avatar}
              connectionCount={data.connectionCount}
              memberCount={data.memberCount}
              patientCount={data.patientCount}
              preferences={data.preferences}
              serviceStatus={data.serviceStatus}
              timing={data.timing}
              description={data.description}
              phone={data.phone}
            />
            <div className="overview-tab-sep" />
            <OverviewInfoForm
              name={data.name}
              address={data.address}
              avatar={data.avatar}
              connectionCount={data.connectionCount}
              memberCount={data.memberCount}
              patientCount={data.patientCount}
              preferences={data.preferences}
              serviceStatus={data.serviceStatus}
              timing={data.timing}
              description={data.description}
              phone={data.phone}
            />
          </div>
        )
      )}
    </>
  );
}
