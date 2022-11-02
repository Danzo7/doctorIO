import Input from '@components/inputs/input';
import './style/index.scss';
import search from 'toSvg/search.svg?icon';
import TextButton from '@components/buttons/text_button';
import TooltipItem from '@components/poppers/tooltip/tooltip_item';
import { color } from '@assets/styles/color';
import { useForm } from 'react-hook-form';
import { RoleBrief } from '@models/server.models';
import { useGetBriefRolesQuery } from '@redux/clinic/rbac/role/roleApi';
import LoadingSpinner from '@components/loading_spinner';

interface AddRoleTooltipProps {
  onSelect?: (role: RoleBrief) => void;
  lvl?: number;
  skipRoles?: RoleBrief[];
}
interface SearchInput {
  searchField: string;
}

export default function AddRoleTooltip({
  skipRoles = [],
  onSelect,
  lvl = 2,
}: AddRoleTooltipProps) {
  const { control, watch } = useForm<SearchInput>({
    mode: 'onChange',
    defaultValues: { searchField: '' },
  });
  const { data, isSuccess, isLoading } = useGetBriefRolesQuery();

  const searchRoles = (value: string) => {
    return data?.filter(
      (role) =>
        RegExp(`${value.trim().replace(/\s\s+/g, ' ')}`, 'i').test(role.name) &&
        lvl < role.priority &&
        !skipRoles.some(({ id }) => role.id == id),
    );
  };
  const result = searchRoles(watch('searchField'));
  return (
    <div className="add-role-tooltip">
      <Input
        control={control}
        name="searchField"
        trailing={<TextButton Icon={search} blank type="submit" />}
        type="text"
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess && result && result.length > 0 ? (
        <div className="tooltip-items">
          {result.map((role, index) => (
            <TooltipItem
              key={index}
              text={role.name}
              selectedColor={color.secondary_color}
              onPress={() => {
                onSelect?.(role);
              }}
              type={'normal'}
            />
          ))}
        </div>
      ) : (
        <span> No role </span>
      )}
    </div>
  );
}
