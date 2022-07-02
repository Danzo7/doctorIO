import {
  Appointment,
  AppointmentQueue,
  BookedAppointment,
  Patient,
} from '@models/instance.model';
import { DirectMessage, User } from '@models/local.models';
import { Clinic, Member, Role, RolePermissions } from '@models/server.models';
import { faker } from '@faker-js/faker';
import { subMinutes } from 'date-fns';
export const firstUser: User = {
  avatar: '/assets/9b4caf44c40506a102ec.png',
  clinic: [
    {
      clinicId: 2,
      name: 'clinic',
      serverLocation: '127.0.0.1:1004',
      accessKey: '123',
      memberId: 2,
    },
    {
      clinicId: 1,
      name: 'graze',
      serverLocation: '127.0.0.1:1004',
      accessKey: 'bb4da',
      memberId: 1,
    },
    {
      clinicId: 1,
      name: 'graze',
      serverLocation: '127.0.0.1:1004',
      accessKey: 'bb4da',
      memberId: 1,
    },
  ],
  selectedClinic: 1,
  email: 'aymenmiro@gmail.com',
  firstName: 'carlo',
  lastName: 'badi',
  password: 'person',
  phoneNumber: '0123456789',
  publicKey: 'key',
  privateKey: 'yek',
  userId: 123,
  username: 'killerDz',
  userPreferences: {
    language: 'en',
    theme: 'Nighty',
    welcomeDismissedIn: new Date('2020-01-01'),
  },
};

export const roles: Role[] = [
  {
    roleId: 1,
    roleName: 'Support',
    roleDesc: 'Technical support',
    rolePermissions: {
      canAddDrugs: true,
      canAddPatients: true,
      canHaveQueue: true,
      isAdmin: true,
    },
    linkedRole: { roleId: 2, roleName: 'Doctor' },
  },
  {
    roleId: 2,
    roleName: 'Doctor',
    roleDesc: '',
    rolePermissions: {
      canAddDrugs: true,
      canAddMember: true,
      canAddPatients: true,
      canHaveQueue: true,
      canUseMessages: true,
    },
  },
  {
    roleId: 3,
    roleName: 'helper',
    roleDesc: '',
    rolePermissions: {
      canAddDrugs: true,
      canAddMember: true,
      canAddPatients: true,
      canHaveQueue: true,
      canManagePatients: true,
    },
  },
  {
    roleId: 4,
    roleName: 'gamer',
    roleDesc: '',
    rolePermissions: {
      canAddDrugs: true,
      canAddMember: true,
      canAddPatients: true,
      canHaveQueue: true,
    },
  },
];
export const selectedRole: Role = roles[0];

export const rolesBrief: Role[] = roles.filter(({ roleName, roleId }) => {
  return { roleName, roleId };
});

export const members: Member[] = [
  {
    name: 'Aymen Daouadji',
    avatar: faker.image.avatar(),
    memberStatus: true,
    accessKey: '12346678',
    addedBy: 'Brahim aymen',
    age: 18,
    gender: 'male',
    address: 'blida',
    userId: 150,
    phoneNumber: '054681349',
    memberId: 1,
    roles: [rolesBrief[0], rolesBrief[1]],
    joinDate: new Date('2022-01-01'),
  },
  {
    name: 'True Dragon',
    avatar: faker.image.avatar(),
    memberStatus: false,
    accessKey: '12346678',
    addedBy: 'Acosta',
    age: 25,
    gender: 'male',
    address: 'Alger',
    userId: 160,
    phoneNumber: '064681349',
    memberId: 2,
    roles: [rolesBrief[0]],
    joinDate: new Date('2021-02-15'),
  },
  {
    name: 'Acosta Zawb3a',
    avatar: faker.image.avatar(),
    memberStatus: true,
    accessKey: '12346678',
    addedBy: 'Brahim aymen',
    age: 22,
    gender: 'male',
    address: 'Oran',
    userId: 170,
    phoneNumber: '0546666349',
    memberId: 3,
    roles: [rolesBrief[1], rolesBrief[2]],
    joinDate: new Date('2022-06-01'),
  },
  {
    name: 'Brahim JohnWick',
    avatar: faker.image.avatar(),
    memberStatus: true,
    accessKey: '12346fh678',
    addedBy: 'Aymen Daouadji',
    age: 30,
    gender: 'male',
    address: 'blida',
    userId: 180,
    phoneNumber: '071345911',
    memberId: 4,
    roles: [rolesBrief[3], rolesBrief[1]],
    joinDate: new Date('2023-01-01'),
  },
  {
    name: 'Brahim Aymen',
    avatar: faker.image.avatar(),
    memberStatus: false,
    accessKey: '1234116678',
    addedBy: 'Aymen Daouadji',
    age: 24,
    gender: 'male',
    address: 'blida',
    userId: 190,
    phoneNumber: '054445688',
    memberId: 5,
    roles: [rolesBrief[0], rolesBrief[1]],
    joinDate: new Date('2022-01-01'),
  },
  {
    name: 'Harnan Mohamed',
    avatar:
      'https://cdn.discordapp.com/avatars/701069618256674926/587a49fcb0c2d43bcec69ab9f07dd50d.webp',
    memberStatus: true,
    accessKey: '1234116678',
    addedBy: 'Aymen Daouadji',
    age: 29,
    gender: 'male',
    address: 'Harrach',
    userId: 190,
    phoneNumber: '0658474279',
    memberId: 6,
    roles: [rolesBrief[0], rolesBrief[1]],
    joinDate: new Date('2022-01-01'),
  },
  {
    name: 'Hichem Lucid',
    avatar: faker.image.avatar(),
    memberStatus: true,
    accessKey: '1234116678',
    addedBy: 'Aymen Daouadji',
    age: 20,
    gender: 'male',
    address: 'Baskra',
    userId: 190,
    phoneNumber: '0658474279',
    memberId: 7,
    roles: [rolesBrief[0], rolesBrief[1]],
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
    dmAvatar: members[2].avatar,
    userId: members[2].userId,
    dmName: members[2].name,

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
export const currentMemberPermissions: RolePermissions = {
  isAdmin: true, //this override all other permissions
  canAddDrugs: true,
  canAddMember: true,
  canAddPatients: true,
  canHaveQueue: true,
  canManagePatients: true,
};
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
    canBypassClosing: true,
  },
  preferences: { canCreateSession: true },
};
export const appointmentQueue: Appointment[] = [
  {
    member: {
      memberId: members[0].memberId,
      memberName: members[0].name,
    },
    assignedBy: {
      memberId: members[1].memberId,
      memberName: members[1].name,
    },
    id: 2,
    state: 'upcoming',
    bookDate: new Date('2022-07-01'),
  },
  {
    member: {
      memberId: members[0].memberId,
      memberName: members[0].name,
    },
    assignedBy: {
      memberId: members[1].memberId,
      memberName: members[1].name,
    },
    id: 1,
    state: 'done-booked',
    bookDate: new Date('2022-05-24'),
    date: new Date('2022-06-24'),
    sessionId: 1,
    subject: 'control',
  },
  {
    member: {
      memberId: members[0].memberId,
      memberName: members[0].name,
    },
    assignedBy: {
      memberId: members[1].memberId,
      memberName: members[1].name,
    },
    id: 2,
    state: 'done',
    date: new Date('2022-03-01'),
    sessionId: 4,
    subject: 'illness',
  },
  {
    member: {
      memberId: members[0].memberId,
      memberName: members[0].name,
    },
    assignedBy: {
      memberId: members[1].memberId,
      memberName: members[1].name,
    },
    id: 2,
    state: 'missed',
    bookDate: new Date('2022-02-01'),
  },
  {
    member: {
      memberId: members[0].memberId,
      memberName: members[0].name,
    },
    assignedBy: {
      memberId: members[1].memberId,
      memberName: members[1].name,
    },
    id: 2,
    state: 'done',
    date: new Date('2022-01-01'),
    sessionId: 1,
    subject: 'Inner bleed',
  },
];
export const patients: Patient[] = [
  {
    patId: 1,
    gender: 'male',
    appointments: [
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'upcoming',
        bookDate: new Date('2022-07-01'),
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 1,
        state: 'done-booked',
        bookDate: new Date('2022-05-24'),
        date: new Date('2022-06-24'),
        sessionId: 1,
        subject: 'control',
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'done',
        date: new Date('2022-03-01'),
        sessionId: 4,
        subject: 'illness',
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'missed',
        bookDate: new Date('2022-02-01'),
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'done',
        date: new Date('2022-01-01'),
        sessionId: 1,
        subject: 'Inner bleed',
      },
    ],
    medicalHistory: [
      {
        id: 1,
        description: 'kidney transplants',
        date: new Date('2020-01-01'),
      },
      {
        id: 2,
        description: 'car accident',
        date: new Date('2014-01-01'),
      },
      {
        id: 3,
        description: 'injury in the elbow',
        date: new Date('2010-04-01'),
      },
      {
        id: 4,
        description: 'crack in the head',
        date: new Date('2000-01-01'),
      },
    ],
    status: 'active',
    medicalDocuments: [
      {
        fileId: 1,
        fileName: 'headScan.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
      {
        fileId: 2,
        fileName: 'bloodTests.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
      {
        fileId: 3,
        fileName: 'file.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
      {
        fileId: 4,
        fileName: 'discord.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
    ],
    registerDate: new Date('2022-01-01'),
    firstName: 'Amine Mohamed',
    lastName: 'Bouraoua',
    birthDate: new Date('1996-05-02'),
    age: 26,
    testResult: {
      height: 1.75,
      weight: 107,
      bloodPressure: 1,
      bloodType: 'A',
    },
  },

  {
    patId: 2,
    gender: 'female',
    appointments: [
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'upcoming',
        bookDate: new Date('2022-07-01'),
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 1,
        state: 'done-booked',
        bookDate: new Date('2022-05-24'),
        date: new Date('2022-06-24'),
        sessionId: 1,
        subject: 'control',
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'done',
        date: new Date('2022-03-01'),
        sessionId: 4,
        subject: 'illness',
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'missed',
        bookDate: new Date('2022-02-01'),
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'done',
        date: new Date('2022-01-01'),
        sessionId: 1,
        subject: 'Inner bleed',
      },
    ],
    medicalHistory: [
      {
        id: 1,
        description: 'kidney transplants',
        date: new Date('2020-01-01'),
      },
      {
        id: 2,
        description: 'car accident',
        date: new Date('2014-01-01'),
      },
      {
        id: 3,
        description: 'injury in the elbow',
        date: new Date('2010-04-01'),
      },
      {
        id: 4,
        description: 'crack in the head',
        date: new Date('2000-01-01'),
      },
    ],
    status: 'active',
    medicalDocuments: [
      {
        fileId: 1,
        fileName: 'headScan.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
      {
        fileId: 2,
        fileName: 'bloodTests.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
      {
        fileId: 3,
        fileName: 'file.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
      {
        fileId: 4,
        fileName: 'discord.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
    ],
    registerDate: new Date('2022-05-01'),
    firstName: 'carl',
    lastName: 'segane',
    birthDate: new Date('2000-05-02'),
    age: 26,
    testResult: {
      height: 1.75,
      weight: 107,
      bloodPressure: 1,
      bloodType: 'A',
    },
  },
  {
    patId: 3,
    gender: 'male',
    appointments: [
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 3,
        state: 'upcoming',
        bookDate: new Date('2022-07-01'),
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 1,
        state: 'done-booked',
        bookDate: new Date('2022-05-24'),
        date: new Date('2022-06-24'),
        sessionId: 1,
        subject: 'control',
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'done',
        date: new Date('2022-03-01'),
        sessionId: 4,
        subject: 'illness',
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'missed',
        bookDate: new Date('2022-02-01'),
      },
      {
        member: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        assignedBy: {
          memberId: members[1].memberId,
          memberName: members[1].name,
        },
        id: 2,
        state: 'done',
        date: new Date('2022-01-01'),
        sessionId: 1,
        subject: 'Inner bleed',
      },
    ],
    medicalHistory: [
      {
        id: 1,
        description: 'knee pain',
        date: new Date('2022-01-01'),
      },
      {
        id: 2,
        description: 'broken noise',
        date: new Date('2022-02-21'),
      },
      {
        id: 3,
        description: 'Noise surgery',
        date: new Date('2022-04-16'),
      },
      {
        id: 4,
        description: 'CSF leak',
        date: new Date('2022-06-01'),
      },
    ],
    status: 'active',
    medicalDocuments: [
      {
        fileId: 1,
        fileName: 'headScan.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
      {
        fileId: 2,
        fileName: 'bloodTests.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
      {
        fileId: 3,
        fileName: 'file.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
      {
        fileId: 4,
        fileName: 'MRI_Scan.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
    ],
    registerDate: new Date('2022-05-01'),
    firstName: 'Aymen',
    lastName: 'Daouadji',
    birthDate: new Date('1999-02-05'),
    age: 23,
    testResult: {
      height: 1.76,
      weight: 107,
      bloodPressure: 1,
      bloodType: 'A',
    },
  },
];
export const appointmentQueueData: AppointmentQueue = {
  roleId: 1,
  state: 'paused',
  isOwner: true,
  appointments: [
    {
      position: 1,
      patientId: patients[0].patId,
      patientName: patients[0].firstName + ' ' + patients[0].lastName,
      date: subMinutes(new Date(), Number.parseInt(faker.random.numeric(2))),
    },
    {
      position: 2,
      patientId: patients[1].patId,
      patientName: patients[1].firstName + ' ' + patients[1].lastName,
      date: subMinutes(new Date(), Number.parseInt(faker.random.numeric(2))),
    },
    {
      position: 3,
      patientId: patients[2].patId,
      patientName: patients[2].firstName + ' ' + patients[2].lastName,
      date: subMinutes(new Date(), Number.parseInt(faker.random.numeric(2))),
      diagnosis: {
        height: 1.76,
        weight: 107,
        bloodPressure: 1,
        bloodType: 'A',
      },
    },
    ...(() => {
      const arr = [];
      for (let i = 0; i < 10; i++)
        arr.push({
          position: i + 4,
          patientId: patients[0].patId,
          patientName: faker.name.firstName() + ' ' + faker.name.lastName(),
          date: subMinutes(
            new Date(),
            Number.parseInt(faker.random.numeric(2)),
          ),
        });
      return arr;
    })(),
  ],
};

export const bookedAppointments: BookedAppointment[] = [
  {
    patientId: patients[0].patId,
    patientName: patients[0].firstName + ' ' + patients[0].lastName,
    bookDate: new Date('2022-05-24'),
    bookedBy: {
      memberId: members[0].memberId,
      memberName: members[0].name,
    },
    state: 'panding',
  },
  {
    patientId: patients[1].patId,
    patientName: patients[1].firstName + ' ' + patients[1].lastName,
    bookDate: new Date('2022-05-24'),
    bookedBy: {
      memberId: members[0].memberId,
      memberName: members[0].name,
    },
    state: 'panding',
  },
  ...(() => {
    const arr: BookedAppointment[] = [];
    for (let i = 0; i < 10; i++)
      arr.push({
        patientId: patients[0].patId,
        patientName: faker.name.firstName() + ' ' + faker.name.lastName(),
        bookDate: new Date('2022-05-24'),
        bookedBy: {
          memberId: members[0].memberId,
          memberName: members[0].name,
        },
        state: 'in queue',
      });
    return arr;
  })(),
];
