import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import React from 'react';
import './style/index.scss';
interface NewRoleProps {}
export default function NewRole({}: NewRoleProps) {
  return (
    <div className="new-role">
      <TextButton
        text="+"
        afterBgColor={color.darkersec_color}
        fontSize={35}
        width={'100%'}
        fontWeight={100}
      />
    </div>
  );
}
