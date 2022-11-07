import { DirectMessage } from '@models/local.models';
import { Clinic, Member } from '@models/server.models';

export const members: Member[] = [
  {
    name: 'Aymen Daouadji',
    status: true,
    addedBy: { name: 'Brahim aymen', id: 1 },
    age: 18,
    gender: 'male',
    address: 'blida',
    userId: '150',
    phone: '054681349',
    id: 1,
    roles: [],
    joinDate: new Date('2022-01-01'),
  },
  {
    name: 'not aymen',
    status: true,
    addedBy: { name: 'Brahim aymen', id: 1 },
    age: 18,
    gender: 'male',
    address: 'blida',
    userId: '150',
    phone: '054681349',
    id: 2,
    roles: [],
    joinDate: new Date('2022-01-01'),
  },
];
export const DMs: DirectMessage[] = [
  {
    dmAvatar: members[0].avatar,
    userId: members[0].userId,
    dmName: members[0].name,
    dmId: 1,
    messages: [
      { text: 'hello', date: new Date(), seen: true },
      { text: 'hi', date: new Date(), seen: true, sent: true },
      { text: 'how are you', date: new Date(), seen: true },
      {
        text: 'i am fine , do you want to go outside ?',
        date: new Date(),
        seen: true,
        sent: true,
      },
    ],
  },
  {
    dmAvatar: members[1].avatar,
    userId: members[1].userId,
    dmName: members[1].name,

    dmId: 2,
    messages: [
      { text: 'hello', date: new Date(), seen: true },
      { text: 'hi', date: new Date(), seen: true, sent: true },
      { text: 'how are you', date: new Date(), seen: true },
      { text: 'i am fine', date: new Date(), seen: true, sent: true },
    ],
  },
];

export const clinic: Clinic = {
  name: 'PAN',
  address: 'Blida',
  connectionCount: 20,
  serviceStatus: 'Good',
  patientCount: 18,
  memberCount: 20,
  avatar: '',
  timing: {
    workingDays: [0, 2, 3, 4, 5, 6],
    timeToClose: '23:59',
    timeToOpen: '08:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    rules: ['canBypassClosing'],
  },
  preferences: ['CAN_CREATE_SESSION'],
};
