import ClinicOverviewCard from '@components/clinic_overview_card';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
interface OverviewTabProps {}
export default function OverviewTab({}: OverviewTabProps) {
  return (
    <div className="overview-tab">
      <ClinicOverviewCard
        clinicName="PAN"
        clinicAddress="192.168.1.1"
        serviceStatus="Good"
        numOfCurrentConnections={18}
        numOfMembers={995}
        numOfPatients={5}
      />
      <div className="overview-tab-sep" />
      <OverviewInfoForm />
    </div>
  );
}
