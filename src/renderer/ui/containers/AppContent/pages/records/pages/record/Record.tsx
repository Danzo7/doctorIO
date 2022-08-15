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
import { Patient, PatientBrief } from '@models/instance.model';
import { useOverlay } from '@libs/overlay/useOverlay';
import BookAppointmentModal from '@containers/modals/book_appointment_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  useGetPatientDetailQuery,
  useLazyFindPatientByName2Query,
} from '@redux/instance/record/recordApi';
import LoadingSpinner from '@components/loading_spinner';

interface SearchInput {
  searchField: string;
}

interface RecordProps {}
export default function Record({}: RecordProps) {
  const { register, handleSubmit, watch, setValue } = useForm<SearchInput>({
    mode: 'onSubmit',
    defaultValues: { searchField: '' },
  });
  const watchSearch = watch('searchField', '');
  const { navigate } = useNavigation();
  const { open } = useOverlay();
  const { patientId } = useParams();
  const [trigger, result2, lastPromiseInfo] = useLazyFindPatientByName2Query();

  const { isError, error, isLoading, isSuccess, data, currentData } =
    useGetPatientDetailQuery(Number(patientId));

  const selectedPatient = isSuccess && data ? data : undefined;
  useEffect(() => {}, [patientId]);

  return (
    <div className="record">
      <form
        onSubmit={handleSubmit((value) => {
          // result.reset();
          trigger(value.searchField.trim(), false);
        })}
      >
        <Input
          placeholder="Enter patient Id"
          trailing={<Search />}
          type={'search'}
          {...register('searchField')}
          grow={false}
        />
      </form>
      {watchSearch ? (
        result2.isLoading ? (
          <LoadingSpinner />
        ) : result2.isSuccess && !result2.isFetching ? (
          result2.data.map((pat) => (
            <RecordInfoItem
              key={pat.id}
              id={pat.id}
              name={pat.name}
              onViewRecord={() => {
                setValue('searchField', '');
                navigate(`/records/${pat.id}`);
              }}
            />
          ))
        ) : (
          <div className="not-found">
            <span>No patient found ! </span>
          </div>
        )
      ) : selectedPatient ? (
        <div className="record-content">
          <div className="record-infos">
            <PatientInfoCard
              birthDate={new Date()}
              activeStatus={selectedPatient.status}
              registerDate={new Date()}
              gender={selectedPatient.gender}
              LeftComp={
                <MiniPatientCard
                  patientFullName={
                    selectedPatient.firstName + ' ' + selectedPatient.lastName
                  }
                  patientId={'#' + patientId}
                  numPostAppointment={
                    selectedPatient.appointments
                      ? selectedPatient.appointments.length
                      : 0
                  }
                  nextAppointmentDate={selectedPatient.nextAppointment}
                />
              }
            />
            <PatientSpecificsCard
              data={selectedPatient.test ? selectedPatient.test : []}
            />
            <BookingTimeline
              appointments={
                selectedPatient.appointments ? selectedPatient.appointments : []
              }
              patientId={Number(patientId)}
              onPress={() => {
                open(
                  <BookAppointmentModal
                    id={Number(patientId)}
                    patientName={
                      selectedPatient.firstName + ' ' + selectedPatient.lastName
                    }
                  />,
                  DEFAULT_MODAL,
                );
              }}
            />
          </div>
          <div className="record-side-info">
            <MedicalHistory patientId={Number(patientId)} />
            <DocumentPreviewPanel patientId={Number(patientId)} />
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
