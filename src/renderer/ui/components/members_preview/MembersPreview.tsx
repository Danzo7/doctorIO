import UserProfileStatus from '@components/user_profile_status';
import React, { useState } from 'react';
import './style/index.scss';
import UpArrow from 'toSvg/arrow.svg?icon';
import SmallRolePreview from './small_role_preview';
import AddButton from './add_button';
import MemberFooter from './member_footer';
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
  const [showFooter, setshowFooter] = useState(false);
  const addRole = () => {};
  return (
    <div className="preview-container">
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
            {roleArray.map((rollName) => (
              <SmallRolePreview roleName={rollName} />
            ))}
            <div onClick={addRole} className="add-btn-container">
              <AddButton />
            </div>
          </div>
        </div>
        <div
          onClick={() => setshowFooter(!showFooter)}
          className={`arrow-container${showFooter ? ' shown' : ''}`}
        >
          <UpArrow width={15} />
        </div>
      </div>
      {showFooter && <MemberFooter memberID={memberID} status={status} />}
    </div>
  );
}

export default MembersPreview;
