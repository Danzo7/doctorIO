import LogoChanger from '@components/logo_changer';
import './style/index.scss';
import { Clinic } from '@models/server.models';

export default function ClinicOverviewCard(clinicInfo: Clinic) {
  const {
    name,
    address,
    serviceStatus,
    connectionCount,
    patientCount,
    memberCount,
    avatar,
  } = clinicInfo;
  //REDUX update logo
  return (
    <div className="clinic-overview-card">
      <LogoChanger
        src={avatar}
        width={100}
        alt={name}
        // onChange={(newSrc) => {
        //   dispatch(changeLogo(newSrc));
        // }}
      />
      <span>{name}</span>
      <div>
        <span>Address</span>
        <span>{address}</span>
      </div>
      <div>
        <span>Service status</span>
        <span>{serviceStatus}</span>
      </div>
      <div>
        <span>Current Connections</span>
        <span>{connectionCount}</span>
      </div>
      <div>
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
