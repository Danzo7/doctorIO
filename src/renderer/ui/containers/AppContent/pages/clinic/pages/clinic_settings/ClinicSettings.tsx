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
import TextButton from '@components/buttons/text_button';
import { FIT_MODAL, modal } from '@libs/overlay';
import { useDisconnectMemberMutation } from '@redux/local/auth/authApi';
import AlertModal from '@containers/modals/dialog_modal';

import TemplateTab from './pages/template_tab';
interface ClinicSettingsProps {}
export default function ClinicSettings({}: ClinicSettingsProps) {
  const navigate = useNavigate();

  const [DisconnectMember] = useDisconnectMemberMutation();
  return (
    <div className="clinic-settings">
      <div className="clinic-settings-header">
        <span>Clinic Settings</span>

        <DarkLightCornerButton
          text="disconnect"
          fontColor={colors.hot_red}
          isActive={true}
          onPress={() => {
            modal(
              ({ close }) => (
                <AlertModal
                  title="are you sure you want to disconnect ?"
                  description="you will be disconnected from the clinic after confirming"
                  status="warning"
                  controls={
                    <TextButton
                      text="Confirm"
                      backgroundColor={colors.hot_red}
                      onPress={() => {
                        DisconnectMember();
                        close();
                        navigate('/');
                      }}
                    />
                  }
                ></AlertModal>
              ),
              FIT_MODAL,
            ).open();
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
          'Template',
          'Preferences',
          {
            name: 'Audit log',
            route: { route: 'AuditLog', exact: true },
          },
          'Security settings',
        ]}
        previews={[3, 5, 6, 7]}
      />
      <Routes>
        <Route path="Roles/*" element={<RolesTab />} />
        <Route path="" element={<OverviewTab />} />
        <Route path="Overview" element={<OverviewTab />} />
        <Route path="Members" element={<MembersTab />} />
        <Route path="TimingAndSchedule" element={<TimingAndSchedule />} />
        <Route path="Template" element={<TemplateTab />} />
        <Route path="Preferences" element={<PreferencesTab />} />
        <Route path="AuditLog" element={<AuditLogTab />} />
      </Routes>
    </div>
  );
}
