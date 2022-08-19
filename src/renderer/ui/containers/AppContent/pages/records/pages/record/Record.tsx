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
import { Patient, PatientBrief, ServerError } from '@models/instance.model';
import { useOverlay } from '@libs/overlay/useOverlay';
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
  const { register, handleSubmit, setValue, watch } = useForm<SearchInput>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  });
  const isDirty = useRef(false);
  const watchSearchField = watch('searchField');
  const { navigate } = useNavigation();
  const { open } = useOverlay();
  const { patientId } = useParams();
  const [trigger, result] = useLazyFindPatientByName2Query();
  const errorRef = useRef<ServerError>();
  const serverError: ServerError | undefined = (result.error as any)
    ?.data as ServerError;
  if (result.isError || result.isSuccess) errorRef.current = serverError;
  const { isFetching, isSuccess, data } = useGetPatientDetailQuery(
    Number(patientId),
  ); //FIXME Handle errors
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
          errorMsg={
            isDirty.current
              ? undefined
              : errorRef.current?.statusCode == 400
              ? errorRef.current.message[0]
              : errorRef.current?.statusCode == 404
              ? 'No patient found'
              : undefined
          }
          placeholder="Enter patient Id"
          trailing={<Search />}
          type={'search'}
          {...register('searchField')}
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
                      numPostAppointment={0}
                      nextAppointmentDate={selectedPatient.nextAppointment}
                    />
                  }
                />
                <PatientSpecificsCard
                  data={selectedPatient.test ? selectedPatient.test : []}
                />
                <BookingTimeline
                  appointments={[]}
                  patientId={Number(patientId)}
                  onPress={() => {
                    open(
                      <BookAppointmentModal
                        id={Number(patientId)}
                        patientName={
                          selectedPatient.firstName +
                          ' ' +
                          selectedPatient.lastName
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
          );
        })()
      ) : isFetching ? (
        <LoadingSpinner />
      ) : (
        <div>Something went wrong</div>
      )}
    </div>
  );
}
