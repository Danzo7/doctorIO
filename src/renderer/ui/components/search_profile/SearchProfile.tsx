import IconicButton from '@components/buttons/iconic_button';
import UserProfileStatus from '@components/user_profile_status';
import Search from 'toSvg/search.svg?icon';
import colors from '@colors';
import './style/index.scss';
interface SearchProfileProps {
  imgSrc: string;
}
export default function SearchProfile({ imgSrc }: SearchProfileProps) {
  return (
    <div className="search-profile">
      <UserProfileStatus width={40} status={true} imgSrc={imgSrc} />
      <div>
        <IconicButton
          Icon={Search}
          width={40}
          iconSize={15}
          backgroundColor={colors.silver_gray}
          radius={7}
        />
      </div>
    </div>
  );
}
