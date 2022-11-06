import Can from '@ability/index';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import MembersPreview from '@components/members_preview';
import useNavigation from '@libs/hooks/useNavigation';
import { useGetMembersQuery } from '@redux/clinic/rbac/member/memberApi';
import './style/index.scss';

interface MembersPanelProps {}
function MembersPanel({}: MembersPanelProps) {
  const { data, isLoading, isSuccess, error } = useGetMembersQuery();
  const { navigate } = useNavigation();
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
              data.map((member) => (
                <MembersPreview {...member} key={member.id.toString()} />
              ))
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
