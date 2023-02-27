import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { OverlayItem, OverlayOptions } from '.';
import { usePortalElement } from './stores/portal';
import { useIsModalEmpty } from './stores/modal';

export function Portal({
  children,
  overall,
  ...options
}: OverlayOptions & { onClose?: () => void } & {
  children: ReactNode;
  overall?: boolean;
}) {
  const entry = usePortalElement();
  const isEmpty = useIsModalEmpty();
  if (!entry || (!isEmpty && !overall)) return <></>;
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
