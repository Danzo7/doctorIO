import { ReactNode } from 'react';
import './style/index.scss';
interface InputContainerProps {
  children: ReactNode;
  label?: string;
  errorMessage?: string;
  hint?: string;
  fillContainer?: true;
  grow?: boolean;
  hintAlignment?: 'flex-end' | 'flex-start' | 'center';
  disabled?: boolean;
}
export default function InputContainer({
  label,
  errorMessage,
  hint,
  children,
  fillContainer,
  hintAlignment,
  grow,
  disabled,
}: InputContainerProps) {
  return (
    <div
      css={{
        width: fillContainer ? '100%' : undefined,
        flexGrow: grow ? 1 : undefined,
        cursor: disabled ? 'not-allowed' : 'auto',
      }}
      className={`input-container${errorMessage ? ' error' : ''}`}
    >
      <>
        {label && <span>{label}</span>}
        {children}
        {errorMessage ? (
          <span>{errorMessage}</span>
        ) : (
          hint && <span css={{ alignSelf: hintAlignment }}>{hint}</span>
        )}
      </>
    </div>
  );
}
