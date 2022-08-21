import Search from 'toSvg/search.svg?icon';
import Input from '@components/inputs/input';
import { useForm } from 'react-hook-form';

interface ConversationSearchProps {}
interface SearchInput {
  search: string;
}
export default function ConversationSearch({}: ConversationSearchProps) {
  const { control, handleSubmit } = useForm<SearchInput>({
    mode: 'onSubmit',
  });
  //FEATURE add Dm search
  return (
    <Input
      name="search"
      control={control}
      fillContainer
      placeholder="search"
      type={'search'}
      leading={<Search></Search>}
      grow={false}
    />
  );
}
