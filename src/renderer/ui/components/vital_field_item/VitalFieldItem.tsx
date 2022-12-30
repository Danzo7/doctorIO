import './style/index.scss';
import EyePassword from '@components/buttons/eye_password';
import TextPair from '@components/text_pair/TextPair';
import { color } from '@assets/styles/color';
import TrashCan from 'toSvg/trash_can.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import { useDeleteFieldMutation } from '@redux/clinic/clinicApi';
import { sentenceCase } from '@shipengine/capitalization';
interface VitalFieldItemProps {
  onChangeDisplay: () => void;
  display?: boolean;
  name: string;
  unit: string;
}
export default function VitalFieldItem({
  name,
  unit,

  onChangeDisplay,
  display = false,
}: VitalFieldItemProps) {
  const [deleteField, res] = useDeleteFieldMutation();
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
            text: sentenceCase(name),
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
        <SquareIconButton
          disabled={res.isLoading}
          Icon={TrashCan}
          iconSize={15}
          tip="Delete field"
          onPress={() => {
            deleteField(name);
          }}
        />
      </div>
    </div>
  );
}
