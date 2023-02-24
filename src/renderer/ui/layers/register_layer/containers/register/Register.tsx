import UserRegister from '@containers/modals/user_regisiter';
import { DEFAULT_MODAL, Portal } from '@libs/overlay';
import './style/index.scss';
interface RegisterProps {}
export default function Register({}: RegisterProps) {
  return (
    <div className="register">
      <Portal onClose={() => {}} {...DEFAULT_MODAL} overall>
        <UserRegister />
      </Portal>
    </div>
  );
}
