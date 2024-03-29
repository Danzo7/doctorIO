import LoadingSpinner from '@components/loading_spinner';
import MembersTable from '@components/members_table';
import RefetchPanel from '@components/refetch_panel';
import VerticalPanel from '@components/vertical_panel';
import CreateInvitationModal from '@containers/modals/create_invitation_modal';
import { DEFAULT_MODAL, modal } from '@libs/overlay';
import { RoleBrief } from '@models/server.models';
import { useGetMembersQuery } from '@redux/clinic/rbac/member/memberApi';

import './style/index.scss';

export default function RoleSettingMembers(props: RoleBrief) {
  const { id } = props;
  const { data, isLoading, isSuccess, refetch } = useGetMembersQuery();

  const list = isSuccess
    ? data.filter(
        ({ roles }) => roles.find(({ id: rId }) => id == rId) != undefined,
      )
    : [];
  return (
    <div className="role-setting-members">
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        list.length > 0 ? (
          <MembersTable {...props} />
        ) : (
          <VerticalPanel
            description="No members were found. "
            action={{
              text: 'Add members to this role.',
              onClick: () => {
                modal(() => <CreateInvitationModal defaultValues={[props]} />, {
                  ...DEFAULT_MODAL,
                  position: { top: '30%' },
                }).open();
              },
            }}
          />
        )
      ) : (
        <RefetchPanel action={refetch} />
      )}
    </div>
  );
}
