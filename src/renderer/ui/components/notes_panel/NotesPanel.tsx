import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import IconicButton from '@components/buttons/iconic_button';
import DateSpan from '@components/date_span';
import Header from '@components/header';
import { DATE_ONLY } from '@constants/data_format';
import { format } from 'date-fns';
import './style/index.scss';
import Edit from 'toSvg/pencil.svg?icon';
interface NotesPanelProps {
  date: Date;
  note: string;
}
export default function NotesPanel({ date, note }: NotesPanelProps) {
  return (
    <div className="notes-panel">
      <Header
        title="Notes"
        buttonNode={
          <DarkLightCornerButton text="All notes" blend onPress={() => {}} />
        }
      />

      <div className="note-value-div">
        <span>{note}</span>
      </div>
      <Header
        leftComponent={<DateSpan value={format(date, DATE_ONLY)} />}
        buttonNode={
          <IconicButton
            tip="Edit"
            onPress={() => {}}
            blank
            width={25}
            radius={7}
            backgroundColor={color.cold_blue}
            Icon={<Edit width={10} height={10} />}
          />
        }
        padding={0}
      />
    </div>
  );
}
