import Header from '@components/header';
import Input from '@components/inputs/input';
import LoadingSpinner from '@components/loading_spinner';
import RecordInfoItem from '@components/record_info_item';
import useNavigation from '@libs/hooks/useNavigation';
import { PatientBrief, ServerError } from '@models/instance.model';
import { useLazyFindPatientByName2Query } from '@redux/instance/record/patient_api';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Search from 'toSvg/search.svg?icon';
import './style/index.scss';
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

interface RecordSearchProps {}
export default function RecordSearch({}: RecordSearchProps) {
  const searchRef = useRef<string>('');

  const { register, handleSubmit } = useForm<SearchInput>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  });
  const [trigger, result] = useLazyFindPatientByName2Query();
  const errorRef = useRef<ServerError>();
  const serverError: ServerError | undefined = (result.error as any)
    ?.data as ServerError;
  if (result.isError || result.isSuccess) errorRef.current = serverError;
  const { navigate } = useNavigation();

  return (
    <div className="record-search">
      <Header title="Select a patient" titleFontWeight={500} />
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
          errorMsg={
            errorRef.current?.statusCode == 400
              ? errorRef.current.message[0]
              : errorRef.current?.statusCode == 404
              ? 'No patient found'
              : undefined
          }
          placeholder="Enter patient Id"
          trailing={<Search />}
          type={'search'}
          hint="You have to select a patient by fullName or Id to access to his medical records"
          {...register('searchField')}
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
