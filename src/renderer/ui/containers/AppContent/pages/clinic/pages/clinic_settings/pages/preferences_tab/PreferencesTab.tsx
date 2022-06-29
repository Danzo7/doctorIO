import { clinic } from '@api/fake';
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
            isChecked={clinic.preferences[permKey]}
          />
          <BorderSeparator direction="horizontal" />
        </Fragment>
      ))}
    </div>
  );
}
