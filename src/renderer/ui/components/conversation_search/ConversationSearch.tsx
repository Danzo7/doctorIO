import Search from 'toSvg/search.svg?icon';
import InputField from '@components/inputs/input_field';
import color from '@assets/styles/color';

interface ConversationSearchProps {}
export default function ConversationSearch({}: ConversationSearchProps) {
  return (
    <InputField
      background={color.darkersec_color}
      radius={10}
      placeholder="search"
      leading={<Search />}
    />
  );
}
