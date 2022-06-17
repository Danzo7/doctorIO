import Header from '@components/header';
import { Interpolation, Theme } from '@emotion/react';
import { ClassAttributes, FormHTMLAttributes, ReactNode } from 'react';
import './style/index.scss';

interface ModalContainerProps {
  title?: string;

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
}: ModalContainerProps) {
  const Container = onSubmit ? Form : Div;

  return (
    <Container
      className="modal-container"
      css={{ gap: gap }}
      onSubmit={onSubmit as any}
    >
      <Header title={title} />
      <div className="inputs-container">{children}</div>
      {controls && <div className="control">{controls}</div>}
    </Container>
  );
}
