import ClinicOverviewCard from '@components/clinic_overview_card';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import LoadingSpinner from '@components/loading_spinner';
import { useGetMembersQuery } from '@redux/clinic/rbac/member/memberApi';

interface OverviewTabProps {}
export default function OverviewTab({}: OverviewTabProps) {
  const getMembersQuery = useGetMembersQuery();
  const { data, isSuccess, isLoading, isUninitialized } = useGetClinicQuery(
    undefined,
    {
      skip: !getMembersQuery.isSuccess,
    },
  );

  return (
    <>
      {isLoading || isUninitialized ? (
        <LoadingSpinner />
      ) : (
        isSuccess && (
          <div className="overview-tab">
            <ClinicOverviewCard
              name={data.name}
              address={data.address}
              avatar={data.avatar}
              connectionCount={data.connectionCount}
              memberCount={getMembersQuery.data!.length}
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
