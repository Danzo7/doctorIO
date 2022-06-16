import BookingTimeline from '@components/booking_timeline';
import DocumentPreviewPanel from '@components/document_preview_panel';
import Input from '@components/inputs/input';
import PatientCard from '@components/patient_card';
import MiniPatientCard from '@components/patient_card/mini_patient_card';
import RecordInfoItem from '@components/record_info_item';
import MedicalHistory from '@components/medical_history';
import useNavigation from '@libs/hooks/useNavigation';
import useSearchPatient from '@libs/hooks/useSearchPatient';
import { useForm } from 'react-hook-form';
import Search from 'toSvg/search.svg?icon';
import './style/index.scss';

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

interface RecordProps {}
export default function Record({}: RecordProps) {
  const { register, watch, setValue } = useForm<SearchInput>();
  const watchSearch = watch('searchField');
  const matches = useSearchPatient(watchSearch, usersData);
  const { navigate } = useNavigation();
  return (
    <div className="record">
      <Input
        placeholder="Enter patient Id"
        trailing={<Search />}
        type={'search'}
        {...register('searchField')}
      />
      {matches ? (
        matches.length > 0 ? (
          <div className="records-suggestions-container">
            {matches?.map(({ fullName, id }, index) => (
              <RecordInfoItem
                fullName={fullName}
                id={id}
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
            <PatientCard
              data={usersData[0].recordData}
              LeftComp={
                <MiniPatientCard
                  patientFullName="John Doe"
                  patientId="#123468"
                  numPostAppointment={18}
                  nextAppointmentDate="25 jan 2028"
                />
              }
            />
            <PatientCard data={usersData[0].recordData} />
            <BookingTimeline />
          </div>
          <div className="record-side-info">
            <MedicalHistory
              medicalHistoryList={usersData[0].medicalHistoryList}
            />
            <DocumentPreviewPanel documentList={usersData[0].documentList} />
          </div>
        </div>
      )}
    </div>
  );
}
