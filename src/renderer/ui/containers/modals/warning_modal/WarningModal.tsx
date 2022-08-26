import ModalContainer from '@components/modal_container';
import { ReactNode } from 'react';
import './style/index.scss';
interface WarningModalProps {
  title: string;
  description: string;
  children?: ReactNode;
}
export default function WarningModal({
  title,
  description,
  children,
}: WarningModalProps) {
  return (
    <ModalContainer
      gap={10}
      title={title}
      controls={<div className="warning-controls">{children}</div>}
    >
      <span className="warning-description">{description}</span>
    </ModalContainer>
  );
}
