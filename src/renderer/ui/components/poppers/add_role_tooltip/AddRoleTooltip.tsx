import Input from '@components/inputs/input';
import './style/index.scss';
import search from 'toSvg/search.svg?icon';
import Svg from '@libs/svg';
import { IconType } from '@components/buttons/text_button';
import TooltipItem from '@components/poppers/tooltip/tooltip_item';
import { color } from '@assets/styles/color';
import { useForm } from 'react-hook-form';

interface AddRoleTooltipProps {
  actionList: RoleProps[];
}
interface SearchInput {
  searchField: string;
}
type RoleProps = {
  text: string;
  Icon?: IconType;
  onPress?: (e: any) => void;
};
export default function AddRoleTooltip({ actionList }: AddRoleTooltipProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField', '');
  const searchRoles = () => {
    let matches: any[] = [];
    if (
      watchSearch &&
      watchSearch.length > 0 &&
      watchSearch.trim().length > 0
    ) {
      matches = actionList?.filter((role) => {
        const regex = new RegExp(`${watchSearch}`, 'gi');
        if (role.text.match(regex)) return role;
      });
      return matches;
    } else return actionList;
  };

  return (
    <div className="add-role-tooltip">
      <Input
        {...register('searchField')}
        trailing={<Svg>{search}</Svg>}
        type={'search'}
        hint={
          watchSearch.length > 0 && searchRoles().length == 0
            ? 'Role not found'
            : undefined
        }
      />
      {searchRoles()?.map(({ text, Icon, onPress }, index) => (
        <TooltipItem
          key={index}
          text={text}
          selectedColor={color.secondary_color}
          Icon={Icon}
          onPress={() => {
            onPress(text);
          }}
          type={'normal'}
        />
      ))}
    </div>
  );
}
