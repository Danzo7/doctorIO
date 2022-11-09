import Header from '@components/header';
import Input from '@components/inputs/input';
import LoadingSpinner from '@components/loading_spinner';
import RecordInfoItem from '@components/record_info_item';
import useNavigation from '@libs/hooks/useNavigation';
import { PatientBrief, ServerError } from '@models/instance.model';
import { useLazyFindPatientByName2Query } from '@redux/instance/record/patient_api';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import search from 'toSvg/search.svg?icon';
import './style/index.scss';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextButton from '@components/buttons/text_button';

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

interface RecordSearchProps {}
export default function RecordSearch({}: RecordSearchProps) {
  const searchRef = useRef<string>('');

  const { control, handleSubmit } = useForm<SearchInput>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: { searchField: '' },
  });
  const [trigger, result] = useLazyFindPatientByName2Query();
  const errorRef = useRef<ServerError>();
  const serverError: ServerError | undefined = (result.error as any)
    ?.data as ServerError;
  if (result.isError || result.isSuccess) errorRef.current = serverError;
  const { navigate } = useNavigation();

  return (
    <div className="record-search">
      <Header title={{ text: 'Select a patient', fontWeight: 500 }} />
      <form
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
            errorRef.current?.statusCode == 400
              ? errorRef.current.message[0]
              : errorRef.current?.statusCode == 404
              ? 'No patient found'
              : undefined
          }
          placeholder="Enter patient Id"
          trailing={<TextButton Icon={search} blank />}
          type={'search'}
          hint="You have to select a patient by fullName or Id to access to his medical records"
          control={control}
          name={'searchField'}
          grow={false}
        />
      </form>
      {errorRef.current?.statusCode == 404 ? (
        <div className="not-found">No Patient found !</div>
      ) : errorRef.current == undefined && result.isFetching ? (
        <LoadingSpinner />
      ) : (
        result.isSuccess &&
        (() => {
          const patients = result.data as PatientBrief[];
          return patients?.map((pat) => (
            <RecordInfoItem
              key={pat.id}
              name={pat.name}
              id={pat.id}
              onViewRecord={() => {
                navigate(`/records/${pat.id}`);
              }}
            />
          ));
        })()
      )}
    </div>
  );
}
