import { User } from '@models/local.models';
import { Member } from '@models/server.models';

const firstUser: User = {
  avatar: 'build/renderer/assets/9b4caf44c40506a102ec.png',
  clinic: [
    {
      clinicId: 2,
      name: 'clinic',
      serverLocation: '127.0.0.1:1004',
      accessKey: '123',
    },
    {
      clinicId: 1,
      name: 'gay',
      serverLocation: '127.0.0.1:1004',
      accessKey: 'bb4da',
    },
  ],
  email: '',
  firstName: '',
  lastName: '',
  machineId: 1254215,
  password: '',
  phoneN: '',
  publicKey: '',
  privateKey: '',
  userId: 2123,
  username: '',
};

const member: Member = {
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
};
export default firstUser;
export { firstUser, member };
