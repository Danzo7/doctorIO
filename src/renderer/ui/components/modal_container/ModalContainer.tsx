import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, FormHTMLAttributes, ReactNode } from 'react';
import './style/index.scss';

interface ModalContainerProps {
  title?: string;
  isLoading?: boolean;
  className?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  controls?: ReactNode;
  children?: ReactNode;
  gap?: number;
  controlsPosition?: 'center' | 'end';
  titleMaxWidth?: number | string;
  overflowHidden?: boolean;
}
const Form = (
  props: ClassAttributes<HTMLFormElement> &
    FormHTMLAttributes<HTMLFormElement> & {
      css?: Interpolation<Theme>;
    },
) => <form {...props} />;
const Div = (
  props: ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement> & {
      css?: Interpolation<Theme>;
    },
) => <div {...props} />;

export default function ModalContainer({
  title,
  children,
  onSubmit,
  controls,
  gap = 20,
  isLoading,
  className = '',
  controlsPosition = 'center',
  titleMaxWidth,
  overflowHidden,
}: ModalContainerProps) {
  const Container = onSubmit ? Form : Div;

  return (
    <Container
      className={`modal-container ${className}`}
      css={{ gap: gap }}
      onSubmit={onSubmit as any}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header title={title} padding={0} titleMaxWidth={titleMaxWidth} />
          <div
            className="modal-body"
            css={overflowHidden ? { overflow: 'hidden' } : undefined}
          >
            {children}
          </div>
          {controls && (
            <div
              className={
                controlsPosition == 'center'
                  ? 'controls-center'
                  : 'controls-end'
              }
            >
              {controls}
            </div>
          )}
        </>
      )}
    </Container>
  );
}
