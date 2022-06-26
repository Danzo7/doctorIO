import colors from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { NavTabMenu } from '@components/tab_menu';
import RolesTab from './pages/roles_tab';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './style/index.scss';
import OverviewTab from './pages/overview_tab';
import MembersTab from './pages/members_tab';
import TimingAndSchedule from './pages/timing_and_schedule';
import PreferencesTab from './pages/preferences_tab';
import AuditLogTab from './pages/audit_log_tab';
interface ClinicSettingsProps {}
export default function ClinicSettings({}: ClinicSettingsProps) {
  const navigate = useNavigate();

  return (
    <div className="clinic-settings">
      <div className="clinic-settings-header">
        <span>Clinic Settings</span>
        <DarkLightCornerButton
          text="view all"
          onPress={() => navigate('all', { replace: false })}
        />
        <DarkLightCornerButton
          text="disconnect"
          fontColor={colors.hot_red}
          isActive={true}
        />
      </div>
      <NavTabMenu
        items={[
          { name: 'Overview', route: { to: '', include: 'Overview' } }, // always there is a default page/tab represented by =>""
          'Members',
          'Roles',
          {
            name: 'Timing and Schedule',
            route: { route: 'TimingAndSchedule', exact: true },
          },
          'Preferences',
          {
            name: 'Audit log',
            route: { route: 'AuditLog', exact: true },
          },
          'Security settings',
        ]}
      />
      <Routes>
        <Route path="Roles/*" element={<RolesTab />} />
        <Route path="" element={<OverviewTab />} />
        <Route path="Overview" element={<OverviewTab />} />
        <Route path="Members" element={<MembersTab />} />
        <Route path="TimingAndSchedule" element={<TimingAndSchedule />} />
        <Route path="Preferences" element={<PreferencesTab />} />
        <Route path="AuditLog" element={<AuditLogTab />} />
      </Routes>
    </div>
  );
}
