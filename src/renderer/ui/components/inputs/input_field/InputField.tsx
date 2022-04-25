import IconicButton from '@components/buttons/iconic_button';
import React from 'react';
import './style/index.scss';
import Search from 'toSvg/search.svg?icon';
import { css } from '@emotion/css';
import color from '@assets/styles/color';
interface InputFieldProps {
  label?: string;
  searchIcon?: boolean;
  placeholder?: string;
  inputType?: string;
  value?: string;
  otherInputProps?: any;
  onChange?: (e: Event) => void;
  inputBackgroundColor?: string;
}
export default function InputField({
  label,
  searchIcon,
  placeholder,
  inputType = 'text',
  value,
  otherInputProps,
  onChange,
  inputBackgroundColor,
}: InputFieldProps) {
  return (
    <div className="input-field">
      {label && (
        <div className="label-container">
          <span>{label}</span>
        </div>
      )}
      <div
        className={`input-container  ${css`
          background-color: ${inputBackgroundColor
            ? inputBackgroundColor
            : color.darkersec_color};
        `} `}
      >
        <input
          value={value}
          onChange={onChange}
          type={inputType}
          placeholder={placeholder}
          {...otherInputProps}
        />
        {searchIcon && (
          <div className="search-btn-container">
            <IconicButton Icon={Search} width={30} iconSize={15} radius={18} />
          </div>
        )}
      </div>
    </div>
  );
}
