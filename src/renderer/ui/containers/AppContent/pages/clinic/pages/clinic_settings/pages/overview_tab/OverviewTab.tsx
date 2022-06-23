import ClinicOverviewCard from '@components/clinic_overview_card';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
interface OverviewTabProps {}
export default function OverviewTab({}: OverviewTabProps) {
  return (
    <div className="overview-tab">
      <ClinicOverviewCard
        clinicId={123456789}
        clinicName="PAN"
        clinicAddress="192.168.1.1"
        serviceStatus="Good"
        connectionCount={18}
        memberCount={995}
        patientCount={5}
      />
      <div className="overview-tab-sep" />
      <OverviewInfoForm />
    </div>
  );
}
