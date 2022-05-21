import './style/index.scss';
interface SmallInfoCardProps {
  data: { [key: string]: string };
}
export default function SmallInfoCard({ data = {} }: SmallInfoCardProps) {
  return (
    <div className="small-info-card">
      {Object.entries(data).map(([key, value]) => (
        <div className="small-info-row" key={key}>
          <span>{key} :</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}
