import React, { useState } from 'react';
import './style/index.scss';
import Panding from 'toSvg/pending.svg';
import Inqueue from 'toSvg/inqueue.svg';
import Menu from 'toSvg/menu.svg';
interface BookedItemProps {
  name: string;
  bookTime: string;
  state: string;
}
function BookedItem({ name, bookTime, state }: BookedItemProps) {
  const [hover, setHover] = useState(false);
  const hundleHover = () => {
    setHover(!hover);
  };
  return (
    <div
      onMouseEnter={hundleHover}
      onMouseLeave={hundleHover}
      className="booked-item"
    >
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
          <Inqueue></Inqueue>
          <span>In queue</span>
        </div>
      )}
      {hover && <Menu />}
    </div>
  );
}

export default BookedItem;
