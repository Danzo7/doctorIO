import SquareIconButton from '@components/buttons/square_icon_button';
import InputField, { evolvedTypes } from '@components/inputs/input_field';
import RecentAppsItem from '@components/recent_apps_item';
import Svg from '@libs/svg';
import search from 'toSvg/search.svg?icon';
import { useForm } from 'react-hook-form';

import './style/index.scss';
interface QueueAddSearchModalProps {}
interface SearchInput {
  searchField: string;
}
const usersData = [
  {
    fullName: 'brahim aymen',
    age: 24,
  },
  {
    fullName: 'daouadji aymen',
    age: 24,
  },
  {
    fullName: 'amine bou',
    age: 24,
  },
  {
    fullName: 'John Doe',
    age: 24,
  },
];
export default function QueueAddSearchModal({}: QueueAddSearchModalProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField', ''); //Watch will cause component to rerender when value change similar to  onChange(setState()), watch: https://www.youtube.com/watch?v=RkXv4AXXC_4

  const onChangeHandler = (text: string) => {
    let matches = [];
    if (text.length > 0 && text.trim().length > 0) {
      matches = usersData?.filter((user) => {
        const regex = new RegExp(`${text}`, 'gi');
        return user.fullName.match(regex);
      });
      return matches;
    }
  };

  return (
    <div className="queue-add-search-modal">
      <div className="back-btn-container">
        <SquareIconButton />
      </div>
      <form>
        <InputField
          label="Add a patient to appointment queue"
          placeholder="search for a patients"
          leading={<Svg>{search}</Svg>}
          type={{ rawType: 'search', evolvedType: evolvedTypes.raw }}
          register={register(
            'searchField',
            //onchange={handleChange} most input props are define in register
          )}
        />
      </form>
      <div className="suggestions-container">
        {onChangeHandler(watchSearch)?.map(({ fullName, age }, index) => (
          <RecentAppsItem fullName={fullName} age={age} key={index} />
        ))}
      </div>
    </div>
  );
}
