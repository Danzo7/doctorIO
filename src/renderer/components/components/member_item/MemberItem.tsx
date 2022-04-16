import UserProfileStatus from '@components/user_profile_status';
import React from 'react';
import './style/index.scss';
import IsOwner from 'toSvg/isOwner.svg';
import Menu from 'toSvg/menu.svg';
import SmallRolePreview from '@components/members_preview/small_role_preview';
import AddButton from '@components/members_preview/add_button';
interface MemberItemProps {
  memberImgSrc: string;
  memberStatus: boolean;
  roleArray: Array<string>;
}
export default function MemberItem({
  memberImgSrc,
  memberStatus,
  roleArray = [],
}: MemberItemProps) {
  const addRole = () => {};
  return (
    <div className="container">
      <div className="member-item">
        <div className="member-Info">
          <UserProfileStatus
            imgSrc={memberImgSrc}
            status={memberStatus}
            width={30}
          />
          <div className="id-container">
            <span>Aymen Daouadji</span>
            <span>@mohamed#2000</span>
          </div>
          <IsOwner />
        </div>
        <div className="roles-container">
          {roleArray.length > 0 &&
            roleArray.map((rollName) => (
              <SmallRolePreview roleName={rollName} />
            ))}
          <div onClick={addRole} className="add-btn-container">
            <AddButton />
          </div>
        </div>
        <div className="date-container">
          <span>28 Feb 2021</span>
        </div>
      </div>
      <div className="option-menu">
        <Menu />
      </div>
    </div>
  );
}
