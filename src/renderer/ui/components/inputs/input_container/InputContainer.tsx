import { ReactNode } from 'react';
import './style/index.scss';
interface InputContainerProps {
  children: ReactNode;
  label?: string;
  errorMessage?: string;
  hint?: string;
  fillContainer?: true;
  hintAlignment?: 'flex-end' | 'flex-start' | 'center';
}
export default function InputContainer({
  label,
  errorMessage,
  hint,
  children,
  fillContainer,
  hintAlignment,
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
          hint && <span css={{ alignSelf: hintAlignment }}>{hint}</span>
        )}
      </>
    </div>
  );
}
