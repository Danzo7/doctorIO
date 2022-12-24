import Input from '@components/inputs/input';
import './style/index.scss';
import { useForm } from 'react-hook-form';
import EyePassword from '@components/buttons/eye_password';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TrashCan from 'toSvg/trash_can.svg?icon';

interface EditVitalsFieldsItemProps {
  onChangeDisplay: () => void;
  onDeleteField?: () => void;
  display: boolean;
}
export default function EditVitalsFieldsItem({
  onDeleteField,
  onChangeDisplay,
  display,
}: EditVitalsFieldsItemProps) {
  const { control } = useForm();

  return (
    <div className="edit-vitals-fields-item">
      <Input
        type="text"
        name={'name'}
        control={control}

        // defaultValue={defaults[field.name].toString()}
      />
      <Input
        type="text"
        name={'name'}
        control={control}
        // defaultValue={defaults[field.name].toString()}
      />
      <EyePassword onPress={onChangeDisplay} value={display} />
      <SquareIconButton
        Icon={TrashCan}
        tip="Delete field"
        onPress={onDeleteField}
        iconSize={18}
      />
    </div>
  );
}
