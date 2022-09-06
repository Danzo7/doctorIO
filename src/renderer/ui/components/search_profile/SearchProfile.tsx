import IconicButton from '@components/buttons/iconic_button';
import UserProfileStatus from '@components/user_profile_status';
import Search from 'toSvg/search.svg?icon';
import colors from '@colors';
import './style/index.scss';
import { useOverlay } from '@libs/overlay/useOverlay';
import QueueAddSearchModal from '@containers/modals/queue_add_search_modal';
import TextButton from '@components/buttons/text_button';
import { useRefreshMutation } from '@redux/local/auth/authApi';
import { StaticQueries } from '@redux/dynamic_queries';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import LoadingSpinner from '@components/loading_spinner';
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
            status={true}
            imgSrc={data.avatar}
            alt={data.name + data.id}
          />
        )
      )}
      <TextButton
        text="Refresh"
        onPress={() => {
          StaticQueries.authQuery.loadUrl().then(() => Refresh());
        }}
      />
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
