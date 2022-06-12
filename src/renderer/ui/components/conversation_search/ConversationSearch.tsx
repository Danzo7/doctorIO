import Search from 'toSvg/search.svg?icon';
import colors from '@assets/styles/color';
import Input from '@components/inputs/input';

interface ConversationSearchProps {}
export default function ConversationSearch({}: ConversationSearchProps) {
  //TODO? add Dm search
  return (
    <Input
      fillContainer
      placeholder="search"
      type={'search'}
      leading={<Search></Search>}
    />
  );
}
