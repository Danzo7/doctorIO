/* eslint-disable no-unused-vars */
import { color } from '@assets/styles/color';
import {
  MouseEventHandler,
  ReactNode,
  useState,
  WheelEventHandler,
} from 'react';
import './style/index.scss';

export interface InputWrapperProps {
  background?: string;
  borderColor?: string;
  radius?: number;
  padding?: number;
  fillContainer?: true;
  inputAlignment?: string;
  children: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  errorMessage?: string;
  maxWidth?: number | string;
  onWheel?: WheelEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  noFocus?: true;
  height?: number | string;
  disabled?: boolean;
  touchFirst?: boolean;
}

export default function InputWrapper({
  leading,
  trailing,
  padding = 10,
  inputAlignment = 'flex-start',
  background = color.darkersec_color,
  borderColor = color.border_color,
  radius = 10,
  children,
  errorMessage,
  onClick,
  onWheel,
  maxWidth,
  disabled,
  fillContainer,
  noFocus,
  height = 40,
  touchFirst = false,
}: InputWrapperProps) {
  const [isTouched, setIsTouched] = useState(!touchFirst);
  const paddedLeading = leading && (
    <div
      css={{
        paddingLeft: padding,
      }}
    >
      {leading}
    </div>
  );
  const paddedTrailing = trailing && (
    <div
      css={{
        paddingRight: padding,
      }}
    >
      {trailing}
    </div>
  );
  return (
    <div
      className={`input-wrapper${errorMessage ? ' error' : ''}${
        disabled ? ' disabled' : ''
      }`}
      onClick={(e) => {
        if (!noFocus) e.currentTarget?.querySelector('input')?.focus();
        onClick?.(e);
      }}
      onWheel={onWheel}
      css={{
        backgroundColor: background,
        borderRadius: radius,
        border: borderColor ? `1px solid ${borderColor}` : undefined,
        //  flexGrow: fillContainer ? 1 : 0,
        width: !fillContainer ? 'fit-content' : undefined,
        minWidth: maxWidth,
        height: height,
        ...(!isTouched ? { position: 'relative', overflow: 'hidden' } : {}),
      }}
    >
      {
        <>
          {!isTouched && (
            <div
              className="untouched-item"
              onClick={() => {
                setIsTouched(true);
              }}
            >
              Edit
            </div>
          )}

          {paddedLeading}
          <div
            className="input-content"
            css={{
              justifyContent: inputAlignment,
              paddingLeft: leading ? undefined : padding,
            }}
          >
            {children}
          </div>
          {paddedTrailing}
        </>
      }
    </div>
  );
}
