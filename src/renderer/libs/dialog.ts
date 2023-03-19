import modal from './overlay/stores/modal';
import { FIT_MODAL } from './overlay';
import ConfirmModal from '@containers/modals/dialog_modal/components/ConfirmModal';
export type ConfirmOptions = {
  description?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  status?: 'warning' | 'error' | 'success';
};
export const Confirm = (
  title: string,
  { description, onCancel, onConfirm }: ConfirmOptions,
) => {
  return new Promise<boolean>((resolve) => {
    modal(
      ({ close }) =>
        ConfirmModal({
          title,
          status: 'warning',
          description,
          onConfirm: () => {
            onConfirm?.();
            resolve(true);
            close();
          },
          onCancel: () => {
            onCancel?.();
            resolve(false);
            close();
          },
        }),
      { ...FIT_MODAL, onClose: () => resolve(false), closeBtn: undefined },
    ).open();
  });
};
