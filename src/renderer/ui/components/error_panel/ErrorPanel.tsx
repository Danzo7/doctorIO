import VerticalPanel from '@components/vertical_panel';
import RandomSvgFaces from 'toSvg/randomSvgFaces.svg?icon';
import './style/index.scss';
interface ErrorPanelProps {}
export default function ErrorPanel({}: ErrorPanelProps) {
  return (
    <VerticalPanel
      title="Oops"
      description="Something went wrong."
      action={{
        text: 'Refresh the page',
        onClick: () => {
          window.location.reload();
        },
      }}
      Icon={<RandomSvgFaces height={100} width={100} />}
    />
  );
}
