import './style/index.scss';
interface DateSpanProps {
  value: string;
}
export default function DateSpan({ value }: DateSpanProps) {
  return (
    <div className="date-span">
      <span>{value}</span>
    </div>
  );
}
