import { Appointment, BookedAppointment, Drug } from '@models/instance.model';
import { DirectMessage, User } from '@models/local.models';
import {
  Clinic,
  Member,
  PermKeys,
  Role,
  RoleBrief,
} from '@models/server.models';
import { faker } from '@faker-js/faker';

export const template: User = {
  userId: '',
  email: '',
  avatar: '',
  clinic: [],
  selectedClinic: 0,
  phone: '',
  publicKey: '',
  privateKey: '',
  firstName: '',
  lastName: '',
  userPreferences: {
    language: 'en',
    theme: 'Nighty',
    welcomeDismissedIn: new Date('2020-01-01').toISOString(),
  },
};
export const fakeInvKey = '2tsv1rwv0rHiH';
export const roles: Role[] = [
  {
    id: 1,
    name: 'Support',
    description: 'Technical support',
    permissions: ['CAN_ADD_DRUGS', 'CAN_ADD_MEMBERS', 'CAN_ADD_PATIENT'],
    slaveRole: { id: 1, name: 'Doctor', priority: 1 },
    priority: 1,
  },
];
export const selectedRole: Role = roles[0];

export const rolesBrief: RoleBrief[] = roles.filter(
  ({ name, id, priority }) => {
    return { name, id, priority };
  },
);

export const members: Member[] = [
  {
    name: 'Aymen Daouadji',
    status: true,
    secretKey: '12346678',
    addedBy: { name: 'Brahim aymen', id: 1 },
    age: 18,
    gender: 'male',
    address: 'blida',
    userId: '150',
    phone: '054681349',
    id: 1,
    roles: [rolesBrief[0]],
    joinDate: new Date('2022-01-01'),
  },
  {
    name: 'not aymen',
    status: true,
    secretKey: '12346678',
    addedBy: { name: 'Brahim aymen', id: 1 },
    age: 18,
    gender: 'male',
    address: 'blida',
    userId: '150',
    phone: '054681349',
    id: 1,
    roles: [rolesBrief[0]],
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
export const currentMember: Member = members[1];
export const currentMemberPermissions: PermKeys[] = [
  'CAN_HAVE_ADMIN',
  'CAN_ADD_DRUGS',
  'CAN_ADD_MEMBERS',
  'CAN_ADD_PATIENT',
  'CAN_HAVE_QUEUE',
  'CAN_MANAGE_PATIENT',
];

export const clinic: Clinic = {
  clinicName: 'PAN',
  clinicId: 0,
  clinicAddress: 'Blida',
  connectionCount: 20,
  serviceStatus: 'Good',
  patientCount: 18,
  memberCount: 20,
  avatar: faker.image.avatar(),
  timing: {
    workingDays: [0, 2, 3, 4, 5, 6],
    timeToClose: '23:59',
    timeToOpen: '08:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    canBypassClosing: true,
  },
  preferences: { canCreateSession: true },
};
