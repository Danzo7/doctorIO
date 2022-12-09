import VerticalTab from '@components/vertical_tab';
import AppearanceTab from './pages/appearance_tab';
import PreferencesTab from './pages/preferences_tab';
import ProfileTab from './pages/profile_tab';
import SecurityTab from './pages/security_tab';
import './style/index.scss';
interface SettingsProps {}
export default function Settings({}: SettingsProps) {
  return (
    <div className="settings">
      <span>Settings</span>
      <div className="settings-content">
        <VerticalTab
          items={[
            { label: 'Profile', content: <ProfileTab /> },
            { label: 'Security', content: <SecurityTab /> },
            { label: 'Preferences', content: <PreferencesTab /> },
            { label: 'Appearance', content: <AppearanceTab /> },
          ]}
        />
      </div>
    </div>
  );
}
