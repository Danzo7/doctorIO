import './style/index.scss';
import EyePassword from '@components/buttons/eye_password';
import TextPair from '@components/text_pair/TextPair';
import { color } from '@assets/styles/color';
import IconicButton from '@components/buttons/iconic_button';
import Edit from 'toSvg/pencil.svg?icon';
interface VitalFieldItemProps {
  onChangeDisplay: () => void;
  display?: boolean;
  name: string;
  unit: string;
  onEdit?: () => void;
}
export default function VitalFieldItem({
  name,
  unit,
  onEdit,
  onChangeDisplay,
  display = false,
}: VitalFieldItemProps) {
  return (
    <div className="vital-field-item">
      <div className="vitals-info-div">
        <TextPair
          flexDirection="row"
          alignItems="center"
          first={{
            text: 'Name:',
            fontSize: 14,
            fontWeight: 400,
            fontColor: color.text_gray,
          }}
          second={{
            text: name,
            fontSize: 15,
            fontWeight: 500,
            fontColor: color.white,
          }}
        />
        <TextPair
          flexDirection="row"
          alignItems="center"
          first={{
            text: 'Unit:',
            fontSize: 14,
            fontWeight: 400,
            fontColor: color.text_gray,
          }}
          second={{
            text: unit,
            fontSize: 15,
            fontWeight: 500,
            fontColor: color.white,
          }}
        />
      </div>
      <div className="vitals-controls">
        <EyePassword onPress={onChangeDisplay} value={display} />
        <IconicButton
          tip="Edit"
          onPress={onEdit}
          blank
          width={25}
          radius={7}
          afterBgColor={color.cold_blue}
          Icon={<Edit width={12} height={12} />}
        />
      </div>
    </div>
  );
}
