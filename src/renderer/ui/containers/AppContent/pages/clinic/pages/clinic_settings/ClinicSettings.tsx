import RolesTab from '@components/roles_tab';
import TabMenu from '@components/tab_menu';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './style/index.scss';
interface ClinicSettingsProps {}
export default function ClinicSettings({}: ClinicSettingsProps) {
  const navigate = useNavigate();
  return (
    <div className="clinic-settings">
      <span>Clinic Settings</span>
      <TabMenu
        items={[
          'Overview',
          'Members',
          'Roles',
          'Timing and Schedule',
          'Preferences',
          'Audit log',
          'Security settings',
        ]}
        onChanged={({ item }) =>
          navigate(item.toLowerCase().replace(/\s/g, '-'))
        }
      />

      <Routes>
        <Route path="/*" element={<div>hello</div>} />
        <Route path="Roles" element={<RolesTab />} />
      </Routes>
    </div>
  );
}
