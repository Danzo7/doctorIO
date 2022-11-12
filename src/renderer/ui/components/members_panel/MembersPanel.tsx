import Can from '@ability/index';
import BorderSeparator from '@components/border_separator';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import MembersPreview from '@components/members_preview';
import useNavigation from '@libs/hooks/useNavigation';
import { MemberBrief } from '@models/server.models';
import {
  useGetMembersQuery,
  useGetMyMemberDetailQuery,
} from '@redux/clinic/rbac/member/memberApi';
import './style/index.scss';

interface MembersPanelProps {}
function MembersPanel({}: MembersPanelProps) {
  const { data, isLoading, isSuccess, error } = useGetMembersQuery();
  const { navigate } = useNavigation();
  const onlineMembers = data?.filter((member) => member.status);
  const offlineMembers = data?.filter((member) => !member.status);
  const GetMyMemberDetailQuery = useGetMyMemberDetailQuery();
  const assistants: MemberBrief[] = [];
  const myRoles = GetMyMemberDetailQuery.data?.roles.map((role) => {});

  return (
    <div className="members-panel">
      <Header
        title="Members"
        buttonNode={
          <Can I="manage" or={['view']} a="clinic">
            <DarkLightCornerButton
              onPress={() => {
                navigate('/clinic/Members');
              }}
              text="Members ..."
            />
          </Can>
        }
      />
      <div className="members-list-container">
        <div className="members-list">
          {isLoading ? (
            <LoadingSpinner />
          ) : isSuccess ? (
            data.length > 0 ? (
              <>
                {assistants.length > 0 && (
                  <div className="members-filter-container">
                    <span>Assistants</span>
                    <BorderSeparator direction="horizontal" />
                    {assistants?.map((member) => (
                      <MembersPreview {...member} key={member.id.toString()} />
                    ))}
                  </div>
                )}
                <div className="members-filter-container">
                  <span>Online</span>
                  <BorderSeparator direction="horizontal" />
                  {onlineMembers?.map((member) => (
                    <MembersPreview {...member} key={member.id.toString()} />
                  ))}
                </div>
                <div className="members-filter-container">
                  <span>Offline</span>
                  <BorderSeparator direction="horizontal" />
                  {offlineMembers?.map((member) => (
                    <MembersPreview {...member} key={member.id.toString()} />
                  ))}
                </div>
              </>
            ) : (
              <div>No Members</div>
            )
          ) : (
            <span>error occurs when getting members </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MembersPanel;
