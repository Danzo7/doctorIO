import UserProfileStatus from '@components/user_profile_status';
import React, { useState } from 'react';
import './style/index.scss';
import UpArrow from 'toSvg/up_arrow.svg';
import SmallRoll from './small_roll';
import AddButton from './add_button';
import MemberFooter from './member_footer';
interface MembersPreviewProps {
  fullName: string;
  img_src: string;
  rollArray: Array<string>;
}
function MembersPreview({ fullName, img_src, rollArray }: MembersPreviewProps) {
  const [showFooter, setshowFooter] = useState(false);
  return (
    <div className="preview-container">
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
        <div
          onClick={() => setshowFooter(!showFooter)}
          className="arrow-container"
        >
          <UpArrow />
        </div>
      </div>
      {showFooter && <MemberFooter memberID="100" status="online" />}
    </div>
  );
}

export default MembersPreview;
