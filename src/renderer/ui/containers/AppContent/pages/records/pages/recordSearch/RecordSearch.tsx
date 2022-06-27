import { patients } from '@api/fake';
import Header from '@components/header';
import Input from '@components/inputs/input';
import RecordInfoItem from '@components/record_info_item';
import useNavigation from '@libs/hooks/useNavigation';
import { Patient } from '@models/instance.model';
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
  const patientMatches = () => {
    let results: Patient[] = [];
    if (
      watchSearch &&
      watchSearch.length > 0 &&
      watchSearch.trim().length > 0
    ) {
      results = patients.filter(
        (pat) =>
          pat.patId.toString() == watchSearch ||
          pat.firstName.toLowerCase() == watchSearch.toLowerCase() ||
          pat.lastName.toLowerCase() == watchSearch.toLowerCase(),
      );
      return results;
    }
    return [];
  };

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
        {patientMatches()?.map(({ firstName, lastName, patId }, index) => (
          <RecordInfoItem
            firstName={firstName}
            lastName={lastName}
            patId={patId}
            key={index}
            onViewRecord={() => {
              navigate(`/records/${patId}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
