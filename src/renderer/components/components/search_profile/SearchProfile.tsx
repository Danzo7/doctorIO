import IconicButton from '@components/buttons/iconic_button';
import UserProfileStatus from '@components/user_profile_status';
import Search from 'toSvg/search.svg?icon';
import colors from '@colors';
import React from 'react';
import './style/index.scss';
interface SearchProfileProps {
  status: boolean;
  imgSrc: string;
}
export default function SearchProfile({ status, imgSrc }: SearchProfileProps) {
  return (
    <div className="search-profile">
      <UserProfileStatus width={60} status={status} imgSrc={imgSrc} />
      <input type={'search'} />
      <IconicButton
        Icon={Search}
        width={60}
        iconSize={20}
        backgroundColor={colors.secondary_color}
        radius={18}
      />
    </div>
  );
}
