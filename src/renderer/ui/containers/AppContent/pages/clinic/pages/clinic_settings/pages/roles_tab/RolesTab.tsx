import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import { mapIndexFromPermissions } from '@helpers/permission.helper';
import usePrompt from '@libs/HistoryBlocker';
import roleApi, {
  useGetRoleByIdQuery,
  useLazyGetRoleByIdQuery,
  useUpdateRoleMutation,
} from '@redux/clinic/rbac/role/roleApi';
import { setRoleSettings } from '@redux/clinic/rbac/role/roleSettingSlice';
import store, { useAppDispatch, useAppSelector } from '@store';
import { useSearchParams } from 'react-router-dom';
import RoleList from './role_list';
import RoleSetting from './role_setting';
import './style/index.scss';
interface RolesTabProps {}

export default function RolesTab({}: RolesTabProps) {
  return (
    <div className="roles-tab">
      <RoleList />
      <RoleSetting />
    </div>
  );
}
