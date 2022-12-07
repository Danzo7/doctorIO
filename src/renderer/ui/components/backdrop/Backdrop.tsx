import './style/index.scss';
interface BackdropProps {
  children: React.ReactNode;
  node?: React.ReactNode;
  when?: boolean | 'blur';
  filter?: string;
}
export default function Backdrop({
  children,
  node,
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
            filter: when == true ? filter + '!important' : undefined,
          },
        },
        '&:hover >.backdrop':
          when == 'blur'
            ? {
                display: 'flex',
                '+div': {
                  filter: filter,
                },
              }
            : undefined,
      }}
    >
      {when && <div className="backdrop">{node}</div>}
      {children}
    </div>
  );
}
