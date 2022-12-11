import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import { ReactNode } from 'react';
import './style/index.scss';
interface SettingOptionProps {
  title: string;
  description: string;

  controls?: ReactNode;
  useToggleButton?: {
    isChecked?: boolean;
    onChange?: (isChecked: boolean) => void;
  };
}
export default function SettingOption({
  title,
  description,
  controls,
  useToggleButton,
}: SettingOptionProps) {
  return (
    <div className="setting-option">
      <Header
        title={title}
        padding={0}
        buttonNode={
          useToggleButton && (
            <ToggleButton
              isChecked={useToggleButton.isChecked}
              onChange={useToggleButton.onChange}
            />
          )
        }
      />
      <span className="description-span">{description}</span>
      {controls}
    </div>
  );
}