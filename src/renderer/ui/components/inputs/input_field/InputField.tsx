import IconicButton from '@components/buttons/iconic_button';
import React from 'react';
import './style/index.scss';
import Search from 'toSvg/search.svg?icon';
interface InputFieldProps {
  label?: string;
  searchIcon?: boolean;
  placeholder?: string;
  inputType?: string;
  otherInputProps?: any;
}
export default function InputField({
  label,
  searchIcon,
  placeholder,
  inputType = 'text',
  otherInputProps,
}: InputFieldProps) {
  return (
    <div className="input-field">
      {label && (
        <div className="label-container">
          <span>{label}</span>
        </div>
      )}
      <div className="input-container">
        <input
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
