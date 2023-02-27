import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import IconicButton from '@components/buttons/iconic_button';
import DateSpan from '@components/date_span';
import Header from '@components/header';
import { SETTINGS } from '@stores/appSettingsStore';

import { format } from 'date-fns';
import './style/index.scss';
import Edit from 'toSvg/pencil.svg?icon';
import { modal } from '@stores/overlayStore';
import EditNoteModal from '@containers/modals/edit_note_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
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
          <DarkLightCornerButton text="All notes" onPress={() => {}} />
        }
      />

      <div className="note-value-div">
        <span>{note}</span>
      </div>
      <Header
        leftComponent={<DateSpan value={format(date, SETTINGS.dateFormat)} />}
        buttonNode={
          <IconicButton
            tip="Edit"
            onPress={() => {
              modal(
                <EditNoteModal defaultValue={note} />,
                DEFAULT_MODAL,
              ).open();
            }}
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
