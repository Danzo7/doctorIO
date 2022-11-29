import { formatDistance } from 'date-fns';
import { useEffect, useState } from 'react';
interface TimeAgoProps {
  timeAgo: Date;
}
export default function TimeAgo({ timeAgo }: TimeAgoProps) {
  const [fakeCurrentDate, setFakeCurrentDate] = useState(timeAgo);
  useEffect(() => {
    setTimeout(() => setFakeCurrentDate(new Date()), 60000);
  }, [fakeCurrentDate]);

  return <span>{formatDistance(timeAgo, new Date())} ago</span>;
}
