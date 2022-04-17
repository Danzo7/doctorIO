import MemberItem from '@components/member_item';
import React from 'react';
import './style/index.scss';
import test from 'toPng/test.png';
interface MembersTableProps {}
export default function MembersTable({}: MembersTableProps) {
  return (
    <div className="members-table">
      <div className="table-header">
        <div className="members-container">
          <span>Members</span>
        </div>
        <div className="Date-added-container">
          <span>Date added</span>
        </div>
        <div className="roles-container">
          <span>Roles</span>
        </div>
      </div>
      <div className="table-content">
        <MemberItem
          memberFullName="Mahmoud Benaissafhfhfhfhfhfhfhfhfhf"
          memberID="@mohamed#2000"
          memberImgSrc={test}
          roleArray={['Gamer', 'Assistant']}
          memberStatus={true}
          timeAdded="28 Feb 2021"
        />
        <MemberItem
          memberFullName="Mahmoud Benaissa"
          memberID="@mohamed#2000fgfgfgfgfgfgfg"
          memberImgSrc={test}
          roleArray={['Gamer', 'Assistant', 'Assistant']}
          memberStatus={true}
          timeAdded="28 Feb 2021"
        />
        <MemberItem
          memberFullName="Mahmoud Benaissa"
          memberID="@mohamed#2000"
          memberImgSrc={test}
          roleArray={['Gamer', 'Assistant']}
          memberStatus={true}
          timeAdded="28 Feb 2021"
        />
      </div>
    </div>
  );
}
