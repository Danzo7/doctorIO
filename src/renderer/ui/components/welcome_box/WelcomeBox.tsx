import { useRef, useState } from 'react';
import './style/index.scss';
import Svg from 'toSvg/doctor_face.svg?icon';
import Arrow from 'toSvg/arrow.svg';
interface WelcomeBoxProps {
  message: string;
}
function WelcomeBox({ message }: WelcomeBoxProps) {
  const [close, setClose] = useState({ isHidding: false, isHidden: false });
  const animationCount = useRef(0);
  return (
    <>
      {!close.isHidden && (
        <div
          className={`welcome-box ${close.isHidding ? 'hide' : ''}`}
          onAnimationEnd={function () {
            setClose({
              isHidding: animationCount.current > 0,
              isHidden: animationCount.current > 0,
            });
            animationCount.current++;
          }}
        >
          <div className="content">
            <Svg css={{ height: '100%', width: 'auto' }} />
            <span>{message}</span>
          </div>
          <div
            className="hide-btn"
            onClick={() => {
              setClose({ isHidding: true, isHidden: false });
            }}
          >
            <Arrow />
          </div>
        </div>
      )}
    </>
  );
}

export default WelcomeBox;
