import Header from '@components/header';
import Input from '@components/inputs/input';
import RecordInfoItem from '@components/record_info_item';
import { useForm } from 'react-hook-form';
import Search from 'toSvg/search.svg?icon';
import './style/index.scss';

interface SearchInput {
  searchField: string;
}
const usersData = [
  {
    fullName: 'brahim aymen',
    id: '#123456789',
  },
  {
    fullName: 'daouadji aymen',
    id: '#12345689',
  },
  {
    fullName: 'amine bou',
    id: '#45689745',
  },
  {
    fullName: 'John Doe',
    id: '#12344689',
  },
];

interface RecordsProps {}
export default function Records({}: RecordsProps) {
  const { register, watch, handleSubmit } = useForm<SearchInput>();
  const watchSearch = watch('searchField');

  const onChangeHandler = (text: string) => {
    let matches: any[] = [];
    if (text && text.length > 0 && text.trim().length > 0) {
      matches = usersData?.filter((user) => {
        return (
          user.fullName.toLowerCase() == text.toLowerCase() ||
          user.id.toLowerCase() == text.toLowerCase()
        );
      });
      return matches;
    }
  };
  return (
    <div className="records">
      <Header title="Select a patient" titleFontWeight={500} />
      <Input
        placeholder="Enter patient Id"
        trailing={<Search />}
        type={'search'}
        hint="You have to select a patient by fullName or Id to access to his medical records"
        {...register('searchField', { min: 5 })}
      />
      <div className="records-suggestions-container">
        {onChangeHandler(watchSearch)?.map(({ fullName, id }, index) => (
          <RecordInfoItem fullName={fullName} id={id} key={index} />
        ))}
      </div>
    </div>
  );
}
