import ModalContainer from '@components/modal_container';
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
    <ModalContainer
      gap={10}
      title="Add a Patient to appointment queue"
      controls={<RecentAppsItem fullName={fullName} age={age} />}
    ></ModalContainer>
  );
}
