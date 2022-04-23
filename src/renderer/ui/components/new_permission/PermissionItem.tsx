import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ToggleButton from '@components/buttons/toggle_button';
import { css } from '@emotion/css';
import React from 'react';
import Icon from 'toSvg/link.svg?icon';
import './style/index.scss';
interface PermissionItemProps {
  linked?: boolean;
  disabled?: boolean;
}
export default function PermissionItem({
  linked = false,
  disabled = false,
}: PermissionItemProps) {
  return (
    <div className="permission-item">
      <div className="permission-info">
        <div className="permission-text-container">
          <span
            className={css`
              color: ${disabled ? color.text_gray : color.white};
            `}
          >
            Assistant
          </span>
          <span
            className={css`
              color: ${disabled ? color.text_gray : color.white};
            `}
          >
            people with this role will assist another role, mean they can only
            access to the dependent role permission
          </span>
        </div>
        <div>
          <ToggleButton disabled={disabled} />
        </div>
      </div>
      {linked && (
        <div className="permission-linked">
          <div className={`left-linked`}>
            <span
              className={css`
                color: ${disabled ? color.text_gray : color.white};
              `}
            >
              Linked To
            </span>
            <Icon />
            <div className="linked-permission-container">
              <span>@Rythm#3722</span>
            </div>
          </div>
          <TextButton
            text="Change dependent..."
            fontColor={disabled ? color.text_gray : color.cold_red}
            fontSize={9}
            fontWeight={700}
            backgroundColor={color.darkersec_color}
            radius={7}
            borderColor={color.border_color}
            afterBgColor={color.darkersec_color}
            afterFontColor={disabled ? color.text_gray : color.cold_red}
          />
        </div>
      )}
    </div>
  );
}
