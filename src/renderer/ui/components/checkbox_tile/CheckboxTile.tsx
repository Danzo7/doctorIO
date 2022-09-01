import ToggleButton from '@components/buttons/toggle_button';
import './style/index.scss';
interface CheckboxTileProps {
  editable?: boolean;
  primaryText: string;
  secondaryText?: string;
  isChecked?: boolean;
}
export default function CheckboxTile({
  editable = true,
  primaryText,
  secondaryText,
  isChecked,
}: CheckboxTileProps) {
  return (
    <div
      className="checkbox-tile"
      css={editable ? null : { opacity: 0.3, cursor: 'not-allowed' }}
    >
      <div className="checkbox-tile-text-container">
        <span>{primaryText}</span>
        {secondaryText && <span>{secondaryText}</span>}
      </div>
      <div>
        <ToggleButton disabled={!editable} isChecked={isChecked} />
      </div>
    </div>
  );
}
