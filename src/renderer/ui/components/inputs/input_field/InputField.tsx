/* eslint-disable no-unused-vars */
import { css } from '@emotion/css';
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
  name: string;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  hintText?: string;
  placeholder?: string;
  type?: InputType;
  value?: string | string[];
  otherInputProps?: any;
  state?: 'error' | 'disabled' | 'focused';
  padding?: number;
  onChange?: (e: Event) => void;
}
export default function InputField({
  name,
  label,
  leading,
  trailing,
  placeholder,
  padding = 10,

  hintText,
  type = { evolvedType: evolvedTypes.raw, rawType: 'text' },
  value,
  otherInputProps,
  onChange,
}: InputFieldProps) {
  return (
    <div className="input-field">
      {label && <span>{label}</span>}
      <div
        className={`input-container ${css`
          padding: 0 ${padding}px 0 ${padding}px;
        `}`}
      >
        {type.evolvedType != evolvedTypes.dropdown && (
          <div className="lead" children={leading} />
        )}
        {(() => {
          switch (type.evolvedType) {
            case evolvedTypes.dropdown:
              return (
                <Dropdown
                  name={name}
                  options={['اثممخ', 'hello']}
                  placeholder="hemm"
                  leading={leading}
                  trailing={trailing}
                />
              );

            default:
              return (
                <input
                  name={name}
                  value={value}
                  onChange={onChange}
                  type={type.rawType}
                  placeholder={placeholder}
                  {...otherInputProps}
                />
              );
          }
        })()}
        {type.evolvedType != evolvedTypes.dropdown && trailing}
      </div>
      {hintText && <span>{hintText}</span>}
    </div>
  );
}
