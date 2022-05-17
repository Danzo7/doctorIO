import UserProfileStatus from '@components/user_profile_status';
import { useState } from 'react';
import './style/index.scss';
import UpArrow from 'toSvg/arrow.svg?icon';
import SmallRolePreview from './small_role_preview';
import MemberFooter from './member_footer';
import DarkAddButton from '@components/buttons/dark_add_button';
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
  const addRole = () => {};
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
            {roleArray.map((rollName, index) => (
              <SmallRolePreview roleName={rollName} key={index} />
            ))}

            <DarkAddButton />
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
