import MemberItem from '@components/member_item';
import './style/index.scss';
import VerticalPanel from '@components/vertical_panel';
import { modal } from '@stores/overlayStore';
import CreateInvitationModal from '@containers/modals/create_invitation_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useGetMembersQuery } from '@redux/clinic/rbac/member/memberApi';
import LoadingSpinner from '@components/loading_spinner';
import RefetchPanel from '@components/refetch_panel';
import { RoleBrief } from '@models/server.models';

export default function MembersTable(role: RoleBrief) {
  const { data, isLoading, isSuccess, refetch } = useGetMembersQuery();

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        (() => {
          const list = data.filter(({ roles }) =>
            roles.find(({ id: rId }) => role.id == rId),
          );

          return (
            <>
              {list.length > 0 ? (
                <div className="members-table">
                  <div className="table-header">
                    <div className="members-container">
                      <span>Members</span>
                    </div>
                    <div className="Date-added-container">
                      <span>Date added</span>
                    </div>
                    <div className="roles-container">
                      <span>Roles</span>
                    </div>
                  </div>
                  <div className="table-content">
                    {list.map((member, index) => (
                      <MemberItem {...member} key={index} />
                    ))}
                  </div>
                </div>
              ) : (
                <VerticalPanel
                  description="Role is empty. "
                  backgroundColor="none"
                  padding={0}
                  action={{
                    text: 'Add members to this role.',
                    onClick: () => {
                      modal(
                        () => <CreateInvitationModal defaultValues={[role]} />,
                        {
                          ...DEFAULT_MODAL,
                          position: { top: '30%' },
                        },
                      ).open();
                    },
                  }}
                />
              )}
            </>
          );
        })()
      ) : (
        <RefetchPanel action={refetch} />
      )}
    </>
  );
}
