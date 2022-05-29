import colors from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { NavTabMenu } from '@components/tab_menu';
import RolesTab from '@components/roles_tab';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './style/index.scss';
import OverviewTab from '@components/overview_tap';
import MembersTab from '@components/members_tab';
interface ClinicSettingsProps {}
export default function ClinicSettings({}: ClinicSettingsProps) {
  const navigate = useNavigate();

  return (
    <div className="clinic-settings">
      <div className="clinic-settings-header">
        <span>Clinic Settings</span>
        <DarkLightCornerButton
          title="view all"
          onPress={() => navigate('all', { replace: false })}
        />
        <DarkLightCornerButton
          title="disconnect"
          textColor={colors.hot_red}
          isActive={true}
        />
      </div>
      <NavTabMenu
        items={[
          { name: 'Overview', route: { to: '', include: 'Overview' } }, // always there is a default page/tab represented by =>""
          'Members',
          'Roles',
          'Timing and Schedule',
          'Preferences',
          'Audit log',
          'Security settings',
        ]}
      />
      <Routes>
        <Route path="Roles/*" element={<RolesTab />} />
        <Route path="" element={<OverviewTab />} />
        <Route path="Overview" element={<OverviewTab />} />
        <Route path="Members" element={<MembersTab />} />
      </Routes>
    </div>
  );
}
