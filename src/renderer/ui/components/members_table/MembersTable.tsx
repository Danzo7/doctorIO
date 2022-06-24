import MemberItem from '@components/member_item';
import './style/index.scss';
import { Member } from '@models/server.models';
interface MembersTableProps {
  list: Member[];
}
export default function MembersTable({ list }: MembersTableProps) {
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
        {list.map((member, index) => (
          <MemberItem {...member} key={index} />
        ))}
      </div>
    </div>
  );
}
