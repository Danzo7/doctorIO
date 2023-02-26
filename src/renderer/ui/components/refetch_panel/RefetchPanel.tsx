import VerticalPanel from '@components/vertical_panel';
import RandomSvgFaces from 'toSvg/randomSvgFaces.svg?icon';
interface RefetchPanelProps {
  action: () => void;
}
export default function RefetchPanel({ action }: RefetchPanelProps) {
  return (
    <VerticalPanel
      title="Oops"
      description="Something went wrong."
      action={{
        text: 'Try again',
        onClick: action,
      }}
      Icon={<RandomSvgFaces height={100} width={100} />}
    />
  );
}
