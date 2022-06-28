import ClinicOverviewCard from '@components/clinic_overview_card';
import { Clinic } from '@models/server.models';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
import { clinic } from '@api/fake';

const clinicInfo: Clinic = clinic;
interface OverviewTabProps {}
export default function OverviewTab({}: OverviewTabProps) {
  return (
    <div className="overview-tab">
      <ClinicOverviewCard {...clinicInfo} />
      <div className="overview-tab-sep" />
      <OverviewInfoForm />
    </div>
  );
}
