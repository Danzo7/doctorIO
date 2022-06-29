import BorderSeparator from '@components/border_separator';
import CheckboxTile from '@components/checkbox_tile';
import { preferences } from '@constants/permissions';
import { Fragment } from 'react';
import './style/index.scss';
interface PreferencesTabProps {}
export default function PreferencesTab({}: PreferencesTabProps) {
  return (
    <div className="preferences-tab">
      {preferences.map(({ name, permKey, description }) => (
        <Fragment key={permKey}>
          <CheckboxTile
            editable
            primaryText={name}
            secondaryText={description}
          />
          <BorderSeparator direction="horizontal" />
        </Fragment>
      ))}
    </div>
  );
}
