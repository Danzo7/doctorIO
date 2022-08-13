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
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import LoadingSpinner from '@components/loading_spinner';
import { useEffect } from 'react';

interface QueueAddSearchModalProps {}
interface SearchInput {
  searchField: string;
}

export default function QueueAddSearchModal({}: QueueAddSearchModalProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField', '');
  const { open } = useOverlay();
  const { data, isSuccess, isError, error } = useFindPatientByNameQuery(
    watchSearch.toLowerCase(),
  );
  //REDUX show error
  //const inputError = isError ? (error as FetchBaseQueryError) : undefined;

  const result = isSuccess && data ? data : undefined;
  console.log('result :', result);
  console.log('result :', result);

  return (
    <ModalContainer
      title="Add a Patient to appointment queue"
      controls={
        result == undefined ? (
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
          result.length > 0 &&
          result.map((pat) => (
            <RecentAppsItem
              key={pat.id}
              firstName={pat.name.split(' ')[0]}
              lastName={pat.name.split(' ')[1]}
              patId={pat.id}
            />
          ))
        )
      }
    >
      <Input
        hint={
          watchSearch.length > 0
            ? isError
              ? 'error from server'
              : isSuccess
              ? undefined
              : 'error'
            : 'Enter patient name'
        }
        fillContainer
        placeholder="search for a patient"
        trailing={<Svg>{search}</Svg>}
        type="search"
        {...register('searchField')}
      />
    </ModalContainer>
  );
}
