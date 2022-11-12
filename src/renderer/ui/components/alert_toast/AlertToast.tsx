import { color } from '@assets/styles/color';
import StatusIcon from '@components/status_icon';
import './style/index.scss';
interface AlertToastProps {
  status: 'Success' | 'warning' | 'error';
  text: string;
}
export default function AlertToast({ status, text }: AlertToastProps) {
  return (
    <div
      className="alert-toast"
      css={{
        border: `1px solid  ${
          status == 'Success'
            ? color.good_green
            : status == 'warning'
            ? color.warm_orange
            : color.hot_red
        }`,
      }}
    >
      <StatusIcon status={status} borderRadius={7} size={42} />

      <span>{text} </span>
    </div>
  );
}
