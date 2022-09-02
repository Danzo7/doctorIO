import {
  createContext,
  HTMLInputTypeAttribute,
  ReactNode,
  useContext,
} from 'react';
import {
  Control,
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
import Datepicker, { Timepicker } from '../datepicker';
import TextArea from '../text_area';
import { InputWrapperProps } from '../input_wrapper/InputWrapper';
import { DatepickerProps } from '../datepicker/Datepicker';
export const InputControllerContext = createContext<Control<any> | null>(null);

export interface ControllerProps {
  field: Omit<ControllerRenderProps, 'ref'>;
  fieldState?: ControllerFieldState;
  onChanged?: (value: any) => void;
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
type DateField = {
  type: 'date';
} & DatepickerProps;
type InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type:
    | SelectInput
    | NumericInput
    | 'toggle'
    | 'textarea'
    | HTMLInputTypeAttribute
    | DateField;
  hint?: string;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
  placeholder?: string;
  fillContainer?: true;
  onChange?: (value: FieldPathValue<TFieldValues, TName>) => void;
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
  errorMessage?: string;
};
export default function Input<T extends FieldValues = FieldValues>({
  type = 'text',
  hint,
  label,
  placeholder,
  leading,
  trailing,
  children,
  onChange,
  fillContainer,
  grow = true,
  hintAlignment,
  disabled,
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue,
  errorMessage,
  background,
  radius,
}: InputProps<T> & Partial<InputWrapperProps>) {
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
    shouldUnregister,
  });

  return type == 'checkbox' ? (
    <Checkbox label={label} field={field} ref={ref} />
  ) : (
    <InputContainer
      fillContainer={fillContainer}
      errorMessage={errorMessage ?? fieldState?.error?.message}
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
          background={background}
          radius={radius}
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

                if (type == 'date' || (type as DateField)?.type == 'date')
                  return (
                    <Datepicker
                      field={field}
                      {...((type as DateField)?.type
                        ? (type as DateField)
                        : {})}
                    />
                  );
                if (type == 'time')
                  return <Timepicker field={field} onChanged={onChange} />;
                if (type == 'textarea')
                  return (
                    <TextArea
                      field={field}
                      placeholder={placeholder}
                      ref={ref}
                    />
                  );
                if (type == 'number') {
                  const { onChange: onChanged, ...others } = field;
                  return (
                    <input
                      placeholder={placeholder}
                      type={type as HTMLInputTypeAttribute}
                      disabled={disabled}
                      step="0.01"
                      onChange={(e) => onChanged(Number(e.target.value))}
                      {...others}
                      ref={ref}
                    />
                  );
                }
                if (type == 'file') {
                  const { onChange: onChanged, onBlur } = field;
                  return (
                    <input
                      placeholder={placeholder}
                      type={type as HTMLInputTypeAttribute}
                      disabled={disabled}
                      onChange={(e) => onChanged(e.target.files)}
                      onBlur={onBlur}
                      name={name}
                    />
                  );
                }
                if (typeof type === 'string') {
                  const { onChange: onChanged, ...others } = field;
                  return (
                    <input
                      placeholder={placeholder}
                      type={type as HTMLInputTypeAttribute}
                      disabled={disabled}
                      onChange={(e) => {
                        onChanged(e.target.value);
                        onChange?.(e.target.value as any);
                      }}
                      {...others}
                      ref={ref}
                    ></input>
                  );
                }
              })()}
        </InputWrapper>
      )}
    </InputContainer>
  );
}
