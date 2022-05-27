import colors from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { NavTabMenu } from '@components/tab_menu';
import RolesTab from '@components/roles_tab';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './style/index.scss';
import OverviewTab from '@components/overview_tap';
import { useEffect } from 'react';
import MembersTab from '@components/members_tab';
interface ClinicSettingsProps {}
export default function ClinicSettings({}: ClinicSettingsProps) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('Overview');
    return () => {};
  }, []);

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
        defaultSelected={0}
        items={[
          { name: 'Overview', route: 'Overview' },
          { name: 'Members', route: 'Members' },
          'Roles',
          'Timing and Schedule',
          'Preferences',
          'Audit log',
          'Security settings',
        ]}
      />
      <Routes>
        <Route path="/*" element={<div>No matches</div>} />
        <Route path="Roles" element={<RolesTab />} />
        <Route path="Overview" element={<OverviewTab />} />
        <Route path="Members" element={<MembersTab />} />
      </Routes>
    </div>
  );
}
