import color from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import TextButton from '@components/buttons/text_button';
import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import Datepicker from '@components/inputs/datepicker';
import Input from '@components/inputs/input';
import MultipleCheckGroup from '@components/inputs/multiple_check_group';
import { useState } from 'react';
import Checked from 'toSvg/good_mark.svg?icon';
import './style/index.scss';
interface PrescriptionTabProps {}
export default function PrescriptionTab({}: PrescriptionTabProps) {
  const [handPayment, setHandPayment] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <div className="prescription-tab">
      <Header
        title="Drug list"
        buttonNode={<DarkLightCornerButton title="Add..." />}
      />
      {/* table comp */}
      <Header
        title="Book an appointment"
        buttonNode={<ToggleButton isChecked={true} />}
      />

      <Datepicker
        selected={selectedDate}
        onChange={onDateChange}
        dateFormat="EEEE, dd MMM"
      />

      <div className="payment-container">
        <Header
          title="Payment"
          buttonNode={<ToggleButton isChecked={true} />}
        />
        <span>Earnings can be disables in clinic settings</span>
      </div>
      <div className="payment-input-container">
        <MultipleCheckGroup items={['none', '1000', '2000', '3000']} />
        <span>Custom :</span>
        <Input type={'number'} />
      </div>
      <div className="hand-payment-container">
        <TextButton
          onPress={() => {
            setHandPayment(!handPayment);
          }}
          padding={'5px'}
          backgroundColor={handPayment ? color.good_green : undefined}
          width={28}
          height={28}
          borderColor={!handPayment ? color.border_color : undefined}
          borderWidth={!handPayment ? 2 : undefined}
        >
          {handPayment ? <Checked width={16} height={16} /> : undefined}
        </TextButton>
        <span>Hand payment to assistant</span>
      </div>
      <div className="bottom-div">
        <div className="controls-div">
          <DarkLightCornerButton title="Print..." isActive={true} />
          <TextButton
            text="Finish"
            backgroundColor={color.good_green}
            width={170}
          />
        </div>
      </div>
    </div>
  );
}
