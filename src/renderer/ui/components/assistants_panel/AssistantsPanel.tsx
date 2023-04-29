import Header from '@components/header';
import './style/index.scss';
import { useRef } from 'react';
import ViewportList from 'react-viewport-list';
import AssistantItem from '@components/assistant_item';
import { MemberBrief } from '@models/server.models';

interface AssistantsPanelProps {}
export default function AssistantsPanel({}: AssistantsPanelProps) {
  // const {
  //   data: myMemberData,
  //   isLoading: myMemberIsloading,
  //   isSuccess: myMemberIsSuccess,
  // } = useGetMyMemberDetailQuery();
  // const { data, isLoading, isSuccess } = useGetMembersQuery(undefined, {
  //   skip: !myMemberIsSuccess,
  // });

  const ref = useRef(null);
  const listRef = useRef(null);
  //FETCH fetch assistants based on id of my roles
  return (
    <div className="assistants-panel">
      <Header title="Assistants" />
      <div className="members-list-container" ref={ref}>
        <ViewportList ref={listRef} viewportRef={ref}>
          {(member: MemberBrief, index) => (
            <AssistantItem id={1} name="John Doe" status={true} />
          )}
        </ViewportList>
      </div>
    </div>
  );
}
