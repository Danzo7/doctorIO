import './style/index.scss';
interface BackdropProps {
  children: React.ReactNode;
  backdropItems?: React.ReactNode;
  when?: boolean | 'blur';
  filter?: string;
}
export default function Backdrop({
  children,
  backdropItems,
  when,
  filter = 'blur(4px) brightness(0.5)',
}: BackdropProps) {
  return (
    <div
      className="backdrop-container"
      css={{
        '>.backdrop': {
          display: when == 'blur' ? 'none' : 'flex',
          '+div': {
            filter: when == true ? filter : undefined,
          },
        },
        '&:hover >.backdrop': {
          display: when == 'blur' ? 'flex' : undefined,
          '+div': {
            filter: when ? filter : undefined,
          },
        },
      }}
    >
      {when && <div className="backdrop">{backdropItems}</div>}
      {children}
    </div>
  );
}
