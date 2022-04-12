import React from 'react';
import './style/index.scss';
import Panding from 'toSvg/pending.svg';
import InQueue from 'toSvg/in_queue.svg';
import Menu from 'toSvg/menu.svg';

interface BookedItemProps {
  name: string;
  bookTime: string;
  state: 'panding' | 'in queue'; //This will force ts to accept only those values with their types.
}
function BookedItem({ name, bookTime, state }: BookedItemProps) {
  return (
    <div className="booked-item">
      <div className="right-container">
        <div className="info-container">
          <span className="name">{name}</span>
          <span className="info">{bookTime}</span>
        </div>
        {state == 'panding' && (
          <div className="state-container">
            <Panding></Panding>
            <span>Panding</span>
          </div>
        )}
        {state == 'in queue' && (
          <div className="state-container">
            <InQueue></InQueue>
            <span>In queue</span>
          </div>
        )}
      </div>
      <div className="option-menu">
        <Menu />
      </div>
    </div>
  );
}

export default BookedItem;
