import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Header from '@components/header';
import Input from '@components/inputs/input';
import './style/index.scss';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
interface JoinNewClinicModalProps {}
export default function JoinNewClinicModal({}: JoinNewClinicModalProps) {
  return (
    <div className="join-new-clinic-modal">
      <Header title="Join a new clinic" buttonNode={<SquareIconButton />} />
      <Input
        leading={<Key />}
        type="text"
        hint="The invite key should be provided by a clinic member"
      />
      <TextButton
        text="Validate"
        backgroundColor={color.cold_blue}
        fontSize={13}
        fontWeight={700}
        alignSelf="center"
        padding={5}
      />
    </div>
  );
}
