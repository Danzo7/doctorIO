import ClinicOverviewCard from '@components/clinic_overview_card';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import { useOverViewInfo, useSetDefaults } from '@stores/overViewinfoStore';
import LoadingSpinner from '@components/loading_spinner';

interface OverviewTabProps {}
export default function OverviewTab({}: OverviewTabProps) {
  const setDefaults = useSetDefaults();
  const info = useOverViewInfo();

  const { data, error, isSuccess, isLoading } = useGetClinicQuery();
  if (info.formDefaults == undefined && isSuccess) {
    setDefaults({
      name: isSuccess ? data.name : '',
      description: isSuccess ? data.description : '',
      address: isSuccess ? data.address : '',
      phone: isSuccess ? data.phone : '',
    });
  }
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        isSuccess && (
          <div className="overview-tab">
            <ClinicOverviewCard
              name={info.name ?? data.name}
              address={info.address ?? data.address}
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
            <OverviewInfoForm />
          </div>
        )
      )}
    </>
  );
}
