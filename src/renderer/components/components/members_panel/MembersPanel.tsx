import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import MembersPreview from '@components/members_preview';
import { css } from '@emotion/css';
import React from 'react';
import './style/index.scss';
interface MembersPanelProps {
  membersList: Array<any>;
  height: number;
}
function MembersPanel({ membersList = [], height = 400 }: MembersPanelProps) {
  return (
    <div
      className={`members-panel ${css`
        height: ${height}px;
      `} `}
    >
      <div className="header">
        <span>Members</span>
        <DarkLightCornerButton title="Members ..." />
      </div>
      <div className="members-list-container">
        <div className="members-list">
          {membersList.length != 0 ? (
            membersList.map(
              ({ fullName, imgSrc, memberID, status, roleArray }) => (
                <MembersPreview
                  fullName={fullName}
                  imgSrc={imgSrc}
                  memberID={memberID}
                  status={status}
                  roleArray={roleArray}
                />
              ),
            )
          ) : (
            <div>No Members</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MembersPanel;
