import { Overlay } from './overlay';

import { useCallback, useEffect, useRef, useState } from 'react';
import './style/index.scss';
import {
  getOverlayNode,
  Overlay_u,
  useAlt,
  useIsOpenModal,
  useOpenTooltipId,
} from '@stores/overlayStore';
import ToastContainer from '@libs/toast_container';
import { Portal } from './Portal';
import { useRouteChange } from '@libs/routeChange';
/**
 * @Deprecated This component is unstable and will be removed in the future
 */
export function OverlayContainer_u() {
  const [render, setrender] = useState<React.ReactPortal[]>([]);
  const update = useCallback(
    (state?: (portals: React.ReactPortal[]) => React.ReactPortal[]) => {
      if (state) setrender((old) => state(old));
      else setrender([]);
    },
    [],
  );
  const overlayRef = useRef(null);

  // useRouteChange(() => Overlay.close());

  const removePortal = useCallback((portal?: React.ReactPortal) => {
    if (portal) {
      //Temporary fix with "setTimeout" for dirty state when removing a portal while updating with usePrompt while updating a component
      setTimeout(
        () => setrender((old) => old.filter((item) => item !== portal)),
        0,
      );
    }
  }, []);
  useEffect(() => {
    if (overlayRef.current) Overlay.setRenderer(overlayRef.current);
    Overlay.update = update;
    Overlay.removePortal = removePortal;
  }, [update, removePortal]);

  return (
    <div className="overlay-container" ref={overlayRef}>
      {render}
    </div>
  );
}
function TooltipContainer() {
  const id = useOpenTooltipId();
  return (
    <>
      {id && (
        <div className="overlay-container">
          <div>{getOverlayNode(id)}</div>
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
              marginBottom: 5,
              marginTop: 5,
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
  const id = useIsOpenModal();
  return (
    <>
      {id && (
        <div className="overlay-container">
          <div>{getOverlayNode(id)}</div>
        </div>
      )}
    </>
  );
}
function PortalContainer() {
  return (
    <div
      className="overlay-container"
      ref={(e) => {
        if (e) Overlay_u.setPortalElement(e);
      }}
    />
  );
}
export function OverlayContainer() {
  useRouteChange({
    onChange: () => {
      Overlay_u.clear();
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
