import Search from 'toSvg/search.svg?icon';
import colors from '@assets/styles/color';
import InputWrapper from '@components/inputs/input_wrapper';

interface ConversationSearchProps {}
export default function ConversationSearch({}: ConversationSearchProps) {
  return (
    <InputWrapper
      background={colors.darkersec_color}
      radius={10}
      leading={<Search></Search>}
    >
      <input placeholder="search" type={'search'} />
    </InputWrapper>
  );
}
