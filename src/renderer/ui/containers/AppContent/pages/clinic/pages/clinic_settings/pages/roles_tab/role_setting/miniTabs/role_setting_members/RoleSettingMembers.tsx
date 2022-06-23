import MembersTable from '@components/members_table';
import { Member } from '@models/server.models';

const memberList: Member[] = [
  {
    name: 'Aymen Daouadji',
    avatar: 'build/renderer/assets/9b4caf44c40506a102ec.png',
    memberStatus: true,
    accessKey: '12346678',
    addedBy: 'Brahim aymen',
    age: 18,
    gender: 'Men',
    address: 'blida',
    userId: 12346789,
    phoneNumber: '054681349',
    memberId: 123456789,
    roles: [{ roleId: 1, roleName: 'gamer', roleDesc: 'gaming' }],
    joinDate: new Date('2022-01-01'),
  },
  {
    name: 'Aymen Daouadji',
    avatar: 'build/renderer/assets/9b4caf44c40506a102ec.png',
    memberStatus: true,
    accessKey: '12346678',
    addedBy: 'Brahim aymen',
    age: 18,
    gender: 'Men',
    address: 'blida',
    userId: 12346789,
    phoneNumber: '054681349',
    memberId: 123456789,
    roles: [{ roleId: 1, roleName: 'gamer', roleDesc: 'gaming' }],
    joinDate: new Date('2022-01-01'),
  },
  {
    name: 'Aymen Daouadji',
    avatar: 'build/renderer/assets/9b4caf44c40506a102ec.png',
    memberStatus: true,
    accessKey: '12346678',
    addedBy: 'Brahim aymen',
    age: 18,
    gender: 'Men',
    address: 'blida',
    userId: 12346789,
    phoneNumber: '054681349',
    memberId: 123456789,
    roles: [{ roleId: 1, roleName: 'gamer', roleDesc: 'gaming' }],
    joinDate: new Date('2022-01-01'),
  },
  {
    name: 'Aymen Daouadji',
    avatar: 'build/renderer/assets/9b4caf44c40506a102ec.png',
    memberStatus: true,
    accessKey: '12346678',
    addedBy: 'Brahim aymen',
    age: 18,
    gender: 'Men',
    address: 'blida',
    userId: 12346789,
    phoneNumber: '054681349',
    memberId: 123456789,
    roles: [{ roleId: 1, roleName: 'gamer', roleDesc: 'gaming' }],
    joinDate: new Date('2022-01-01'),
  },
];

interface RoleSettingMembersProps {}
export default function RoleSettingMembers({}: RoleSettingMembersProps) {
  return (
    <div className="role-setting-members">
      <MembersTable list={memberList} />
    </div>
  );
}
