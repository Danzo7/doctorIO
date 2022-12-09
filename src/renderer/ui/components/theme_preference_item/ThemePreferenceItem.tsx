import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import { FunctionComponent, SVGProps } from 'react';
import './style/index.scss';
interface ThemePreferenceItemProps {
  label?: string;
  Preview: FunctionComponent<SVGProps<SVGSVGElement>>;
  checked: boolean;
  onSelect: () => void;
}
export default function ThemePreferenceItem({
  label,
  Preview,
  checked,
  onSelect,
}: ThemePreferenceItemProps) {
  return (
    <div
      className="theme-preference-item"
      onClick={onSelect}
      css={{ backgroundColor: checked ? color.good_black : color.border_color }}
    >
      <Preview width={160} height={100} />
      <BorderSeparator direction="horizontal" color={color.silver_gray} />
      <div className="rounded-checkbox">
        <div className="rounded-div">
          <div
            css={{
              backgroundColor: checked ? color.good_green : color.silver_gray,
            }}
          ></div>
        </div>
        <span>{label}</span>
      </div>
    </div>
  );
}
