import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import { FunctionComponent, ReactNode, SVGProps } from 'react';
import './style/index.scss';
interface ThemePreferenceItemProps {
  Preview: FunctionComponent<SVGProps<SVGSVGElement>>;
  input: ReactNode;
  negaBackground: string;
}
export default function ThemePreferenceItem({
  Preview,
  negaBackground,
  input,
}: ThemePreferenceItemProps) {
  return (
    <div className="theme-preference-item" css={{ background: negaBackground }}>
      <Preview width={160} height={100} />
      <BorderSeparator direction="horizontal" color={color.silver_gray} />
      {input}
    </div>
  );
}
