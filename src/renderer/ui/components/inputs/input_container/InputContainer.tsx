import { ReactNode } from 'react';
import './style/index.scss';
interface InputContainerProps {
  children: ReactNode;
  label?: string;
  errorMessage?: string;
  hint?: string;
}
export default function InputContainer({
  label,
  errorMessage,
  hint,
  children,
}: InputContainerProps) {
  return (
    <div className={`input-container${errorMessage ? ' error' : ''}`}>
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
