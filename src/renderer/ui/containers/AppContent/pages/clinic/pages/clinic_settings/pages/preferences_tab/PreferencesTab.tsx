import BorderSeparator from '@components/border_separator';
import CheckboxTile from '@components/checkbox_tile';
import './style/index.scss';
interface PreferencesTabProps {}
export default function PreferencesTab({}: PreferencesTabProps) {
  return (
    <div className="preferences-tab">
      <CheckboxTile
        editable
        primaryText="Enable earning & growth"
        secondaryText="by enabling this members that can create session or members linked to them will be able to determine a price for thier services"
      />
      <BorderSeparator direction="horizontal" />
      <CheckboxTile
        editable
        primaryText="Allow outside messaging"
        secondaryText="Allow members to connect with outsiders over the internet"
      />
      <BorderSeparator direction="horizontal" />
    </div>
  );
}
