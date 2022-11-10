import { color } from '@assets/styles/color';
import StatusIcon from '@components/status_icon';
import './style/index.scss';
interface AlertProps {
  status: 'Success' | 'warning' | 'error';
  text: string;
}
export default function Alert({ status, text }: AlertProps) {
  return (
    <div
      className="alert"
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
