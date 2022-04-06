import UserProfileStatus from '@components/user_profile_status';
import React from 'react';
import './style/index.scss';
import UpArrow from 'toSvg/up_arrow.svg';
import SmallRoll from './small_roll';
import AddButton from './add_button';
interface MembersPreviewProps {
  fullName: string;
  img_src: string;
  rollArray: Array<string>;
}
function MembersPreview({ fullName, img_src, rollArray }: MembersPreviewProps) {
  return (
    <div className="members-preview">
      <UserProfileStatus img_src={img_src} status width={60} />
      <div className="info-container">
        <span>{fullName}</span>
        <div className="roll-container">
          {rollArray.map((rollName) => (
            <SmallRoll rollName={rollName} />
          ))}
          <AddButton />
        </div>
      </div>
      <UpArrow />
    </div>
  );
}

export default MembersPreview;
