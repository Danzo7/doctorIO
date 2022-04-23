import React from 'react';
import './style/index.scss';
import invite from 'toSvg/invitePatientIn.svg?icon';
import view from 'toSvg/view-test.svg?icon';
import TextIconButton from '@components/buttons/text_icon_button';
import colors from '@colors';

const btnList = [
  { icon: invite, text: 'invite in', color: colors.good_green },
  { icon: view, text: 'View tests', color: colors.cold_blue },
];
function ButtonsHoverLock() {
  //  const [currentActive, setActive] = useState(1);

  return (
    <div className="buttons-hover-lock">
      {...btnList.map((e, i) => (
        <TextIconButton
          id={i}
          //onMouseOver={setActive}
          Icon={e.icon}
          text={e.text}
          color={e.color}
        ></TextIconButton>
      ))}
    </div>
  );
}

export default ButtonsHoverLock;
