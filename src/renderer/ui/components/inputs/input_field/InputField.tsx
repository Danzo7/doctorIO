/* eslint-disable no-unused-vars */
import { css } from '@emotion/css';
import React, { ReactNode } from 'react';
import Dropdown from '../dropdown';
import './style/index.scss';
export enum evolvedTypes {
  raw,
  dropdown,
  checkbox,
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
  const paddedLeading = (
    <div
      className={`${css`
        padding-left: ${padding}px;
      `}`}
      children={leading}
    />
  );
  const paddedTrailing = (
    <div
      children={trailing}
      className={`${css`
        padding-right: ${padding}px;
      `}`}
    />
  );
  return (
    <div className="input-field">
      {label && <span>{label}</span>}
      <div className={`input-container`}>
        {type.evolvedType != evolvedTypes.dropdown && paddedLeading}
        {(() => {
          switch (type.evolvedType) {
            case evolvedTypes.dropdown:
              return (
                <Dropdown
                  name={name}
                  options={['اثممخ', 'hello']}
                  placeholder="hemm"
                  leading={paddedLeading}
                  trailing={paddedTrailing}
                />
              );

            default:
              return (
                <input
                  name={name}
                  defaultValue={value}
                  onChange={onChange}
                  type={type.rawType}
                  placeholder={placeholder}
                  {...otherInputProps}
                />
              );
          }
        })()}
        {type.evolvedType != evolvedTypes.dropdown && (
          <Dropdown name={name} options={['kg', 'g']} placeholder="hemm" />
        )}
      </div>
      {hintText && <span>{hintText}</span>}
    </div>
  );
}
