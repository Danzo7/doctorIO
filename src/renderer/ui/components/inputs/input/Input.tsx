import { HTMLInputTypeAttribute, ReactNode } from 'react';
import {
  ChangeHandler,
  InternalFieldName,
  RefCallBack,
  UseFormRegisterReturn,
} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '../select';
import InputContainer from '../input_container';
import InputWrapper from '../input_wrapper';
import NumberInput from '../number_input';
import './style/index.scss';
export type FormHookProps = Omit<
  UseFormRegisterReturn,
  'onChange' | 'onBlur' | 'ref' | 'name'
> & {
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
  ref?: RefCallBack;
  name?: InternalFieldName;
};
type NumericInput = {
  type: 'numeric';
  min: number;
  max: number;
  step: number;
  unit: string;
};
type SelectInput = {
  type: 'select';
  options: string[];
  icon: ReactNode;
};

type DateTimeInput = {
  type: 'datetime';
  date: Date;
};
interface InputProps {
  type: SelectInput | DateTimeInput | NumericInput | HTMLInputTypeAttribute;
  errorMsg?: string;

  hint?: string;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
  placeholder?: string;
  flexGrow?: number;
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
}
export default function Input({
  type = 'text',
  errorMsg,
  hint,
  label,
  placeholder,
  leading,
  trailing,
  children,
  flexGrow,
  ...others
}: InputProps & FormHookProps) {
  return (
    <InputContainer
      flexGrow={flexGrow}
      errorMessage={errorMsg}
      hint={hint}
      label={label}
    >
      {(type as NumericInput)?.type == 'numeric' ? (
        <NumberInput
          errorMessage={errorMsg}
          step={(type as NumericInput)?.step}
          unit={(type as NumericInput)?.unit}
          placeholder={placeholder}
          {...others}
        />
      ) : (
        <InputWrapper
          errorMessage={errorMsg}
          leading={leading}
          trailing={trailing}
        >
          {children
            ? children
            : (() => {
                if ((type as SelectInput)?.type == 'select')
                  return (
                    <Select
                      options={(type as SelectInput)?.options}
                      icon={(type as SelectInput)?.icon}
                      placeholder={placeholder}
                      {...others}
                    />
                  );
                else if ((type as DateTimeInput).type == 'datetime')
                  return (
                    <DatePicker selected={new Date()} onChange={() => {}} />
                  );
                else if (typeof type === 'string')
                  return (
                    <input
                      placeholder={placeholder}
                      {...others}
                      type={type as HTMLInputTypeAttribute}
                    ></input>
                  );
              })()}
        </InputWrapper>
      )}
    </InputContainer>
  );
}
