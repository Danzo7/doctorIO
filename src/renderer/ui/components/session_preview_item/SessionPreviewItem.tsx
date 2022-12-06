import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import { DATE_ONLY } from '@constants/data_format';
import { format } from 'date-fns';
import './style/index.scss';
interface SessionPreviewItemProps {
  bookedBy?: string;
  treatedBy?: string;
  bookedIn?: Date;
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
          text: bookedBy ?? 'Unknown',
          fontSize: 15,
          fontWeight: 600,
          fontColor: color.white,
        }}
      />
      <BorderSeparator direction="vertical" />
      <TextPair
        gap={2}
        first={{
          text: 'Treated by',
          fontSize: 12,
          fontWeight: 600,
          fontColor: color.text_gray,
        }}
        second={{
          text: treatedBy ?? 'Unknown',
          fontSize: 15,
          fontWeight: 600,
          fontColor: color.white,
        }}
      />

      <TextPair
        gap={2}
        first={{
          text: 'Booked in',
          fontSize: 12,
          fontWeight: 600,
          fontColor: color.text_gray,
        }}
        second={{
          text: format(bookedIn ?? new Date(), DATE_ONLY),
          fontSize: 15,
          fontWeight: 600,
          fontColor: color.white,
        }}
      />
      <BorderSeparator direction="vertical" />
      <TextPair
        gap={2}
        first={{
          text: 'Treated in',
          fontSize: 12,
          fontWeight: 600,
          fontColor: color.text_gray,
        }}
        second={{
          text: format(treatedIn ?? new Date(), DATE_ONLY),
          fontSize: 15,
          fontWeight: 600,
          fontColor: color.white,
        }}
      />
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
          text: subject && subject.length > 0 ? subject : 'Unknown',
          fontSize: 15,
          fontWeight: 600,
          fontColor: color.white,
        }}
      />
    </div>
  );
}
