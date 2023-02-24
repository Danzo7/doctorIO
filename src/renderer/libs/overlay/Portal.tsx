import { Overlay_u, useIsNotEmpty } from '@stores/overlayStore';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { OverlayItem, OverlayOptions } from '.';

export function Portal({
  children,
  overall,
  ...options
}: OverlayOptions & { onClose?: () => void } & {
  children: ReactNode;
  overall?: boolean;
}) {
  const entry = Overlay_u.getPortalEntry();
  const notEmpty = useIsNotEmpty();
  if (!entry || (notEmpty && !overall)) return <></>;
  else
    return createPortal(
      <div>
        <OverlayItem defaultCloseFallback={false} {...options}>
          {children}
        </OverlayItem>
      </div>,
      entry,
    );
}
