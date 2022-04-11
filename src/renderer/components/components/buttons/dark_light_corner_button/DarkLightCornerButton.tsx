import React from 'react';
import './style/index.scss';
import colors from '@colors';
import TextButton from '../text_button/TextButton';
interface DarkLightCornerButtonProps {
  title: string;
}
//the reason why i put borderColor={colors.background} is to eliminate the height change after hover //
function DarkLightCornerButton({ title }: DarkLightCornerButtonProps) {
  return (
    <div className="dark-light-corner-button">
      <TextButton
        text={title}
        fontColor={colors.white}
        fontSize={14}
        borderColor={colors.background}
        afterBgColor={colors.darkersec_color}
        afterBorderColor={colors.border_color}
        radius={7}
      />
    </div>
  );
}

export default DarkLightCornerButton;
