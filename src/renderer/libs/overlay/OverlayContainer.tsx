import './style/index.scss';

import { Portal } from './Portal';
import { useRouteChange } from '@libs/routeChange';
import tooltip, { useTooltipItems } from './stores/tooltips';
import { useAlt } from './stores/alt';
import modal, { useModalNode } from './stores/modal';
import portal from './stores/portal';
import ToastContainer from './toast_container';

function TooltipContainer() {
  const items = useTooltipItems();
  return (
    <>
      {items.length > 0 && (
        <div className="overlay-container">
          {items.map((item) => (
            <div key={item.id}>{item.node}</div>
          ))}
        </div>
      )}
    </>
  );
}

function AltContainer() {
  const alt = useAlt();

  return (
    <>
      {alt && (
        <Portal
          popperTarget={alt.popperTarget}
          clickThrough
          closeOnClickOutside
          closeOnBlur
          backdropColor={false}
          clickable={false}
          autoFocus={false}
          overall
        >
          <div
            css={{
              padding: 5,
              background: 'black',
              borderRadius: 5,
              pointerEvents: 'none',
            }}
            className={'alt-content-' + alt.id}
          >
            {alt.alt}
          </div>
        </Portal>
      )}
    </>
  );
}
function ModalContainer() {
  const nodes = useModalNode();
  return (
    <>
      {nodes?.map(({ node, id, hidden: hide }) => (
        <div
          css={hide ? { display: 'none' } : undefined}
          className="overlay-container"
          key={id}
        >
          <div>{node}</div>
        </div>
      ))}
    </>
  );
}
function PortalContainer() {
  return (
    <div
      className="overlay-container"
      ref={(e) => {
        if (e) portal(e);
      }}
    />
  );
}
export function OverlayContainer() {
  useRouteChange({
    onChange: () => {
      modal.clear();
      tooltip.clear();
    },
    key: 'overlay',
  });

  return (
    <>
      <AltContainer />
      <ModalContainer />
      <ToastContainer />
      <TooltipContainer />
      <PortalContainer />
    </>
  );
}
