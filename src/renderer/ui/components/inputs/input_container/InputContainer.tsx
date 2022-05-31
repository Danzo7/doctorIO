import { ReactNode } from 'react';
import './style/index.scss';
interface InputContainerProps {
  children: ReactNode;
  label?: string;
  errorMessage?: string;
  hint?: string;
  fillContainer?: true;
}
export default function InputContainer({
  label,
  errorMessage,
  hint,
  children,
  fillContainer,
}: InputContainerProps) {
  return (
    <div
      css={{ width: fillContainer ? '100%' : undefined }}
      className={`input-container${errorMessage ? ' error' : ''}`}
    >
      <>
        {label && <span>{label}</span>}
        {children}
        {errorMessage ? (
          <span>{errorMessage}</span>
        ) : (
          hint && <span>{hint}</span>
        )}
      </>
    </div>
  );
}
