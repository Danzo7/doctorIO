import IconicButton from '@components/buttons/iconic_button';
import TextButton from '@components/buttons/text_button';
import './style/index.scss';
import Print from 'toSvg/print.svg?icon';
import { color } from '@assets/styles/color';
import { useConfirmPaymentMutation } from '@redux/instance/Appointment/AppointmentApi';

interface PaymentItemProps {
  patientFullName: string;
  amount: number;
  appointmentId: number;
}
export default function PaymentItem({
  patientFullName,
  appointmentId,
  amount,
}: PaymentItemProps) {
  const [ConfirmPayment] = useConfirmPaymentMutation();
  return (
    <div className="payment-item">
      <span>{patientFullName}</span>
      <span>{amount}</span>
      <div className="payment-controls">
        <IconicButton
          Icon={Print}
          iconType="fill"
          iconColor={color.text_gray}
          iconAfterColor={color.white}
          borderColor={color.border_color}
          afterBgColor={color.cold_blue}
          radius={7}
          iconSize={15}
          width={30}
        />
        <TextButton
          text="Confirm"
          fontSize={13}
          fontColor={color.text_gray}
          afterFontColor={color.white}
          fontWeight={700}
          borderColor={color.border_color}
          afterBgColor={color.good_green}
          padding=" 5px 10px"
          onPress={() => {
            ConfirmPayment(appointmentId);
          }}
        />
      </div>
    </div>
  );
}
