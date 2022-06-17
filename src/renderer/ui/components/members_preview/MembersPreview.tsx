import UserProfileStatus from '@components/user_profile_status';
import { useState } from 'react';
import './style/index.scss';
import UpArrow from 'toSvg/arrow.svg?icon';
import SmallRolePreview from './small_role_preview';
import MemberFooter from './member_footer';
import DarkAddButton from '@components/buttons/dark_add_button';
import AddRoleTooltip from '@components/poppers/add_role_tooltip';
import { useOverlay } from '@libs/overlay/useOverlay';
interface MembersPreviewProps {
  fullName: string;
  memberID: string;
  status: string;
  imgSrc: string;
  roleArray: Array<string>;
}
function MembersPreview({
  fullName,
  memberID,
  status,
  imgSrc,
  roleArray,
}: MembersPreviewProps) {
  const [hideFooter, setHideFooter] = useState(true);
  const { open } = useOverlay();
  const [roles, setRoles] = useState(roleArray);

  const addRole = (text: string) => {
    setRoles((prev) => {
      return [...prev, text];
    });
  };
  const deleteRole = (text: string) => {
    setRoles((prev) => {
      return prev.filter((roleText) => roleText != text);
    });
  };
  return (
    <div
      className={`preview-container${
        hideFooter ? ' preview-container-hidden' : ''
      }`}
    >
      <div className="members-preview">
        <UserProfileStatus
          imgSrc={imgSrc}
          status
          width={60}
          avatarRadius={17}
        />
        <div className="info-container">
          <span>{fullName}</span>
          <div className="roll-container">
            {roles.map((rollName, index) => (
              <SmallRolePreview
                roleName={rollName}
                key={index}
                onClick={() => {
                  deleteRole(rollName);
                }}
              />
            ))}

            <DarkAddButton
              onPress={(e) => {
                open(
                  <AddRoleTooltip
                    actionList={[
                      {
                        text: 'Cool',
                        onPress: addRole,
                      },
                      {
                        text: 'Owener',
                        onPress: addRole,
                      },
                      {
                        text: 'Support',
                        onPress: addRole,
                      },
                      {
                        text: 'Pan Legends',
                        onPress: addRole,
                      },
                    ]}
                  />,
                  {
                    closeOnClickOutside: true,
                    clickThrough: true,
                    closeOnBlur: true,
                    popperTarget: e?.currentTarget,
                  },
                );
              }}
            />
          </div>
        </div>
        <div
          className={`arrow-container`}
          onClick={() => setHideFooter(!hideFooter)}
        >
          <UpArrow width={15} />
        </div>
      </div>
      <MemberFooter memberID={memberID} status={status} />
    </div>
  );
}

export default MembersPreview;
