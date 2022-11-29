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
import search from 'toSvg/search.svg?icon';
import './style/index.scss';
import { Patient, PatientBrief } from '@models/instance.model';
import BookAppointmentModal from '@containers/modals/book_appointment_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import {
  useGetPatientDetailQuery,
  useLazyFindPatientByName2Query,
} from '@redux/instance/record/patient_api';
import LoadingSpinner from '@components/loading_spinner';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetPatientAppointmentsQuery } from '@redux/instance/Appointment/AppointmentApi';
import TextButton from '@components/buttons/text_button';
import ErrorPanel from '@components/error_panel';
import SimpleInfoContainer from '@components/simple_info_container';
import { modal } from '@stores/overlayStore';

const schema = z.object({
  searchField: z.preprocess(
    (value) =>
      typeof value !== 'string' ? value : value.trim().replace(/\s\s+/g, ' '),
    z.string().min(1),
  ),
});

interface SearchInput {
  searchField: string;
}

interface RecordProps {}
export default function Record({}: RecordProps) {
  const searchRef = useRef<string>('');
  const { control, handleSubmit, setValue, watch } = useForm<SearchInput>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: { searchField: '' },
  });
  const isDirty = useRef(false);
  const watchSearchField = watch('searchField');
  const { navigate } = useNavigation();

  const { patientId } = useParams();
  const [trigger, result] = useLazyFindPatientByName2Query();
  const errorRef = useRef<ServerError>();
  const serverError: ServerError | undefined = (result.error as any)
    ?.data as ServerError;
  if (result.isError || result.isSuccess) errorRef.current = serverError;
  const { isFetching, isSuccess, data } = useGetPatientDetailQuery(
    Number(patientId),
  );
  const res = useGetPatientAppointmentsQuery(Number(patientId));
  if (watchSearchField !== searchRef.current) {
    isDirty.current = true;
    searchRef.current = '';
  }
  return (
    <div className="record">
      <form
        onSubmit={handleSubmit((value) => {
          if (searchRef.current != value.searchField) {
            searchRef.current = value.searchField;
            isDirty.current = false;
            trigger(searchRef.current, false);
          }
        })}
      >
        <Input
          disabled={result.isFetching}
          errorMessage={
            isDirty.current
              ? undefined
              : errorRef.current?.errorCode == 1200
              ? 'Invalid input. Must be the first and last name or the patient id'
              : errorRef.current?.errorCode == 1300
              ? 'No patient found'
              : undefined
          }
          placeholder="Enter patient Id"
          trailing={<TextButton Icon={search} blank />}
          type={'search'}
          name="searchField"
          control={control}
          grow={false}
        />
      </form>

      {result.isSuccess &&
      !result.isFetching &&
      !isDirty.current &&
      result.data.filter(
        (patient: PatientBrief) => patient.id == Number(patientId),
      ).length == 0 ? (
        result.data.map(
          (pat) =>
            pat.id != Number(patientId) && (
              <RecordInfoItem
                key={pat.id}
                id={pat.id}
                name={pat.name}
                onViewRecord={() => {
                  setValue('searchField', '');
                  navigate(`/records/${pat.id}`);
                }}
              />
            ),
        )
      ) : isSuccess ? (
        (() => {
          const selectedPatient = data as Patient;

          return (
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
                        selectedPatient.firstName +
                        ' ' +
                        selectedPatient.lastName
                      }
                      patientId={'#' + patientId}
                      numPostAppointment={res.data?.length ?? 0}
                      nextAppointmentDate={selectedPatient.nextAppointment}
                    />
                  }
                />
                {selectedPatient.test ? (
                  <PatientSpecificsCard data={selectedPatient.test} />
                ) : (
                  <SimpleInfoContainer text="No Biometric screening" />
                )}
                <BookingTimeline
                  appointments={res.data ?? []}
                  patientId={Number(patientId)}
                  onPress={() => {
                    modal(
                      () => (
                        <BookAppointmentModal
                          id={Number(patientId)}
                          patientName={
                            selectedPatient.firstName +
                            ' ' +
                            selectedPatient.lastName
                          }
                        />
                      ),
                      DEFAULT_MODAL,
                    ).open();
                  }}
                />
              </div>
              <div className="record-side-info">
                <MedicalHistory patientId={Number(patientId)} />
                <DocumentPreviewPanel patientId={Number(patientId)} />
              </div>
            </div>
          );
        })()
      ) : isFetching ? (
        <LoadingSpinner />
      ) : (
        <ErrorPanel />
      )}
    </div>
  );
}
