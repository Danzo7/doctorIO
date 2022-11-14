import VerticalPanel from '@components/vertical_panel';
import LogOut from 'toSvg/logOut.svg?icon';
import randomSvgFaces from 'toSvg/randomSvgFaces.svg?icon';
import './style/index.scss';
interface ErrorPanelProps {}
export default function ErrorPanel({}: ErrorPanelProps) {
  return (
    <VerticalPanel
      title="Oops"
      description="Something went wrong."
      action={{ text: 'Refresh the page', onClick: () => {} }}
      IconBtn={LogOut}
      Icon={randomSvgFaces}
      iconSize={100}
    />
  );
}
