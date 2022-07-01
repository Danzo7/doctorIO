import ModalContainer from '@components/modal_container';
import RecentAppsItem from '@components/recent_apps_item';
import { Patient } from '@models/instance.model';
import './style/index.scss';

export default function AddSelectedToQueueModal({
  firstName,
  lastName,
  patId,
}: Pick<Patient, 'firstName' | 'lastName' | 'patId'>) {
  return (
    <ModalContainer
      gap={10}
      title="Add a Patient to appointment queue"
      controls={
        <RecentAppsItem
          firstName={firstName}
          lastName={lastName}
          patId={patId}
        />
      }
    ></ModalContainer>
  );
}
