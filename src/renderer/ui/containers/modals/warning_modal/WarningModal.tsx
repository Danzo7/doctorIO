import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Header from '@components/header';
import { ReactNode } from 'react';
import './style/index.scss';
interface WarningModalProps {
  warningTitle: string;
  warningDescription: string;
  children: ReactNode;
}
export default function WarningModal({
  warningTitle,
  warningDescription,
  children,
}: WarningModalProps) {
  return (
    <div className="warning-modal">
      <Header title={warningTitle} buttonNode={<SquareIconButton />} />
      <span>{warningDescription}</span>
      <div className="warning-controls">{children}</div>
    </div>
  );
}
