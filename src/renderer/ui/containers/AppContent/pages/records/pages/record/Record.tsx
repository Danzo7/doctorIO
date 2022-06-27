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
import { useForm } from 'react-hook-form';
import Search from 'toSvg/search.svg?icon';
import './style/index.scss';
import { Patient } from '@models/instance.model';
import { useOverlay } from '@libs/overlay/useOverlay';
import BookAppointmentModal from '@containers/modals/book_appointment_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { patients } from '@api/fake';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

interface SearchInput {
  searchField: string;
}

//todo fetch data from api

interface RecordProps {}
export default function Record({}: RecordProps) {
  const { register, watch, setValue } = useForm<SearchInput>();
  const watchSearch = watch('searchField');
  const { navigate } = useNavigation();
  const { open } = useOverlay();
  const { patientId } = useParams();

  const [patient] = useState<Patient | undefined>(
    patients.find(({ patId }) => patId.toString() == patientId),
  );

  const patientMatches = () => {
    let results: Patient[] = [];
    if (
      watchSearch &&
      watchSearch.length > 0 &&
      watchSearch.trim().length > 0
    ) {
      results = patients.filter(
        (pat) =>
          pat.patId.toString() == watchSearch ||
          pat.firstName.toLowerCase() == watchSearch.toLowerCase() ||
          pat.lastName.toLowerCase() == watchSearch.toLowerCase(),
      );
      return results;
    }
    return [];
  };

  return (
    <div className="record">
      <Input
        placeholder="Enter patient Id"
        trailing={<Search />}
        type={'search'}
        {...register('searchField')}
        grow={false}
      />
      {watchSearch ? (
        patientMatches()?.length > 0 ? (
          <div className="records-suggestions-container">
            {patientMatches()?.map(({ firstName, lastName, patId }, index) => (
              <RecordInfoItem
                firstName={firstName}
                lastName={lastName}
                patId={patId}
                key={index}
                onViewRecord={() => {
                  setValue('searchField', '');
                  navigate(`/records/${patId}`);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="not-found">
            <span>No patient found ! </span>
          </div>
        )
      ) : patient ? (
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
      ) : (
        <div className="not-found">
          <span>No patient with this id ! </span>
        </div>
      )}
    </div>
  );
}
