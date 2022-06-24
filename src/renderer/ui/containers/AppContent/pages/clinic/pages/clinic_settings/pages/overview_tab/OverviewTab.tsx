import ClinicOverviewCard from '@components/clinic_overview_card';
import { Clinic } from '@models/server.models';
import { generateTime } from '../../../clinics/Clinics';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
import profile from '@assets/pictures/test.png';

const clinicInfo: Clinic = {
  clinicName: 'PAN Clinic',
  clinicId: 0,
  clinicAddress: 'Blida',
  connectionCount: 20,
  serviceStatus: 'Good',
  patientCount: 18,
  memberCount: 20,
  timeToClose: generateTime(12, 0),
  avatar: profile,
};
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
