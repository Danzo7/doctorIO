import LogoChanger from '@components/logo_changer';
import './style/index.scss';
import { Clinic } from '@models/server.models';
import { changeLogo } from '@redux/local/settings/overviewSlice';
import { useAppDispatch } from '@store';

export default function ClinicOverviewCard(clinicInfo: Clinic) {
  const {
    clinicName,
    clinicAddress,
    serviceStatus,
    connectionCount,
    patientCount,
    memberCount,
    avatar,
  } = clinicInfo;
  const dispatch = useAppDispatch();
  return (
    <div className="clinic-overview-card">
      <LogoChanger
        src={avatar}
        width={100}
        onChange={(newSrc) => {
          dispatch(changeLogo(newSrc));
        }}
      />
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
