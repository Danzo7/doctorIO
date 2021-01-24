import React from 'react';
import './style/index.scss';

interface QueueItem {}

function QueueItem({}: QueueItem) {
  // const [count, setCount] = useState(0);
  // useEffect(func, [count, setCount]);
  // Return the App component.
  return (
    <div className="queue-item">
      <div className="client-name">John Doe</div>
      <div className="index-section">
        <span className="text">1</span>
      </div>
    </div>
  );
}

export default QueueItem;
