import LogoChanger from '@components/logo_changer';
import './style/index.scss';
import profile from '@assets/pictures/test.png';
import { Clinic } from '@models/server.models';

export default function ClinicOverviewCard({
  clinicId,
  clinicName,
  clinicAddress,
  serviceStatus,
  connectionCount,
  patientCount,
  memberCount,
}: Clinic) {
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
        <span>{connectionCount}</span>
      </div>
      <div className="clinic-info-bottom-div">
        <div>
          <span>Patients</span>
          <span>{patientCount}</span>
        </div>
        <div>
          <span>Members</span>
          <span>{memberCount}</span>
        </div>
      </div>
    </div>
  );
}
