import ConversationSearch from '@components/conversation_search';
import MessagesCategories from './messages_categories';
import './style/index.scss';
import DmHistory from '@components/dm_history';
import client from '@assets/pictures/test.png';

const lastDmMessage = [
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there long text here okayhhhhhhhhhhhhhhhhhhhhhhhhhhh!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'the last one !',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
];
interface MessagesSideBarProps {}
export default function MessagesSideBar({}: MessagesSideBarProps) {
  return (
    <div className="messages-side-bar">
      {/* 
    - fixes: add new div for content for organizing and set the parent and the new content to overflow hidden 
          -  remove fixed height
          -  width=70% is useless flex-grow=1 do the job
    -  selected is one item from messageCategories or DmHistory cant be both (like discord)
    - if a category is selected show contact
    - if a Dm is selected show chat 
    notice:
    - objects that seem like a constant config are self contained and they better not to be props to avoid props hell,
    self contained mean that objects/configs are related to the component in a direct clear way, by its name 
    for egs like "MessagesCategories" its not possible to have more than one category for messages in other hand "categories" component must indeed have a list  property. 
    for vague and unclear component use props
      */}
      <div className="content">
        <ConversationSearch />
        <MessagesCategories />
        <DmHistory lastDmMessage={lastDmMessage} />
      </div>
    </div>
  );
}
