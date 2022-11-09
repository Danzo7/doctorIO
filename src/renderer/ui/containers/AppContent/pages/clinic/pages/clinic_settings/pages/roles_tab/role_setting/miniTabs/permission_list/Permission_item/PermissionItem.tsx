import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import CheckboxTile from '@components/checkbox_tile';
import LinkedRole from '@components/linked_role';
import { Permission, PermKeys } from '@models/server.models';
import './style/index.scss';
interface PermissionItemProps {
  linkedPermission?: string;
  editable?: boolean;
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}
export default function PermissionItem({
  name,
  description,
  linkedPermission,
  editable = true,
  isChecked,
  onChange,
}: PermissionItemProps & Omit<Permission<PermKeys>, 'permKey'>) {
  return (
    <div
      className="permission-item"
      css={editable ? null : { cursor: 'not-allowed' }}
    >
      <CheckboxTile
        primaryText={name}
        secondaryText={description}
        editable={editable}
        isChecked={isChecked}
        onChange={onChange}
      />
      {linkedPermission && (
        <div
          className="permission-linked"
          css={editable ? null : { opacity: 0.3 }}
        >
          <LinkedRole linkedText="Linked To" linkedRole={linkedPermission} />
          <TextButton
            text="Change dependent..."
            fontColor={colors.cold_red}
            fontSize={9}
            fontWeight={700}
            backgroundColor={colors.darkersec_color}
            radius={7}
            borderColor={colors.border_color}
            afterBgColor={colors.darkersec_color}
            afterFontColor={colors.cold_red}
            disabled={!editable}
          />
        </div>
      )}
    </div>
  );
}
