import ClinicOverviewCard from '@components/clinic_overview_card';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
import { clinic } from '@api/fake';

interface OverviewTabProps {}
export default function OverviewTab({}: OverviewTabProps) {
  const clinicInfo = clinic; //REDUX get clinic info

  return (
    <div className="overview-tab">
      <ClinicOverviewCard {...clinicInfo} />
      <div className="overview-tab-sep" />
      <OverviewInfoForm
        name={clinicInfo.clinicName}
        description={clinicInfo.description ?? ''}
        location={clinicInfo.clinicAddress ?? ''}
        phoneNumber={clinicInfo.phoneNumber ?? ''}
      />
    </div>
  );
}
