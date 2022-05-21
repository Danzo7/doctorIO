import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ToggleButton from '@components/buttons/toggle_button';
import Icon from 'toSvg/link.svg?icon';
import './style/index.scss';
interface PermissionItemProps {
  permissionName: string;
  permissionDescription: string;
  linkedPermission?: string;
  editable?: boolean;
}
export default function PermissionItem({
  permissionName,
  permissionDescription,
  linkedPermission,
  editable = true,
}: PermissionItemProps) {
  return (
    <div
      className="permission-item"
      css={editable ? null : { opacity: 0.3, cursor: 'not-allowed' }}
    >
      <div className="permission-info">
        <div className="permission-text-container">
          <span>{permissionName}</span>
          <span>{permissionDescription}</span>
        </div>
        <div>
          <ToggleButton disabled={!editable} isChecked={true} />
        </div>
      </div>
      {linkedPermission && (
        <div className="permission-linked">
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
