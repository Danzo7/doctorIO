import Header from '@components/header';
import LoadingSpinner from '@components/loading_spinner';
import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, FormHTMLAttributes, ReactNode } from 'react';
import './style/index.scss';

interface ModalContainerProps {
  title?: string;
  isLoading?: boolean;

  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  controls?: ReactNode;
  children?: ReactNode;
  gap?: number;
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
}: ModalContainerProps) {
  const Container = onSubmit ? Form : Div;

  return (
    <Container
      className="modal-container"
      css={{ gap: gap }}
      onSubmit={onSubmit as any}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header title={title} padding={0} />
          <div className="modal-body">{children}</div>
          {controls && <div className="control">{controls}</div>}
        </>
      )}
    </Container>
  );
}
