import ModalContainer from '@components/modal_container';
import RecentAppsItem from '@components/recent_apps_item';
import { PatientBrief } from '@models/instance.model';
import './style/index.scss';
interface AddSelectedToQueueModalProps {
  appointmentId?: number;
}
export default function AddSelectedToQueueModal({
  name,
  id,
  appointmentId,
}: PatientBrief & AddSelectedToQueueModalProps) {
  return (
    <ModalContainer
      gap={10}
      title="Add a Patient to appointment queue"
      controls={
        <RecentAppsItem id={id} name={name} appointmentId={appointmentId} />
      }
    ></ModalContainer>
  );
}
