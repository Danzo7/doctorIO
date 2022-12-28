import {
  ComponentProps,
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
import MultipleCheckGroup from '../multiple_check_group';
import IconicSwitch from '../iconic_switch';
import PasswordInput from '../password_input';
export const InputControllerContext = createContext<{
  control: Control<any> | undefined;
  onChange?: (value: any) => void;
}>({ control: undefined });
export const Inputix = ({
  control,
  onChange,
  children,
}: {
  control: Control<any> | undefined;
  onChange?: (value: any) => void;
  children: ReactNode;
}) => (
  <InputControllerContext.Provider
    value={{ control: control, onChange: onChange }}
  >
    {children}
  </InputControllerContext.Provider>
);

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
  isOptional?: true;
};
type SelectInput = {
  type: 'select';
  options: string[];
};
type DateField = {
  type: 'date';
} & Partial<
  Pick<DatepickerProps, 'yearControl' | 'dateFormat' | 'filterDate' | 'only'>
>;
type MultiCheck = {
  type: 'multiCheck';
} & Pick<
  ComponentProps<typeof MultipleCheckGroup>,
  'onlyOne' | 'mustOne' | 'options' | 'selected'
>;
type InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type:
    | SelectInput
    | NumericInput
    | 'toggle'
    | 'textarea'
    | HTMLInputTypeAttribute
    | DateField
    | MultiCheck
    | 'IconicSwitch';
  hint?: string;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
  placeholder?: string;
  fillContainer?: true;
  onChange?: (value: FieldPathValue<TFieldValues, TFieldName>) => void;
  grow?: boolean;
  hintAlignment?: 'flex-end' | 'flex-start' | 'center';
  disabled?: boolean;
  name: TFieldName;
  control?: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TFieldName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  shouldUnregister?: boolean;
  defaultValue?: FieldPathValue<TFieldValues, TFieldName>;
  errorMessage?: string;
  autoFocus?: true;
  touchFirst?: true;
  border?: boolean;
  direction?: 'vertical' | 'horizontal';
};
export default function Input<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
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
  autoFocus,
  touchFirst,
  border,
  direction,
}: InputProps<TFieldValues, TFieldName> & Partial<InputWrapperProps>) {
  const { control: controlC } = useContext(InputControllerContext);
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
    shouldUnregister,
    ...(defaultValue ? { defaultValue } : {}),
  });
  return type == 'checkbox' ? (
    <Checkbox
      label={label}
      field={field}
      ref={ref}
      disabled={disabled}
      onChanged={onChange}
      fieldState={fieldState}
      border={border}
    />
  ) : type == 'IconicSwitch' ? (
    <IconicSwitch field={field} onChanged={onChange} />
  ) : (
    <InputContainer
      fillContainer={fillContainer}
      errorMessage={errorMessage ?? fieldState?.error?.message}
      hint={hint}
      hintAlignment={hintAlignment}
      label={label}
      grow={grow}
      disabled={disabled}
      autoFocus={autoFocus}
      direction={direction}
      name={name}
    >
      {(type as NumericInput)?.type == 'numeric' ? (
        <NumberInput
          fillContainer
          step={(type as NumericInput)?.step}
          unit={(type as NumericInput)?.unit}
          placeholder={placeholder}
          rules={rules}
          field={field}
          isOptional={(type as NumericInput)?.isOptional}
          ref={ref}
          fieldState={fieldState}
          disabled={disabled}
          touchFirst={touchFirst}
        />
      ) : type == 'password' ? (
        <PasswordInput
          field={field}
          ref={ref}
          touchFirst={touchFirst}
          disabled={disabled}
          fieldState={fieldState}
          rules={rules}
          background={background}
          leading={leading}
          onChanged={onChange}
          placeholder={placeholder}
          radius={radius}
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
          touchFirst={touchFirst}
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
                      onChanged={onChange}
                      ref={ref}
                      fieldState={fieldState}
                    />
                  );
                if ((type as MultiCheck)?.type == 'multiCheck')
                  return (
                    <MultipleCheckGroup
                      field={field}
                      fieldState={fieldState}
                      rules={rules}
                      onChanged={onChange}
                      disabled={disabled}
                      {...(type as MultiCheck)}
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

                if (type == 'textarea') {
                  return (
                    <TextArea
                      field={field}
                      placeholder={placeholder}
                      ref={ref}
                      onChanged={onChange}
                    />
                  );
                }
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
