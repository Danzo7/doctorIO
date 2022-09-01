import Input from '@components/inputs/input';
import './style/index.scss';
import search from 'toSvg/search.svg?icon';
import Svg from '@libs/svg';
import { IconType } from '@components/buttons/text_button';
import TooltipItem from '@components/poppers/tooltip/tooltip_item';
import { color } from '@assets/styles/color';
import { useForm } from 'react-hook-form';
import { Role, RoleBrief } from '@models/server.models';

interface AddRoleTooltipProps {
  actionList: RoleProps[];
}
interface SearchInput {
  searchField: string;
}
type RoleProps = {
  role: RoleBrief;
  Icon?: IconType;
  onPress?: (e: any) => void;
};
export default function AddRoleTooltip({ actionList }: AddRoleTooltipProps) {
  const { control, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField', '');
  const searchRoles = () => {
    let matches: any[] = [];
    if (
      watchSearch &&
      watchSearch.length > 0 &&
      watchSearch.trim().length > 0
    ) {
      matches = actionList?.filter((roleAction) => {
        const regex = new RegExp(`${watchSearch}`, 'gi');
        if (roleAction.role.name.match(regex)) return roleAction;
      });
      return matches;
    } else return actionList;
  };

  return (
    <div className="add-role-tooltip">
      <Input
        control={control}
        name="searchField"
        trailing={<Svg>{search}</Svg>}
        type={'search'}
        hint={
          watchSearch.length > 0 && searchRoles().length == 0
            ? 'Role not found'
            : undefined
        }
      />
      {searchRoles()?.map(({ Icon, onPress, role }, index) => (
        <TooltipItem
          key={index}
          text={role.roleName}
          selectedColor={color.secondary_color}
          Icon={Icon}
          onPress={() => {
            onPress(role);
          }}
          type={'normal'}
        />
      ))}
    </div>
  );
}
