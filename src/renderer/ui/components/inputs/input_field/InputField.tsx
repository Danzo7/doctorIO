/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
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
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  hintText?: string;
  placeholder?: string;
  background?: string;
  radius?: number;
  type?: InputType;
  value?: string | string[];
  state?: 'error' | 'disabled' | 'focused';
  register?: UseFormRegisterReturn;
  errorField?: FieldError;
  padding?: number;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputField({
  label,
  leading,
  trailing,
  placeholder,
  padding = 10,
  background,
  radius,
  hintText,
  type = { evolvedType: evolvedTypes.raw, rawType: 'text' },
  register,
  errorField,
  name,
  onChange,
}: InputFieldProps) {
  const paddedLeading = leading && (
    <div
      css={css`
        padding-left: ${padding}px;
      `}
    >
      {leading}
    </div>
  );
  const paddedTrailing = trailing && (
    <div
      css={css`
        padding-right: ${padding}px;
      `}
    >
      {trailing}
    </div>
  );
  return (
    <div className={`input-field${errorField ? ' error' : ''}`}>
      {label && <span>{label}</span>}

      <div
        className="input-container"
        css={css`
          background-color: ${background} !important;
          border-radius: ${radius}px!important;
        `}
      >
        {type.evolvedType != evolvedTypes.dropdown && paddedLeading}
        {(() => {
          switch (type.evolvedType) {
            case evolvedTypes.dropdown:
              return (
                <Dropdown
                  options={['اثممخ', 'hello']}
                  placeholder={placeholder}
                  leading={paddedLeading}
                  trailing={paddedTrailing}
                />
              );

            default:
              return (
                <input
                  onChange={onChange}
                  placeholder={placeholder}
                  {...register}
                />
              );
          }
        })()}
        {type.evolvedType != evolvedTypes.dropdown && paddedTrailing}
      </div>

      {errorField ? (
        <span>{errorField.message}</span>
      ) : (
        hintText && <span>{hintText}</span>
      )}
    </div>
  );
}
