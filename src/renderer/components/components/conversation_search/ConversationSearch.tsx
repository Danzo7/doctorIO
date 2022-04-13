import IconicButton from '@components/buttons/iconic_button';
import React from 'react';
import './style/index.scss';
import Search from 'toSvg/search.svg?icon';

interface ConversationSearchProps {}
export default function ConversationSearch({}: ConversationSearchProps) {
  return (
    <div className="conversation-search">
      <IconicButton Icon={Search} width={30} iconSize={15} radius={18} />
      <input type={'search'} placeholder="search for conversation" />
    </div>
  );
}
