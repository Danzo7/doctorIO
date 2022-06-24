import MembersTable from '@components/members_table';
import RoleDescription from '@components/role_description';
import { Role } from '@models/server.models';
import './style/index.scss';

export default function RoleMembers({ roleName, roleDesc, roleId }: Role) {
  return (
    <div className="role-members">
      <RoleDescription roleName={roleName} description={roleDesc} />
      <MembersTable
        list={[
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
            name: 'Brahim Aymen',
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
        ]}
      />
    </div>
  );
}
