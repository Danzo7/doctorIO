import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Header from '@components/header';
import RecentAppsItem from '@components/recent_apps_item';
import './style/index.scss';
interface AddSelectedToQueueModalProps {
  fullName: string;
  age: number;
}
export default function AddSelectedToQueueModal({
  fullName,
  age,
}: AddSelectedToQueueModalProps) {
  return (
    <div className="add-selected-to-queue-modal">
      <Header buttonNode={<SquareIconButton />} />
      <span>Add a Patient to appointment queue</span>
      <RecentAppsItem fullName={fullName} age={age} />
    </div>
  );
}
