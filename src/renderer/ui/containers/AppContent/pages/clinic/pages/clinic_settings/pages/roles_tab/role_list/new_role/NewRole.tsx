import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { useCreateNewRoleMutation } from '@redux/clinic/rbac/role/roleApi';
import add from 'toSvg/add.svg?icon';
interface NewRoleProps {}
export default function NewRole({}: NewRoleProps) {
  const [CreateNewRole] = useCreateNewRoleMutation();
  return (
    <TextButton
      Icon={add}
      afterBgColor={color.darkersec_color}
      fontSize={35}
      width={'100%'}
      fontWeight={100}
      radius={7}
      borderColor={color.border_color}
      padding={'15px'}
      onPress={() => {
        CreateNewRole({ name: 'New role', description: '', permissions: [] });
      }}
    />
  );
}
