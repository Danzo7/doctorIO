import { Patient } from '@models/instance.model';
import { User } from '@models/local.models';
import { Member } from '@models/server.models';

export const firstUser: User = {
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
      name: 'graze',
      serverLocation: '127.0.0.1:1004',
      accessKey: 'bb4da',
    },
  ],
  email: 'aymenmiro@gmail.com',
  firstName: 'carlo',
  lastName: 'badi',
  password: 'person',
  phoneNumber: '0123456789',
  publicKey: 'key',
  privateKey: 'yek',
  userId: 2123,
  username: 'killerDz',
  userPreferences: { language: 'en', theme: 'Nighty' },
};
export const patient: Patient[] = [
  {
    patId: 1,
    gender: 'male',
    appointments: [
      {
        assistantId: 2,
        doctorId: 1,
        doctorName: 'John Doe',
        assistantName: 'Michel paradox',
        id: 2,
        state: 'upcoming',
        bookDate: new Date('2022-07-01'),
      },
      {
        doctorName: 'John Doe',
        assistantName: 'Michel paradox',
        assistantId: 2,
        doctorId: 1,
        id: 1,
        state: 'done-booked',
        bookDate: new Date('2022-05-24'),
        date: new Date('2022-06-24'),
        sessionId: 1,
        subject: 'control',
      },
      {
        doctorName: 'John Doe',
        assistantName: 'Michel paradox',
        assistantId: 2,
        doctorId: 1,
        id: 2,
        state: 'done',
        date: new Date('2022-03-01'),
        sessionId: 4,
        subject: 'illness',
      },
      {
        doctorName: 'John Doe',
        assistantName: 'Michel paradox',
        assistantId: 2,
        doctorId: 1,
        id: 2,
        state: 'missed',
        bookDate: new Date('2022-02-01'),
      },
      {
        doctorName: 'John Doe',
        assistantName: 'Michel paradox',
        assistantId: 2,
        doctorId: 1,
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
        fileName: 'file1.pdf',
        fileType: 'pdf',
        date: new Date('2022-01-01'),
        filePath: '',
        fileSize: 3000,
      },
    ],
    registerDate: new Date('2022-01-01'),
    firstName: 'John',
    lastName: 'Doe',
    birthDate: new Date('1996-05-02'),
    age: 26,
    testResult: {
      height: 1.75,
      weight: 107,
      bloodPressure: 1,
      bloodType: 'A',
    },
  },
];

export const member: Member = {
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
