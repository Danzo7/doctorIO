import ModalContainer from '@components/modal_container';
import RecentAppsItem from '@components/recent_apps_item';
import { PatientBrief } from '@models/instance.model';
import './style/index.scss';

export default function AddSelectedToQueueModal({ name, id }: PatientBrief) {
  return (
    <ModalContainer
      gap={10}
      title="Add a Patient to appointment queue"
      controls={<RecentAppsItem id={id} name={name} />}
    ></ModalContainer>
  );
}
