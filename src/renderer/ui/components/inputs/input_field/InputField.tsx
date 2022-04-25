/* eslint-disable no-unused-vars */
import React, { ReactNode } from 'react';
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
  leadingIcon,
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
        {leadingIcon}

        {(() => {
          switch (type.evolvedType) {
            case evolvedTypes.dropdown:
              return (
                <select name="cars" id="cars">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              );

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

        {leadingIcon}
      </div>
      {label && <span>{hintText}</span>}
    </div>
  );
}
