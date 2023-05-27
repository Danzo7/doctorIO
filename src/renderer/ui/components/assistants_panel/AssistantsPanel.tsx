import './style/index.scss';
import { useRef } from 'react';
import PreviewList from '@components/preview_list';
import AssistantItem from '@components/assistant_item';

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
    <PreviewList title="Assistants" noBorder maxHeight={300}>
      <AssistantItem id={1} name="John Doe" status={true} />
      <AssistantItem id={1} name="John Doe" status={true} />
      <AssistantItem id={1} name="John Doe" status={true} />
      <AssistantItem id={1} name="John Doe" status={true} />
      <AssistantItem id={1} name="John Doe" status={true} />
      <AssistantItem id={1} name="John Doe" status={true} />
      <AssistantItem id={1} name="John Doe" status={true} />
      <AssistantItem id={1} name="John Doe" status={true} />
    </PreviewList>
  );
}
