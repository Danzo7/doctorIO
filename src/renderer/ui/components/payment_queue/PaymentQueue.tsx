import TextButton from '@components/buttons/text_button';
import ScrollView from '@components/scroll_view';
import Arrow from 'toSvg/arrow.svg?icon';
import colors from '@assets/styles/color';
import './style/index.scss';
import SmallInfoCard from '@components/small_info_card';
import { useScroller } from '@libs/hooks/useScroller';
import PaymentItem from '@components/payment_item';

const smallInfoCardData = {
  'In queue': '30',
  unpaid: '10',
  urgent: '2',
};
const items = [
  {
    patientFullName: 'Daouadji Aymen',
    paymentAmount: '9000 Da',
  },
  {
    patientFullName: 'Daouadji Aymen',
    paymentAmount: '9000 Da',
  },
  {
    patientFullName: 'Daouadji Aymen',
    paymentAmount: '9000 Da',
  },
  {
    patientFullName: 'Daouadji Aymen',
    paymentAmount: '9000 Da',
  },
  {
    patientFullName: 'Daouadji Aymen',
    paymentAmount: '9000 Da',
  },
  {
    patientFullName: 'Daouadji Aymen',
    paymentAmount: '9000 Da',
  },
  {
    patientFullName: 'Daouadji Aymen',
    paymentAmount: '9000 Da',
  },
  {
    patientFullName: 'Daouadji Aymen',
    paymentAmount: '9000 Da',
  },
];

interface PaymentQueueProps {}
export default function PaymentQueue({}: PaymentQueueProps) {
  const { ref, gotoFirst, gotoLast, next, previous } = useScroller(10);
  return (
    <div className="payment-queue">
      <div className="payment-queue-content">
        <SmallInfoCard data={smallInfoCardData} />
        <div className="payment-queue-sep" />
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
          {items.length > 0 ? (
            <ScrollView refs={ref} gap={10}>
              {items.map(({ patientFullName, paymentAmount }, index) => (
                <li key={patientFullName + index}>
                  <PaymentItem
                    patientFullName={patientFullName}
                    paymentAmount={paymentAmount}
                  />
                </li>
              ))}
            </ScrollView>
          ) : (
            <span>nothing...</span>
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
