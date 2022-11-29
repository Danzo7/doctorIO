import IconicButton from '@components/buttons/iconic_button';
import UserProfileStatus from '@components/user_profile_status';
import Search from 'toSvg/search.svg?icon';
import colors from '@colors';
import './style/index.scss';
import QueueAddSearchModal from '@containers/modals/queue_add_search_modal';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import LoadingSpinner from '@components/loading_spinner';
import { FIT_MODAL } from '@libs/overlay';
import MemberBigCard from '@containers/modals/member_big_card';
import { modal } from '@stores/overlayStore';
interface SearchProfileProps {}
export default function SearchProfile({}: SearchProfileProps) {
  const { data, isSuccess, isLoading } = useGetMyMemberDetailQuery();

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
              modal(<MemberBigCard id={data.id} />, FIT_MODAL).open();
            }}
          />
        )
      )}

      <div>
        <IconicButton
          Icon={Search}
          tip="Search for anything"
          width={40}
          iconSize={15}
          backgroundColor={colors.silver_gray}
          radius={7}
          onPress={() =>
            modal(
              <QueueAddSearchModal />,
              {
                closeOnClickOutside: true,
                isDimmed: true,
                clickThrough: false,
                position: { top: '30%' },
                width: '30%',
                closeBtn: 'inner',
              },
              'queueAddSearchModal',
            ).open()
          }
        />
      </div>
    </div>
  );
}
