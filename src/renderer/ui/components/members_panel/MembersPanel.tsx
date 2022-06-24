import { members } from '@api/fake';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import MembersPreview from '@components/members_preview';
import useNavigation from '@libs/hooks/useNavigation';
import { Member } from '@models/server.models';
import './style/index.scss';

const membersList: Member[] = members;
interface MembersPanelProps {}
function MembersPanel({}: MembersPanelProps) {
  const { navigate } = useNavigation();
  return (
    <div className="members-panel">
      <Header
        title="Members"
        buttonNode={
          <DarkLightCornerButton
            onPress={() => {
              navigate('/clinic/Members');
            }}
            title="Members ..."
          />
        }
      />
      <div className="members-list-container">
        <div className="members-list">
          {membersList.length != 0 ? (
            membersList.map((member, index) => (
              <MembersPreview
                //todo unique memberId
                {...member}
                key={index}
              />
            ))
          ) : (
            <div>No Members</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MembersPanel;
