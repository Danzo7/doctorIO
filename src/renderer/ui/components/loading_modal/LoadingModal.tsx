import { color } from '@assets/styles/color';
import TextPair from '@components/text_pair/TextPair';
import { FunctionComponent, SVGProps } from 'react';
import './style/index.scss';
interface LoadingModalProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  iconSize?: number | string;
  actionText: string;
  description: string;
}
export default function LoadingModal({
  Icon,
  iconSize = 40,
  actionText,
  description,
}: LoadingModalProps) {
  return (
    <div className="loading-modal">
      <Icon width={iconSize} height={iconSize} />
      <TextPair
        alignItems="center"
        first={{ text: actionText, fontSize: 18, fontWeight: '400' }}
        second={{
          text: description,
          fontSize: 14,
          fontWeight: '400',
          fontColor: color.text_gray,
        }}
      />
    </div>
  );
}
