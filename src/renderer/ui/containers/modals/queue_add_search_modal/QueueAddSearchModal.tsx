import RecentAppsItem from '@components/recent_apps_item';
import search from 'toSvg/search.svg?icon';
import { useForm } from 'react-hook-form';
import './style/index.scss';
import Input from '@components/inputs/input';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import AddPatientModal from '../add_patient_modal';
import ModalContainer from '@components/modal_container';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useLazyFindPatientByName2Query } from '@redux/instance/record/patient_api';
import { PatientBrief } from '@models/instance.model';
import { useRef } from 'react';
import LoadingSpinner from '@components/loading_spinner';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Overlay_u } from '@stores/overlayStore';

const schema = z.object({
  searchField: z.preprocess(
    (value) =>
      typeof value !== 'string' ? value : value.trim().replace(/\s\s+/g, ' '),
    z.string().min(1),
  ),
});

interface QueueAddSearchModalProps {}
interface SearchInput {
  searchField: string;
}

export default function QueueAddSearchModal({}: QueueAddSearchModalProps) {
  const searchRef = useRef<string>('');

  const { control, handleSubmit } = useForm<SearchInput>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: { searchField: '' },
  });
  const [trigger, result] = useLazyFindPatientByName2Query();

  const errorRef = useRef<ServerError>();
  const serverError: ServerError | undefined = result.isError
    ? ((result.error as any).data as ServerError)
    : undefined;
  if (result.isError || result.isSuccess) errorRef.current = serverError;

  return (
    <ModalContainer
      title="Add a Patient to appointment queue"
      controls={
        errorRef.current?.errorCode == 1300 ? (
          <TextButton
            text="Add new patient"
            backgroundColor={color.lighter_background}
            padding="10px 15px"
            fontSize={13}
            fontWeight={700}
            borderColor={color.border_color}
            onPress={() => {
              Overlay_u.quickOpen(<AddPatientModal />, DEFAULT_MODAL);
            }}
          />
        ) : errorRef.current == undefined && result.isFetching ? (
          <LoadingSpinner />
        ) : (
          result.isSuccess &&
          (() => {
            const patients = result.data as PatientBrief[];
            return patients?.map((patient) => (
              <RecentAppsItem
                key={patient.id}
                name={patient.name}
                id={patient.id}
              />
            ));
          })()
        )
      }
    >
      <form
        css={{ flexGrow: 1 }}
        onSubmit={handleSubmit((value) => {
          // result.reset();
          if (searchRef.current != value.searchField) {
            searchRef.current = value.searchField;
            trigger(searchRef.current, false);
          }
        })}
      >
        <Input
          errorMessage={
            errorRef.current?.errorCode == 1200
              ? 'Invalid input. Must be the first and last name or the patient id'
              : errorRef.current?.errorCode == 1300
              ? 'No patient found'
              : undefined
          }
          fillContainer
          placeholder="search for a patient"
          //      trailing={<Svg>{search}</Svg>}
          trailing={<TextButton Icon={search} blank />}
          type="search"
          control={control}
          name="searchField"
        />
      </form>
    </ModalContainer>
  );
}
