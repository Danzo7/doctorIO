import StatusIcon from '@components/status_icon';
import TextPair from '@components/text_pair/TextPair';
import { ReactNode } from 'react';
import './style/index.scss';
interface DialogModalProps {
  status: 'Success' | 'warning' | 'error';
  title: string;
  description: string;
  controls?: ReactNode;
}
export default function DialogModal({
  status,
  title,
  description,
  controls,
}: DialogModalProps) {
  return (
    <div className="dialog-modal">
      <div className="dialog-modal-texts">
        <StatusIcon status={status} />
        <TextPair
          first={{ fontSize: 18, fontWeight: 600, text: title }}
          second={{ fontSize: 14, fontWeight: 400, text: description }}
        />
      </div>
      <div className="controls-div">{controls}</div>
    </div>
  );
}
