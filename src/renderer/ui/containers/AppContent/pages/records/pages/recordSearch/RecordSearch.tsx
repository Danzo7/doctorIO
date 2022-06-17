import Header from '@components/header';
import Input from '@components/inputs/input';
import RecordInfoItem from '@components/record_info_item';
import useNavigation from '@libs/hooks/useNavigation';
import useSearchPatient from '@libs/hooks/useSearchPatient';
import { useForm } from 'react-hook-form';
import Search from 'toSvg/search.svg?icon';
import './style/index.scss';

interface SearchInput {
  searchField: string;
}
const usersData = [
  {
    fullName: 'brahim aymen',
    id: '123456789',
  },
  {
    fullName: 'daouadji aymen',
    id: '12345689',
  },
  {
    fullName: 'amine bou',
    id: '45689745',
  },
  {
    fullName: 'John Doe',
    id: '12344689',
  },
];

interface RecordSearchProps {}
export default function RecordSearch({}: RecordSearchProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField');
  const matches = useSearchPatient(watchSearch, usersData);
  const { navigate } = useNavigation();

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
      <div className="records-suggestions-container">
        {matches?.map(({ fullName, id }, index) => (
          <RecordInfoItem
            fullName={fullName}
            id={id}
            key={index}
            onViewRecord={() => {
              navigate(`/records/${id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
