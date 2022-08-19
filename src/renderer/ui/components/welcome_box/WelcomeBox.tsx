import { useRef, useState } from 'react';
import './style/index.scss';
import Svg from 'toSvg/doctor_figure.svg?icon';
import Arrow from 'toSvg/arrow.svg';
import Pattern from 'toSvg/pattern.svg';
import { differenceInHours } from 'date-fns/esm';
import { useAppSelector } from '@store';
interface WelcomeBoxProps {
  message: string;
}
function WelcomeBox({ message }: WelcomeBoxProps) {
  const { user } = useAppSelector((state) => state.user);

  const isDismised =
    user &&
    differenceInHours(new Date(), user.userPreferences.welcomeDismissedIn) < 24;
  const [close, setCloseState] = useState({
    isHidding: isDismised,
    isHidden: isDismised,
  });
  const setClose = (state: { isHidding: boolean; isHidden: boolean }) => {
    //REDUX set welcomeDismissedIn to new Date()
    setCloseState(state);
  };
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
            <Pattern css={{ position: 'absolute', left: -10 }} />
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
