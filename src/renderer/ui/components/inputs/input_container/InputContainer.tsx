import { ReactNode } from 'react';
import './style/index.scss';
interface InputContainerProps {
  children: ReactNode;
  label?: string;
  errorMessage?: string;
  hint?: string;
  fillContainer?: true;
  grow?: true;
  hintAlignment?: 'flex-end' | 'flex-start' | 'center';
}
export default function InputContainer({
  label,
  errorMessage,
  hint,
  children,
  fillContainer,
  hintAlignment,
  grow,
}: InputContainerProps) {
  return (
    <div
      css={{ width: fillContainer ? '100%' : undefined, flexGrow: grow && 1 }}
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
