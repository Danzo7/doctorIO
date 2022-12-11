import './style/index.scss';
interface RadioProps {
  label: string;
  group: string;
  isChecked?: boolean;
  onChanged?: () => void;
  disabled?: boolean;
}
export default function Radio({
  label,
  group,
  isChecked,
  onChanged,
  disabled,
}: RadioProps) {
  return (
    <div className="radio-input">
      <input
        type="radio"
        name={group}
        id={'radio-' + label}
        defaultChecked={isChecked}
        onChange={onChanged}
        disabled={disabled}
      />
      <label htmlFor={'radio-' + label}>{label}</label>
    </div>
  );
}
