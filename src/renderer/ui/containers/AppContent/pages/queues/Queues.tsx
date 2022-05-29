import PaymentQueue from '@components/payment_queue';
import './style/index.scss';
interface QueuesProps {}
export default function Queues({}: QueuesProps) {
  return (
    <div className="queues">
      <PaymentQueue></PaymentQueue>
    </div>
  );
}
