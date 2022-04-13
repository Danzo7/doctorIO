import LastDmMessage from '@components/last_dm_message';
import React from 'react';
import './style/index.scss';
interface DmHistoryProps {
  lastDmMessage: Array<any>;
}
export default function DmHistory({ lastDmMessage = [] }: DmHistoryProps) {
  return (
    <div className="dm-history">
      <div className="header">
        <span>DM’s</span>
        <div className="add-button-container">
          <span>+</span>
        </div>
      </div>
      <div className="lastDmMessages-container">
        {lastDmMessage.length > 0
          ? lastDmMessage.map(({ imgSrc, lastMessage, status }) => (
              <LastDmMessage
                imgSrc={imgSrc}
                lastMessage={lastMessage}
                status={status}
              />
            ))
          : 'No DM’s messages '}
      </div>
    </div>
  );
}
