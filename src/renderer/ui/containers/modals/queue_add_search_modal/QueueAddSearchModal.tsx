import RecentAppsItem from '@components/recent_apps_item';
import Svg from '@libs/svg';
import search from 'toSvg/search.svg?icon';
import { useForm } from 'react-hook-form';
import './style/index.scss';
import Input from '@components/inputs/input';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { useOverlay } from '@libs/overlay/useOverlay';
import AddPatientModal from '../add_patient_modal';
import ModalContainer from '@components/modal_container';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useFindPatientByNameMutation } from '@redux/instance/record/recordApi';
import { PatientBrief, ServerError } from '@models/instance.model';
import { useRef } from 'react';
import LoadingSpinner from '@components/loading_spinner';

interface QueueAddSearchModalProps {}
interface SearchInput {
  searchField: string;
}

export default function QueueAddSearchModal({}: QueueAddSearchModalProps) {
  const searchRef = useRef<string>('');

  const { register, handleSubmit } = useForm<SearchInput>({
    mode: 'onSubmit',
    defaultValues: { searchField: searchRef.current },
  });
  const { open } = useOverlay();
  const [FindPatientByName, result] = useFindPatientByNameMutation();
  const errorRef = useRef<ServerError>();
  const serverError: ServerError | undefined = (result.error as any)
    ?.data as ServerError;
  if (result.isError || result.isSuccess) errorRef.current = serverError;

  return (
    <ModalContainer
      title="Add a Patient to appointment queue"
      controls={
        errorRef.current?.statusCode == 404 ? (
          <TextButton
            text="Add new patient"
            backgroundColor={color.lighter_background}
            padding="10px 15px"
            fontSize={13}
            fontWeight={700}
            borderColor={color.border_color}
            onPress={() => {
              open(<AddPatientModal />, DEFAULT_MODAL);
            }}
          />
        ) : errorRef.current == undefined && result.isLoading ? (
          <LoadingSpinner />
        ) : (
          result.isSuccess &&
          (() => {
            const patients = result.data as PatientBrief[];
            return patients?.map((patient) => (
              <RecentAppsItem
                key={patient.id}
                firstName={patient.name.split(' ')[0]}
                lastName={patient.name.split(' ')[1]}
                patId={patient.id}
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
            FindPatientByName(value.searchField);
          }
        })}
      >
        <Input
          errorMsg={
            errorRef.current?.statusCode == 400
              ? errorRef.current.message[0]
              : errorRef.current?.statusCode == 404
              ? 'No patient found'
              : undefined
          }
          fillContainer
          placeholder="search for a patient"
          trailing={<Svg>{search}</Svg>}
          type="search"
          {...register('searchField')}
        />
      </form>
    </ModalContainer>
  );
}
