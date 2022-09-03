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
interface SearchProfileProps {
  avatar?: string;
  alt: string;
}
export default function SearchProfile({ avatar, alt }: SearchProfileProps) {
  const { open } = useOverlay();
  const [Refresh, result] = useRefreshMutation();

  //REFACTOR:remove imgSrc

  return (
    <div className="search-profile">
      <UserProfileStatus width={40} status={true} imgSrc={avatar} alt={alt} />
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
