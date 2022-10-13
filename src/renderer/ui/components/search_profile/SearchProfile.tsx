import IconicButton from '@components/buttons/iconic_button';
import UserProfileStatus from '@components/user_profile_status';
import Search from 'toSvg/search.svg?icon';
import colors from '@colors';
import './style/index.scss';
import { useOverlay } from '@libs/overlay/useOverlay';
import QueueAddSearchModal from '@containers/modals/queue_add_search_modal';
import { useRefreshMutation } from '@redux/local/auth/authApi';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import LoadingSpinner from '@components/loading_spinner';
import { DEFAULT_MODAL } from '@libs/overlay';
import MemberBigCard from '@containers/modals/member_big_card';
interface SearchProfileProps {}
export default function SearchProfile({}: SearchProfileProps) {
  const { data, isSuccess, error, isLoading } = useGetMyMemberDetailQuery();
  const { open } = useOverlay();
  const [Refresh] = useRefreshMutation();

  return (
    <div className="search-profile">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        isSuccess && (
          <UserProfileStatus
            width={40}
            status={data.status}
            imgSrc={data.avatar}
            alt={data.name + data.id}
            onClick={() => {
              open(<MemberBigCard id={data.id} />, {
                ...DEFAULT_MODAL,
                width: '20%',
              });
            }}
          />
        )
      )}

      <div>
        <IconicButton
          Icon={Search}
          width={40}
          iconSize={15}
          backgroundColor={colors.silver_gray}
          radius={7}
          onPress={() =>
            open(<QueueAddSearchModal />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              position: { top: '30%' },
              width: '30%',
              closeBtn: 'inner',
            })
          }
        />
      </div>
    </div>
  );
}
