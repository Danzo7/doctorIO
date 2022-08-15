import ModalContainer from '@components/modal_container';
import { ReactNode } from 'react';
import './style/index.scss';
interface WarningModalProps {
  warningTitle: string;
  warningDescription: string;
  children?: ReactNode;
}
export default function WarningModal({
  warningTitle,
  warningDescription,
  children,
}: WarningModalProps) {
  return (
    <ModalContainer
      gap={10}
      title={warningTitle}
      controls={<div className="warning-controls">{children}</div>}
    >
      <span className="warning-description">{warningDescription}</span>
    </ModalContainer>
  );
}
