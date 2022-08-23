import UserRegister from '@containers/modals/user_regisiter';
import { DEFAULT_MODAL } from '@libs/overlay';
import { ModalPortal } from '@libs/overlay/OverlayContainer';
import './style/index.scss';
interface RegisterProps {}
export default function Register({}: RegisterProps) {
  return (
    <div className="register">
      <ModalPortal onClose={() => {}} {...DEFAULT_MODAL}>
        <UserRegister />
      </ModalPortal>
    </div>
  );
}
