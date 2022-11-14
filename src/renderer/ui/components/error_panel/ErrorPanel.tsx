import VerticalPanel from '@components/vertical_panel';
import RandomSvgFaces from 'toSvg/randomSvgFaces.svg?icon';
import './style/index.scss';
interface ErrorPanelProps {
  iconSize?: number;
}
export default function ErrorPanel({ iconSize }: ErrorPanelProps) {
  return (
    <VerticalPanel
      title="Oops"
      description="Something went wrong."
      action={{ text: 'Refresh the page', onClick: () => {} }}
      Icon={<RandomSvgFaces height={iconSize} width={iconSize} />}
    />
  );
}
