import IconicButton from '@components/buttons/iconic_button';
import UserProfileStatus from '@components/user_profile_status';
import Search from 'toSvg/search.svg?icon';
import colors from '@colors';
import './style/index.scss';
import { useOverlay } from '@libs/overlay/useOverlay';
import QueueAddSearchModal from '@containers/modals/queue_add_search_modal';
interface SearchProfileProps {
  avatar?: string;
}
export default function SearchProfile({ avatar }: SearchProfileProps) {
  const { open } = useOverlay();
  //REFACTOR:remove imgSrc
  return (
    <div className="search-profile">
      <UserProfileStatus width={40} status={true} imgSrc={avatar} />
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
