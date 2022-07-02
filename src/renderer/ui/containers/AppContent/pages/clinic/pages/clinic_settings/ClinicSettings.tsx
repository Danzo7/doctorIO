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
import { useOverlay } from '@libs/overlay/useOverlay';
import WarningModal from '@containers/modals/warning_modal';
import TextButton from '@components/buttons/text_button';
import { FIT_MODAL } from '@libs/overlay';
interface ClinicSettingsProps {}
export default function ClinicSettings({}: ClinicSettingsProps) {
  const navigate = useNavigate();
  const { open, close } = useOverlay();
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
          onPress={() => {
            open(
              <WarningModal
                warningTitle="are you sure you want to disconnect ?"
                warningDescription="you will be disconnected from the clinic after confirming"
              >
                <TextButton
                  text="Confirm"
                  backgroundColor={colors.good_green}
                  width="100%"
                  onPress={() => {
                    //REDUX change the selected clinic
                    close();
                    navigate('/clinic/all');
                  }}
                />
              </WarningModal>,
              FIT_MODAL,
            );
          }}
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
