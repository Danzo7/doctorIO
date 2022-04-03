import SimpleAvatar from '@components/avatars/simple_avatar';
import React from 'react';
import './style/index.scss';
interface ContentMessageProps {
  img_src: string;
  messenger: string;
  message_time: string;
  message: string;
}
function ContentMessage({
  messenger,
  message_time,
  message,
  img_src,
}: ContentMessageProps) {
  return (
    <div className="content-message">
      <SimpleAvatar img_src={img_src} />
      <div className="info-container">
        <div className="title-container">
          <span>{messenger}</span>
          <span>{message_time}</span>
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default ContentMessage;
