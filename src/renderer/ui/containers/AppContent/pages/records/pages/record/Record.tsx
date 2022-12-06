import BookingTimeline from '@components/booking_timeline';
import Input from '@components/inputs/input';
import RecordInfoItem from '@components/record_info_item';
import useNavigation from '@libs/hooks/useNavigation';
import { useForm } from 'react-hook-form';
import search from 'toSvg/search.svg?icon';
import './style/index.scss';
import { PatientBrief } from '@models/instance.model';
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
import VitalsPanel from '@components/vitals_panel';
import NotesPanel from '@components/notes_panel';
import { PatientInfoCard } from '@components/patient_card';
import DocumentPreviewPanel from '@components/document_preview_panel';
import MedicalHistory from '@components/medical_history';

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
      {isSuccess && (
        <div className="record-side-info">
          <PatientInfoCard
            patientFullName={data.firstName + ' ' + data.lastName}
            patientId={'#' + patientId}
            birthDate={data.birthDate}
            bloodType={data.bloodType}
            registerDate={data.registerDate}
            gender={data.gender}
            numPostAppointment={res.data?.length ?? 0}
            nextAppointmentDate={data.nextAppointment}
          />

          <div className="scroll-div">
            <DocumentPreviewPanel patientId={Number(patientId)} />
            <MedicalHistory patientId={Number(patientId)} />
          </div>
        </div>
      )}
      <div className="content">
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
          <div className="record-content">
            <div className="top-right-div">
              {data.test ? (
                <VitalsPanel data={data.test} />
              ) : (
                <SimpleInfoContainer text="No Biometric screening" />
              )}
              <NotesPanel
                date={new Date()}
                note="Just a notdggggggggggggggggggggggggggggggggge"
              />
            </div>

            <BookingTimeline
              appointments={res.data ?? []}
              patientId={Number(patientId)}
              onPress={() => {
                modal(
                  () => (
                    <BookAppointmentModal
                      id={Number(patientId)}
                      patientName={data.firstName + ' ' + data.lastName}
                    />
                  ),
                  DEFAULT_MODAL,
                ).open();
              }}
            />
          </div>
        ) : isFetching ? (
          <LoadingSpinner />
        ) : (
          <ErrorPanel />
        )}
      </div>
    </div>
  );
}
