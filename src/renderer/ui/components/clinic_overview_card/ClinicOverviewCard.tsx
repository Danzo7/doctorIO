import LogoChanger from '@components/logo_changer';
import './style/index.scss';
import profile from '@assets/pictures/test.png';
interface ClinicOverviewCardProps {
  clinicName: string;
  clinicAddress: string;
  serviceStatus: string;
  numOfCurrentConnections: number;
  numOfPatients: number;
  numOfMembers: number;
}
export default function ClinicOverviewCard({
  clinicName,
  clinicAddress,
  serviceStatus,
  numOfCurrentConnections,
  numOfPatients,
  numOfMembers,
}: ClinicOverviewCardProps) {
  return (
    <div className="clinic-overview-card">
      <LogoChanger src={profile} width={100} />
      <span>{clinicName}</span>
      <div>
        <span>Address</span>
        <span>{clinicAddress}</span>
      </div>
      <div>
        <span>Service status</span>
        <span>{serviceStatus}</span>
      </div>
      <div>
        <span>Current Connections</span>
        <span>{numOfCurrentConnections}</span>
      </div>
      <div className="clinic-info-bottom-div">
        <div>
          <span>Patients</span>
          <span>{numOfPatients}</span>
        </div>
        <div>
          <span>Members</span>
          <span>{numOfMembers}</span>
        </div>
      </div>
    </div>
  );
}
