import './style/index.scss';
interface ToggleselectedItemProps {
  text: string;
  separatorDirection: string;
}
function ToggleselectedItem({
  text,
  separatorDirection,
}: ToggleselectedItemProps) {
  return (
    <div className="toggleselected-item">
      {separatorDirection == 'right' && (
        <>
          <div className="span-container">
            <span>{text}</span>
          </div>
          <div className="separator"></div>
        </>
      )}
      {separatorDirection == 'left' && (
        <>
          <div className="separator"></div>
          <div className="span-container">
            <span>{text}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default ToggleselectedItem;
