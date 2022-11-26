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
  autoFocus?: true;
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
  autoFocus,
}: InputContainerProps) {
  return (
    <div
      css={{
        width: fillContainer ? '100%' : undefined,
        flexGrow: grow ? 1 : undefined,
        cursor: disabled ? 'not-allowed' : 'auto',
      }}
      className={`input-container${errorMessage ? ' error' : ''}`}
      ref={
        autoFocus
          ? (e) => {
              setTimeout(() => {
                e?.querySelector('input')?.focus();
              }, 0);
            }
          : undefined
      }
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
