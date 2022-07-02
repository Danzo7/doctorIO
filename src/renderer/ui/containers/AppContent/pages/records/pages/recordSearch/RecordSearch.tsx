import { patients } from '@api/fake';
import Header from '@components/header';
import Input from '@components/inputs/input';
import RecordInfoItem from '@components/record_info_item';
import { searchPatient } from '@helpers/search.helper';
import useNavigation from '@libs/hooks/useNavigation';
import { useForm } from 'react-hook-form';
import Search from 'toSvg/search.svg?icon';
import './style/index.scss';

interface SearchInput {
  searchField: string;
}

interface RecordSearchProps {}
export default function RecordSearch({}: RecordSearchProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField');
  const { navigate } = useNavigation();

  const selectedPatient = searchPatient(watchSearch);
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
      {selectedPatient ? (
        <RecordInfoItem
          firstName={selectedPatient.firstName}
          lastName={selectedPatient.lastName}
          patId={selectedPatient.patId}
          onViewRecord={() => {
            navigate(`/records/${selectedPatient.patId}`);
          }}
        />
      ) : (
        watchSearch && <div className="not-found">No Patient found !</div>
      )}
    </div>
  );
}
