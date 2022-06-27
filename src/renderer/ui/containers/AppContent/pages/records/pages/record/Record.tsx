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
import { patients } from '@api/fake';
import { useParams } from 'react-router-dom';

interface SearchInput {
  searchField: string;
}
//todo:remove this
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
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
      },
      {
        documentName: 'Scanner.pdf',
        publishDate: '28 Jan 2018',
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
//todo fetch data from api

interface RecordProps {}
export default function Record({}: RecordProps) {
  const { register, watch, setValue } = useForm<SearchInput>();
  const watchSearch = watch('searchField');
  const matches = useSearchPatient(watchSearch, usersData);
  const { navigate } = useNavigation();
  const { open } = useOverlay();
  const { patientId } = useParams();
  const patient: Patient =
    patients.find(({ patId }) => patId.toString() == patientId) ?? patients[0];

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
