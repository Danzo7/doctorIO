import { clinic } from '@api/fake';
import BorderSeparator from '@components/border_separator';
import CheckboxTile from '@components/checkbox_tile';
import { preferences } from '@constants/permissions';
import { Fragment } from 'react';
import './style/index.scss';
import SettingOption from '@components/setting_option';
import { modal } from '@stores/overlayStore';
import { DEFAULT_MODAL } from '@libs/overlay';
import EditVitalsFieldsModal from '@containers/modals/edit_vitals_fields_modal';
import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
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
            isChecked={clinic.preferences.includes(permKey)}
          />
          <BorderSeparator direction="horizontal" />
        </Fragment>
      ))}
      <SettingOption
        gap={5}
        controls={
          <TextButton
            text="Change..."
            fontColor={color.white}
            fontSize={13}
            fontWeight={600}
            backgroundColor={color.darkersec_color}
            radius={7}
            borderColor={color.border_color}
            afterBgColor={color.darkersec_color}
            onPress={() => {
              modal(<EditVitalsFieldsModal />, {
                ...DEFAULT_MODAL,
                width: '25%',
              }).open();
            }}
          />
        }
        title="Vital fields"
        description="Vital fields are useful when collecting patient vital information. You can add custom fields to vital form."
      />
    </div>
  );
}
