/* eslint-disable no-unused-vars */
import React, { ReactNode } from 'react';
import Dropdown from '../dropdown';
import './style/index.scss';
export enum evolvedTypes {
  raw,
  leadingDropdown,
  trainlingDropdown,
  dropdown,
}
type InputType = {
  evolvedType: evolvedTypes;
  rawType: 'text' | 'password' | string;
};
interface InputFieldProps {
  label?: string;
  leadingIcon?: ReactNode;
  traillingIcon?: ReactNode;
  hintText?: string;
  placeholder?: string;
  type?: InputType;
  value?: string | string[];
  otherInputProps?: any;
  state?: 'error' | 'disabled' | 'focused';
  onChange?: (e: Event) => void;
}
export default function InputField({
  label,
  leadingIcon: LeadingIcon,
  traillingIcon,
  placeholder,
  hintText,
  type = { evolvedType: evolvedTypes.raw, rawType: 'text' },
  value,
  otherInputProps,
  onChange,
}: InputFieldProps) {
  return (
    <div className="input-field">
      {label && <span>{label}</span>}
      <div className="input-container">
        {traillingIcon}
        {(() => {
          switch (type.evolvedType) {
            case evolvedTypes.dropdown:
              return <Dropdown />;

            default:
              return (
                <input
                  value={value}
                  onChange={onChange}
                  type={type.rawType}
                  placeholder={placeholder}
                  {...otherInputProps}
                />
              );
          }
        })()}
        {type.evolvedType != evolvedTypes.dropdown && LeadingIcon}
      </div>
      {hintText && <span>{hintText}</span>}
    </div>
  );
}
