import CircleAvatar from '@components/avatars/circle_avatar';
import React from 'react';
import './style/index.scss';
interface ContentMessageProps {
  img_src: string;
  messenger: string;
  message_time: string;
  message_content: string;
}
function ContentMessage({
  messenger,
  message_time,
  message_content,
  img_src,
}: ContentMessageProps) {
  return (
    <div className="content-message">
      <CircleAvatar src={img_src} width={40} />
      <div className="info-container">
        <div className="title-container">
          <span>{messenger}</span>
          <span>{message_time}</span>
        </div>
        <span>{message_content}</span>
      </div>
    </div>
  );
}

export default ContentMessage;
