import {
  createContext,
  HTMLInputTypeAttribute,
  ReactNode,
  useContext,
} from 'react';
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '../select';
import InputContainer from '../input_container';
import InputWrapper from '../input_wrapper';
import NumberInput from '../number_input';
import './style/index.scss';
import Checkbox from '../checkbox';
import Datepicker from '../datepicker';
import TextArea from '../text_area';
export const InputControllerContext = createContext<Control<any> | null>(null);

export interface ControllerProps {
  field: Omit<ControllerRenderProps, 'ref'>;
  fieldState?: ControllerFieldState;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}
type NumericInput = {
  type: 'numeric';
  step?: number;
  unit?: string;
};
type SelectInput = {
  type: 'select';
  options: string[];
};

type InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type:
    | SelectInput
    | NumericInput
    | 'toggle'
    | 'textarea'
    | HTMLInputTypeAttribute;
  hint?: string;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
  placeholder?: string;
  fillContainer?: true;
  grow?: boolean;
  hintAlignment?: 'flex-end' | 'flex-start' | 'center';
  disabled?: boolean;
  name: TName;
  control?: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  shouldUnregister?: boolean;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
};
export default function Input<T extends FieldValues = FieldValues>({
  type = 'text',
  hint,
  label,
  placeholder,
  leading,
  trailing,
  children,
  fillContainer,
  grow = true,
  hintAlignment,
  disabled,
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue,
}: InputProps<T>) {
  const controlC = useContext(InputControllerContext);
  if (!controlC && !control) {
    throw new Error(
      'Input must be inside a controller provider or have a control prop',
    );
  }
  const {
    field: { ref, ...field },
    fieldState,
  } = useController({
    name,
    control: controlC || control,
    rules,
    defaultValue,
  });
  return type == 'checkbox' ? (
    <Checkbox label={label} field={field} ref={ref} />
  ) : (
    <InputContainer
      fillContainer={fillContainer}
      errorMessage={fieldState?.error?.message}
      hint={hint}
      hintAlignment={hintAlignment}
      label={label}
      grow={grow}
      disabled={disabled}
    >
      {(type as NumericInput)?.type == 'numeric' ? (
        <NumberInput
          fillContainer
          step={(type as NumericInput)?.step}
          unit={(type as NumericInput)?.unit}
          placeholder={placeholder}
          rules={rules}
          field={field}
          ref={ref}
          fieldState={fieldState}
        />
      ) : (
        <InputWrapper
          errorMessage={fieldState?.error?.message}
          leading={leading}
          trailing={trailing}
          fillContainer
          disabled={disabled}
          height={type == 'textarea' ? '100%' : undefined}
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
                      field={field}
                      ref={ref}
                      fieldState={fieldState}
                    />
                  );
                else if (typeof type === 'string')
                  if (type == 'date') return <Datepicker field={field} />;
                if (type == 'textarea')
                  return (
                    <TextArea
                      field={field}
                      placeholder={placeholder}
                      ref={ref}
                    />
                  );
                else
                  return (
                    <input
                      placeholder={placeholder}
                      type={type as HTMLInputTypeAttribute}
                      disabled={disabled}
                      {...field}
                      ref={ref}
                    ></input>
                  );
              })()}
        </InputWrapper>
      )}
    </InputContainer>
  );
}
