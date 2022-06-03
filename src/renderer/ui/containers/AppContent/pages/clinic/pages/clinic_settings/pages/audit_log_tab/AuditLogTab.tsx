import './style/index.scss';
import color from '@assets/styles/color';
import SortButton from '@components/buttons/sort_button';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import PreviewList from '@components/preview_list';
import LogItem from '@components/log_item';

const logsData = [
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
  {
    actionDispatcher: 'Aymen Daouadji',
    id: '123456789',
    logTime: '22 Jan at 23:00',
    actionName: 'Add a member',
    actionTo: 'Professor#12346566',
  },
];

interface AuditLogTabProps {}
export default function AuditLogTab({}: AuditLogTabProps) {
  return (
    <div className="audit-log-tab">
      <PreviewList
        maxHeight={700}
        title="Logs"
        noBorder
        buttonNode={
          <div
            css={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'baseline',
            }}
          >
            <SortButton title="Actions" />
            <SortButton title="Members" />
          </div>
        }
      >
        {logsData.map(
          ({ actionDispatcher, id, logTime, actionName, actionTo }, index) => (
            <LogItem
              key={index}
              actionDispatcher={actionDispatcher}
              id={id}
              logTime={logTime}
              actionName={actionName}
              actionTo={actionTo}
            />
          ),
        )}
      </PreviewList>
    </div>
  );
}
