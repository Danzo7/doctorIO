import TextButton from '@components/buttons/text_button';
import ScrollView from '@components/scroll_view';
import Arrow from 'toSvg/arrow.svg?icon';
import colors from '@assets/styles/color';
import './style/index.scss';
import SmallInfoCard from '@components/small_info_card';
import { useScroller } from '@libs/hooks/useScroller';
import PaymentItem from '@components/payment_item';
import { useGetPaymentsQuery } from '@redux/instance/Appointment/AppointmentApi';
import LoadingSpinner from '@components/loading_spinner';
import BorderSeparator from '@components/border_separator';

interface PaymentQueueProps {}
export default function PaymentQueue({}: PaymentQueueProps) {
  const { ref, gotoFirst, gotoLast, next, previous } = useScroller(10);
  const { data, isSuccess, isLoading, error } = useGetPaymentsQuery();
  const smallInfoCardData = {
    'In queue': (isSuccess && data.length > 0 ? data.length : 0).toString(),
    unpaid: '0', //TODO add unpaid value
  };
  return (
    <div className="payment-queue">
      <div className="payment-queue-content">
        <SmallInfoCard data={smallInfoCardData} />
        <BorderSeparator direction="vertical" />
        <div className="payment-queue-list">
          <TextButton
            borderColor={colors.border_color}
            padding="30px 10px"
            afterBgColor={colors.darkersec_color}
            onPress={previous}
            onHold={gotoFirst}
          >
            <Arrow css={{ transform: 'rotate(90deg)' }} />
          </TextButton>
          {isLoading ? (
            <LoadingSpinner />
          ) : isSuccess && data.length > 0 ? (
            <ScrollView refs={ref} gap={10}>
              {data.map(({ appointmentId, amount, name, date }, index) => (
                <li key={appointmentId + index}>
                  <PaymentItem patientFullName={name} amount={amount} />
                </li>
              ))}
            </ScrollView>
          ) : (
            <div className="nothing-div">
              <span>nothing...</span>
            </div>
          )}
          <TextButton
            borderColor={colors.border_color}
            padding="30px 10px"
            afterBgColor={colors.darkersec_color}
            onPress={next}
            onHold={gotoLast}
          >
            <Arrow css={{ transform: 'rotate(-90deg)' }} />
          </TextButton>
        </div>
      </div>
    </div>
  );
}
