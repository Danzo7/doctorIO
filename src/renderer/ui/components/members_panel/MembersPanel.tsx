import Can from '@ability/index';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import MembersPreview from '@components/members_preview';
import useNavigation from '@libs/hooks/useNavigation';
import { MemberBrief } from '@models/server.models';
import { useGetMembersQuery } from '@redux/clinic/rbac/member/memberApi';
import { useEffect, useRef, useState } from 'react';
import { ViewportList } from 'react-viewport-list';
import './style/index.scss';
import UpArrow from 'toSvg/arrow.svg?icon';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import NotAButton from '@components/not_a_button';
interface MembersPanelProps {}
function MembersPanel({}: MembersPanelProps) {
  const { data, isLoading, isSuccess } = useGetMembersQuery();
  const { navigate } = useNavigation();
  const [showOffline, setShowOffline] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState<{
    online: MemberBrief[];
    offline: MemberBrief[];
  }>({ online: [], offline: [] });

  useEffect(() => {
    if (data)
      setFilteredMembers({
        online: data.filter((member) => member.status),
        offline: data.filter((member) => !member.status),
      });
    else return;
  }, [data]);

  const ref = useRef(null);
  const listRef = useRef(null);
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
      <div className="members-list-container" ref={ref}>
        {isLoading ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          data.length > 0 ? (
            <ViewportList
              ref={listRef}
              viewportRef={ref}
              items={[
                ...filteredMembers.online,
                ...(showOffline ? filteredMembers.offline : []),
              ]}
            >
              {(member: MemberBrief, index) => {
                return (
                  <div key={member.id}>
                    {index === 0 && (
                      <NotAButton
                        text={'Online - ' + filteredMembers.online.length}
                        fontSize={18}
                        fontWeight={400}
                        alignment="start"
                        css={{
                          borderBottom: '1px solid ' + color.border_color,
                        }}
                        radius={0}
                      />
                    )}

                    <MembersPreview {...member} />
                    {index === filteredMembers.online.length - 1 && (
                      <TextButton
                        fontSize={18}
                        fontWeight={400}
                        text={'Offline - ' + filteredMembers.offline.length}
                        alignment="space-between"
                        css={{
                          borderBottom: '1px solid ' + color.border_color,
                        }}
                        radius={0}
                        Icon={
                          <UpArrow
                            css={{ rotate: showOffline ? '180deg' : '0deg' }}
                          />
                        }
                        itemsDirection="row-reverse"
                        backgroundColor={
                          !showOffline ? color.secondary_color : undefined
                        }
                        onPress={() => setShowOffline(!showOffline)}
                      />
                    )}
                  </div>
                );
              }}
            </ViewportList>
          ) : (
            <div>No Members</div>
          )
        ) : (
          <span>error occurs when getting members </span>
        )}
      </div>
    </div>
  );
}

export default MembersPanel;
