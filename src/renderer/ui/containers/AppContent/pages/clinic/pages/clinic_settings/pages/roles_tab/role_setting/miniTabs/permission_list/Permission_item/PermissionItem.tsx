import { selectedRole } from '@api/fake';
import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import CheckboxTile from '@components/checkbox_tile';
import { Permission } from '@models/server.models';
import Icon from 'toSvg/link.svg?icon';
import './style/index.scss';
interface PermissionItemProps {
  linkedPermission?: string;
  editable?: boolean;
  isChecked?: true;
}
export default function PermissionItem({
  name,
  description,
  linkedPermission,
  editable = true,
  isChecked,
}: PermissionItemProps & Omit<Permission, 'permKey'>) {
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
      />
      {linkedPermission && (
        <div
          className="permission-linked"
          css={editable ? null : { opacity: 0.3 }}
        >
          <div className={`left-linked`}>
            <span>Linked To</span>
            <Icon />
            <div className="linked-permission-container">
              <span>{linkedPermission}</span>
            </div>
          </div>
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
