import color from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { ChangeEvent, useState } from 'react';
import './style/index.scss';
interface NoticeTabProps {}
export default function NoticeTab({}: NoticeTabProps) {
  const [textAreaValue, setTextAreaValue] = useState('');
  return (
    <div className="notice-tab">
      <div className="textarea-container">
        <textarea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            console.log(e.target.value);
            setTextAreaValue(e.target.value);
          }}
          placeholder="write something..."
        ></textarea>
        {textAreaValue.length > 0 && (
          <div className="save-btn-wrapper">
            <TextButton
              text="Save"
              backgroundColor={color.secondary_color}
              fontSize={14}
              fontWeight={600}
              padding="5px 15px"
            />
          </div>
        )}
      </div>
    </div>
  );
}
