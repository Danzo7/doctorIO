import IconicButton from '@components/buttons/iconic_button';
import TextButton from '@components/buttons/text_button';
import './style/index.scss';
import Print from 'toSvg/print.svg?icon';
import { color } from '@assets/styles/color';

interface PaymentItemProps {
  patientFullName: string;
  paymentAmount: string;
}
export default function PaymentItem({
  patientFullName,
  paymentAmount,
}: PaymentItemProps) {
  return (
    <div className="payment-item">
      <span>{patientFullName}</span>
      <span>{paymentAmount}</span>
      <div className="payment-controls">
        <IconicButton
          Icon={Print}
          backgroundColor={color.cold_blue}
          radius={7}
          iconSize={15}
          width={30}
        />
        <TextButton
          text="Confirm"
          fontSize={14}
          fontColor={color.white}
          fontWeight={700}
          backgroundColor={color.good_green}
          padding=" 5px 10px"
        />
      </div>
    </div>
  );
}
