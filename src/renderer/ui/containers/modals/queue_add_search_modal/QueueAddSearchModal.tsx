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
import { useFindPatientByNameQuery } from '@redux/instance/record/recordApi';
import { useState } from 'react';
import { PatientBrief, ServerError } from '@models/instance.model';

interface QueueAddSearchModalProps {}
interface SearchInput {
  searchField: string;
}

export default function QueueAddSearchModal({}: QueueAddSearchModalProps) {
  const { register, getValues, handleSubmit } = useForm<SearchInput>({
    mode: 'onSubmit',
  });
  const { open } = useOverlay();
  const [state, setstate] = useState(false);

  const { isSuccess, error, currentData } = useFindPatientByNameQuery(
    getValues().searchField,
    {
      skip: !getValues().searchField,
    },
  );

  const serverError: ServerError | undefined = (error as any)
    ?.data as ServerError;
  return (
    <ModalContainer
      title="Add a Patient to appointment queue"
      controls={
        serverError?.statusCode == 404 ? (
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
        ) : (
          isSuccess &&
          (() => {
            const result = currentData as PatientBrief[];
            return result?.map((patient) => (
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
        onSubmit={handleSubmit((value) => {
          setstate(!state);
          //refetch();
        })}
      >
        <Input
          errorMsg={
            serverError?.statusCode == 400
              ? serverError.message[0]
              : serverError?.statusCode == 404
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
