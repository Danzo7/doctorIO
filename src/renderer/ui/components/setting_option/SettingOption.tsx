import ToggleButton from '@components/buttons/toggle_button';
import Header from '@components/header';
import { ReactNode } from 'react';
import './style/index.scss';
import { color } from '@assets/styles/color';
interface SettingOptionProps {
  title:
    | string
    | {
        text: string;
        fontSize?: number;
        fontColor?: string;
        fontWeight?: string | number;
      };
  description:
    | string
    | {
        text: string;
        fontSize?: number;
        fontColor?: string;
        fontWeight?: string | number;
      };
  gap?: number;
  controls?: ReactNode;
  flexDirection?: 'column' | 'row';
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
  flexDirection = 'column',
  gap = 10,
}: SettingOptionProps) {
  return (
    <div className="setting-option" css={{ gap: gap }}>
      <Header
        title={title}
        padding={0}
        flexGrow={1}
        buttonNode={
          useToggleButton && (
            <ToggleButton
              isChecked={useToggleButton.isChecked}
              onChange={useToggleButton.onChange}
            />
          )
        }
      />
      <div
        className="setting-option-content"
        css={{
          flexDirection: flexDirection,
          alignItems: flexDirection == 'column' ? 'flex-start' : 'center',
          gap: flexDirection == 'column' ? 5 : undefined,
          justifyContent: flexDirection == 'row' ? 'space-between' : undefined,
        }}
      >
        {description && (
          <span
            css={{
              fontSize:
                typeof description != 'string' ? description.fontSize : 13,
              color:
                typeof description != 'string'
                  ? description.fontColor
                  : color.silver_gray,
              fontWeight:
                typeof description != 'string' ? description.fontWeight : 600,
            }}
          >
            {typeof description == 'string' ? description : description.text}
          </span>
        )}
        {controls}
      </div>
    </div>
  );
}
