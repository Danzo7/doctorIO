import NotAButton from '@components/not_a_button';
import './style/index.scss';
import Question from 'toSvg/question_mark.svg?icon';
import { color } from '@assets/styles/color';

interface HelpPanelProps {
  title: string;
  description: string;
  textList?: string[];
}
export default function HelpPanel({
  title,
  description,
  textList,
}: HelpPanelProps) {
  return (
    <div className="help-panel">
      <div className="help-panel-header">
        <span>{title}</span>
        <NotAButton
          Icon={<Question width={15} height={15} />}
          backgroundColor={color.darker}
          radius="100%"
          padding={8}
        />
      </div>
      <div className="help-panel-content">
        <span>{description}</span>
        {textList && (
          <ul>
            {textList.map((text, index) => (
              <li key={index}>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
