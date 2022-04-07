import UserProfileStatus from '@components/user_profile_status';
import React, { useState } from 'react';
import './style/index.scss';
import UpArrow from 'toSvg/arrow.svg?icon';
import SmallRoll from './small_roll';
import AddButton from './add_button';
import MemberFooter from './member_footer';
interface MembersPreviewProps {
  fullName: string;
  imgSrc: string;
  rollArray: Array<string>;
}
function MembersPreview({ fullName, imgSrc, rollArray }: MembersPreviewProps) {
  const [showFooter, setshowFooter] = useState(false);
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
            {rollArray.map((rollName) => (
              <SmallRoll rollName={rollName} />
            ))}
            <AddButton />
          </div>
        </div>
        <div
          onClick={() => setshowFooter(!showFooter)}
          className={`arrow-container${showFooter ? ' shown' : ''}`}
        >
          <UpArrow width={10} />
        </div>
      </div>
      {showFooter && <MemberFooter memberID="100" status="online" />}
    </div>
  );
}

export default MembersPreview;
