import Search from 'toSvg/search.svg?icon';
import Input from '@components/inputs/input';

interface ConversationSearchProps {}
export default function ConversationSearch({}: ConversationSearchProps) {
  //FEATURE add Dm search
  return (
    <Input
      fillContainer
      placeholder="search"
      type={'search'}
      leading={<Search></Search>}
      grow={false}
    />
  );
}
