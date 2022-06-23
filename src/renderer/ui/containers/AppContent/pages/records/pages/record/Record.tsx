import BookingTimeline from '@components/booking_timeline';
import DocumentPreviewPanel from '@components/document_preview_panel';
import Input from '@components/inputs/input';
import {
  PatientInfoCard,
  PatientSpecificsCard,
} from '@components/patient_card';
import MiniPatientCard from '@components/patient_card/mini_patient_card';
import RecordInfoItem from '@components/record_info_item';
import MedicalHistory from '@components/medical_history';
import useNavigation from '@libs/hooks/useNavigation';
import useSearchPatient from '@libs/hooks/useSearchPatient';
import { useForm } from 'react-hook-form';
import Search from 'toSvg/search.svg?icon';
import './style/index.scss';
import { Patient } from '@models/instance.model';
import { useOverlay } from '@libs/overlay/useOverlay';
import BookAppointmentModal from '@containers/modals/book_appointment_modal';
import { DEFAULT_MODAL } from '@libs/overlay';

interface SearchInput {
  searchField: string;
}

const usersData = [
  {
    fullName: 'brahim aymen',
    id: '123456789',
    medicalHistoryList: [
      {
        medicalDescription: 'had a noise pain',
        descriptionDate: '21 Feb 2022',
      },
      {
        medicalDescription: 'had a noise pain',
        descriptionDate: '21 Feb 2022',
      },
      {
        medicalDescription: 'had a noise pain',
        descriptionDate: '21 Feb 2022',
      },
      {
        medicalDescription: 'had a noise pain',
        descriptionDate: '21 Feb 2022',
      },
      {
        medicalDescription: 'had a noise pain',
        descriptionDate: '21 Feb 2022',
      },
      {
        medicalDescription: 'had a noise pain',
        descriptionDate: '21 Feb 2022',
      },
      {
        medicalDescription: 'had a noise pain',
        descriptionDate: '21 Feb 2022',
      },
    ],
    documentList: [
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
        onDelete: () => {},
        onPressHistory: () => {},
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
        onDelete: () => {},
        onPressHistory: () => {},
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
        onDelete: () => {},
        onPressHistory: () => {},
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
        onDelete: () => {},
        onPressHistory: () => {},
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
        onDelete: () => {},
        onPressHistory: () => {},
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
        onDelete: () => {},
        onPressHistory: () => {},
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
        onDelete: () => {},
        onPressHistory: () => {},
      },
    ],
    recordData: {
      Height: '1.75 m',
      Weight: '107 kg',
      Pressure: '15',
      Blood: 'O +',
      ansolin: '15',
      whatever: '20',
    },
  },
  {
    fullName: 'daouadji aymen',
    id: '12345689',
    medicalHistoryList: [],
    documentList: [],
    recordData: {
      Height: '1.75 m',
      Weight: '107 kg',
      Pressure: '15',
      Blood: 'O +',
      ansolin: '15',
      whatever: '20',
    },
  },
  {
    fullName: 'amine bou',
    id: '45689745',
    medicalHistoryList: [],
    documentList: [],
    recordData: {
      Height: '1.75 m',
      Weight: '107 kg',
      Pressure: '15',
      Blood: 'O +',
      ansolin: '15',
      whatever: '20',
    },
  },
  {
    fullName: 'John Doe',
    id: '12344689',
    medicalHistoryList: [],
    documentList: [],
    recordData: {
      Height: '1.75 m',
      Weight: '107 kg',
      Pressure: '15',
      Blood: 'O +',
      ansolin: '15',
      whatever: '20',
    },
  },
];

const patient: Patient = {
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
      bookDate: new Date('2022-01-01'),
    },
    {
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
      assistantId: 2,
      doctorId: 1,
      id: 1,
      state: 'done-booked',
      bookDate: new Date('2022-01-01'),
      date: new Date('2022-01-01'),
      sessionId: 1,
      subject: 'Inner bleed',
    },
    {
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
      assistantId: 2,
      doctorId: 1,
      id: 2,
      state: 'done',
      date: new Date('2022-01-01'),
      sessionId: 4,
      subject: 'Inner bleed',
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
      date: new Date('2022-04-04'),
      sessionId: 1,
      subject: 'Inner bleed',
    },
  ],
  medicalHistory: [
    {
      id: 1,
      description: 'had a noise pain',
      date: new Date('2022-01-01'),
    },
    {
      id: 2,
      description: 'had a noise pain',
      date: new Date('2022-01-01'),
    },
    {
      id: 3,
      description: 'had a noise pain',
      date: new Date('2022-01-01'),
    },
    {
      id: 4,
      description: 'had a noise pain',
      date: new Date('2022-01-01'),
    },
  ],
  status: 'active',
  medicalDocuments: [
    {
      fileId: 1,
      fileName: 'file1.pdf',
      fileType: 'pdf',
      date: new Date('2022-01-01'),
      filePath: '',
      fileSize: 3000,
    },
    {
      fileId: 2,
      fileName: 'file1.pdf',
      fileType: 'pdf',
      date: new Date('2022-01-01'),
      filePath: '',
      fileSize: 3000,
    },
    {
      fileId: 3,
      fileName: 'file1.pdf',
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
  birthDate: new Date('2022-01-01'),
  age: 18,
  testResult: {
    height: 1.75,
    weight: 107,
    bloodPressure: 1,
    bloodType: 'A',
  },
};

interface RecordProps {}
export default function Record({}: RecordProps) {
  const { register, watch, setValue } = useForm<SearchInput>();
  const watchSearch = watch('searchField');
  const matches = useSearchPatient(watchSearch, usersData);
  const { navigate } = useNavigation();
  const { open } = useOverlay();
  return (
    <div className="record">
      <Input
        placeholder="Enter patient Id"
        trailing={<Search />}
        type={'search'}
        {...register('searchField')}
        grow={false}
      />
      {matches ? (
        matches.length > 0 ? (
          <div className="records-suggestions-container">
            {matches?.map(({ fullName, id }, index) => (
              <RecordInfoItem
                fullName={fullName}
                patientId={id}
                key={index}
                onViewRecord={() => {
                  setValue('searchField', '');
                  navigate(`/records/${id}`);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="not-found">
            <span>No patient found ! </span>
          </div>
        )
      ) : (
        <div className="record-content">
          <div className="record-infos">
            <PatientInfoCard
              birthDate={patient.birthDate}
              activeStatus={patient.status}
              registerDate={patient.registerDate}
              gender={patient.gender}
              LeftComp={
                <MiniPatientCard
                  patientFullName={patient.firstName + ' ' + patient.lastName}
                  patientId={'#' + patient.patId}
                  numPostAppointment={patient.appointments.length}
                  nextAppointmentDate={patient.nextAppointment}
                />
              }
            />
            <PatientSpecificsCard data={patient.testResult} />
            <BookingTimeline
              appointments={patient.appointments}
              patientId={patient.patId}
              onPress={() => {
                open(
                  <BookAppointmentModal
                    id={patient.patId}
                    patientName={patient.firstName + ' ' + patient.lastName}
                  />,
                  DEFAULT_MODAL,
                );
              }}
            />
          </div>
          <div className="record-side-info">
            <MedicalHistory list={patient.medicalHistory} />
            <DocumentPreviewPanel list={patient.medicalDocuments} />
          </div>
        </div>
      )}
    </div>
  );
}
