import { color } from '@assets/styles/color';
import IconicButton from '@components/buttons/iconic_button';
import DateSpan from '@components/date_span';
import Header from '@components/header';
import { SETTINGS } from '@stores/appSettingsStore';

import { format } from 'date-fns';
import Edit from 'toSvg/pencil.svg?icon';
import './style/index.scss';
interface NoteItemProps {
  date: Date;
  note: string;
}
//TODO: remove or use
export default function NoteItem({ date, note }: NoteItemProps) {
  return (
    <div className="note-item">
      <Header
        leftComponent={<DateSpan value={format(date, SETTINGS.dateFormat)} />}
        buttonNode={
          <IconicButton
            tip="Edit"
            blank
            width={25}
            radius={7}
            backgroundColor={color.cold_blue}
            Icon={<Edit width={10} height={10} />}
          />
        }
        padding={0}
      />
      <div className="note-value-div">
        <span>{note}</span>
      </div>
    </div>
  );
}
