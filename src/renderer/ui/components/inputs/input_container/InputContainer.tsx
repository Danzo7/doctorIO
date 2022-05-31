import { ReactNode } from 'react';
import './style/index.scss';
interface InputContainerProps {
  children: ReactNode;
  label?: string;
  errorMessage?: string;
  hint?: string;
  flexGrow?: number;
}
export default function InputContainer({
  label,
  errorMessage,
  hint,
  children,
  flexGrow = 1,
}: InputContainerProps) {
  return (
    <div
      css={{ flexGrow: flexGrow }}
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
