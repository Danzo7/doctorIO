import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import TextButton from '@components/buttons/text_button';
import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import Datepicker from '@components/inputs/datepicker';
import Input from '@components/inputs/input';
import MultipleCheckGroup from '@components/inputs/multiple_check_group';
import EndSession from '@containers/modals/end_session';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useState } from 'react';
import './style/index.scss';
interface SessionParameterProps {}
export default function SessionParameter({}: SessionParameterProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { open, openTooltip } = useOverlay();
  const openEndSessionModal = () => {
    open(<EndSession />, {
      closeOnClickOutside: true,
      isDimmed: true,
      clickThrough: false,
      position: { top: '30%' },
      width: '30%',
      closeBtn: 'inner',
    });
  };
  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <div className="session-parameter">
      <Header
        title="Book an appointment"
        buttonNode={<ToggleButton isChecked={true} />}
      />

      <Datepicker selected={selectedDate} onChange={onDateChange} />

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
      <Input type={'checkbox'} label="hand payment to assistant" />
      <div className="bottom-div">
        <div className="controls-div">
          <DarkLightCornerButton
            text="Print..."
            onPress={(e) => {
              if (e)
                openTooltip(
                  [
                    {
                      text: 'Notice',
                    },
                    {
                      text: 'Prescription',
                    },
                    {
                      text: 'Both',
                    },
                  ],
                  e?.currentTarget,
                  true,
                );
            }}
          />
          <TextButton
            text="Finish"
            backgroundColor={color.good_green}
            width={170}
            onPress={openEndSessionModal}
          />
        </div>
      </div>
    </div>
  );
}
