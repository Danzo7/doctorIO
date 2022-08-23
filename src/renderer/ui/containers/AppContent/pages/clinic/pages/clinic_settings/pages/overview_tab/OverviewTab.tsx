import ClinicOverviewCard from '@components/clinic_overview_card';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
import { useAppSelector } from '@store';

interface OverviewTabProps {}
export default function OverviewTab({}: OverviewTabProps) {
  //REDUX fetch clinic info
  const clinicInfo = useAppSelector((state) => state.overview);
  return (
    <div className="overview-tab">
      <ClinicOverviewCard {...clinicInfo} />
      <div className="overview-tab-sep" />
      <OverviewInfoForm
        clinicName={clinicInfo.clinicName}
        description={clinicInfo.description ?? ''}
        clinicAddress={clinicInfo.clinicAddress}
        phoneNumber={clinicInfo.phoneNumber ?? ''}
      />
    </div>
  );
}
