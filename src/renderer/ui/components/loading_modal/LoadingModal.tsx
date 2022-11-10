import { color } from '@assets/styles/color';
import LoadingSpinner from '@components/loading_spinner';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
interface LoadingModalProps {
  title: string;
  description: string;
}
export default function LoadingModal({
  title: actionText,
  description,
}: LoadingModalProps) {
  return (
    <div className="loading-modal">
      <LoadingSpinner />
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
