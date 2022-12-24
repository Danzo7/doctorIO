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
  name?: string;
  direction?: 'vertical' | 'horizontal';
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
  name,
  direction = 'vertical',
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
        <div
          className="field"
          css={{
            flexDirection: direction === 'vertical' ? 'column' : 'row',
            alignItems: direction === 'vertical' ? 'stretch' : 'center',
          }}
        >
          {label && (
            <label htmlFor={name}>
              {label + (direction == 'horizontal' ? ':' : '')}
            </label>
          )}
          {children}
        </div>
        {errorMessage ? (
          <span>{errorMessage}</span>
        ) : (
          hint && <span css={{ alignSelf: hintAlignment }}>{hint}</span>
        )}
      </>
    </div>
  );
}
