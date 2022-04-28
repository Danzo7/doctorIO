import './style/index.scss';
import BackSvg from 'toSvg/back-button.svg?icon';

interface BackButtonProps {
  onClick?: () => void;
}

function BackButton({ onClick }: BackButtonProps) {
  return (
    <div onClick={onClick} className="back-button">
      <BackSvg />
    </div>
  );
}

export default BackButton;
