import { color } from '@assets/styles/color';
import './style/index.scss';
import XMark from 'toSvg/x_mark.svg?icon';
import GoodMark from 'toSvg/good_mark.svg?icon';
import Exclamation from 'toSvg/exclamation2.svg?icon';

interface StatusIconProps {
  status: 'success' | 'warning' | 'error';
  size?: number;
  borderRadius?: number;
}
export default function StatusIcon({
  status,
  size = 30,
  borderRadius,
}: StatusIconProps) {
  return (
    <div
      className="status-icon"
      css={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: borderRadius ?? '100%',
        backgroundColor:
          status == 'success'
            ? color.good_green
            : status == 'warning'
            ? color.warm_orange
            : color.hot_red,
      }}
    >
      {status == 'success' ? (
        <GoodMark width={size / 2} height={size / 2} />
      ) : status == 'warning' ? (
        <Exclamation width={size / 2} height={size / 2} />
      ) : (
        <XMark width={size / 2.5} height={size / 2.5} />
      )}
    </div>
  );
}
