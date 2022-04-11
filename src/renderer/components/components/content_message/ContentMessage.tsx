import CircleAvatar from '@components/avatars/circle_avatar';
import React from 'react';
import './style/index.scss';
interface ContentMessageProps {
  imgSrc: string;
  messenger: string;
  messageTime: string;
  messageContent: string;
}
function ContentMessage({
  messenger,
  messageTime,
  messageContent,
  imgSrc,
}: ContentMessageProps) {
  return (
    <div className="content-message">
      <CircleAvatar src={imgSrc} width={40} />
      <div className="info-container">
        <div className="title-container">
          <span>{messenger}</span>
          <span>{messageTime}</span>
        </div>
        <span>{messageContent}</span>
      </div>
    </div>
  );
}

export default ContentMessage;
