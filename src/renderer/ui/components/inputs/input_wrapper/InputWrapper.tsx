/* eslint-disable no-unused-vars */
import { color } from '@assets/styles/color';
import { MouseEventHandler, ReactNode, WheelEventHandler } from 'react';
import './style/index.scss';

interface InputWrapperProps {
  background?: string;
  borderColor?: string;
  radius?: number;
  padding?: number;
  flexGrow?: number;
  inputAlignment?: string;
  children: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  errorMessage?: string;
  maxWidth?: number | string;
  onWheel?: WheelEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function InputWrapper({
  leading,
  trailing,
  padding = 10,
  flexGrow = 0,
  inputAlignment = 'flex-start',
  background = color.darkersec_color,
  borderColor = color.border_color,
  radius = 10,
  children,
  errorMessage,
  onClick,
  onWheel,
  maxWidth,
}: InputWrapperProps) {
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
      className={`input-wrapper${errorMessage ? ' error' : ''}`}
      onClick={(e) => {
        e.currentTarget?.querySelector('input')?.focus();
        onClick?.(e);
      }}
      onWheel={onWheel}
      css={{
        backgroundColor: background,
        borderRadius: radius,
        border: borderColor ? `1px solid ${borderColor}` : undefined,
        flexGrow: flexGrow,
        minWidth: maxWidth,
      }}
    >
      {
        <>
          {paddedLeading}
          <div
            className="input-content"
            css={{
              justifyContent: inputAlignment,
              paddingLeft: leading ? undefined : 10,
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
