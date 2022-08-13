import Header from '@components/header';
import Input from '@components/inputs/input';
import RecordInfoItem from '@components/record_info_item';
import useNavigation from '@libs/hooks/useNavigation';
import { useFindPatientByNameQuery } from '@redux/instance/record/recordApi';
import { useForm } from 'react-hook-form';
import Search from 'toSvg/search.svg?icon';
import './style/index.scss';

interface SearchInput {
  searchField: string;
}

interface RecordSearchProps {}
export default function RecordSearch({}: RecordSearchProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField', '');
  const { navigate } = useNavigation();
  const { data, isSuccess, isError, error } = useFindPatientByNameQuery(
    watchSearch.toLowerCase(),
  );
  const result = isSuccess && data ? data : undefined;

  return (
    <div className="record-search">
      <Header title="Select a patient" titleFontWeight={500} />
      <Input
        placeholder="Enter patient Id"
        trailing={<Search />}
        type={'search'}
        hint="You have to select a patient by fullName or Id to access to his medical records"
        {...register('searchField', { min: 5 })}
        grow={false}
      />
      {result
        ? result.map((pat) => (
            <RecordInfoItem
              key={pat.id}
              firstName={pat.name.split(' ')[0]}
              lastName={pat.name.split(' ')[1]}
              patId={pat.id}
              onViewRecord={() => {
                navigate(`/records/${pat.id}`);
              }}
            />
          ))
        : watchSearch && <div className="not-found">No Patient found !</div>}
    </div>
  );
}
