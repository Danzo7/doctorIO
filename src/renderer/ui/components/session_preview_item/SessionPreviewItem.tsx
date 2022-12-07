import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import { DATE_ONLY } from '@constants/data_format';
import { format } from 'date-fns';
import './style/index.scss';
interface SessionPreviewItemProps {
  bookedBy: string;
  bookedIn: Date;
  bookedFor?: Date;
  treatedBy?: string;
  treatedIn?: Date;
  subject?: string;
  state: {
    phase: 'done' | 'missed' | 'upcoming' | 'opened' | 'canceled' | 'in queue';
    isBooked: boolean;
  };
}
export default function SessionPreviewItem({
  bookedBy,
  treatedBy,
  bookedIn,
  treatedIn,
  subject,
  state,
  bookedFor,
}: SessionPreviewItemProps) {
  return (
    <div className="session-preview-item">
      {state.phase == 'upcoming' ||
      state.phase == 'in queue' ||
      state.phase == 'opened' ? (
        <>
          <TextPair
            gap={2}
            first={{
              text: 'Created by',
              fontSize: 12,
              fontWeight: 600,
              fontColor: color.text_gray,
            }}
            second={{
              text: bookedBy,
              fontSize: 15,
              fontWeight: 600,
              fontColor: color.white,
            }}
          />
          <BorderSeparator direction="vertical" />
          <TextPair
            gap={2}
            first={{
              text: 'Created in',
              fontSize: 12,
              fontWeight: 600,
              fontColor: color.text_gray,
            }}
            second={{
              text: format(bookedIn, DATE_ONLY),
              fontSize: 15,
              fontWeight: 600,
              fontColor: color.white,
            }}
          />
          <BorderSeparator direction="vertical" />
          {bookedFor && (
            <>
              <TextPair
                gap={2}
                first={{
                  text: 'Booked for',
                  fontSize: 12,
                  fontWeight: 600,
                  fontColor: color.text_gray,
                }}
                second={{
                  text: format(bookedFor, DATE_ONLY),
                  fontSize: 15,
                  fontWeight: 600,
                  fontColor: color.white,
                }}
              />
            </>
          )}
        </>
      ) : (
        <>
          {treatedBy && (
            <>
              <TextPair
                gap={2}
                first={{
                  text: state.phase == 'done' ? 'Treated by' : 'Canceled by',
                  fontSize: 12,
                  fontWeight: 600,
                  fontColor: color.text_gray,
                }}
                second={{
                  text: treatedBy,
                  fontSize: 15,
                  fontWeight: 600,
                  fontColor: color.white,
                }}
              />
              <BorderSeparator direction="vertical" />
            </>
          )}

          {treatedIn && (
            <TextPair
              gap={2}
              first={{
                text: state.phase == 'done' ? 'Treated in' : 'Canceled in',
                fontSize: 12,
                fontWeight: 600,
                fontColor: color.text_gray,
              }}
              second={{
                text: format(treatedIn, DATE_ONLY),
                fontSize: 15,
                fontWeight: 600,
                fontColor: color.white,
              }}
            />
          )}
        </>
      )}
      {subject && (
        <>
          <BorderSeparator direction="vertical" />
          <TextPair
            gap={2}
            first={{
              text: 'Subject',
              fontSize: 12,
              fontWeight: 600,
              fontColor: color.text_gray,
            }}
            second={{
              text: subject,
              fontSize: 15,
              fontWeight: 600,
              fontColor: color.white,
            }}
          />
        </>
      )}
    </div>
  );
}
