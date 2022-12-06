import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import { DATE_ONLY } from '@constants/data_format';
import { format } from 'date-fns';
import './style/index.scss';
interface SessionPreviewItemProps {
  bookedBy: string;
  bookedIn: Date;
  treatedBy?: string;
  treatedIn?: Date;
  subject?: string;
}
export default function SessionPreviewItem({
  bookedBy,
  treatedBy,
  bookedIn,
  treatedIn,
  subject,
}: SessionPreviewItemProps) {
  return (
    <div className="session-preview-item">
      <TextPair
        gap={2}
        first={{
          text: 'Booked by',
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
      {treatedBy && (
        <TextPair
          gap={2}
          first={{
            text: 'Treated by',
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
      )}

      <TextPair
        gap={2}
        first={{
          text: 'Booked in',
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
      {treatedIn && (
        <TextPair
          gap={2}
          first={{
            text: 'Treated in',
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
      <BorderSeparator direction="vertical" />
      {subject && (
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
      )}
    </div>
  );
}
