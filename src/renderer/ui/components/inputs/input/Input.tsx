import { forwardRef, HTMLInputTypeAttribute, ReactNode } from 'react';
import {
  ChangeHandler,
  InternalFieldName,
  UseFormRegisterReturn,
} from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '../select';
import InputContainer from '../input_container';
import InputWrapper from '../input_wrapper';
import NumberInput from '../number_input';
import './style/index.scss';
import Checkbox from '../checkbox';
export type FormHookProps = Omit<
  UseFormRegisterReturn,
  'onChange' | 'onBlur' | 'ref' | 'name'
> & {
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
  name?: InternalFieldName;
};
type NumericInput = {
  type: 'numeric';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};
type SelectInput = {
  type: 'select';
  options: string[];
};

type DateTimeInput = {
  type: 'datetime';
  date?: Date;
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
  fillContainer?: true;
  inputFill?: true;
  grow?: boolean;
  hintAlignment?: 'flex-end' | 'flex-start' | 'center';
}
export default forwardRef(function Input(
  {
    type = 'text',
    errorMsg,
    hint,
    label,
    placeholder,
    leading,
    trailing,
    children,
    fillContainer,
    inputFill,
    grow = true,
    hintAlignment,

    ...others
  }: InputProps & FormHookProps,
  ref: any,
) {
  return (type as string) == 'checkbox' ? (
    <Checkbox label={label} ref={ref} {...others} />
  ) : (
    <InputContainer
      fillContainer={fillContainer}
      errorMessage={errorMsg}
      hint={hint}
      hintAlignment={hintAlignment}
      label={label}
      grow={grow}
    >
      {(type as NumericInput)?.type == 'numeric' ? (
        <NumberInput
          fillContainer={inputFill ?? fillContainer}
          errorMessage={errorMsg}
          step={(type as NumericInput)?.step}
          unit={(type as NumericInput)?.unit}
          placeholder={placeholder}
          {...others}
          ref={ref}
        />
      ) : (
        <InputWrapper
          errorMessage={errorMsg}
          leading={leading}
          trailing={trailing}
          fillContainer
        >
          {children
            ? children
            : (() => {
                if ((type as SelectInput)?.type == 'select')
                  return (
                    <Select
                      options={(type as SelectInput)?.options}
                      icon={trailing}
                      placeholder={placeholder}
                      {...others}
                    />
                  );
                else if (typeof type === 'string')
                  return (
                    <input
                      placeholder={placeholder}
                      type={type as HTMLInputTypeAttribute}
                      {...others}
                      ref={ref}
                    ></input>
                  );
              })()}
        </InputWrapper>
      )}
    </InputContainer>
  );
});
