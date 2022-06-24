import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import MembersPreview from '@components/members_preview';
import useNavigation from '@libs/hooks/useNavigation';
import { Member } from '@models/server.models';
import './style/index.scss';

const membersList: Member[] = [
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
interface MembersPanelProps {}
function MembersPanel({}: MembersPanelProps) {
  const { navigate } = useNavigation();
  return (
    <div className="members-panel">
      <Header
        title="Members"
        buttonNode={
          <DarkLightCornerButton
            onPress={() => {
              navigate('/clinic/Members');
            }}
            title="Members ..."
          />
        }
      />
      <div className="members-list-container">
        <div className="members-list">
          {membersList.length != 0 ? (
            membersList.map((member, index) => (
              <MembersPreview
                //todo unique memberId
                {...member}
                key={index}
              />
            ))
          ) : (
            <div>No Members</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MembersPanel;
