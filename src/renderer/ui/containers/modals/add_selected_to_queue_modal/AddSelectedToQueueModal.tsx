import ModalContainer from '@components/modal_container';
import RecentAppsItem from '@components/recent_apps_item';
import './style/index.scss';
interface AddSelectedToQueueModalProps {
  fullName: string;
  id: number;
}
export default function AddSelectedToQueueModal({
  fullName,
  id,
}: AddSelectedToQueueModalProps) {
  return (
    <ModalContainer
      gap={10}
      title="Add a Patient to appointment queue"
      controls={<RecentAppsItem fullName={fullName} id={id} />}
    ></ModalContainer>
  );
}
